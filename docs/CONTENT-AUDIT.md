# Audit sumber dan implementasi

Tanggal: 7 Oktober 2026. Prioritas yang diterapkan: PRD v1.0 → Panduan Isi Website → Visual Identity Guideline → referensi yang sudah tersimpan → default library. Seluruh 16 + 20 + 4 halaman dibaca sebelum kode proyek ditulis. Referensi tambahan tidak di-scrape.

## Metode

Teks lengkap dan hyperlink `/Annots /A /URI` diekstrak dari PDF. Panduan visual juga dirender dan keempat halamannya diperiksa. Nilai CSS, screenshot, dan catatan referensi yang sudah tersimpan digunakan untuk komposisi dan pola interaksi. Konten implementasi kemudian dibandingkan kembali terhadap teks PDF yang sama.

`scripts/audit-content.mjs` memeriksa setiap nama, deskripsi, periode, dan catatan persyaratan dengan normalisasi spasi/tanda baca. Semua 100 field peluang cocok dengan sumber, seluruh 4 pertanyaan dan 20 jawaban cocok, dan setiap URL peluang cocok dengan hyperlink pada halaman sumbernya. Hasil rinci ada di `content-audit.json`, dengan provenance URL terpisah dalam `source-hyperlinks.json`.

## Cakupan peluang

| Kategori                              | Pilihan                                             | Halaman PDF |
| ------------------------------------- | --------------------------------------------------- | ----------- |
| Organisasi & Kepemimpinan             | Organisasi dan kepanitiaan di kampusmu              | 4           |
| Organisasi & Kepemimpinan             | AIESEC                                              | 4           |
| Organisasi & Kepemimpinan             | Aspire Leaders Program                              | 4           |
| Organisasi & Kepemimpinan             | StudentsCatalyst                                    | 5           |
| Organisasi & Kepemimpinan             | Young Leaders for Indonesia                         | 5           |
| Lomba & Kompetisi                     | PIMNAS melalui PKM                                  | 7           |
| Lomba & Kompetisi                     | L’Oréal Brandstorm                                  | 8           |
| Lomba & Kompetisi                     | GEMASTIK                                            | 8           |
| Lomba & Kompetisi                     | HSBC Indonesia Business Case Competition            | 8           |
| Lomba & Kompetisi                     | CFA Institute Research Challenge                    | 9           |
| Beasiswa & Bantuan Kuliah             | Beasiswa Unggulan untuk D4 dan S1                   | 10          |
| Beasiswa & Bantuan Kuliah             | Beasiswa Bakti BCA                                  | 10          |
| Beasiswa & Bantuan Kuliah             | SatuBeasiswa                                        | 10–11       |
| Beasiswa & Bantuan Kuliah             | Beasiswa pemerintah daerah                          | 11          |
| Beasiswa & Bantuan Kuliah             | Layanan bantuan pendidikan kampus                   | 11          |
| Pertukaran & Pengalaman Internasional | Pertukaran semester melalui kampus                  | 12          |
| Pertukaran & Pengalaman Internasional | AIESEC Global Volunteer                             | 12          |
| Pertukaran & Pengalaman Internasional | NUS Enterprise Summer Programme in Entrepreneurship | 12–13       |
| Pertukaran & Pengalaman Internasional | HKU Summer Institute                                | 13          |
| Pertukaran & Pengalaman Internasional | Hansen Leadership Institute                         | 13          |
| Magang & Kenali Dunia Kerja           | Forage                                              | 14          |
| Magang & Kenali Dunia Kerja           | Glints                                              | 14          |
| Magang & Kenali Dunia Kerja           | LinkedIn Jobs                                       | 14          |
| Magang & Kenali Dunia Kerja           | Jobstreet                                           | 15          |
| Magang & Kenali Dunia Kerja           | Prosple Indonesia                                   | 15          |

Semua 25 kartu memuat jenis, deskripsi, Kapan, Perlu tahu, dan CTA. Dua kanal kampus yang tidak memiliki alamat dari sumber diberi `officialUrl: null`. Tidak ada URL resmi yang dibuat sendiri. Hyperlink bacaan ONMIPA, PKM, EF Hult Prize, dan contoh seleksi FEB UNAIR juga dipertahankan. Tautan contoh Jambi/AUN-ACTS tidak dilabeli sebagai jalur universal.

## Pemeriksaan makna dan fakta

