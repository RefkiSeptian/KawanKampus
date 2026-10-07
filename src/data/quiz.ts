import type { CategoryId, QuizQuestion, ScoredCode } from '@/types';
export const codeToCategory: Record<ScoredCode, CategoryId> = {
  O: 'organisasi-kepemimpinan',
  L: 'lomba-kompetisi',
  I: 'pengalaman-internasional',
  K: 'dunia-kerja',
};
export const quizCopy = {
  title: 'Kamu ingin mencoba apa selama kuliah?',
  introduction:
    'Pilih jawaban yang paling mendekati rasa penasaranmu saat ini. Hasilnya adalah ide untuk mulai menjelajah, bukan penilaian bakat atau kewajiban memilih satu jalur.',
  validation: 'Pilih satu jawaban, atau pilih “Belum tahu”.',
  tiePrompt: 'Dari pilihan berikut, mana yang ingin kamu kenali lebih dulu?',
  resultIntro:
    'Dari jawabanmu, pilihan berikut bisa jadi titik awal eksplorasimu. Minat bisa berubah setelah kamu mencoba kegiatan baru.',
  unknownTitle: 'Masih ingin mencoba berbagai hal',
  scholarshipTitle: 'Butuh dukungan biaya selama kuliah?',
  scholarshipDescription:
    'Jelajahi beasiswa dan bantuan kuliah yang sesuai dengan kondisimu. Minat apa pun tetap bisa membutuhkan dukungan biaya.',
} as const;
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'waktu-luang',
    question: 'Kalau punya waktu luang untuk satu kegiatan kamu ingin',
    options: [
      { code: 'O', label: 'Membantu tim menyiapkan kegiatan bersama.' },
      { code: 'L', label: 'Mencari solusi atau ide untuk sebuah tantangan.' },
      { code: 'I', label: 'Berkenalan dan belajar dengan orang dari budaya berbeda.' },
      { code: 'K', label: 'Mencoba tugas dari pekerjaan yang membuatku penasaran.' },
      { code: '0', label: 'Belum tahu.' },
    ],
  },
  {
    id: 'pengalaman',
    question: 'Pengalaman apa yang paling ingin kamu bawa pulang dari kuliah',
    options: [
      { code: 'O', label: 'Pernah mengelola kegiatan bersama teman.' },
      { code: 'L', label: 'Punya karya atau ide yang pernah diuji.' },
      { code: 'I', label: 'Pernah belajar di lingkungan lintas budaya.' },
      { code: 'K', label: 'Punya gambaran pekerjaan yang ingin dicoba.' },
      { code: '0', label: 'Belum tahu.' },
    ],
  },
  {
    id: 'topik',
    question: 'Topik acara mana yang paling membuatmu ingin datang',
    options: [
      { code: 'O', label: 'Cara membangun tim dan menjalankan proyek.' },
      { code: 'L', label: 'Cara menyusun ide lomba dan mempresentasikannya.' },
      { code: 'I', label: 'Cerita pengalaman belajar atau berkegiatan di luar negeri.' },
      { code: 'K', label: 'Pengenalan profesi dan tugas sehari-harinya.' },
      { code: '0', label: 'Belum tahu.' },
    ],
  },
  {
    id: 'langkah',
    question: 'Langkah kecil mana yang ingin kamu coba minggu ini',
    options: [
      { code: 'O', label: 'Datang ke pengenalan organisasi atau komunitas.' },
      { code: 'L', label: 'Membaca satu panduan lomba bersama teman.' },
      { code: 'I', label: 'Mencari tahu satu program internasional dan kebutuhannya.' },
      { code: 'K', label: 'Mencoba simulasi pekerjaan atau membaca contoh lowongan magang.' },
      { code: '0', label: 'Belum tahu.' },
    ],
  },
];
