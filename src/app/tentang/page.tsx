import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { site } from '@/data/site';
import { KMark } from '@/components/brand';
import { PageMotion } from '@/components/page-motion';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Tentang Kawan Kampus', site.description, '/tentang');
export default function About() {
  return (
    <PageMotion className="container page-space about-page">
      <header className="about-hero">
        <div>
          <span className="eyebrow">Teman mengenali kemungkinan</span>
          <h1>
            Kuliah punya banyak jalan.
            <br />
            Kita kenali <span className="ink-highlight">bersama.</span>
          </h1>
          <p>{site.about.description}</p>
        </div>
        <div className="about-identity-poster" aria-hidden="true">
          <KMark size={200} />
          <span>Banyak kemungkinan.</span>
        </div>
      </header>
      <section className="about-two">
        <article data-reveal>
          <span className="eyebrow">Untuk siapa?</span>
          <h2>
            Untuk kamu yang
            <br />
            baru mulai.
          </h2>
          <p>{site.about.audience}</p>
        </article>
        <article data-reveal>
          <span className="eyebrow">Apa yang kami bantu?</span>
          <h2>
            Arah awal,
            <br />
            bukan jawaban akhir.
          </h2>
          <p>{site.about.purpose}</p>
        </article>
      </section>
      <section className="how-section section-space">
        <span className="eyebrow">Cara menggunakan Kawan Kampus</span>
        <h2>Mulai dari satu kegiatan.</h2>
        <div className="how-grid">
          {site.about.steps.map((step, i) => (
            <article key={step.title} data-reveal>
              <span className="how-number">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="brand-statement">
        <Link className="button primary" href="/jelajahi-peluang">
          Jelajahi Peluang
          <ArrowRight size={18} />
        </Link>
      </section>
    </PageMotion>
  );
}
