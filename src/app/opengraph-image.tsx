import { ImageResponse } from 'next/og';
export const alt = 'Kawan Kampus — Kuliahmu. Banyak kemungkinan.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#FAF8F4',
        color: '#16202E',
        padding: '70px',
        height: '100%',
        width: '100%',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 40 }}>
        <span style={{ display: 'flex' }}>
          <span style={{ fontWeight: 800, color: '#F7BB17' }}>k</span>
          <span style={{ fontWeight: 800 }}>awan</span>
          <span style={{ fontWeight: 400 }}>kampus</span>
          <span style={{ color: '#F7BB17' }}>.</span>
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 76,
          fontWeight: 800,
          lineHeight: 1.05,
        }}
      >
        <span>Kuliahmu.</span>
        <span>Banyak kemungkinan.</span>
      </div>
      <div
        style={{
          display: 'flex',
          background: '#F7BB17',
          borderRadius: 40,
          padding: '18px 30px',
          fontSize: 24,
          alignSelf: 'flex-start',
        }}
      >
        Satu langkah kecil. Banyak kemungkinan.
      </div>
    </div>,
    size,
  );
}
