import { CalendarDays, ArrowUpRight, Info } from 'lucide-react';
import type { Opportunity } from '@/types';
import { ExternalResource } from './common';
export function OpportunityCard({
  opportunity,
  index,
}: {
  opportunity: Opportunity;
  index: number;
}) {
  return (
    <article className="opportunity-card" data-opportunity-id={opportunity.id}>
      <div className="opportunity-top">
        <span className="type-label">{opportunity.type}</span>
        <span className="card-index">0{index + 1}</span>
      </div>
      <h3>{opportunity.name}</h3>
      <p className="opportunity-description">{opportunity.description}</p>
      <dl>
        <div>
          <dt>
            <CalendarDays size={16} aria-hidden="true" />
            Kapan
          </dt>
          <dd>{opportunity.timing}</dd>
        </div>
        <div>
          <dt>
            <Info size={16} aria-hidden="true" />
            Perlu tahu
          </dt>
          <dd>{opportunity.note}</dd>
        </div>
      </dl>
      <div className="opportunity-bottom">
        {opportunity.officialUrl ? (
          <a
            href={opportunity.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="official-link"
          >
            {opportunity.ctaLabel}
            <ArrowUpRight size={18} />
            <span className="sr-only"> (tab baru): {opportunity.name}</span>
          </a>
        ) : (
          <>
            <button type="button" className="official-link unavailable" disabled>
              {opportunity.ctaLabel}
              <ArrowUpRight size={18} />
            </button>
            <p className="unavailable-note">
              Tautan khusus kampus belum tersedia. Cek kanal resmi kampusmu.
            </p>
          </>
        )}
        {opportunity.extraLinks?.map((resource) => (
          <ExternalResource key={resource.label} resource={resource} />
        ))}
        {opportunity.type === 'Contoh Jalur' && (
          <p className="unavailable-note">
            Contoh jalur, bukan pendaftaran untuk semua kampus atau daerah.
          </p>
        )}
      </div>
    </article>
  );
}
