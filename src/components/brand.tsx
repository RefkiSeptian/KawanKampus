import Link from 'next/link';
export function KMark({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 80 96"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 2h19v34L53 2h25L39 46H3V2Z M3 54h36l39 40H53L22 62v32H3V54Z" fill="#F7BB17" />
    </svg>
  );
}
export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${footer ? 'brand-footer' : ''}`}
      aria-label="Kawan Kampus — Beranda"
    >
      <KMark />
      <span className="brand-wordmark">
        <strong>kawan</strong>
        <span>kampus</span>
        <span className="brand-dot">.</span>
      </span>
    </Link>
  );
}
