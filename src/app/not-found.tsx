import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
export default function NotFound() {
  return (
    <div className="container page-space result-empty">
      <Compass size={48} aria-hidden="true" />
      <span className="eyebrow">404 · Arah ini belum tersedia</span>
      <h1>
        Yuk, kembali ke
        <br />
        peluang yang ada.
      </h1>
      <p>Halaman yang kamu cari tidak ditemukan. Masih ada lima kategori untuk kamu kenali.</p>
      <Link className="button primary" href="/jelajahi-peluang">
        Jelajahi Peluang
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}
