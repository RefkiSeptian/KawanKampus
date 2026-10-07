import type { CategoryId } from '@/types';

// Original decorative flat-vector scenes; adjacent category names supply meaning.
export function CategoryIllustration({ id, size = 96 }: { id: CategoryId; size?: number }) {
  return (
    <svg
      className="category-illustration"
      width={size}
      height={size * 0.85}
      viewBox="0 0 120 102"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="61" cy="50" rx="44" ry="40" fill="#F7BB17" fillOpacity=".13" />
      <ellipse cx="60" cy="93" rx="46" ry="4" fill="currentColor" fillOpacity=".09" />
      <g strokeLinecap="round" strokeLinejoin="round">
        {id === 'organisasi-kepemimpinan' && (
          <>
            <path d="M21 14h76v25H21z" fill="#5A6675" />
            <path d="M31 24h26m-26 6h17" stroke="#FAF8F4" strokeWidth="3" />
            <path d="m78 20 3 5 6 1-4 4 1 6-6-3-5 3 1-6-4-4 6-1z" fill="#F7BB17" />
            <path d="M14 88V76c0-12 6-18 15-18s15 6 15 18v12" fill="#5A6675" />
            <circle cx="29" cy="49" r="10" fill="#FAF8F4" stroke="#16202E" strokeWidth="2" />
            <path d="M76 88V76c0-12 6-18 15-18s15 6 15 18v12" fill="#F3A52D" />
            <circle cx="91" cy="49" r="10" fill="#FAF8F4" stroke="#16202E" strokeWidth="2" />
            <path
              d="M39 90V72c0-14 8-22 21-22s21 8 21 22v18"
              fill="#F7BB17"
              stroke="#16202E"
              strokeWidth="2"
            />
            <circle cx="60" cy="39" r="12" fill="#FAF8F4" stroke="#16202E" strokeWidth="2" />
            <path d="M48 35c1-13 22-16 25 0l-9-5-6 5z" fill="#16202E" />
            <path d="m54 53 6 8 6-8M50 76v14m20-14v14" stroke="#16202E" strokeWidth="2" />
          </>
        )}
        {id === 'lomba-kompetisi' && (
          <>
            <path
              d="M43 34H29v7c0 15 12 19 22 19m26-26h14v7c0 15-12 19-22 19"
              stroke="#F3A52D"
              strokeWidth="6"
            />
            <path
              d="M40 23h40v22c0 13-8 23-20 23s-20-10-20-23z"
              fill="#F7BB17"
              stroke="#16202E"
              strokeWidth="2"
            />
            <path d="m60 33 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#FAF8F4" />
            <path d="M60 68v12" stroke="#F3A52D" strokeWidth="7" />
            <path d="M47 79h26v8H47z" fill="#F3A52D" />
            <path d="M29 88h62v7H29z" fill="#5A6675" />
            <path d="m22 24-4-5m82 5 4-5M60 9v6" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="96" cy="67" r="3" fill="#F7BB17" />
            <circle cx="22" cy="65" r="2" fill="#F3A52D" />
          </>
        )}
        {id === 'beasiswa-bantuan-kuliah' && (
          <>
            <path
              d="M17 57h32c7 0 11 3 11 7 0-4 4-7 11-7h32v31H71c-6 0-9 2-11 4-2-2-5-4-11-4H17z"
              fill="#FAF8F4"
              stroke="#16202E"
              strokeWidth="2"
            />
            <path
              d="M60 64v28M27 67h21m-21 8h21m23-8h21m-21 8h21"
              stroke="#5A6675"
              strokeWidth="2"
            />
            <path d="M38 33v14c13 10 29 10 42 0V33" fill="#5A6675" />
            <path d="m19 28 41-18 41 18-41 18z" fill="#16202E" stroke="#FAF8F4" strokeWidth="1.5" />
            <path d="m60 27 31 5v21" stroke="#F7BB17" strokeWidth="3" />
            <path d="m87 59 4-8 4 8" fill="#F7BB17" />
            <circle cx="95" cy="79" r="15" fill="#F7BB17" stroke="#16202E" strokeWidth="2" />
            <path d="m95 70 2 5 5 1-4 4 1 5-4-2-4 2 1-5-4-4 5-1z" fill="#FAF8F4" />
          </>
        )}
        {id === 'pengalaman-internasional' && (
          <>
            <circle cx="52" cy="48" r="32" fill="#FAF8F4" stroke="#16202E" strokeWidth="2" />
            <ellipse cx="52" cy="48" rx="15" ry="32" stroke="#5A6675" strokeWidth="2" />
            <path d="M21 48h63M25 32h54M25 64h54M52 16v64" stroke="#5A6675" strokeWidth="2" />
            <path d="m31 25 10-5 8 7-5 10-10 1-6-7m26 22 13-2 9 8-7 14-10-3z" fill="#F7BB17" />
            <path
              d="m72 21 32-9-15 29-7-11-10-9z"
              fill="#F3A52D"
              stroke="#16202E"
              strokeWidth="2"
            />
            <path d="m82 30 13-10" stroke="#16202E" strokeWidth="2" />
            <rect
              x="73"
              y="57"
              width="31"
              height="36"
              rx="4"
              fill="#16202E"
              stroke="#FAF8F4"
              strokeWidth="1.5"
            />
            <circle cx="88.5" cy="72" r="7" stroke="#F7BB17" strokeWidth="2" />
            <path d="M81 85h15" stroke="#FAF8F4" strokeWidth="2" />
            <path
              d="M16 82c14 8 29 10 44 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="3 5"
            />
          </>
        )}
        {id === 'dunia-kerja' && (
          <>
            <rect x="16" y="20" width="67" height="46" rx="5" fill="#5A6675" />
            <path d="M22 26h55v33H22z" fill="#FAF8F4" />
            <path d="M29 48h8V36h-8zm14 0h8V32h-8zm14 0h8V40h-8z" fill="#F7BB17" />
            <path d="M10 66h79l-6 9H16z" fill="#16202E" />
            <rect
              x="57"
              y="61"
              width="48"
              height="30"
              rx="5"
              fill="#F3A52D"
              stroke="#16202E"
              strokeWidth="2"
            />
            <path d="M73 61v-5h16v5M57 74c15 6 32 6 48 0" stroke="#16202E" strokeWidth="2" />
            <path d="M78 73h7v8h-7z" fill="#FAF8F4" />
            <path d="M20 81h17v10H20z" fill="#F7BB17" />
            <path d="M37 82h4c6 0 6 7 0 7h-4" stroke="#F7BB17" strokeWidth="3" />
            <path d="M96 27v12m-6-6h12" stroke="currentColor" strokeWidth="2.5" />
          </>
        )}
      </g>
    </svg>
  );
}