- Aspire mempertahankan periode October 21 – November 30, Cohort 4 2026, sifat daring/gratis, usia 18–29, dan syarat ekonomi/generasi pertama.
- YLI mempertahankan Agustus 2026–Januari 2027 serta syarat tahun ke-3/ke-4 edisi 2026.
- Brandstorm mempertahankan usia 18–30, tim 3 orang, tanpa syarat latar studi tertentu, dan acuan edisi 2026.
- CFA mempertahankan acuan final Indonesia 14 Februari 2026.
- Beasiswa Unggulan mempertahankan 20–24 Agustus 2026. Bakti BCA mempertahankan 3 Agustus–30 September 2026, S1 nonvokasi di PTN, serta semester 3 ketika mendaftar.
- NUS mempertahankan pendaftaran 1 Februari–31 Maret dan kegiatan 6–17 Juli 2026, dua minggu, berbayar, pilihan fellowship, serta pemeriksaan pendanaan/bahasa/perjalanan.
- Hansen tetap menampilkan “15 January (Acuan 2027)”, tanpa menafsirkan tanggal itu sebagai jenis deadline lain; usia 20–25 dan minimal satu tahun kuliah tetap ada.
- PIMNAS melalui PKM tidak dianggap pendaftaran langsung; pendanaan PKM tidak otomatis berarti masuk PIMNAS.
- Keanggotaan AIESEC dibedakan dari Global Volunteer. Global Volunteer tidak dianggap pertukaran kuliah.
- Forage tetap simulasi/pelatihan, bukan pengalaman magang. Platform lowongan tidak dianggap penyelenggara yang menerima semua pelamar.
- Seluruh 7 jenis lomba, 2 jenis organisasi, 4 jenis beasiswa, 4 jenis internasional, dan 3 jenis dunia kerja diperkenalkan sebelum kartu peluang.
- Nama produk lama dalam panduan diganti menjadi Kawan Kampus di UI. Tidak ada sejarah, tim, organisasi pendiri, atau klaim visi/misi baru.
- Disclaimer jadwal ditampilkan di seluruh halaman kategori dan Tentang. Tidak ada status Open/Closed/Upcoming otomatis.

## Aturan kuis

Empat pertanyaan, masing-masing empat pilihan kategori + “Belum tahu”; satu pertanyaan ditampilkan pada satu tahap. Pilihan kategori bernilai +1, “Belum tahu” 0. Beasiswa tidak diberi skor. Hasil maksimal dua kategori positif; satu kategori positif menghasilkan satu hasil. Tidak ada persentase, penilaian bakat, atau skor kepribadian.

Jika skor seri memengaruhi batas dua hasil, hanya kategori yang seri ditampilkan, dengan jumlah pilihan tepat sesuai sisa slot. Kategori yang lebih kuat tetap dipertahankan. Kasus semua “Belum tahu” memakai heading “Masih ingin mencoba berbagai hal” dan CTA Jelajahi Semua Peluang. Beasiswa selalu menjadi pelengkap. Tombol Ulangi Kuis menghapus progres sesi; refresh/navigasi mempertahankannya.

## PRD dan visual

- Semua 10 route wajib ada; slug kategori tidak dikenal menghasilkan 404.
- Home memiliki CTA utama/sekunder, pengantar satu menit, lima kategori, dan pesan tidak perlu mengikuti semuanya.
- Halaman Jelajahi berfungsi sebagai edukasi kategori, tanpa pencarian, filter, atau sortir.
- Kategori memakai pengantar → jenis → contoh peluang → ajakan eksplorasi, dengan variasi ikon sesuai kategori.
- Semua data bisnis dipisahkan dari komponen. Halaman konten menggunakan Server Components; hanya interaksi menjadi client.
- Linen #FAF8F4, Navy #16202E, Gold #F7BB17, Amber #F3A52D, Slate #5A6675; Gold/Amber tidak dipakai sebagai body text di light mode.
- Montserrat untuk heading dan Inter untuk body; font lokal dengan lisensi. Sunrise gradient dipakai pada satu matahari ilustrasi utama; elemen lain memakai warna datar.
- Pola kapsul DompetinAja, grid dua kartu diikuti tiga kartu, ritme section lapang, dan hero dua kolom diadaptasi. Navbar memperoleh blur/opacity progresif mengikuti scroll; semua warna mengikuti brand dan tema. Kartu kaca memakai material transparan/inset highlight yang lebih tenang, tanpa sapuan kilau berulang.
- Ilustrasi SVG dibuat di proyek, bukan aset merek referensi atau foto stok.
- Light/Dark/System, localStorage, menu dialog mobile, fokus keyboard, skip link, native radio/checkbox, reduced motion, fallback blur, metadata, canonical, OG image, sitemap, robots, dan Vercel Analytics ada.
- Tidak ada fitur MVP Non-Goals. Tidak ada deployment.

## Batas pemeriksaan

URL resmi diaudit terhadap sumber dan atribut navigasinya. Tes popup memakai fixture jaringan untuk menghindari kegagalan dari pihak ketiga; audit ini tidak menjamin situs penyelenggara akan selalu online. Isi dan tanggal mengikuti dokumen yang diberikan, bukan data terkini yang diambil ulang. Pemeriksaan browser yang dijalankan memakai Chromium/Chrome desktop dan emulasi mobile; bukan perangkat iOS fisik atau sesi Safari/Firefox.

## Sidik jari dokumen (SHA-256)

- PRD: `E3AAF395A7B4B84EA48842A1C77DC7A6D565CA9D6AF9944AEB7D6A782020E4B5`
- Panduan Isi: `1EB6A7594D5521BB3771D1554680C5E764819B3425FC808A21E33449B377D023`
- Visual Identity: `1A86DC49D6689504EAAAB5E446AAC14456EFC4FBAA4A7C74080D2B33AF3EAAE5`
