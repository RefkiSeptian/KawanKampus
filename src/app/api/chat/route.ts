import { MAX_HISTORY, MAX_MESSAGE_LENGTH, type ChatMessage } from '@/data/assistant';
import { chatAvailable, limitChat } from '@/lib/chat-rate-limit';
import { completeChat } from '@/lib/groq-chat';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
const reply = (body: unknown, status = 200, extra = {}) =>
  Response.json(body, { status, headers: { ...headers, ...extra } });

export function GET() {
  return reply({ available: chatAvailable() });
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 32_000) {
      await reader.cancel();
      throw new Error('BODY_TOO_LARGE');
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const requestUrl = new URL(request.url);
  // Next may normalize request.url to localhost behind a reverse proxy.
  // Host is the actual destination; Vercel supplies the forwarded protocol.
  const protocol =
    process.env.VERCEL === '1' && request.headers.get('x-forwarded-proto') === 'https'
      ? 'https:'
      : requestUrl.protocol;
  const expectedOrigin = `${protocol}//${request.headers.get('host') || requestUrl.host}`;
  if (!origin || origin !== expectedOrigin)
    return reply({ error: 'Permintaan tidak diizinkan.' }, 403);
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return reply({ error: 'Format pesan tidak valid.' }, 415);
  if (Number(request.headers.get('content-length')) > 32_000)
    return reply({ error: 'Pesan terlalu panjang.' }, 413);
  let messages: ChatMessage[];
  try {
    const data = await readBody(request);
    if (
      !Array.isArray(data?.messages) ||
      !data.messages.length ||
      data.messages.length > MAX_HISTORY
    )
      return reply({ error: 'Riwayat pesan tidak valid.' }, 400);
    messages = data.messages.map((message: ChatMessage, index: number) => {
      const expectedRole = index % 2 === (data.messages.length - 1) % 2 ? 'user' : 'assistant';
      if (
        !message ||
        message.role !== expectedRole ||
        typeof message.content !== 'string' ||
        !message.content.trim() ||
        message.content.length > MAX_MESSAGE_LENGTH
      )
        throw new Error('INVALID_MESSAGE');
      return { role: message.role, content: message.content.trim() };
    });
  } catch (error) {
    return reply(
      {
        error:
          error instanceof Error && error.message === 'BODY_TOO_LARGE'
            ? 'Pesan terlalu panjang.'
            : 'Format pesan tidak valid.',
      },
      error instanceof Error && error.message === 'BODY_TOO_LARGE' ? 413 : 400,
    );
  }
  if (!chatAvailable())
    return reply(
      {
        error:
          'Asisten AI belum tersedia. Kamu tetap bisa menjelajahi katalog atau mencoba kuis minat.',
      },
      503,
    );
  try {
    const limit = await limitChat(request.headers);
    if (!limit.allowed)
      return reply(
        {
          error: `Batas 10 pesan per menit tercapai. Coba lagi dalam ${limit.retryAfter} detik.`,
          retryAfter: limit.retryAfter,
        },
        429,
        { 'Retry-After': String(limit.retryAfter) },
      );
    const result = await completeChat(messages, request.signal);
    if (result.ok) return reply({ answer: result.answer, sources: result.sources });
    const error =
      result.code === 'GROQ_RATE_LIMIT'
        ? 'Kuota layanan AI sementara tercapai. Coba lagi nanti; katalog dan kuis tetap bisa kamu gunakan.'
        : result.code === 'GROQ_TIMEOUT'
          ? 'Jawaban memerlukan waktu lebih lama. Coba lagi nanti.'
          : 'Asisten sedang tidak tersedia. Coba lagi nanti; katalog dan kuis tetap bisa kamu gunakan.';
    return reply(
      { error, code: result.code, ...(result.retryAfter ? { retryAfter: result.retryAfter } : {}) },
      result.code === 'GROQ_RATE_LIMIT' ? 429 : 503,
      result.retryAfter ? { 'Retry-After': String(result.retryAfter) } : {},
    );
  } catch {
    /* Do not log conversation text, credentials, or provider responses. */
  }
  return reply(
    {
      error:
        'Asisten sedang tidak tersedia. Coba lagi nanti; katalog dan kuis tetap bisa kamu gunakan.',
    },
    503,
  );
}
