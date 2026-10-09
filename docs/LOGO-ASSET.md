# Wordmark KawanKampus

Logo memakai K geometris khas, awan bold, kampus regular, dan titik Gold. Tulisan dikonversi menjadi outline SVG agar browser mobile tidak perlu menghitung SVG textLength, lengthAdjust, atau metrik font untuk merender logo.

- Komponen: src/components/brand.tsx.
- Data path: src/assets/brand/wordmark-paths.ts.
- Sumber tulisan: font Inter lokal src/assets/fonts/inter-latin.woff2, weight 800 untuk awan dan 400 untuk kampus; tracking asal -3 px pada skala 50 px, dipaskan pada area tulisan logo.
- Lisensi font tetap tersedia di src/assets/fonts/INTER-LICENSE.txt (SIL OFL).
- ViewBox: 0 0 282 56, dengan margin di kanan titik agar seluruh logo berada dalam batas SVG. K tetap memakai geometri yang disediakan sebelumnya.
- Warna tulisan mengikuti currentColor; K dan titik memakai Gold #F7BB17.
- Semua logo header/footer/cover memakai bentuk yang sama. Ukuran desktop dipertahankan; max-width menjaga footer pada layar sempit.

Outline dibuat sekali saat pengembangan menggunakan FontTools. Tidak ada parser font atau dependency Python yang dibutuhkan pada aplikasi/build Vercel. Cover memakai kelas CSS Module khusus sehingga sizing tidak bergantung pada selector global yang terscope secara keliru.
