# Kawan Kampus — QA final

7 Oktober 2026. Proyek: `C:\UI\Project\KawanKampus`. Belum dideploy. Preview produksi lokal: http://127.0.0.1:3000.

| Pemeriksaan            | Hasil                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm run lint`         | Lulus; ESLint TypeScript, React Hooks, JSX accessibility + TypeScript strict; tanpa warning/error           |
| `npm run test`         | 24 tes unit/komponen lulus, termasuk seluruh 625 kombinasi jawaban kuis                                     |
| `npm run test:e2e`     | 16 tes lulus: desktop 1440 × 1000 dan mobile 390 × 844                                                      |
| `npm run build`        | Lulus; 10 route wajib dan metadata routes terbangun; TypeScript lulus                                       |
| `npm audit`            | 0 kerentanan pada semua dependency termasuk development                                                     |
| Audit konten           | 25 peluang; 5 per kategori; 100 field sumber cocok; 4 pertanyaan dan 20 jawaban cocok; provenance URL cocok |
| Axe WCAG A/AA          | Tidak ada pelanggaran pada halaman inti, desktop/mobile, light/dark                                         |
| Console dan aset lokal | Tidak ada error yang ditemukan pada route utama dan pemeriksaan visual                                      |
| Responsive             | Tidak ada overflow pada 1440, 1024, 768, 390, dan 360 px                                                    |

## Lighthouse

Diukur pada homepage production localhost, dengan Chrome headless. Skor adalah hasil pengukuran, bukan jaminan untuk semua jaringan/perangkat hosting.

| Mode    | Performance | Accessibility | Best Practices | SEO |
| ------- | ----------: | ------------: | -------------: | --: |
| Mobile  |          91 |           100 |            100 | 100 |
| Desktop |         100 |           100 |            100 | 100 |

Laporan mentah HTML/JSON tersedia di `work/lighthouse/`. Screenshot visual dan hasil pengukuran overflow ada di `work/visual-qa/`. Laporan E2E ada di `playwright-report/`.

## Perilaku yang diverifikasi

- Seluruh route wajib terbuka, tautan internal pada halaman utama menuju route yang valid, slug tidak dikenal menghasilkan 404.
- Semua 25 peluang memiliki konten sumber dan perilaku CTA yang tepat; external source membuka tab baru dengan `noopener noreferrer`.
- Perjalanan Home → Kuis → Hasil → Kategori → external CTA lulus. External popup memakai fixture jaringan untuk pemeriksaan yang deterministik.
- Progres, jawaban, dan pemilihan tie-break bertahan saat refresh. Tie-break tidak memaksakan urutan kode; pengguna memilih jumlah kategori sesuai sisa tempat. Hasil maksimal dua kategori positif.
- “Belum tahu” semua tidak menghasilkan kategori paksa. Beasiswa tetap menjadi pelengkap. Ulangi Kuis membersihkan sesi. Hasil kosong memberi jalur kembali ke kuis.
- Tema mengikuti sistem pada kunjungan pertama; manual Light/Dark tersimpan setelah refresh; mode System mengikuti perubahan preferensi OS.
- Quiz radio dan kontrol dapat dipakai dengan keyboard; skip link bekerja; dialog menu mendukung Escape dan pemulihan fokus.
- Komposisi desktop, mobile, dark mode, halaman kategori, dan kuis diperiksa melalui screenshot; tidak ditemukan teks bertumpuk atau elemen terpotong yang menghambat penggunaan.

## Sebelum deployment oleh pemilik

1. Ikuti README dan set `NEXT_PUBLIC_SITE_URL` ke domain produksi sebenarnya, atau gunakan domain Vercel yang disediakan otomatis.
2. Aktifkan Vercel Web Analytics. Script hanya dimuat pada build Vercel agar tidak menyebabkan 404 di server lokal.
3. Isi kontak/sosial jika informasi resmi sudah tersedia. Dua URL khusus kampus tetap `null`; jangan menggantinya dengan alamat yang ditebak.

Tidak ada deployment, akun, database, fitur pencarian/filter, bookmark, CMS, modal peluang, detail peluang individual, AI rekomendasi, GA4, atau pembagian hasil kuis.

## Batas verifikasi

Browser E2E memakai Chrome/Chromium dengan emulasi mobile. Pengujian tidak menggunakan perangkat iOS fisik atau Safari/Firefox. Tautan penyelenggara berasal dari PDF dan tidak dijamin selalu online; tanggal tetap merupakan acuan dokumen. Audit sumber lengkap dan hash PDF ada di `docs/CONTENT-AUDIT.md`.

## Revisi navbar dan tema

Toggle terang/gelap beranimasi menggantikan dropdown tema. Tombol CTA pada navbar dihapus sesuai permintaan. Mode System dapat dipulihkan melalui tombol “Ikuti tema perangkat” di footer. Animasi slider diverifikasi melalui frame browser (220 ms), dengan dukungan reduced motion dan keyboard. Lint/TypeScript, 24 tes unit/komponen, 16 E2E desktop/mobile, serta build produksi kembali lulus. E2E kini menggunakan build `.next-e2e` dan port 3100, terpisah dari preview development port 3000.

## Revisi glass, navigasi, dan footer

Garis menu aktif kini memenuhi lebar menu dengan gradasi Gold ke atas. Badge hero dihapus. Kartu penutup hanya ada di Beranda; panduan penutup kategori tetap berupa teks. Footer diringkas menjadi 186 px pada desktop 1440 px, menampilkan ikon Instagram dan X dengan URL `null` di `src/data/social.ts`. Kalimat analitik di footer dihapus sesuai permintaan; catatan privasi di Tentang dipertahankan. Navbar dan permukaan kartu menggunakan blur kaca yang sudah diverifikasi aktif di browser, beserta border/pantulan dan glow warna brand.

Pemeriksaan ulang: lint/TypeScript dan build produksi lulus, 24 unit/komponen serta 16 E2E desktop/mobile lulus, seluruh 25 pilihan dan isi kuis tetap cocok dengan sumber, tidak ada overflow/error pada pemeriksaan visual. Lighthouse terbaru: mobile 91/100/100/100 dan desktop 100/100/100/100 (Performance/Accessibility/Best Practices/SEO).

## Revisi logo dan ilustrasi kategori

Logo navbar/footer kini memakai simbol K geometris dan wordmark lowercase dengan kawan tebal serta kampus tipis, mengikuti referensi terbaru pemilik. Favicon hanya simbol K; judul tab pada seluruh halaman adalah KawanKampus. Metadata deskripsi, canonical, dan judul Open Graph tetap spesifik halaman. Open Graph juga memakai simbol K.

Lima kategori kini menggunakan ilustrasi SVG orisinal: kelompok mahasiswa, piala kompetisi, buku/topi kelulusan dengan dukungan beasiswa, globe/pesawat/paspor, serta laptop/tas kerja. Ilustrasi dipakai secara konsisten pada kartu, halaman kategori, pilihan tie-break, dan hasil kuis. Ikon navigasi dan kontrol fungsional tetap sederhana. Palet mengikuti Gold, Amber, Navy, Slate, dan Linen; SVG dekoratif tidak menambah pengulangan bagi pembaca layar.

Pemeriksaan visual ulang pada 1440, 1024, 768, 390, dan 360 px tidak menemukan overflow atau tabrakan logo/kontrol navbar. Tampilan terang dan gelap diperiksa; tidak ada error browser. Lint/TypeScript, 24 tes unit/komponen, 16 E2E, dan build produksi lulus. Skor Lighthouse di atas berasal dari revisi glass sebelumnya; tidak diukur ulang untuk perubahan logo dan ilustrasi ini.

## Revisi penghapusan informasi akun

Sesuai arahan terbaru pemilik, seluruh keterangan tanpa akun di antarmuka dihapus: label/check/pemisah di hero, frasa pada banner kuis, frasa pada catatan kuis, dan keseluruhan panel Eksplorasi tanpa membuat akun pada halaman Tentang. Catatan sesi browser pada kuis tetap menjelaskan penyimpanan progres. Ini merupakan perubahan tampilan yang diminta pemilik setelah audit PRD; perilaku kuis, penyimpanan sesi, dan data program tidak berubah. Pemeriksaan desktop 1440 px dan mobile 390 px pada Beranda, Tentang, dan Kuis tidak menemukan keterangan akun, overflow, atau error browser.

## Revisi kartu ajakan kuis pada Jelajahi Peluang

Kartu kotak dengan ikon outline diganti panel kaca beradius 30 px (26 px di mobile), border utuh, padding konsisten, ilustrasi kompas SVG, hierarki heading/teks, dan tombol pill Gold menuju Kuis. Pada tablet/mobile, ilustrasi berada di samping teks dan tombol mendapat ruang terpisah. Copy utama tetap Belum punya pilihan? / Tidak apa-apa. Pemeriksaan terang/gelap dan lebar 1440, 1024, 768, 390, serta 360 px tidak menemukan overflow atau error browser; tombol berhasil menuju /kuis.
