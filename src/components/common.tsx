import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Info } from 'lucide-react';
import type { Category, Resource } from '@/types';
import { site } from '@/data/site';
import { CategoryIllustration } from './category-illustration';
import { ProgramVisual } from './program-visual';
import { categoryPresentation } from '@/data/presentation';
import { opportunities } from '@/data/opportunities';
export function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  return (
    <article className={`explore-choice-card category-${index}`} data-reveal>
      <div className="card-top">
        <span className="card-index">0{index + 1} / 05</span>
        <CategoryIllustration id={category.id} size={48} />
      </div>
      <ProgramVisual
        photo={
          categoryPresentation[category.id].cardPhoto || categoryPresentation[category.id].photo
        }
      />
      <h3>{category.name}</h3>
      <p>{category.cardDescription}</p>
      <small className="category-examples">
        {opportunities
          .filter((o) => o.category === category.id)
          .slice(0, 3)
          .map((o) => o.name)
          .join(' · ')}
      </small>
      <Link className="card-link" href={`/peluang/${category.id}`}>
        Kenali Peluangnya
        <ArrowUpRight size={21} />
        <span className="sr-only">: {category.name}</span>
      </Link>
    </article>
  );
}
export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="explore-photo-grid">
      {categories.map((category, i) => (
        <CategoryCard key={category.id} category={category} index={i} />
      ))}
      <article className="explore-quiz-card" data-reveal>
        <span className="quiz-question-mark" aria-hidden="true">
          ?
        </span>
        <h3>Masih ingin mencoba berbagai hal?</h3>
        <p>Mulai dari kuis singkat untuk menemukan titik awal.</p>
        <Link href="/kuis" className="button primary">
          Temukan Minatku
          <ArrowRight size={18} />
        </Link>
      </article>
    </div>
  );
}
export function ExternalResource({ resource }: { resource: Resource }) {
  return resource.url ? (
    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
      {resource.label}
      <ExternalLink size={15} />
      <span className="sr-only"> (tab baru)</span>
    </a>
  ) : (
    <span className="muted">{resource.label} — tautan belum tersedia</span>
  );
}
export function ScheduleNote() {
  return (
    <p className="schedule-note">
      <Info size={18} aria-hidden="true" />
      {site.scheduleDisclaimer}
    </p>
  );
}
export function Breadcrumb({ label }: { label: string }) {
  return (
    <div className="breadcrumb">
      <Link href="/jelajahi-peluang">
        <ArrowLeft size={16} />
        Jelajahi Peluang
      </Link>
      <span aria-hidden="true">/</span>
      <span>{label}</span>
    </div>
  );
}
export function ClosingBanner({
  title = site.home.closingTitle,
  description = site.home.closingDescription,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="closing-banner">
      <span className="closing-sun" aria-hidden="true" />
      <div>
        <span className="eyebrow">Pelan-pelan, kamu akan menemukan jalannya</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Link href="/jelajahi-peluang" className="button cream">
        Jelajahi Semua Peluang
        <ArrowRight size={19} />
      </Link>
    </section>
  );
}
