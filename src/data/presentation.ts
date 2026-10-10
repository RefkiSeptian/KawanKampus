import type { CategoryId } from '@/types';
import { programPhotos, type ProgramPhoto } from './photos';
import { homePhotos } from './home';

export const categoryPresentation: Record<
  CategoryId,
  { heading: string; photo: ProgramPhoto; cardPhoto?: ProgramPhoto }
> = {
  'organisasi-kepemimpinan': {
    heading: 'Belajar bareng. Bertumbuh bareng.',
    photo: programPhotos.aspire,
  },
  'lomba-kompetisi': { heading: 'Idemu layak dicoba.', photo: programPhotos.brandstorm },
  'beasiswa-bantuan-kuliah': {
    heading: 'Ada dukungan untuk langkahmu.',
    photo: programPhotos.satubeasiswa,
  },
  'pengalaman-internasional': {
    heading: 'Buka pandangan. Temui dunia.',
    photo: programPhotos.nus,
  },
  'dunia-kerja': {
    heading: 'Penasaran kerja? Coba kenali dulu.',
    photo: illustration('dunia-kerja'),
    cardPhoto: programPhotos.linkedin,
  },
};
export function illustration(id: CategoryId): ProgramPhoto {
  return {
    ...homePhotos[id],
    credit: 'Ilustrasi Kawan Kampus',
    sourceUrl: null,
    kind: 'illustration',
  };
}
export function opportunityPhoto(id: string, category: CategoryId): ProgramPhoto {
  return programPhotos[id] || illustration(category);
}
