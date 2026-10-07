import { categories } from '@/data/categories';
import { CategoryGrid } from '@/components/common';
import { PageMotion } from '@/components/page-motion';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Jelajahi Peluang',
  'Kenali lima kategori kegiatan selama kuliah: organisasi, lomba, beasiswa, pengalaman internasional, dan dunia kerja.',
  '/jelajahi-peluang',
);
export default function Explore() {
  return (
    <PageMotion className="container page-space explore-page">
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
      </header>
      <section aria-labelledby="explore-title">
        <h2 id="explore-title" className="sr-only">
          Lima kategori peluang
        </h2>
        <CategoryGrid categories={categories} />
      </section>
    </PageMotion>
  );
}
