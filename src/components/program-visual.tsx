import Image from 'next/image';
import { ArrowUpRight, Asterisk } from 'lucide-react';
import type { ProgramPhoto } from '@/data/photos';
export function ProgramVisual({ photo, hero = false }: { photo: ProgramPhoto; hero?: boolean }) {
  return (
    <figure className={`program-visual ${hero ? 'program-visual-hero' : ''} ${photo.kind}`}>
      <div className="program-photo">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={1000}
          height={700}
          loading={hero ? 'eager' : 'lazy'}
          sizes={hero ? '(max-width: 800px) 90vw, 45vw' : '(max-width: 600px) 90vw, 44vw'}
        />
        {hero && <Asterisk className="visual-spark" aria-hidden="true" />}
      </div>
      <figcaption>
        {photo.sourceUrl ? (
          <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">
            Sumber visual: {photo.credit}
            <ArrowUpRight size={12} aria-hidden="true" />
            <span className="sr-only"> (tab baru)</span>
          </a>
        ) : (
          <span>{photo.credit}</span>
        )}
      </figcaption>
    </figure>
  );
}
