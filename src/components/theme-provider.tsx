'use client';
import { ThemeProvider as Provider, useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useSyncExternalStore } from 'react';
const subscribe = () => () => {};
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider attribute="class" defaultTheme="system" enableSystem storageKey="kawan-kampus-theme">
      {children}
    </Provider>
  );
}
export function ThemeControl() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const dark = hydrated && resolvedTheme === 'dark';
  return (
    <button
      type="button"
      className="theme-control"
      role="switch"
      aria-label="Mode gelap"
      aria-checked={dark}
      data-dark={dark}
      disabled={!hydrated}
      title={dark ? 'Gunakan mode terang' : 'Gunakan mode gelap'}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      <Sun className="theme-track-sun" size={17} aria-hidden="true" />
      <Moon className="theme-track-moon" size={17} aria-hidden="true" />
      <span className="theme-thumb" aria-hidden="true">
        <Sun className="theme-thumb-sun" size={18} />
        <Moon className="theme-thumb-moon" size={18} />
      </span>
    </button>
  );
}

export function ThemeSystemControl() {
  const { theme, setTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return (
    <button
      type="button"
      className="theme-system-control"
      onClick={() => setTheme('system')}
      aria-pressed={hydrated && theme === 'system'}
    >
      <Monitor size={14} aria-hidden="true" />
      Ikuti tema perangkat
    </button>
  );
}
