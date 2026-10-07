import type { CategoryId } from '@/types';
import { officialPhotos, type ProgramPhoto } from './photos';
import { homePhotos } from './home';

export const categoryPresentation: Record<CategoryId, { heading: string; photo: ProgramPhoto }> = {
  'organisasi-kepemimpinan': {
    heading: 'Belajar bareng. Bertumbuh bareng.',
    photo: officialPhotos.aspire,
  },
  'lomba-kompetisi': { heading: 'Idemu layak dicoba.', photo: officialPhotos.brandstorm },
  'beasiswa-bantuan-kuliah': {
    heading: 'Ada dukungan untuk langkahmu.',
    photo: illustration('beasiswa-bantuan-kuliah'),
  },
  'pengalaman-internasional': {
    heading: 'Buka pandangan. Temui dunia.',
    photo: illustration('pengalaman-internasional'),
  },
  'dunia-kerja': {
    heading: 'Penasaran kerja? Coba kenali dulu.',
    photo: illustration('dunia-kerja'),
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
  return officialPhotos[id] || illustration(category);
}
