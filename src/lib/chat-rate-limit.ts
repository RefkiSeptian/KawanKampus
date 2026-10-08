import { createHash } from 'node:crypto';
import { isIP } from 'node:net';

const LIMIT = 10;
const WINDOW = 60_000;
const MAX_BUCKETS = 10_000;
const localBuckets = new Map<string, { count: number; reset: number }>();

export function chatAvailable() {
  return Boolean(process.env.GROQ_API_KEY?.trim());
}

export async function limitChat(headers: Headers, now = Date.now()) {
  // On Vercel, this header is supplied/overwritten by the platform. Other hosting
  // uses one shared bucket unless a trusted proxy is explicitly configured.
  const header =
    process.env.VERCEL === '1' ? 'x-vercel-forwarded-for' : process.env.CHAT_TRUSTED_IP_HEADER;
  const candidate = header ? headers.get(header)?.split(',')[0]?.trim() : 'local';
  const identity = candidate && isIP(candidate) ? candidate : 'shared';
  const hash = createHash('sha256').update(identity).digest('hex');
  // Best-effort only: instance restarts reset counters; instances do not share them.
  // No external store or additional credentials are required.
  for (const [key, value] of localBuckets) if (value.reset <= now) localBuckets.delete(key);
  if (!localBuckets.has(hash) && localBuckets.size >= MAX_BUCKETS)
    return { allowed: false, retryAfter: 60 };
  const bucket = localBuckets.get(hash) || { count: 0, reset: now + WINDOW };
  bucket.count += 1;
  localBuckets.set(hash, bucket);
  return {
    allowed: bucket.count <= LIMIT,
    retryAfter: Math.max(1, Math.ceil((bucket.reset - now) / 1000)),
  };
}
