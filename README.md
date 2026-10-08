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

Halaman statis/prerendered dipakai untuk konten, dengan komponen client untuk navigasi, tema, kuis, animasi, dan asisten. Font Montserrat dan Inter dihosting lokal melalui `next/font/local`; lisensinya disertakan di `src/assets/fonts/`. Ilustrasi SVG orisinal ada di `public/illustrations/`. Beranda mengikuti komposisi HTML preview yang diberikan pemilik: hero dengan foto, pita kategori, pengantar kuis, dan lima kategori bergantian kiri/kanan. Enam foto transparan di `public/images/home/` disesuaikan dengan palet Navy/Gold/Amber menggunakan imagegen, lalu dioptimalkan ke WebP. Asal aset dan prompt dicatat di `docs/HOME-IMAGE-ASSETS.md`.

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

Sumber prioritas: PRD → panduan isi → identitas visual → referensi desain yang sudah dikumpulkan → default komponen. Tidak ada scraping desain tambahan. Tidak ada akun, database profil, CMS, pencarian, filter, bookmark, detail peluang, modal peluang, hasil yang dibagikan, status deadline otomatis, atau GA4. Asisten AI ditambahkan atas permintaan eksplisit pemilik pada 8 Oktober 2026; katalog dan scoring kuis tidak berubah.

Kuis memakai `sessionStorage` (`kawan-kampus-quiz-v1`). Progres, jawaban, tahap tie-break, dan hasil bertahan selama sesi browser, termasuk refresh dan navigasi. Jika browser menolak storage, kuis tetap bekerja dalam memori tetapi refresh tidak dapat mempertahankan sesi. Pilihan tema manual tersimpan di `localStorage` (`kawan-kampus-theme`); kunjungan awal memakai tema terang, terlepas dari preferensi perangkat. Toggle terang/gelap beranimasi berada di footer. Menu navbar rata kanan. Mode System tidak tersedia; nilai lama system dimigrasikan ke light. Jawaban dan profil tidak dikirim ke server.

Vercel Analytics dimuat hanya pada build Vercel (`VERCEL=1`), agar endpoint Insights yang khusus hosting tersebut tidak menimbulkan 404 di server lokal. Aktifkan Web Analytics pada dashboard Vercel saat deployment. Tidak ada event custom yang mengirim jawaban kuis.

URL resmi berasal dari anotasi hyperlink pada PDF. Dua kanal kampus yang tidak memiliki URL menggunakan `null`, dengan CTA disabled dan penjelasan. Kontak dan sosial tetap placeholder. Tautan Jambi dan AUN-ACTS secara eksplisit diberi label contoh jalur, bukan pendaftaran universal. Jadwal tetap merupakan acuan sumber, tanpa status otomatis.

## Deployment ke Vercel (dilakukan oleh pemilik proyek)

1. Simpan proyek dalam repository Git milik Anda dan hubungkan ke Vercel.
2. Pilih preset Next.js, install command `npm ci`, build command `npm run build`, dan output default Next.js.
3. Tetapkan `NEXT_PUBLIC_SITE_URL` ke origin domain produksi sebenarnya, misalnya nilai domain yang Anda miliki. Tidak ada domain resmi yang ditebak. Jika variabel tidak diisi, deployment memakai `VERCEL_PROJECT_PRODUCTION_URL`; lokal memakai `http://localhost:3000`.
4. Aktifkan Vercel Web Analytics, lalu lakukan deployment dari dashboard atau CLI Anda.
5. Periksa canonical, sitemap, Open Graph, tema, menu, kuis, dan tautan resmi pada domain final. Perubahan environment metadata memerlukan build baru.

Halaman, katalog, dan kuis dapat berjalan tanpa secret. Asisten hanya membutuhkan `GROQ_API_KEY`, termasuk pada Vercel. `.env.example` mendokumentasikan konfigurasi server dan domain. Rute `/kuis/hasil` tidak diindeks dan tidak dimasukkan ke sitemap karena hasil bersifat sesi.

## Asisten kawankampus dan Groq

