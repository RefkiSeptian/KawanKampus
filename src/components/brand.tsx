import Link from 'next/link';
import { awanPath, kampusPath } from '@/assets/brand/wordmark-paths';
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
      <BrandWordmark />
    </Link>
  );
}
export function BrandWordmark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`brand-wordmark ${className}`.trim()}
      viewBox="0 0 282 56"
      width="175"
      height="34"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <path fill="#F7BB17" d="M0 5h9v16L24 5h13L18 27H0V5Z M0 31h18l19 22H24L9 37v16H0V31Z" />
      <path fill="currentColor" d={awanPath} />
      <path fill="currentColor" d={kampusPath} />
      <circle cx="277" cy="40" r="3.2" fill="#F7BB17" />
    </svg>
  );
}
