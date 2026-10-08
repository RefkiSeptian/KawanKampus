export interface ProgramPhoto {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string | null;
  kind: 'official' | 'provided' | 'illustration';
  display?: 'photo' | 'poster' | 'logo';
}
export const programPhotos: Record<string, ProgramPhoto> = {
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
  unggulan: {
    src: '/images/programs/unggulan.webp',
    alt: 'Poster pengumuman hasil seleksi administrasi Beasiswa Unggulan 2026.',
    credit: 'Kemendikdasmen · Beasiswa Unggulan 2026',
    sourceUrl:
      'https://beasiswaunggulan.kemendikdasmen.go.id/wp-content/uploads/2026/10/pengumuman-bu-2026.jpeg',
    kind: 'official',
    display: 'poster',
  },
  satubeasiswa: {
    src: '/images/programs/satubeasiswa.webp',
    alt: 'Pelajar belajar bersama dalam visual portal SatuBeasiswa.',
    credit: 'Kemdiktisaintek · SatuBeasiswa',
    sourceUrl: 'https://satubeasiswa.kemdiktisaintek.go.id/img/hero-kelas.webp',
    kind: 'official',
  },
  pemda: {
    src: '/images/programs/pemda.webp',
    alt: 'Contoh poster pengumuman penerima beasiswa strata satu Pemerintah Provinsi Jambi 2026.',
    credit: 'Pengumuman Pemprov Jambi · gambar dari pengguna',
    sourceUrl: 'https://i.ibb.co.com/238rLymm/PENGUMUMAN2026.jpg',
    kind: 'provided',
    display: 'poster',
  },
  exchange: {
    src: '/images/programs/exchange.webp',
    alt: 'Banner ASEAN University Network dengan bendera negara-negara ASEAN.',
    credit: 'ASEAN University Network',
    sourceUrl: 'https://www.aunsec.org/application/files/4216/7403/6316/AUN_Website_Banner.png',
    kind: 'official',
    display: 'poster',
  },
  volunteer: {
    src: '/images/programs/volunteer.webp',
    alt: 'Kolase kegiatan relawan AIESEC Global Volunteer bersama komunitas.',
    credit: 'AIESEC · Global Volunteer',
    sourceUrl: 'https://aiesec.org/global-volunteer',
    kind: 'official',
    display: 'poster',
  },
  nus: {
    src: '/images/programs/nus.webp',
    alt: 'Dokumentasi peserta NUS Enterprise Summer Programme in Entrepreneurship.',
    credit: 'National University of Singapore',
    sourceUrl:
      'https://www.nus.edu.sg/gro/global-programmes/summer-and-winter-programmes/summer-programmes-at-nus',
    kind: 'official',
  },
  hku: {
    src: '/images/programs/hku.webp',
    alt: 'Mahasiswa di depan bangunan The University of Hong Kong.',
    credit: 'HKU Summer Institute',
    sourceUrl:
      'https://summerinstitute.hku.hk/storage/resized/116/2878x1000/communication-banner2x-p-2000.jpg',
    kind: 'official',
    display: 'poster',
  },
  forage: {
    src: '/images/programs/forage.webp',
    alt: 'Logo Forage.',
    credit: 'Logo Forage · gambar dari pengguna',
    sourceUrl:
      'https://bookface-images.s3.amazonaws.com/small_logos/6ec4d2785125c906ed8554bdfaca38ba13097af0.png',
    kind: 'provided',
    display: 'logo',
  },
  glints: {
    src: '/images/programs/glints.webp',
    alt: 'Logo Glints dengan simbol bintang kuning.',
    credit: 'Kaliber · logo Glints',
    sourceUrl: 'https://kaliber.asia/assets/glints-icon.png',
    kind: 'provided',
    display: 'logo',
  },
  linkedin: {
    src: '/images/programs/linkedin.webp',
    alt: 'Logo LinkedIn pada latar biru.',
    credit: 'Waalaxy · logo LinkedIn',
    sourceUrl:
      'https://www.waalaxy.com/blog-static/_next/image?url=https%3A%2F%2Fxahuhfmsgeivalkimrbm.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fmedia%2Fdff8b840-aee3-4445-bde8-c006a4b98852%2F1782983140399-wp-3-1.webp&w=1080&q=80',
    kind: 'provided',
    display: 'logo',
  },
  jobstreet: {
    src: '/images/programs/jobstreet.webp',
    alt: 'Logo Jobstreet by SEEK.',
    credit: 'Cloud Computing Indonesia · logo Jobstreet',
    sourceUrl:
      'https://blob.cloudcomputing.id/images/b6e40122-58b5-485c-b2f1-4d53089cc838/logo-jobstreet-by-seek-l-min.jpg',
    kind: 'provided',
    display: 'logo',
  },
  prosple: {
    src: '/images/programs/prosple.webp',
    alt: 'Banner Prosple bertuliskan where incredible careers begin.',
    credit: 'Prosple',
    sourceUrl:
      'https://connect-assets.prosple.com/cdn/ff/g2G-IrL7maqfpN80enmao_WF5E0sbvJt_TrBzwZze2U/1636682693/public/styles/scale_and_crop_center_890x320/public/2021-11/banner-prosple-1786x642-2021.jpg?itok=19L1bwZw',
    kind: 'official',
    display: 'poster',
  },
};
