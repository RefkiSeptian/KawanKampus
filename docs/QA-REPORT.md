# Kawan Kampus — QA final

7 Oktober 2026. Proyek: `C:\UI\Project\KawanKampus`. Belum dideploy. Preview development lokal: http://127.0.0.1:3000.

| Pemeriksaan            | Hasil                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm run lint`         | Lulus; ESLint TypeScript, React Hooks, JSX accessibility + TypeScript strict; tanpa warning/error           |
| `npm run test`         | 38 tes unit/komponen lulus, termasuk seluruh 625 kombinasi jawaban kuis dan integrasi asisten              |
| `npm run test:e2e`     | 32 tes lulus: desktop 1440 × 1000 dan mobile 390 × 844                                                      |
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
| Mobile  |          83 |           100 |            100 | 100 |
| Desktop |         100 |           100 |            100 | 100 |

Laporan mentah HTML/JSON tersedia di `work/lighthouse/`. Screenshot visual dan hasil pengukuran overflow ada di `work/visual-qa/`. Laporan E2E ada di `playwright-report/`.

## Perilaku yang diverifikasi

- Seluruh route wajib terbuka, tautan internal pada halaman utama menuju route yang valid, slug tidak dikenal menghasilkan 404.
- Semua 25 peluang memiliki konten sumber dan perilaku CTA yang tepat; external source membuka tab baru dengan `noopener noreferrer`.
- Perjalanan Home → Kuis → Hasil → Kategori → external CTA lulus. External popup memakai fixture jaringan untuk pemeriksaan yang deterministik.
- Progres, jawaban, dan pemilihan tie-break bertahan saat refresh. Tie-break tidak memaksakan urutan kode; pengguna memilih jumlah kategori sesuai sisa tempat. Hasil maksimal dua kategori positif.
- “Belum tahu” semua tidak menghasilkan kategori paksa. Beasiswa tetap menjadi pelengkap. Ulangi Kuis membersihkan sesi. Hasil kosong memberi jalur kembali ke kuis.
- Tema awal selalu Light; pilihan manual Light/Dark di footer tersimpan setelah refresh; nilai System lama dimigrasikan ke Light.
- Quiz radio dan kontrol dapat dipakai dengan keyboard; skip link bekerja; dialog menu mendukung Escape dan pemulihan fokus.
- Komposisi desktop, mobile, dark mode, halaman kategori, dan kuis diperiksa melalui screenshot; tidak ditemukan teks bertumpuk atau elemen terpotong yang menghambat penggunaan.

## Sebelum deployment oleh pemilik

1. Ikuti README dan set `NEXT_PUBLIC_SITE_URL` ke domain produksi sebenarnya, atau gunakan domain Vercel yang disediakan otomatis.
2. Aktifkan Vercel Web Analytics. Script hanya dimuat pada build Vercel agar tidak menyebabkan 404 di server lokal.
3. Isi kontak/sosial jika informasi resmi sudah tersedia. Dua URL khusus kampus tetap `null`; jangan menggantinya dengan alamat yang ditebak.

Tidak ada deployment, akun, database profil, fitur pencarian/filter, bookmark, CMS, modal peluang, detail peluang individual, GA4, atau pembagian hasil kuis. Asisten AI ditambahkan pada 8 Oktober 2026 atas permintaan eksplisit pemilik; konfigurasi dan batas verifikasinya dijelaskan di bawah.

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

## Revisi beranda berdasarkan HTML preview pemilik

Beranda kini mengikuti preview_kawankampus.html: hero foto dengan tipografi besar dan label ringan, pita lima kategori, poster pengantar kuis, kategori bergantian kiri/kanan dengan foto, dan penutup Navy selebar layar. Palet tetap Linen #FAF8F4, Navy #16202E, Gold #F7BB17, Amber #F3A52D, dan Slate #5A6675. Navbar kaca, logo K, tema, dan footer ringkas mengikuti revisi sebelumnya.

Enam foto transparan dari preview diadaptasi dengan built-in imagegen dan disimpan sebagai WebP lokal (sekitar 0,47 MB total). Foto digunakan atas permintaan referensi terbaru pemilik; ilustrasi SVG tetap dipakai di halaman lain. Naskah pendukung beranda dan pemetaan foto terpusat di src/data/home.ts. Deskripsi kategori, 25 program, URL resmi, 4 pertanyaan/20 jawaban, skor/tie-break, dan perilaku sesi tetap mengikuti sumber. Audit mekanis konten kembali lulus tanpa kegagalan.

Pemeriksaan visual production pada 1440, 1024, 768, 390, dan 360 px dalam tema terang/gelap tidak menemukan overflow atau error browser. Beranda tidak mengimpor pembatasan route, welcome overlay, berbagi hasil, atau fitur AI dalam file preview; ruang lingkup fungsional tetap sesuai PRD. Open Graph memakai judul baru yang konsisten dengan hero.

Validasi akhir revisi beranda: npm run lint (route typegen, ESLint, TypeScript), 24 tes unit/komponen, 16 tes E2E desktop/mobile, dan npm run build lulus. Lighthouse production terbaru: mobile 96/100/100/100; desktop 100/100/100/100. Semua enam foto berhasil dimuat; lima CTA kategori menuju slug yang benar. Server pemeriksaan sementara ditutup setelah selesai.

## Revisi animasi dari HTML preview

Gerakan preview kini diimplementasikan melalui HomeMotion: pembuka dengan kolase dan tombol Mulai, transisi hero setelah pembuka, panah CTA yang tergambar, label mengambang, orbit/badge bergerak, pita kategori berulang, bintang berputar, dan reveal saat scroll. Isi tetap Server Components; komponen client menangani modal dan observasi visibilitas saja.

Pembuka dapat ditutup dengan Mulai atau Escape, memindahkan fokus ke heading, dan tidak berulang pada sesi tab yang sama setelah ditutup. Native dialog menjaga fokus/inert. Tombol jeda pada pita menghentikan gerakan dekoratif; animasi berhenti ketika tab tidak terlihat. Reduced motion melewati pembuka, meniadakan gerakan, menampilkan konten secara statis, serta ditangani bila preferensi berubah saat halaman terbuka. JavaScript yang dinonaktifkan tidak menyembunyikan konten halaman.

Lint/TypeScript, 24 unit/komponen, 20 E2E desktop/mobile, dan build produksi lulus. Empat E2E baru memeriksa pembuka, keyboard/fokus, sesi, perubahan transform pita, pause/resume, scroll reveal, serta reduced motion. Audit axe pada modal diuji dalam mode bergerak; audit semua halaman memakai reduced motion agar menilai presentasi setelah transisi, bukan frame opacity sementara.

Pemeriksaan visual pembuka/animasi pada 1440, 1024, 768, 390, dan 360 px tidak menemukan overflow atau error browser. Frame berulang membuktikan gerakan pita/label, transisi pembuka, dan reveal. Cuplikan GIF diekspor dari browser. Lighthouse first visit dengan pembuka dan animasi aktif: mobile 92/100/100/100, desktop 100/100/100/100. Server pemeriksaan port 3200 ditutup; server development milik pemilik proyek pada port 3000 tetap berjalan.

## Revisi ukuran dan tepi foto pembuka

Empat foto kolase pembuka kini berukuran responsif dengan batas desktop 540 px serta menyesuaikan tinggi viewport; mobile memakai 55vw dengan batas 170–240 px. Foto digeser lebih dekat ke dalam sudut layar. Lapisan foto utama tetap tajam; mask vertikal/horizontal memudarkan tepinya. Salinan foto yang sama diberi blur 14 px (9 px di mobile), opacity rendah, dan radial mask untuk melembutkan peralihan ke Navy. Tidak ada pengubahan ulang aset foto atau tambahan gambar yang berbeda; dua lapisan memakai URL identik.

Lint/TypeScript, build produksi pada server E2E, dan 20 E2E desktop/mobile lulus. Visual pembuka diperiksa pada 1920, 1440, 1024, 390, dan 360 px: mask dan blur aktif, tidak ada overflow, semua foto dimuat, tombol Mulai tetap bekerja, tidak ada error browser.

Lighthouse setelah revisi tepi foto: mobile 93/100/100/100 dan desktop 100/100/100/100 (Performance/Accessibility/Best Practices/SEO). Server pemeriksaan sementara ditutup setelah verifikasi.

## Revisi gerakan beranda tanpa tombol jeda

Sesuai arahan pemilik, tombol jeda pada pita dihapus. Pita memakai loop infinite 24 detik dan tidak berhenti saat hover. Gerakan foto hero bertambah menjadi floating vertikal dengan tilt ringan serta parallax kursor desktop; label bergerak 16 px, orbit lebih terasa, badge berayun, dan bintang berputar lebih cepat. Hero masuk dari jarak lebih jauh. Gambar dan teks kategori masuk bergantian dari kiri/kanan dengan transisi yang bertahap.

Reduced motion tetap tersedia melalui preferensi perangkat; animasi berhenti sementara saat tab tidak terlihat dan melanjutkan ketika kembali aktif. Kuis, sesi, warna, foto, dan naskah program tidak berubah. Lint/TypeScript dan build produksi lulus. Seluruh 20 E2E lulus; tes gerakan memeriksa loop infinite, pergerakan ketika hover, foto hero yang bergerak, serta tidak adanya kontrol jeda. Pemeriksaan visual pada 1440, 1024, 768, 390, dan 360 px tidak menemukan overflow atau error browser. Cuplikan terbaru: homepage-motion-strong.gif.

## Revisi hover, navbar, tema, dan wordmark

Hover pada seluruh baris kategori kini memberi latar hangat, bayangan, lift panel, zoom 7,5% dengan tilt gambar, dan panah bergerak. Efek juga merespons focus-within dan tetap menghormati reduced motion. Menu desktop rata kanan. Toggle tema hanya ada di footer, menggantikan kontrol System. Default pertama selalu Light meski OS memakai Dark; pilihan Light/Dark manual tetap tersimpan. Nilai System dari versi lama dimigrasikan ke Light.

Tagline yang diminta pemilik dihapus dari semua tampilan dan data situs. Wordmark kini diawali huruf k Gold yang menyatu dengan awan tebal serta kampus tipis, tanpa ikon K terpisah. Branding navbar/footer, pembuka, serta Open Graph konsisten; favicon K tetap menjadi ikon tab. Logo berupa SVG dekoratif dengan label nama brand yang aksesibel pada elemen pembungkus.

Navbar/footer serta hover diperiksa pada desktop dan mobile: nol toggle di header, satu toggle di footer, nol tagline, nol overflow/error browser. Lighthouse produksi terbaru mobile 91/100/100/100 dan desktop 100/100/100/100. Foto utama ditampilkan langsung; gerakan foto dimulai setelah tombol Mulai atau interaksi pengguna agar pemuatan awal tetap ringan. Konten program dan scoring kuis tetap sama.

## Revisi berdasarkan proposal dan lampiran terbaru

Proposal dibaca lengkap melalui OOXML dan seluruh gambar lampiran diperiksa. Layout proposal mengendalikan komposisi halaman, sementara palet tetap Linen, Navy, Gold, Amber, dan Slate. Router dan aturan PRD tetap sama; rekomendasi AI/direktori/sharing dalam proposal bukan permintaan implementasi pada revisi ini.

Pita kini terdiri dari enam grup identik dan bergerak tepat selebar satu grup setiap siklus, sehingga tetap menutup viewport saat loop mendekati akhir. Cover awal disiapkan oleh bootstrap head dan CSS sebelum bundle client: tests menahan unduhan JavaScript dan membuktikan cover tetap berada di depan. Modal lalu dibuka pada layout effect untuk menghindari kilatan beranda. K geometris khas kini menyatu sebagai huruf pertama pada wordmark. Navbar mengikuti susunan Beranda, Jelajahi Peluang, Tentang, Temukan Minatku; CTA terakhir memiliki pill outline dan simbol bintang.

Jelajahi memakai grid tiga kolom/lima kategori plus satu kartu kuis. Pengantar kategori memakai judul proposal dan panel foto besar. Kartu peluang memiliki visual, kredit, dan tautan sumber. Sembilan aset resmi disimpan lokal dengan provenance lengkap dalam docs/PHOTO-SOURCES.json; bahan resmi yang tidak tersedia menggunakan ilustrasi yang ditandai. Halaman kategori, Explore, Tentang, Kuis, dan Hasil mendapat reveal/hover dan dekorasi gerak dengan reduced motion. Konten dan scoring kuis tidak berubah.

Lint/TypeScript, 24 unit/komponen, dan 22 E2E lulus. Build produksi server E2E lulus. Audit sumber: 25 program, 4 pertanyaan/20 jawaban, nol kegagalan. Pemeriksaan terang/gelap dan viewport 1920,1440,1024,768,390,360 px: nol overflow atau error browser; semua visual termuat.

Lighthouse setelah revisi proposal: mobile 91/100/100/100 dan desktop 100/100/100/100 (Performance/Accessibility/Best Practices/SEO). Server pemeriksaan sementara port 3200 ditutup setelah verifikasi; server development pemilik pada port 3000 tidak dihentikan.

## Tambahan gambar dari pemilik, 8 Oktober 2026

Dua belas gambar dipasang pada kartu program yang sesuai dan dioptimalkan menjadi WebP lokal. Poster/banner dan logo ditampilkan utuh memakai scale-down; foto tetap memakai cover. Gambar Jambi 180 × 180 dan logo Forage 147 × 150 tidak diperbesar melewati resolusi aslinya. Pengantar Beasiswa menggunakan foto SatuBeasiswa; pengantar Internasional memakai foto NUS. Kredit sumber pihak ketiga dibedakan dari sumber resmi. Tautan CTA NUS memakai URL koreksi pemilik dan provenance koreksi diaudit terpisah.

Lint/TypeScript, 24 tes unit/komponen, 22 E2E desktop/mobile, serta build produksi pada server E2E lulus. Audit isi PDF dan koreksi URL lulus. Halaman Beasiswa, Internasional, dan Dunia Kerja diperiksa pada 1440, 768, 390, dan 360 px dalam tema terang/gelap: semua gambar berhasil dimuat, tidak ada overflow atau error console. Screenshot dan laporan ada di work/provided-photos/ serta folder output chat. Lighthouse tidak diulang untuk perubahan ini.

## Asisten AI mengambang, 8 Oktober 2026

Panel sesuai lampiran ditambahkan ke seluruh halaman menggunakan K khas Gold dan palet brand. Desktop menampilkan panel 400 px dan label Tanya kawan; tablet/mobile memakai tombol K. Mode gelap, reduced motion, fokus input, Escape, Enter/Shift+Enter, reset, pembatalan, riwayat sesi, sumber aman, serta kondisi layanan tidak aktif tersedia. Tombol menghindari kontrol tema footer.

Server /api/chat memakai Groq dengan konteks terpusat kategori/25 program, instruksi perilaku, JSON answer/source IDs, validasi sumber terhadap katalog, model cadangan, dan timeout. Secret tidak dikirim ke client. Role system dari client, pesan terlalu panjang, riwayat tidak valid, dan origin lain ditolak. Host publik diperhitungkan karena Next dapat menormalisasi URL internal ke localhost. Pembatas memori tersedia lokal; Redis atomik dengan identitas IP ber-HMAC diwajibkan untuk Vercel. Layanan AI berhenti sementara jika pembatas bersama gagal.

34 unit/komponen dan 26 E2E lulus, termasuk fallback quota provider, batas 10/minute, reset waktu, hashing IP platform, fail-closed Redis, input API, sesi chat, reset, navigasi sumber, aksesibilitas panel, dan error quota UI. Lint/TypeScript serta build produksi lulus. Audit konten tetap 25 program/4 pertanyaan/20 jawaban tanpa kegagalan. Pemeriksaan 1440,768,390,360 px dalam Light/Dark: nol error JS, overflow, atau tumpang tindih launcher dengan tema footer. Request browser ke API tanpa konfigurasi menghasilkan 503 dengan pesan layanan tidak tersedia, bukan penolakan origin.

Groq dan Redis diuji menggunakan mock; tidak ada key atau kredensial nyata yang diberikan sehingga kualitas generasi live, quota akun, dan integrasi database live belum diuji. Respons dalam screenshot percakapan adalah fixture. Pengaturan prompt mengurangi risiko jawaban keliru tetapi tidak menjamin semua fakta generasi AI; sumber resmi tetap acuan akhir. Tidak ada deployment atau pembuatan akun layanan eksternal.

## Pemeriksaan kembali sebelum commit, 8 Oktober 2026

Akses folder dan localhost telah pulih. Lint/TypeScript, 34 unit/komponen, seluruh 26 E2E, build produksi, dan audit sumber kembali lulus pada folder proyek utama. Panel chat dimuat ketika launcher dibuka agar tidak menambah seluruh logika percakapan pada pemuatan awal. Gambar hero disembunyikan saat cover masih menunggu hidrasi; foto pembuka tampil tanpa animasi pembesaran awal dan tetap mengambang.

Lighthouse terbaru: mobile 83/100/100/100 dan desktop 100/100/100/100. Target script performa 90 belum tercapai pada mobile: LCP sekitar 4,5 detik pada foto blur kolase cover, tanpa layout shift. Pemeriksaan performa tidak diklaim lulus. Fungsionalitas, aksesibilitas otomatis, TypeScript, dan build lulus; koneksi live Groq/Redis tetap memerlukan kredensial pemilik. Tidak ada deployment yang dijalankan oleh agen.

## Penyederhanaan menjadi Groq saja, 8 Oktober 2026

Atas permintaan pemilik untuk mengurangi konfigurasi, syarat Upstash/Redis dan CHAT_RATE_LIMIT_SECRET dihapus. Asisten tersedia lokal maupun di Vercel hanya dengan GROQ_API_KEY. GROQ_MODELS tetap opsional untuk model yang tersedia pada akun. README dan .env.example mengikuti konfigurasi baru; variabel Redis lama tidak lagi dibaca.

Pembatas dasar 10 permintaan dalam 60 detik memakai counter memori per IP per instance, dengan maksimum 10.000 bucket aktif. IP valid berasal dari header platform Vercel dan di-hash untuk key memori. Counter terhapus ketika instance restart dan tidak dibagi antar-instance; pembatas ini tidak menjamin batas global yang konsisten. Kuota Groq tetap berlaku pada akun/organisasi. Model cadangan, konteks katalog, validasi sumber, origin, batas pesan, timeout, sesi browser, dan fallback UI tetap digunakan. Catatan Redis pada bagian sebelumnya merupakan riwayat revisi, bukan konfigurasi saat ini.

Lint/TypeScript, 34 unit/komponen, serta seluruh 26 E2E desktop/mobile lulus setelah perubahan ini. Build produksi pada server E2E lulus. Tes integrasi secara khusus memastikan GET mengaktifkan asisten pada Vercel dengan satu Groq key, POST memanggil hanya endpoint Groq, request ke-11 ditolak pada counter instance, counter berbeda menurut IP platform, dan header forwarding umum tidak dapat mengganti IP Vercel. Tes provider memakai mock; tidak ada request ke Groq live yang dilakukan.

## Perbaikan kegagalan panggilan Groq, 8 Oktober 2026

Endpoint produksi yang tercantum pada metadata repo berhasil diperiksa: GET /api/chat mengembalikan available true, sedangkan POST chat mengembalikan 503 generik. Key telah terpasang, tetapi respons lama tidak membedakan autentikasi, model, quota, timeout, atau format jawaban; sebab provider yang tepat belum bisa ditentukan dari respons itu.

Default diperbarui menjadi openai/gpt-oss-20b dengan openai/gpt-oss-120b sebagai cadangan, mengikuti dokumentasi model Groq saat pemeriksaan. GPT-OSS menggunakan reasoning effort low, include_reasoning false, dan anggaran 2048 token agar reasoning tidak menghabiskan seluruh anggaran jawaban JSON. Konteks mengambil fakta program dari hingga dua kategori relevan; riwayat provider dibatasi enam pesan/6000 karakter. Sumber tetap dipetakan di server dari data asli. Model status 400/403 dapat mencoba cadangan; autentikasi 401 tidak dicoba ulang.

Respons gagal memiliki kode diagnosis aman dan Retry-After untuk quota bila tersedia. Log hanya berisi kategori error, model dan status; tidak ada key, isi chat, prompt, atau respons mentah. 38 tes unit/komponen dan seluruh 26 E2E lulus, termasuk fallback model decommissioned 400, autentikasi aman 401, quota 429, konteks pertanyaan lanjutan dan pemetaan URL NUS. Build produksi pada server E2E lulus. Pemeriksaan live setelah pembaruan deployment dicatat terpisah; keberhasilan mock tidak dianggap keberhasilan provider live.

## Panel chat yang dapat dipindahkan, 9 Oktober 2026

Header menjadi kontrol drag untuk mouse dan sentuhan, dengan pointer capture dan pembaruan posisi melalui requestAnimationFrame. Panel memiliki mode ringkas, mode besar, pemulihan ukuran, dan tombol posisi awal. Posisi diingat dalam sessionStorage selama tab terbuka. Viewport dan perubahan ukuran panel diamati agar panel tetap berada dalam layar. Keyboard mendukung panah, Shift+panah, Home, dan Escape; feedback posisi tersedia bagi pembaca layar. Kontrol header tetap memakai logo K Gold dan permukaan warna brand.

Lint/TypeScript, 38 tes unit/komponen, seluruh 30 E2E desktop/mobile, serta build produksi pada server E2E lulus. Empat eksekusi E2E baru memeriksa drag mouse/sentuhan asli melalui CDP Chromium, perpindahan keyboard, posisi setelah reload/resize ke 360 × 640, draft saat minimize/restore, mode besar, reset posisi, dan axe pada panel besar. Tidak ada perubahan provider, API key, konteks program, atau aturan kuis. Pemeriksaan visual dan demo gerakan menggunakan API fixture sehingga tidak memakai kuota Groq.

Mode normal, ringkas, dan besar diperiksa pada 1440,768,390,360 px dalam tema terang/gelap: nol error JS, overflow atau pelanggaran axe pada panel. Screenshot tiap mode dan GIF drag disimpan pada folder output chat; laporan mentah ada di work/chat-window-visual.json. Server verifikasi sementara ditutup setelah pemeriksaan. Lighthouse tidak diulang karena panel tetap dimuat saat dibuka dan perubahan ini berfokus pada interaksi jendela.

## Wordmark utuh pada mobile, 9 Oktober 2026

Tulisan SVG text/textLength pada wordmark diganti outline path dari Inter lokal, weight 800 untuk awan dan 400 untuk kampus. Geometri K, Gold, currentColor, penamaan aksesibel, dan ukuran desktop tetap dipertahankan. ViewBox memiliki margin pada titik terakhir. Footer mendapat max-width dan min-width yang sesuai agar logo tetap berada dalam kolomnya. Cover menggunakan kelas CSS Module eksplisit untuk sizing logo.

Lint/TypeScript, 38 unit/komponen, seluruh 32 E2E, serta build produksi server E2E lulus. Regresi khusus memeriksa seluruh geometri logo berada di dalam viewBox dan viewport pada cover, header serta footer, dengan font WOFF2 sengaja digagalkan; lebar 320,360,390,412,1440 px diperiksa dalam dua profil Chromium. Pemeriksaan visual normal Light/Dark pada 320,360,390,412,768,1440 px tidak menemukan error JS atau overflow. Wordmark lengkap termasuk us dan titik terlihat pada screenshot mobile. Ini menggunakan emulasi Chromium; perangkat fisik Samsung/iOS belum diuji. Tidak ada dependency FontTools/Python yang dibutuhkan di aplikasi produksi.
