import type { CategoryId } from '@/types';

export const homeDesign = {
  welcomeTitle: 'KawanKampus',
  welcomeDescription: 'Banyak jalan untuk bertumbuh.',
  welcomeStart: 'Mulai',
  eyebrow: 'Banyak jalan untuk bertumbuh',
  headline: ['Kuliahmu.', 'Banyak', 'kemungkinan.'],
  microcopy: 'Mulai dari rasa penasaranmu.',
  artNote: ['Setiap langkah,', 'cerita baru.'],
  labels: ['Teman baru', 'Ide baru', 'Pengalaman baru'],
  stamp: ['Mulai', 'mencoba'],
  quizEyebrow: 'Mulai dari rasa penasaran',
  quizPoster: ['Kamu', 'ingin', 'coba apa?'],
  quizMeta: 'Sekitar 1 menit · ikuti rasa penasaranmu',
  discoveryEyebrow: 'Temukan ruangmu',
  discoveryDescription: ['Kenali dulu kegiatannya.', 'Baru tentukan langkahmu.'],
  closingEyebrow: 'Satu langkah juga berarti',
} as const;

export const homePhotos: Record<CategoryId, { src: string; alt: string }> = {
  'organisasi-kepemimpinan': {
    src: '/images/home/organisasi.webp',
    alt: 'Tiga mahasiswa merencanakan kegiatan bersama dengan megafon, catatan, dan laptop.',
  },
  'lomba-kompetisi': {
    src: '/images/home/lomba.webp',
    alt: 'Dua mahasiswa menunjukkan proyek robot dan lembar ide untuk kompetisi.',
  },
  'beasiswa-bantuan-kuliah': {
    src: '/images/home/beasiswa.webp',
    alt: 'Dua mahasiswa membaca buku dan menyiapkan dokumen bersama di depan laptop.',
  },
  'pengalaman-internasional': {
    src: '/images/home/internasional.webp',
    alt: 'Tiga mahasiswa berbincang tentang pengalaman belajar dengan globe dan buku.',
  },
  'dunia-kerja': {
    src: '/images/home/karier.webp',
    alt: 'Dua mahasiswa mengenali tugas pekerjaan sambil belajar menggunakan laptop.',
  },
};
