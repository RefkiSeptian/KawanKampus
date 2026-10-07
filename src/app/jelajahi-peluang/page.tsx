import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/categories';
import { CategoryGrid } from '@/components/common';
import { Illustration } from '@/components/illustration';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Jelajahi Peluang',
  'Kenali lima kategori kegiatan selama kuliah: organisasi, lomba, beasiswa, pengalaman internasional, dan dunia kerja.',
  '/jelajahi-peluang',
);
export default function Explore() {
  return (
    <div className="container page-space">
      <header className="explore-heading">
        <div>
          <span className="eyebrow">Lima arah. Banyak kemungkinan.</span>
          <h1>
            Rasa penasaranmu
            <br />
            bisa mulai <span className="ink-highlight">di sini.</span>
          </h1>
          <p>
            Kenali dulu jenis kegiatannya. Lihat contohnya, lalu pilih yang ingin kamu coba selama
            kuliah.
          </p>
        </div>
        <aside className="explore-side" aria-labelledby="explore-quiz-title">
          <div className="explore-side-top">
            <span className="eyebrow">Kuis minat</span>
            <div className="explore-compass" aria-hidden="true">
              <Illustration kind="compass" />
            </div>
          </div>
          <h2 id="explore-quiz-title">Belum punya pilihan?</h2>
          <p>Tidak apa-apa.</p>
          <Link href="/kuis" className="button primary">
            Temukan Minatku
            <ArrowUpRight size={18} />
          </Link>
        </aside>
      </header>
      <section aria-labelledby="explore-title">
        <h2 id="explore-title" className="sr-only">
          Lima kategori peluang
        </h2>
        <CategoryGrid categories={categories} />
      </section>
    </div>
  );
}
