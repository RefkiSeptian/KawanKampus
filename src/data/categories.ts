import type { Category } from '@/types';
export const categories: Category[] = [
  {
    id: 'organisasi-kepemimpinan',
    name: 'Organisasi & Kepemimpinan',
    shortName: 'Organisasi',
    eyebrow: 'Belajar bersama, tumbuh bersama',
    cardDescription: 'Temukan tempat belajar kerja tim dan memimpin kegiatan.',
    introduction:
      'Kamu bisa belajar memimpin lewat pengalaman mengelola kegiatan atau melalui program pelatihan yang terstruktur.',
    types: [
      {
        title: 'Organisasi',
        description:
          'Kelompok tempat kamu bekerja bersama secara berkelanjutan. Contohnya Badan Eksekutif Mahasiswa (BEM), himpunan jurusan, Unit Kegiatan Mahasiswa (UKM), dan komunitas. Kepanitiaan biasanya berfokus pada satu acara.',
      },
      {
        title: 'Program kepemimpinan',
        description:
          'Rangkaian kelas, pendampingan, dan proyek dalam periode tertentu. Biasanya ada seleksi dan komitmen mengikuti kegiatan sampai selesai.',
      },
    ],
    closing: 'Mulai dari kampus sendiri. Kenali satu kegiatan atau peran yang membuatmu penasaran.',
    resultDescription:
      'Kamu tertarik belajar bersama orang lain dan mengelola kegiatan. Mulai dengan mengenali organisasi di kampusmu; pilih satu kegiatan atau peran yang membuatmu penasaran.',
    resultCta: 'Kenali Organisasi & Kepemimpinan',
  },
  {
    id: 'lomba-kompetisi',
    name: 'Lomba & Kompetisi',
    shortName: 'Lomba',
    eyebrow: 'Beri ruang untuk ide-idemu',
    cardDescription: 'Kenali jenis lomba dan ide yang bisa kamu coba bersama teman.',
    introduction:
      'Ada lomba yang menguji analisis, tulisan, pengetahuan, kreativitas, sampai kemampuan menjalankan proyek. Kenali bentuk tugasnya sebelum memilih. Kamu tidak harus sudah berpengalaman untuk mulai belajar.',
    types: [
      {
        title: 'Business Case Competition (BCC)',
        description:
          'Tim memecahkan masalah perusahaan yang diberikan panitia: menganalisis penyebab, membandingkan pilihan, lalu menyusun strategi. Hasilnya biasanya presentasi dan tanya jawab. Melatih pemecahan masalah dan kerja tim; contohnya HSBC Business Case Competition.',
      },
      {
        title: 'Business Plan Competition (BPC)',
        description:
          'Peserta merancang usaha sendiri, mulai dari masalah pelanggan, produk, pasar, model pendapatan, pemasaran, sampai keuangan. Hasilnya bisa berupa proposal, presentasi, atau purwarupa. Berbeda dari BCC, kamu membangun usahanya. Contohnya EF Hult Prize dan Pertamuda, yang dapat berlanjut sampai pelaksanaan bisnis.',
      },
      {
        title: 'Equity Research Competition',
        description:
          'Peserta menganalisis perusahaan, industri, laporan keuangan, risiko, dan perkiraan nilai saham. Hasilnya laporan riset dan rekomendasi yang dipertahankan di depan juri. Fokusnya kualitas analisis, bukan keuntungan jual beli seperti lomba trading. Contohnya CFA Institute Research Challenge.',
      },
      {
        title: 'Esai dan karya tulis ilmiah',
        description:
          'Esai menyampaikan gagasan atau pendapat dengan alasan dan data. Karya tulis ilmiah menekankan rumusan masalah, metode, serta kajian atau penelitian. Hasilnya tulisan dan kadang presentasi. Cocok jika kamu senang membaca, menyelidiki isu, dan menjelaskan ide secara runtut.',
      },
      {
        title: 'Olimpiade sains dan ONMIPA',
        description:
          'Menguji penguasaan konsep dan penyelesaian soal mendalam. ONMIPA-PT adalah Olimpiade Nasional Matematika dan Ilmu Pengetahuan Alam Perguruan Tinggi, dengan bidang matematika, fisika, kimia, dan biologi. Seleksi bertahap melalui kampus, wilayah, lalu nasional. Mulai dengan memilih bidang dan mengikuti pembinaan di kampus.',
      },
      {
        title: 'Proyek kreativitas mahasiswa dan PKM',
        description:
          'Program Kreativitas Mahasiswa (PKM) mengembangkan gagasan dan proyek, bukan satu jenis lomba tulisan. Bidangnya mencakup riset, kewirausahaan, pengabdian, serta teknologi dan karya inovatif sesuai skema. Tim bersama dosen pendamping menyiapkan proposal dan menjalankan kegiatan. Tim terpilih melalui penilaian PKM dapat maju ke PIMNAS, bukan mendaftar langsung ke PIMNAS.',
      },
      {
        title: 'Teknologi serta bidang lainnya',
        description:
          'Kompetisi teknologi dapat berupa pemrograman, analisis data, desain pengalaman pengguna, atau pengembangan produk; contohnya GEMASTIK. Debat menguji argumentasi. Seni, desain, olahraga, dan kompetisi bidang studi lain memberi ruang sesuai minatmu.',
      },
    ],
    resources: [
      {
        label: 'Panduan resmi ONMIPA',
        url: 'https://kompetisicerdas.kemdiktisaintek.go.id/wp-content/uploads/2026/03/Panduan-ONMIPA-2026-FINAL.pdf',
      },
      {
        label: 'Panduan resmi PKM',
        url: 'https://simbelmawa.kemdiktisaintek.go.id/portal/wp-content/uploads/2026/03/PANDUAN-PKM-2026_versi_full.pdf',
      },
      { label: 'EF Hult Prize', url: 'https://www.hultprize.org/how-it-works' },
    ],
    closing:
      'Pilih satu jenis lomba, baca panduannya, dan cari komunitas atau dosen yang dapat membantu kamu belajar. Nama besar ajang adalah tujuan eksplorasi, bukan alasan harus langsung ikut.',
    resultDescription:
      'Kamu tertarik menguji ide atau menyelesaikan tantangan. Mulai dari satu jenis lomba, baca panduannya, lalu cari teman belajar jika kegiatan dilakukan berkelompok.',
    resultCta: 'Kenali Lomba & Kompetisi',
  },
  {
    id: 'beasiswa-bantuan-kuliah',
    name: 'Beasiswa & Bantuan Kuliah',
    shortName: 'Beasiswa',
    eyebrow: 'Dukungan untuk perjalananmu',
    cardDescription: 'Cari dukungan biaya yang sesuai dengan kondisi dan tahap kuliahmu.',
    introduction:
      'Dukungan biaya kuliah memiliki bentuk dan syarat yang berbeda. Ada yang menilai prestasi, kondisi ekonomi, domisili, atau kebutuhan khusus. Tidak semuanya membayar seluruh biaya kuliah. Fokus halaman ini adalah bantuan selama D3, D4, dan S1.',
    types: [
      { title: 'Beasiswa prestasi', description: 'Menilai pencapaian akademik atau nonakademik.' },
      { title: 'Bantuan berdasarkan kebutuhan', description: 'Mempertimbangkan kondisi ekonomi.' },
      {
        title: 'Beasiswa pembinaan',
        description: 'Menggabungkan bantuan dana dengan kegiatan pengembangan diri.',
      },
      {
        title: 'Kanal pencarian',
        description:
          'Membantu menemukan program. Kanal tersebut bukan penyelenggara semua beasiswa yang ditampilkan.',
      },
    ],
    closing:
      'Sesuaikan dukungan biaya dengan kondisi dan tahap kuliahmu. Cek penyelenggara, jenjang, serta ketentuan kampus sebelum mendaftar.',
  },
  {
    id: 'pengalaman-internasional',
    name: 'Pertukaran & Pengalaman Internasional',
    shortName: 'Internasional',
    eyebrow: 'Belajar melampaui batas',
    cardDescription: 'Kenali cara belajar dan bertemu orang dari berbagai negara.',
    introduction:
      'Pengalaman internasional tidak selalu berarti kuliah satu semester di luar negeri. Ada kegiatan singkat, kursus, dan proyek relawan. Pahami bentuk kegiatan dan biayanya sebelum memilih.',
    types: [
      {
        title: 'Pertukaran semester',
        description:
          'Mengikuti kuliah di kampus lain, dengan persetujuan kampus asal dan pengaturan pengakuan mata kuliah. Sering membutuhkan kemitraan antarkampus.',
      },
      {
        title: 'Program musim panas atau musim dingin',
        description: 'Kegiatan belajar singkat selama beberapa minggu.',
      },
      { title: 'Relawan internasional', description: 'Membantu proyek sosial lintas negara.' },
      {
        title: 'Program kepemimpinan internasional',
        description: 'Pelatihan dan diskusi bersama peserta berbagai negara.',
      },
    ],
    closing:
      'Bandingkan bentuk kegiatan, kebutuhan bahasa, dan biaya yang benar-benar ditanggung sebelum memilih program.',
    resultDescription:
      'Kamu tertarik belajar di lingkungan dan budaya berbeda. Mulai dengan membandingkan pertukaran semester, program singkat, dan relawan, termasuk kebutuhan biaya serta bahasanya.',
    resultCta: 'Kenali Pengalaman Internasional',
  },
  {
    id: 'dunia-kerja',
    name: 'Magang & Kenali Dunia Kerja',
    shortName: 'Dunia kerja',
    eyebrow: 'Langkah kecil menuju pengalaman',
    cardDescription: 'Pahami pekerjaan dan mulai bangun pengalaman sedikit demi sedikit.',
    introduction:
      'Belum harus magang di tahun pertama. Kamu bisa mulai dengan mengenali pekerjaan, mencoba tugas sederhana, dan melihat keterampilan yang dicari perusahaan.',
    types: [
      {
        title: 'Magang',
        description:
          'Pengalaman bekerja dalam peran nyata, dengan tugas dan jam kerja dari organisasi. Bisa penuh waktu atau paruh waktu, langsung di kantor atau jarak jauh. Syarat semester berbeda menurut lowongan.',
      },
      {
        title: 'Simulasi pekerjaan',
        description:
          'Latihan mengerjakan contoh tugas profesi secara mandiri. Ini kegiatan belajar, bukan hubungan kerja atau pengalaman magang.',
      },
      {
        title: 'Platform lowongan',
        description: 'Tempat mencari posisi, bukan pihak yang menerima semua pelamar.',
      },
    ],
    closing:
      'Kamu belum harus magang di tahun pertama. Coba simulasi pekerjaan atau pelajari contoh lowongan untuk mengenali keterampilan yang dibutuhkan.',
    resultDescription:
      'Kamu ingin memahami pekerjaan melalui pengalaman langsung. Coba simulasi pekerjaan terlebih dahulu atau pelajari tiga lowongan untuk mengenali keterampilan yang dibutuhkan.',
    resultCta: 'Kenali Dunia Kerja',
  },
];
export const getCategory = (id: string) => categories.find((category) => category.id === id);