Panel mengambang di kanan bawah tersedia pada semua halaman, dengan warna Navy/Gold/Linen dan dukungan Dark. Percakapan disimpan hanya dalam `sessionStorage` (`kawan-kampus-chat-v1`), maksimal 24 pesan tampilan. Server menerima paling banyak 12 pesan terbaru, 2.000 karakter per pesan dan 32 KB body. Enter mengirim, Shift+Enter membuat baris, Escape menutup panel dan mengembalikan fokus, Batalkan menghentikan permintaan, Mulai lagi membersihkan percakapan. Tanpa API yang aktif, panel menyediakan jalur katalog dan kuis, tanpa berpura-pura menghasilkan jawaban AI.

Panel dapat dipindahkan dengan menyeret bagian header, memakai mouse atau sentuhan. Kontrol header menyediakan Minimalkan, Pulihkan, Perbesar, dan Kembalikan ukuran. Draft serta percakapan bertahan saat diminimalkan. Tombol Posisi awal mengembalikan panel ke kanan bawah. Posisi tersimpan selama sesi tab pada `kawan-kampus-chat-position-v1`, lalu disesuaikan jika viewport berubah. Fokus pada kontrol Pindahkan panel asisten: tombol panah menggeser 16 px, Shift+panah 40 px, Home mengembalikan posisi, Escape membatalkan drag aktif atau menutup panel. Mode besar memakai ruang baca lebih luas dan tidak dapat digeser sampai ukuran normal dipulihkan. VisualViewport/ResizeObserver menjaga panel di layar; reduced motion meniadakan animasi perpindahan.

Aktivasi lokal:

1. Salin `.env.example` menjadi `.env.local` di root proyek.
2. Isi `GROQ_API_KEY` dengan key milik Anda. Jangan gunakan awalan `NEXT_PUBLIC_` untuk key.
3. Sesuaikan `GROQ_MODELS` dengan model yang diaktifkan pada akun Groq, urut model utama lalu cadangan, maksimal dua model. Default: `openai/gpt-oss-20b,openai/gpt-oss-120b`. Tanpa variabel ini, default tersebut dipakai otomatis.
4. Restart server development. Buka panel dan kirim pertanyaan tentang katalog.

