import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Compass, Clock3, Sparkles } from 'lucide-react';
import { site } from '@/data/site';
import { categories } from '@/data/categories';
import { CategoryGrid, ClosingBanner } from '@/components/common';
import { Illustration } from '@/components/illustration';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Kenali Peluang Selama Kuliah', site.home.description, '/');
export default function Home() {
  return (
    <>
      <section className="hero-section container">
        <div className="hero-copy">
          <h1>
            {site.home.headlineParts[0]}
            <br />
            {site.home.headlineParts[1]}
            <br />
            <span className="highlight-word">
              {site.home.headlineParts[2]}
              <svg viewBox="0 0 450 20" aria-hidden="true">
                <path d="M3 14Q200-5 440 10" />
              </svg>
            </span>
          </h1>
          <p>{site.home.description}</p>
          <div className="button-row">
            <Link href="/kuis" className="button primary">
              Temukan Minatku
              <ArrowUpRight size={20} />
            </Link>
            <Link href="/jelajahi-peluang" className="button secondary">
              Jelajahi Peluang
              <ArrowRight size={19} />
            </Link>
          </div>
          <div className="hero-proof">
            <span>Mulai dari rasa penasaranmu</span>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-art-halo" />
          <Illustration priority className="campus-illustration" />
          <div className="floating-note note-top">
            <span className="note-icon">
              <Sparkles size={18} />
            </span>
            <div>
              <strong>Banyak jalan untuk tumbuh</strong>
              <small>Kamu tidak harus memilih satu.</small>
            </div>
          </div>
          <div className="floating-note note-bottom">
            <span className="note-icon">
              <Compass size={20} />
            </span>
            <div>
              <strong>Langkah pertamamu</strong>
              <small>Dimulai dari sini.</small>
            </div>
            <ArrowUpRight size={17} />
          </div>
        </div>
      </section>
      <div className="container">
        <div className="intro-strip">
          <p>
            Kenali kegiatannya.
            <br />
            <strong>Temukan yang ingin kamu coba.</strong>
          </p>
          <div>
            <span className="intro-number">05</span>
            <span>
              kategori
              <br />
              untuk dieksplorasi
            </span>
          </div>
          <div>
            <span className="intro-number">04</span>
            <span>
              pertanyaan
              <br />
              untuk mulai mengenal minat
            </span>
          </div>
          <span className="strip-decoration" aria-hidden="true">
            ✳
          </span>
        </div>
        <section className="home-discovery section-space">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Buka ruang untuk kemungkinan</span>
              <h2>{site.home.categoriesTitle}</h2>
            </div>
            <p>
              Tidak harus tahu semua istilahnya.
              <br />
              Kita kenali satu per satu.
            </p>
          </div>
          <CategoryGrid categories={categories} />
        </section>
        <section className="quiz-intro-banner">
          <div className="quiz-banner-art">
            <Illustration kind="compass" />
          </div>
          <div>
            <span className="eyebrow">
              <Compass size={16} />
              Kuis minat
            </span>
            <h2>{site.home.quizTitle}</h2>
            <p>{site.home.quizDescription}</p>
            <div className="button-row">
              <Link href="/kuis" className="button primary">
                Mulai Kuis
                <ArrowUpRight size={19} />
              </Link>
              <span className="banner-meta">
                <Clock3 size={15} />
                Sekitar 1 menit
              </span>
            </div>
          </div>
        </section>
        <section className="how-section section-space">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Tidak perlu terburu-buru</span>
              <h2>
                Satu langkah kecil.
                <br />
                Banyak kemungkinan.
              </h2>
            </div>
            <Link href="/tentang" className="text-link">
              Kenalan dengan Kawan Kampus
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="how-grid">
            {site.about.steps.map((step, i) => (
              <article key={step.title}>
                <span className="how-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>
        <ClosingBanner />
      </div>
    </>
  );
}
