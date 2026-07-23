<div align="center">

  # 🧾 FairShare — Hitung Patungan & Tax Calculator Presisi

  **Hitung patungan makan bersama presisi kasir, adil, & tanpa drama recehan.**

  [![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

  [Deskripsi](#-deskripsi-proyek) • [Fitur Utama](#-fitur-unggulan) • [Teknologi Stack](#%EF%B8%8F-teknologi--stack) • [Panduan Lokal](#-cara-menjalankan-di-lokal)

</div>

---

## 📌 Deskripsi Proyek

**FairShare** adalah aplikasi web SaaS (Software as a Service) modern yang dirancang khusus untuk membantu kelompok pertemanan menghitung pembagian tagihan makanan di restoran (*split bill*) secara **presisi, transparan, dan adil**.

Sering kali saat makan bersama, pembagian pajak restoran (PB1 10%), service charge, diskon promo resto, hingga menu yang dimakan bersama (*shared items*) dihitung secara asal-asalan. **FairShare** menyelesaikan masalah ini dengan mengkalkulasikan porsi harga pesanan masing-masing individu secara proporsional hingga satuan rupiah terkecil.

---

## ✨ Fitur Unggulan

- ⚡ **Kalkulator Tax & Service Presisi**: Mengalokasikan Pajak Restoran PB1 (10%), Service Charge (5%-7%), Diskon Resto (Persen/Nominal), dan Tips Waiter secara adil berdasarkan porsi masing-masing.
- 🤝 **Menu Patungan (Shared Dishes)**: Bagi makanan bersama (misal: *Pizza Large* atau *Appetizer*) ke beberapa orang spesifik.
- 💳 **Matriks Pelunasan ("Siapa Bayar ke Siapa")**: Meminimalisir jumlah transaksi antar anggota. Cukup 1 orang penanggung jawab yang menalangi struk.
- 📲 **Kartu Rekening Digital & Upload QRIS**: Pembuat tagihan dapat mengunggah gambar QRIS sendiri & menyediakan info BCA/GoPay/OVO dengan tombol *Salin Rekening* 1-klik.
- 📄 **Format Teks WhatsApp & Shareable Web Link**: Ekspor ringkasan tagihan terformat siap kirim ke grup WA, atau bagikan via URL Hash (`#share=...`).
- 🎲 **Roda Traktiran FairShare (Spin the Wheel Game)**: Gamifikasi roda putar interaktif 3D/SVG untuk memilih siapa yang menalangi atau membayar tip!
- 👥 **Templat Cepat Grup Teman (Friend Group Presets)**: Simpan & muat daftar teman nongkrong/kantor dalam 1 klik.
- 📊 **Arsip & Analisis Pengeluaran**: Simpan riwayat struk di `localStorage` dan pantau statistik patungan bulanan.

---

## 🛠️ Teknologi & Stack

| Kategori | Teknologi |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Glassmorphism UI |
| **Icon Set** | [Lucide React](https://lucide.dev/) |
| **Animasi & Efek** | Canvas Confetti + Micro-animations |
| **Penyimpanan & Share** | `localStorage` + URL Base64 Hash Sharer |

---

## 🚀 Cara Menjalankan di Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 ke atas)
- npm atau yarn

### Langkah-langkah

```bash
# 1. Clone repository ini
git clone https://github.com/hashizumee/farishare.git

# 2. Masuk ke folder proyek
cd farishare

# 3. Install seluruh dependensi
npm install

# 4. Jalankan server pengembangan lokal
npm run dev
```

Buka browser Anda dan akses `http://localhost:5174/`.

---

## 📝 Lisensi

Proyek ini dilesensikan di bawah lisensi [MIT](LICENSE).

---

<div align="center">
  Dibuat presisi tanpa drama oleh <strong>Hashizumee</strong> ⚡
</div>
