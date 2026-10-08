import type { ChatMessage } from '@/data/assistant';
import { chatSystemPrompt, parseChatAnswer } from './chat-context';

export async function completeChat(messages: ChatMessage[], signal?: AbortSignal) {
  const models = [
    ...new Set(
      (process.env.GROQ_MODELS || 'llama-3.3-70b-versatile,llama-3.1-8b-instant')
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean),
    ),
  ].slice(0, 2);
  // A single deadline covers the primary model and fallback together.
  const deadline = AbortSignal.timeout(20_000);
  const combined = signal ? AbortSignal.any([signal, deadline]) : deadline;
  for (const model of models) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        cache: 'no-store',
        signal: AbortSignal.any([combined, AbortSignal.timeout(9000)]),
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: chatSystemPrompt() }, ...messages],
          temperature: 0.2,
          max_completion_tokens: 700,
          response_format: { type: 'json_object' },
          stream: false,
        }),
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) return null;
        if (response.status === 404 || response.status === 429 || response.status >= 500) continue;
        return null;
      }
      const body = await response.json();
      const content = body.choices?.[0]?.message?.content;
      const answer = typeof content === 'string' ? parseChatAnswer(content) : null;
      if (answer) return answer;
    } catch {
      if (combined.aborted) return null;
    }
  }
  return null;
}
