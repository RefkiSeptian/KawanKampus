export interface ProgramPhoto {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string | null;
  kind: 'official' | 'illustration';
}
export const officialPhotos: Record<string, ProgramPhoto> = {
  aiesec: {
    src: '/images/programs/aiesec.webp',
    alt: 'Visual komunitas pemuda dari situs resmi AIESEC.',
    credit: 'AIESEC',
    sourceUrl: 'https://aiesec.org/',
    kind: 'official',
  },
  aspire: {
    src: '/images/programs/aspire.webp',
    alt: 'Dokumentasi komunitas Aspire Leaders Program.',
    credit: 'Aspire Institute',
    sourceUrl: 'https://www.aspireleaders.org/program/aspire-leaders-program/',
    kind: 'official',
  },
  yli: {
    src: '/images/programs/yli.webp',
    alt: 'Dokumentasi forum pemimpin pada situs YLI.',
    credit: 'Young Leaders for Indonesia',
    sourceUrl: 'https://yli.or.id/',
    kind: 'official',
  },
  pimnas: {
    src: '/images/programs/pimnas.webp',
    alt: 'Dokumentasi delegasi PIMNAS 38 dari situs UGM.',
    credit: 'Universitas Gadjah Mada · PIMNAS 38',
    sourceUrl:
      'https://ugm.ac.id/id/berita/rektor-lepas-kontingen-ugm-menuju-pimnas-ke-38-di-universitas-hasanuddin/',
    kind: 'official',
  },
  brandstorm: {
    src: '/images/programs/brandstorm.webp',
    alt: 'Dokumentasi peserta Brandstorm dari situs L’Oréal.',
    credit: 'L’Oréal Brandstorm',
    sourceUrl: 'https://www.loreal.com/en/brandstorm/',
    kind: 'official',
  },
  gemastik: {
    src: '/images/programs/gemastik.webp',
    alt: 'Dokumentasi kontingen ITS pada GEMASTIK 2025.',
    credit: 'Direktorat Kemahasiswaan ITS · GEMASTIK 2025',
    sourceUrl: 'https://www.its.ac.id/kemahasiswaan/its-juara-umum-ii-gemastik-18/',
    kind: 'official',
  },
  hsbc: {
    src: '/images/programs/hsbc.webp',
    alt: 'Dokumentasi HSBC Business Case Competition dari situs HSBC Indonesia.',
    credit: 'HSBC Indonesia · Business Case Competition 2025',
    sourceUrl: 'https://www.about.hsbc.co.id/sustainability/philantopedia-ep2',
    kind: 'official',
  },
  cfa: {
    src: '/images/programs/cfa.webp',
    alt: 'Dokumentasi tim FEB UI pada CFA Institute Research Challenge.',
    credit: 'Fakultas Ekonomi dan Bisnis UI · CFA Research Challenge',
    sourceUrl:
      'https://feb.ui.ac.id/2026/02/27/mahasiswa-feb-ui-raih-juara-nasional-dalam-ajang-cfa-institute-research-challenge/',
    kind: 'official',
  },
  bca: {
    src: '/images/programs/bca.webp',
    alt: 'Visual Beasiswa Bakti BCA dari situs resmi BCA.',
    credit: 'BCA · Beasiswa Bakti BCA',
    sourceUrl:
      'https://www.bca.co.id/id/tentang-bca/CSR/Bakti-BCA/bakti-pendidikan/beasiswa-bakti-bca',
    kind: 'official',
  },
};
