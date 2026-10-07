import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { categories, getCategory } from '@/data/categories';
import { opportunities } from '@/data/opportunities';
import { Breadcrumb, ExternalResource, ScheduleNote } from '@/components/common';
import { ProgramVisual } from '@/components/program-visual';
import { PageMotion } from '@/components/page-motion';
import { categoryPresentation } from '@/data/presentation';
import { OpportunityCard } from '@/components/opportunity-card';
import { pageMetadata } from '@/lib/metadata';
export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.id }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return pageMetadata(category.name, category.cardDescription, `/peluang/${slug}`);
}
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params,
    category = getCategory(slug);
  if (!category) notFound();
  const choices = opportunities.filter((item) => item.category === slug);
  return (
    <PageMotion className={`container page-space category-page ${slug}`}>
      <Breadcrumb label={category.shortName} />
      <header className="category-hero">
        <div>
          <span className="eyebrow">{category.eyebrow}</span>
          <span className="category-identity">{category.name}</span>
          <h1>{categoryPresentation[category.id].heading}</h1>
          <p>{category.introduction}</p>
          <a href="#pilihan" className="text-link">
            Lihat contoh peluang
            <ArrowUpRight size={18} />
          </a>
        </div>
        <ProgramVisual photo={categoryPresentation[category.id].photo} hero />
      </header>
      <section className="category-types" aria-labelledby="types-title">
        <div className="types-heading">
          <span className="eyebrow">Pahami sebelum memilih</span>
          <h2 id="types-title">Kenali dulu jenisnya.</h2>
        </div>
        <div className="types-grid">
          {category.types.map((type, i) => (
            <article key={type.title} data-reveal>
              <span className="type-number">0{i + 1}</span>
              <div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </div>
            </article>
          ))}
        </div>
        {category.resources && (
          <div className="category-resources">
            <strong>Bacaan resmi</strong>
            {category.resources.map((resource) => (
              <ExternalResource key={resource.label} resource={resource} />
            ))}
          </div>
        )}
      </section>
      <section id="pilihan" className="section-space" aria-labelledby="choices-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Contoh untuk mulai mencari</span>
            <h2 id="choices-title">
              {slug === 'lomba-kompetisi'
                ? 'Lima ajang untuk kamu kenali.'
                : 'Pilihan untuk kamu kenali.'}
            </h2>
          </div>
          <span className="chip">05 pilihan</span>
        </div>
        {slug === 'lomba-kompetisi' && (
          <p className="section-intro">
            Pilihan ini mewakili ajang nasional pemerintah serta kompetisi industri atau profesi
            dengan jalur internasional. Fokusnya berbeda, bukan urutan peringkat. Kampus dapat
            menjadi tuan rumah atau jalur seleksi tanpa menjadikan ajangnya lomba internal kampus.
          </p>
        )}
        <div className="opportunity-grid">
          {choices.map((opportunity, i) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} index={i} />
          ))}
        </div>
        <ScheduleNote />
      </section>
      <p className="category-next-step">{category.closing}</p>
      <div className="category-quiz-link">
        <p>Masih ingin mengenali minat yang lain?</p>
        <Link href="/kuis" className="text-link">
          Coba Kuis Minat
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </PageMotion>
  );
}
