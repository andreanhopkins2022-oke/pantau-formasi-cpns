# PANTAU FORMASI CPNS - Petunjuk

## Isi paket
index.html, style.css, script.js, assets/vendor/, functions/api/data.js (Cloudflare Pages Function), _headers, uji/ (berkas uji).

## 1. Menjalankan aplikasi
Pelihara satu folder. Jalankan server lokal, jangan buka lewat file://:
    python3 -m http.server 8000     lalu buka http://localhost:8000
Mode lokal: data hanya tersimpan di browser (IndexedDB). Login admin memerlukan /api/data, jadi untuk uji lokal pakai `npx wrangler pages dev .` (setelah KV dan variabel di langkah 5 dibuat), atau uji langsung di Cloudflare.

## 2. Mengunggah database
Menu Panel Admin -> masukkan password admin -> Pilih File (xlsx/xls/csv, atau seret berkas).
Dikenali: sheet RINGKASAN, REKAP_INSTANSI, REKAP_JURUSAN, REKAP_LOKASI, REKAP_JABATAN, REKAP_PENDIDIKAN, REKAP_KATEGORI, atau CSV mentah SSCASN (kolom formation_id).
Setelah berhasil, klik "Terbitkan ke Publik" agar pengunjung melihat data.

## 3. Mengganti database
Panel Admin -> "Ganti File" (atau "Unggah Database Baru"), pilih berkas baru, lalu "Terbitkan ke Publik" lagi.

## 4. Menghapus database
- "Hapus Data": mengosongkan tampilan saja.
- "Hapus Database": menghapus salinan di browser ini.
- "Hapus Data Publik": menghapus data di server (tampilan publik kosong).

## 5. Hosting di Cloudflare Pages
1. Unggah folder ini ke repositori GitHub (atau pakai Direct Upload).
2. Cloudflare Dashboard -> Workers & Pages -> Create -> Pages -> hubungkan repo. Build command: kosong. Output directory: /
3. Workers & Pages -> KV -> Create namespace (mis. pfc-data).
4. Project Pages -> Settings -> Bindings -> KV namespace: nama variabel PFC, pilih namespace tadi.
5. Settings -> Variables and Secrets -> tambahkan ADMIN_PASSWORD (Secret) = password admin Anda.
6. Deploy ulang. Buka alamat *.pages.dev, login Panel Admin, unggah database, Terbitkan.
Password tidak ditulis di kode; hanya disimpan sebagai secret di Cloudflare.