Koneksi menggunakan Chat Completions Groq melalui `/api/chat`, sepenuhnya di server. Model cadangan dicoba ketika model utama mencapai kuota, tidak tersedia, respons tidak valid, atau gagal jaringan. Setiap percobaan memiliki timeout 9 detik, dengan deadline total 20 detik. Tidak ada API key atau respons mentah provider yang dikirim ke browser. Instruksi sistem dan katalog ditambahkan oleh server; client tidak dapat mengirim role system. Periksa model yang tersedia pada [dokumentasi Groq](https://console.groq.com/docs/models); koneksi mengikuti [Chat Completions](https://console.groq.com/docs/text-chat).

Konteks mengambil hingga dua kategori yang sesuai pertanyaan terbaru atau topik sebelumnya, beserta fakta program dari data asli. Pertanyaan awal umum mendapat ringkasan lima kategori dan jalur kuis. URL sumber tetap dipetakan oleh server, sementara model menerima ID dan label. Riwayat yang diteruskan ke provider dibatasi enam pesan terbaru/6.000 karakter agar tidak mengirim seluruh katalog dan riwayat panjang pada setiap panggilan. GPT-OSS memakai reasoning effort low, include_reasoning false, dan max_completion_tokens 2048 agar anggaran token juga cukup untuk jawaban JSON. Model lain memakai JSON mode dengan anggaran 700 token.

Untuk diagnosis, response gagal memuat kode aman: GROQ_AUTH (key tidak valid), GROQ_MODEL (model/izin model), GROQ_RATE_LIMIT (kuota), GROQ_REQUEST (parameter permintaan), GROQ_RESPONSE (jawaban tidak valid), GROQ_TIMEOUT, atau GROQ_UNAVAILABLE. Log server hanya memuat tag `[kawan-chat]`, kategori error, model, dan status HTTP. Tidak ada key, prompt, percakapan, atau respons error mentah. Kegagalan model status 400/403 juga mencoba model cadangan; key yang gagal autentikasi 401 tidak dicoba ulang. Kuota provider menghasilkan 429 dan Retry-After jika tersedia.

Untuk Vercel, isi `GROQ_API_KEY` pada environment Production lalu lakukan redeploy. Model utama/cadangan sudah memiliki default; `GROQ_MODELS` hanya perlu diubah bila akun memakai model lain. Upstash/Redis dan secret pembatas tidak diperlukan. Variabel Upstash dari versi lama tidak lagi dibaca oleh aplikasi.

Pembatas dasar memakai memori: 10 permintaan dalam jendela 60 detik per IP per instance, dengan `Retry-After` pada respons 429. Vercel memakai header platform `x-vercel-forwarded-for`; IP di-hash sebelum menjadi key memori. Maksimal 10.000 bucket aktif menjaga ukuran memori terbatas. Pengunjung dalam jaringan yang sama dapat berbagi batas. Counter kedaluwarsa setelah satu menit dan dihapus saat request berikutnya; restart atau pergantian instance menghilangkan counter. Batas ini bersifat best-effort, bukan batas global yang konsisten. Kuota Groq tetap berlaku pada organisasi/akun dan dapat habis akibat pemakaian seluruh pengunjung; model cadangan tidak menjanjikan kuota tanpa batas. Lihat [batas Groq](https://console.groq.com/docs/rate-limits) dan [header Vercel](https://vercel.com/docs/headers/request-headers).

Self-hosted tanpa proxy tepercaya menggunakan satu bucket bersama. `CHAT_TRUSTED_IP_HEADER` hanya boleh diisi bila proxy Anda menimpa header tersebut dan server tidak dapat diakses melewati proxy. Tidak ada database eksternal atau penyimpanan percakapan di server.

Perilaku asisten berada di `src/lib/chat-context.ts`: Bahasa Indonesia hangat, jawaban ringkas, pertanyaan lanjutan tanpa data pribadi, fakta program hanya dari `src/data/categories.ts` dan `src/data/opportunities.ts`, tanggal sebagai acuan, dan sumber resmi sebagai rujukan akhir. Asisten tidak mengganti kuis atau menentukan kelayakan pendaftaran. Sumber jawaban berupa ID katalog yang divalidasi server; hanya URL dari katalog dapat menjadi tautan. Teks model ditampilkan sebagai teks biasa, tanpa HTML atau tautan buatan model. Aturan prompt mengurangi risiko jawaban keliru, tetapi bukan jaminan akurasi; sumber penyelenggara tetap acuan akhir.

Pengguna diberi informasi bahwa pesan diproses layanan AI dan diminta tidak mengirim data pribadi. Server aplikasi tidak mencatat isi chat maupun secret; retensi pada layanan Groq mengikuti pengaturan dan ketentuan akun Anda. Kuota provider tetap berlaku; fitur tidak dijanjikan tanpa batas. Tes integrasi memakai respons Groq yang dimock dan tidak mengonsumsi kuota. Pengujian live memerlukan key milik pemilik proyek.

Animasi beranda mengikuti preview pemilik: layar sambutan dengan tombol Mulai, gerakan hero/label/orbit, panah CTA yang tergambar, pita kategori berulang, dan reveal saat scroll. Pembuka tampil sekali per sesi tab (kawan-kampus-welcome-v1), dapat ditutup dengan Mulai atau Escape, lalu fokus berpindah ke heading beranda. Pita kategori berulang tanpa batas dan terus berjalan saat hover, tanpa tombol jeda. Foto hero ikut mengambang dan merespons gerakan kursor pada desktop; reveal kategori memakai transisi gambar dan teks yang lebih jelas. Reduced motion melewati pembuka dan menghapus animasi; perpindahan preferensi serta tab yang disembunyikan ditangani. Semua konten tetap terlihat jika JavaScript tidak berjalan.
