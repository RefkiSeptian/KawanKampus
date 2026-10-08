import type { ChatMessage } from '@/data/assistant';
import { chatSystemPrompt, getChatContext, parseChatAnswer } from './chat-context';

export type GroqFailureCode =
  | 'GROQ_AUTH'
  | 'GROQ_MODEL'
  | 'GROQ_RATE_LIMIT'
  | 'GROQ_REQUEST'
  | 'GROQ_RESPONSE'
  | 'GROQ_TIMEOUT'
  | 'GROQ_UNAVAILABLE';
export type GroqResult =
  | ({ ok: true } & NonNullable<ReturnType<typeof parseChatAnswer>>)
  | { ok: false; code: GroqFailureCode; retryAfter?: number };
export const defaultGroqModels = 'openai/gpt-oss-20b,openai/gpt-oss-120b';

function report(code: GroqFailureCode, model: string, status?: number) {
  // Fixed diagnostic fields only: never log prompts, API keys or raw error bodies.
  const safeModel = /^(?!gsk_|sk-)[a-zA-Z0-9_./-]{1,100}$/.test(model)
    ? model
    : '[invalid model id]';
  console.warn('[kawan-chat]', { code, model: safeModel, ...(status ? { status } : {}) });
}

export async function completeChat(
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<GroqResult> {
  const models = [
    ...new Set(
      (process.env.GROQ_MODELS?.trim() || defaultGroqModels)
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean),
    ),
  ].slice(0, 2);
  // A single deadline covers the primary model and fallback together.
  const deadline = AbortSignal.timeout(20_000);
  const combined = signal ? AbortSignal.any([signal, deadline]) : deadline;
  let failure: Extract<GroqResult, { ok: false }> = { ok: false, code: 'GROQ_UNAVAILABLE' };
  const history = messages.slice(-6);
  while (history.length > 1 && history.reduce((n, m) => n + m.content.length, 0) > 6000)
    history.shift();
  const prompt = chatSystemPrompt(history);
  for (const model of models) {
    const gptOss = model === 'openai/gpt-oss-20b' || model === 'openai/gpt-oss-120b';
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        cache: 'no-store',
        signal: AbortSignal.any([combined, AbortSignal.timeout(9000)]),
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY?.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: prompt }, ...history],
          temperature: 0.2,
          max_completion_tokens: gptOss ? 2048 : 700,
          ...(gptOss ? { reasoning_effort: 'low', include_reasoning: false } : {}),
          response_format: { type: 'json_object' },
          stream: false,
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const providerCode = typeof body?.error?.code === 'string' ? body.error.code : '';
        const modelFailure =
          response.status === 403 || response.status === 404 || providerCode.includes('model');
        const code: GroqFailureCode =
          response.status === 401
            ? 'GROQ_AUTH'
            : response.status === 429 || response.status === 413
              ? 'GROQ_RATE_LIMIT'
              : modelFailure
                ? 'GROQ_MODEL'
                : response.status === 400
                  ? 'GROQ_REQUEST'
                  : 'GROQ_UNAVAILABLE';
        const delay = Number(response.headers.get('retry-after'));
        failure = {
          ok: false,
          code,
          ...(code === 'GROQ_RATE_LIMIT' && Number.isFinite(delay) && delay > 0
            ? { retryAfter: Math.min(86400, Math.ceil(delay)) }
            : {}),
        };
        report(code, model, response.status);
        if (code === 'GROQ_AUTH') return failure;
        continue;
      }
      const body = await response.json();
      const content = body.choices?.[0]?.message?.content;
      const answer =
        typeof content === 'string'
          ? parseChatAnswer(content, getChatContext(history).sources)
          : null;
      if (answer) return { ok: true, ...answer };
      failure = { ok: false, code: 'GROQ_RESPONSE' };
      report(failure.code, model, response.status);
    } catch (error) {
      const timedOut =
        combined.aborted ||
        (error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name));
      failure = { ok: false, code: timedOut ? 'GROQ_TIMEOUT' : 'GROQ_UNAVAILABLE' };
      report(failure.code, model);
      if (combined.aborted) return failure;
    }
  }
  return failure;
}
