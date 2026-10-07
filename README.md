# Kawan Kampus

Panduan eksplorasi peluang selama kuliah, tanpa akun. Dibangun dengan Next.js App Router, TypeScript, Tailwind CSS, Lucide, dan Vercel Analytics. Proyek ini belum dideploy.

## Menjalankan lokal

Gunakan Node.js 24 LTS dan npm. Versi ini memenuhi requirement framework dan seluruh alat uji/performa. Jalankan dari `C:\UI\Project\KawanKampus`:

```sh
npm install
npm run dev
```

Buka http://localhost:3000. Untuk pemasangan yang identik dengan lockfile, gunakan `npm ci`.

## Pemeriksaan

```sh
npm run lint
npm run test
npx playwright install chromium
npm run build
npm run test:e2e
```

`lint` membuat tipe route Next.js terlebih dahulu, lalu menjalankan ESLint dan TypeScript, termasuk pada checkout baru. File `next-env.d.ts` dibuat otomatis dan tidak disimpan di Git. Vitest + React Testing Library menguji skor, seluruh 625 kombinasi empat jawaban, tie-break, hasil tanpa pilihan, dan pemulihan sesi. Playwright menguji build produksi pada desktop 1440 px dan mobile 390 px, semua route, semua 25 kartu, alur kuis, keyboard, menu, tema, SEO, console, dan axe WCAG A/AA.

Playwright membuat build produksi terpisah di `.next-e2e/` dan menjalankan server test pada port 3100. Server development port 3000 tetap dapat digunakan; hasil test tidak bergantung pada server preview. Pastikan port 3100 kosong sebelum tes. Pada Windows lokal, konfigurasi otomatis memakai Chrome terpasang jika tersedia. Jika tidak, pasang Chromium dengan perintah di atas. Gunakan `PLAYWRIGHT_CHANNEL=chrome` atau `msedge` untuk memilih browser terpasang secara eksplisit. Pada CI, gunakan `npm ci`, instal Chromium, lalu test E2E. Laporan ada di `playwright-report/`; trace dan screenshot kegagalan ada di `test-results/`.

Pemeriksaan visual tambahan, dengan server produksi aktif:

```sh
node scripts/visual-qa.mjs
```

Screenshot dan pemeriksaan overflow untuk 1440, 1024, 768, 390, dan 360 px disimpan di `work/visual-qa/`.

Dengan server produksi aktif, `npm run test:performance` menjalankan Lighthouse pada home desktop/mobile. Set `LIGHTHOUSE_URL` bila memakai server produksi pada port terpisah (contohnya `http://127.0.0.1:3100/`), agar tidak mengukur server development. Hasil JSON/HTML ada di `work/lighthouse/`; command gagal jika salah satu skor kurang dari 90. Chrome terpasang diperlukan; gunakan `CHROME_PATH` bila lokasinya berbeda.

## Build produksi

```sh
npm run build
npm run start
```

Halaman statis/prerendered dipakai untuk konten, dengan komponen client hanya untuk navigasi, tema, dan kuis. Font Montserrat dan Inter dihosting lokal melalui `next/font/local`; lisensinya disertakan di `src/assets/fonts/`. Ilustrasi SVG orisinal ada di `public/illustrations/`. Beranda mengikuti komposisi HTML preview yang diberikan pemilik: hero dengan foto, pita kategori, pengantar kuis, dan lima kategori bergantian kiri/kanan. Enam foto transparan di `public/images/home/` disesuaikan dengan palet Navy/Gold/Amber menggunakan imagegen, lalu dioptimalkan ke WebP. Asal aset dan prompt dicatat di `docs/HOME-IMAGE-ASSETS.md`.

## Struktur konten

- `src/data/categories.ts`: kategori, edukasi jenis kegiatan, bacaan resmi, dan naskah hasil.
- `src/data/opportunities.ts`: seluruh 25 pilihan, jadwal acuan, catatan, URL resmi, dan asal halaman PDF.
- `src/data/quiz.ts`: empat pertanyaan, 20 jawaban, pemetaan skor, dan naskah kuis.
- `src/data/site.ts`: naskah umum, footer, Tentang, dan disclaimer.
- `src/data/home.ts`: naskah pendukung beranda dan pemetaan foto kategori.
- `src/data/photos.ts` dan `src/data/presentation.ts`: visual program, judul pengantar, kredit, dan tautan sumber; provenance unduhan ada di `docs/PHOTO-SOURCES.json`.
- `src/data/social.ts`: placeholder URL Instagram dan X. Ganti nilai `null` dengan URL akun resmi; ikon footer otomatis menjadi tautan. Nilai kosong ditampilkan sebagai ikon nonaktif, tanpa alamat yang ditebak.
- `src/lib/quiz.ts`: fungsi skor, deteksi seri pada batas dua hasil, validasi sesi, dan resolusi hasil.
- `src/lib/quiz-session.ts`: state sesi browser; kode jawaban tidak ditampilkan di antarmuka.
- `docs/CONTENT-AUDIT.md` dan `docs/content-audit.json`: audit sumber.

