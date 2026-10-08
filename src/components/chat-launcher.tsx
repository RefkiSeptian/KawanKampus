'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { KMark } from './brand';
import styles from './chat-assistant.module.css';

const ChatPanel = dynamic(() => import('./chat-assistant').then((module) => module.ChatAssistant), {
  ssr: false,
  loading: () => (
    <div className={styles.floating}>
      <button
        type="button"
        className={styles.launcher}
        disabled
        aria-label="Menyiapkan asisten kawankampus"
        aria-busy="true"
      >
        <KMark size={29} />
        <span className={styles.launcherLabel}>Sebentar…</span>
      </button>
    </div>
  ),
});

export function ChatLauncher() {
  const [activated, setActivated] = useState(false);
  if (activated) return <ChatPanel initialOpen />;
  return (
    <div className={styles.floating}>
      <button
        type="button"
        className={styles.launcher}
        aria-label="Buka asisten kawankampus"
        aria-expanded="false"
        onClick={() => setActivated(true)}
      >
        <KMark size={29} />
        <span className={styles.launcherLabel}>Tanya kawan</span>
      </button>
    </div>
  );
}
