'use client';

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { Asterisk, ArrowUpRight, Send, Square, X } from 'lucide-react';
import { KMark } from './brand';
import { assistant, MAX_HISTORY, MAX_MESSAGE_LENGTH, type DisplayMessage } from '@/data/assistant';
import styles from './chat-assistant.module.css';

function restoredMessages(): DisplayMessage[] {
  try {
    const saved = JSON.parse(sessionStorage.getItem(assistant.sessionKey) || 'null');
    if (saved?.version !== 1 || !Array.isArray(saved.messages)) return [];
    return saved.messages
      .slice(-24)
      .filter(
        (m: DisplayMessage) =>
          m &&
          ['user', 'assistant'].includes(m.role) &&
          typeof m.content === 'string' &&
          m.content.length <= MAX_MESSAGE_LENGTH,
      )
      .map((m: DisplayMessage) => ({
        role: m.role,
        content: m.content,
        sources: m.sources
          ?.filter(
            (s) =>
              s &&
              typeof s.label === 'string' &&
              typeof s.url === 'string' &&
              (s.url.startsWith('https://') || /^\/(?!\/)[\w/-]+$/.test(s.url)),
          )
          .slice(0, 3),
      }));
  } catch {
    return [];
  }
}

export function ChatAssistant({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState('');
  const [error, setError] = useState('');
  const [available, setAvailable] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const thread = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const controller = useRef<AbortController | null>(null);

  useEffect(() => {
    const saved = restoredMessages();
    // Initialize only once in an effect so SSR never touches browser storage.
    queueMicrotask(() => {
      setMessages(saved);
      setReady(true);
    });
    return () => controller.current?.abort();
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(assistant.sessionKey, JSON.stringify({ version: 1, messages }));
    } catch {
      /* Memory fallback. */
    }
  }, [messages, ready]);
  useEffect(() => {
    if (!open) return;
    const abort = new AbortController();
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && panel.current?.contains(event.target as Node)) {
        event.stopPropagation();
        setOpen(false);
        launcher.current?.focus();
      }
    };
    document.addEventListener('keydown', escape);
    input.current?.focus();
    fetch('/api/chat', { signal: abort.signal, cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error('Unavailable');
        return r.json();
      })
      .then((data) => setAvailable(data.available === true))
      .catch(() => {
        if (!abort.signal.aborted) setAvailable(false);
      });
    return () => {
      abort.abort();
      document.removeEventListener('keydown', escape);
    };
  }, [open]);
  useEffect(() => {
    thread.current?.scrollTo({ top: thread.current.scrollHeight, behavior: 'instant' });
  }, [messages, pending, open, error]);
  useEffect(() => {
    if (open && available === false)
      panel.current?.querySelector<HTMLButtonElement>('button')?.focus();
  }, [open, available]);

  function close() {
    setOpen(false);
    launcher.current?.focus();
  }
  function reset() {
    controller.current?.abort();
    controller.current = null;
    setMessages([]);
    setPending('');
    setError('');
    setDraft('');
    input.current?.focus();
  }
  async function send(text = draft) {
    const content = text.trim();
    if (!content || pending || available !== true) return;
    const abort = new AbortController();
    controller.current = abort;
    const history = [
      ...messages.map(({ role, content }) => ({ role, content })),
      { role: 'user' as const, content },
    ].slice(-MAX_HISTORY);
    setPending(content);
    setDraft('');
    setError('');
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: AbortSignal.any([abort.signal, AbortSignal.timeout(25_000)]),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || 'Jawaban belum bisa dimuat. Coba lagi nanti.');
      if (typeof data.answer !== 'string' || !Array.isArray(data.sources))
        throw new Error('Jawaban belum bisa dimuat.');
      if (controller.current === abort)
        setMessages(
          (current) =>
            [
              ...current,
              { role: 'user', content },
              { role: 'assistant', content: data.answer, sources: data.sources },
            ].slice(-24) as DisplayMessage[],
        );
    } catch (err) {
      if (controller.current === abort) {
        setDraft(content);
        if (!abort.signal.aborted)
          setError(
            err instanceof Error && err.name !== 'TimeoutError'
              ? err.message
              : 'Jawaban memerlukan waktu lebih lama. Coba lagi nanti.',
          );
      }
    } finally {
      if (controller.current === abort) {
        controller.current = null;
        setPending('');
        input.current?.focus();
      }
    }
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    void send();
  }
  function keyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void send();
    }
  }

  return (
    <div className={styles.floating}>
      {open && (
        <section
          ref={panel}
          id="kawan-chat"
          className={styles.panel}
          role="dialog"
          aria-modal="false"
          aria-labelledby="kawan-chat-title"
        >
          <header className={styles.header}>
            <span className={styles.mark}>
              <KMark size={30} />
            </span>
            <div>
              <h2 id="kawan-chat-title">{assistant.greeting}</h2>
              <p>{assistant.subtitle}</p>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={close}
              aria-label="Tutup asisten"
            >
              <X size={19} />
            </button>
          </header>
          <p className={styles.notice}>
            Asisten AI untuk menjelajahi peluang. Jangan kirim data pribadi; pesan diproses layanan
            AI. Cek kembali informasi di sumber resmi.
          </p>
          <div ref={thread} className={styles.thread}>
            {messages.length === 0 && !pending && (
              <div className={styles.empty}>
                <Asterisk size={45} aria-hidden="true" />
                <h3>Lagi penasaran apa?</h3>
                <p>Kita bisa kenali kegiatan, bandingkan pilihan, atau cari satu langkah kecil.</p>
                <div className={styles.starters}>
                  {assistant.starters.map((starter) => (
                    <button
                      key={starter.label}
                      type="button"
                      disabled={available !== true}
                      onClick={() => void send(starter.message)}
                    >
                      {starter.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div
              className={styles.messages}
              role="log"
              aria-label="Percakapan dengan kawankampus"
              aria-live="polite"
              aria-relevant="additions text"
            >
              {messages.map((message, index) => (
                <article
                  key={index}
                  className={`${styles.message} ${message.role === 'user' ? styles.user : styles.answer}`}
                >
                  <span className={styles.speaker}>
                    {message.role === 'user' ? 'Kamu' : 'kawankampus'}
                  </span>
                  <p>{message.content}</p>
                  {message.sources && message.sources.length > 0 && (
                    <div className={styles.sources}>
                      <span>Kenali lebih lanjut</span>
                      {message.sources.map((source) =>
                        source.url.startsWith('/') ? (
                          <Link key={source.id} href={source.url} onClick={close}>
                            {source.label}
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </Link>
                        ) : (
                          <a
                            key={source.id}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {source.label}
                            <ArrowUpRight size={13} aria-hidden="true" />
                            <span className="sr-only"> (tab baru)</span>
                          </a>
                        ),
                      )}
                    </div>
                  )}
                </article>
              ))}
              {pending && (
                <article className={`${styles.message} ${styles.user}`}>
                  <span className={styles.speaker}>Kamu</span>
                  <p>{pending}</p>
                </article>
              )}
            </div>
            {pending && (
              <p className={styles.status} role="status">
                <span className={styles.dots} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>{' '}
                Sedang menyusun jawaban…
              </p>
            )}
            {available === false && (
              <div className={styles.unavailable} role="status">
                <strong>Asisten AI belum tersedia.</strong>
                <p>Kamu tetap bisa menemukan pilihan lewat katalog dan kuis.</p>
                <Link href="/jelajahi-peluang" onClick={close}>
                  Jelajahi Peluang <ArrowUpRight size={14} />
                </Link>
                <Link href="/kuis" onClick={close}>
                  Temukan Minatku <ArrowUpRight size={14} />
                </Link>
              </div>
            )}
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
          </div>
          <div className={styles.bottom}>
            <form className={styles.composer} onSubmit={submit}>
              <label className="sr-only" htmlFor="kawan-chat-input">
                Pesan untuk kawankampus
              </label>
              <textarea
                ref={input}
                id="kawan-chat-input"
                rows={2}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="Tulis rasa penasaranmu…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={keyDown}
                disabled={Boolean(pending) || available === false}
              />
              {pending ? (
                <button
                  type="button"
                  onClick={() => controller.current?.abort()}
                  aria-label="Batalkan jawaban"
                >
                  <Square size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!draft.trim() || available !== true}
                  aria-label="Kirim pesan"
                >
                  <Send size={18} />
                </button>
              )}
            </form>
            <div className={styles.session}>
              <span>Percakapan tersimpan selama sesi.</span>
              <button type="button" onClick={reset}>
                Mulai lagi
              </button>
            </div>
          </div>
        </section>
      )}
      <button
        ref={launcher}
        type="button"
        className={styles.launcher}
        aria-label={open ? 'Tutup asisten kawankampus' : 'Buka asisten kawankampus'}
        aria-expanded={open}
        aria-controls={open ? 'kawan-chat' : undefined}
        onClick={() => (open ? close() : setOpen(true))}
      >
        {open ? <X size={25} aria-hidden="true" /> : <KMark size={29} />}
        {!open && <span className={styles.launcherLabel}>Tanya kawan</span>}
      </button>
    </div>
  );
}