Untuk mengulang audit mekanis menggunakan teks lengkap yang diekstrak dari PDF konten:

```sh
node scripts/audit-content.mjs path/to/content-source.txt
```

Pemeriksaan tersebut membandingkan nama, deskripsi, periode, persyaratan, serta semua pertanyaan/jawaban terhadap sumber, dengan normalisasi spasi dan tanda baca. Pemeriksaan makna, struktur PRD, visual, dan URL dilakukan terpisah dan didokumentasikan dalam audit.

## Aturan produk dan privasi

Sumber prioritas: PRD → panduan isi → identitas visual → referensi desain yang sudah dikumpulkan → default komponen. Tidak ada scraping desain tambahan. Tidak ada akun, database, CMS, pencarian, filter, bookmark, detail peluang, modal peluang, hasil yang dibagikan, status deadline otomatis, AI rekomendasi, atau GA4.

Kuis memakai `sessionStorage` (`kawan-kampus-quiz-v1`). Progres, jawaban, tahap tie-break, dan hasil bertahan selama sesi browser, termasuk refresh dan navigasi. Jika browser menolak storage, kuis tetap bekerja dalam memori tetapi refresh tidak dapat mempertahankan sesi. Pilihan tema manual tersimpan di `localStorage` (`kawan-kampus-theme`); kunjungan awal memakai tema terang, terlepas dari preferensi perangkat. Toggle terang/gelap beranimasi berada di footer. Menu navbar rata kanan. Mode System tidak tersedia; nilai lama system dimigrasikan ke light. Jawaban dan profil tidak dikirim ke server.

Vercel Analytics dimuat hanya pada build Vercel (`VERCEL=1`), agar endpoint Insights yang khusus hosting tersebut tidak menimbulkan 404 di server lokal. Aktifkan Web Analytics pada dashboard Vercel saat deployment. Tidak ada event custom yang mengirim jawaban kuis.

URL resmi berasal dari anotasi hyperlink pada PDF. Dua kanal kampus yang tidak memiliki URL menggunakan `null`, dengan CTA disabled dan penjelasan. Kontak dan sosial tetap placeholder. Tautan Jambi dan AUN-ACTS secara eksplisit diberi label contoh jalur, bukan pendaftaran universal. Jadwal tetap merupakan acuan sumber, tanpa status otomatis.

## Deployment ke Vercel (dilakukan oleh pemilik proyek)

1. Simpan proyek dalam repository Git milik Anda dan hubungkan ke Vercel.
2. Pilih preset Next.js, install command `npm ci`, build command `npm run build`, dan output default Next.js.
3. Tetapkan `NEXT_PUBLIC_SITE_URL` ke origin domain produksi sebenarnya, misalnya nilai domain yang Anda miliki. Tidak ada domain resmi yang ditebak. Jika variabel tidak diisi, deployment memakai `VERCEL_PROJECT_PRODUCTION_URL`; lokal memakai `http://localhost:3000`.
4. Aktifkan Vercel Web Analytics, lalu lakukan deployment dari dashboard atau CLI Anda.
5. Periksa canonical, sitemap, Open Graph, tema, menu, kuis, dan tautan resmi pada domain final. Perubahan environment metadata memerlukan build baru.

Tidak ada secret, database, atau backend tambahan yang dibutuhkan. `.env.example` mendokumentasikan konfigurasi domain. Rute `/kuis/hasil` tidak diindeks dan tidak dimasukkan ke sitemap karena hasil bersifat sesi.

Animasi beranda mengikuti preview pemilik: layar sambutan dengan tombol Mulai, gerakan hero/label/orbit, panah CTA yang tergambar, pita kategori berulang, dan reveal saat scroll. Pembuka tampil sekali per sesi tab (kawan-kampus-welcome-v1), dapat ditutup dengan Mulai atau Escape, lalu fokus berpindah ke heading beranda. Pita kategori berulang tanpa batas dan terus berjalan saat hover, tanpa tombol jeda. Foto hero ikut mengambang dan merespons gerakan kursor pada desktop; reveal kategori memakai transisi gambar dan teks yang lebih jelas. Reduced motion melewati pembuka dan menghapus animasi; perpindahan preferensi serta tab yang disembunyikan ditangani. Semua konten tetap terlihat jika JavaScript tidak berjalan.
