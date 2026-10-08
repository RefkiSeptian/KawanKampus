import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';

const LIMIT = 10;
const WINDOW = 60_000;
const localBuckets = new Map<string, { count: number; reset: number }>();

export function limiterConfigured() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN &&
    process.env.CHAT_RATE_LIMIT_SECRET,
  );
}

export function chatAvailable() {
  return Boolean(process.env.GROQ_API_KEY) && (process.env.VERCEL !== '1' || limiterConfigured());
}

export async function limitChat(headers: Headers, now = Date.now()) {
  // On Vercel, this header is supplied/overwritten by the platform. Other hosting
  // uses one shared bucket unless a trusted proxy is explicitly configured.
  const header =
    process.env.VERCEL === '1' ? 'x-vercel-forwarded-for' : process.env.CHAT_TRUSTED_IP_HEADER;
  const candidate = header ? headers.get(header)?.split(',')[0]?.trim() : 'local';
  const identity = candidate && isIP(candidate) ? candidate : 'shared';
  const hash = createHmac('sha256', process.env.CHAT_RATE_LIMIT_SECRET || 'local-development')
    .update(identity)
    .digest('hex');
  if (limiterConfigured()) {
    const command = [
      'EVAL',
      "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('PEXPIRE',KEYS[1],ARGV[1]) end; return {n,redis.call('PTTL',KEYS[1])}",
      '1',
      `kk:chat:${hash}`,
      String(WINDOW),
    ];
    const response = await fetch(process.env.UPSTASH_REDIS_REST_URL!, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new Error('Rate limiter unavailable');
    const body = await response.json();
    if (
      !Array.isArray(body.result) ||
      body.result.length !== 2 ||
      !body.result.every((n: unknown) => typeof n === 'number' && Number.isFinite(n)) ||
      body.result[1] < 0
    )
      throw new Error('Invalid rate limiter response');
    return {
      allowed: body.result[0] <= LIMIT,
      retryAfter: Math.max(1, Math.ceil(body.result[1] / 1000)),
    };
  }
  if (process.env.VERCEL === '1') throw new Error('Shared rate limiter required');
  for (const [key, value] of localBuckets) if (value.reset <= now) localBuckets.delete(key);
  const bucket = localBuckets.get(hash) || { count: 0, reset: now + WINDOW };
  bucket.count += 1;
  localBuckets.set(hash, bucket);
  return {
    allowed: bucket.count <= LIMIT,
    retryAfter: Math.max(1, Math.ceil((bucket.reset - now) / 1000)),
  };
}
