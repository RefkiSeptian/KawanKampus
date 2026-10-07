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
      <BrandWordmark />
    </Link>
  );
}
export function BrandWordmark() {
  return (
    <svg
      className="brand-wordmark"
      viewBox="0 0 280 56"
      width="175"
      height="34"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="#F7BB17" d="M0 5h9v16L24 5h13L18 27H0V5Z M0 31h18l19 22H24L9 37v16H0V31Z" />
      <text
        x="35"
        y="43"
        fill="currentColor"
        fontFamily="var(--font-inter), sans-serif"
        fontSize="50"
        letterSpacing="-3"
        textLength="245"
        lengthAdjust="spacingAndGlyphs"
      >
        <tspan fontWeight="800">awan</tspan>
        <tspan fontWeight="400">kampus</tspan>
        <tspan fill="#F7BB17" fontWeight="700">
          .
        </tspan>
      </text>
    </svg>
  );
}
