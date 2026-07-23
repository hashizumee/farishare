import React, { useState } from 'react';
import {
  Calculator,
  Sparkles,
  Scale,
  CreditCard,
  Share2,
  ShieldCheck,
  Zap,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  Users,
  Percent,
  Play,
  RotateCcw
} from 'lucide-react';

export default function LandingPage({ onGoToCalculator, onOpenWheel }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const faqs = [
    {
      q: "Apakah aplikasi FairShare ini 100% gratis?",
      a: "Ya! FairShare 100% gratis digunakan tanpa batas tanpa perlu mendaftar akun atau menginstal aplikasi apapun."
    },
    {
      q: "Bagaimana cara kerja perhitungan Pajak PB1 & Service Charge?",
      a: "FairShare menghitung rasio porsi makanan masing-masing orang terhadap total subtotal menu, lalu mengalokasikan Pajak (10%) dan Service Charge secara adil dan presisi proporsional."
    },
    {
      q: "Bagaimana jika ada menu makanan yang dimakan bersama (Shared Item)?",
      a: "Gunakan fitur Menu Patungan (Shared Items). Anda bisa memilih siapa saja orang yang ikut memakan menu tersebut (misal: 1 Pizza Large dibagi ke 3 dari 5 orang), dan harganya otomatis terbagi rata ke 3 orang tersebut."
    },
    {
      q: "Apakah data struk saya aman dan tersimpan?",
      a: "Data tersimpan otomatis di penyimpanan lokal (localStorage) browser HP Anda. Tidak ada data pribadi atau nominal yang diunggah ke server pihak ketiga."
    }
  ];

  return (
    <div className="space-y-16 pb-20 animate-fade-in font-sans">
      
      {/* Hero Banner Section */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 text-center space-y-6 overflow-hidden">
        
        {/* Background Glow Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Top Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold shadow-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kalkulator Patungan Resto #1 Presisi Kasir</span>
        </div>

        {/* Hero Main Headline */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-100 leading-tight">
            Hitung Patungan Resto <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Presisi, Adil, &amp; Tanpa Drama Recehan.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">
            Solusi pintar menghitung pembagian tagihan makanan, pajak PB1 (10%), service charge, diskon resto, hingga rincian WhatsApp &amp; QRIS transfer otomatis.
          </p>
        </div>

        {/* Hero Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
          <button
            type="button"
            onClick={onGoToCalculator}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-xl shadow-emerald-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4 text-slate-950" />
            <span>Mulai Hitung Tagihan Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenWheel}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-amber-300 bg-slate-900 hover:bg-slate-800 border border-amber-500/30 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Roda Traktiran 🎲</span>
          </button>
        </div>

        {/* Feature Pill Tags */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            100% Gratis Tanpa Login
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            Format Teks WA Otomatis
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            Upload QRIS Pribadi
          </span>
        </div>

      </section>

      {/* 4 Core Pillar Showcase Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
            Mengapa Memilih FairShare?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Dirancang khusus untuk menyelesaikan masalah rumit saat patungan makan bersama
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1 */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-700/60 bg-slate-900/60 shadow-xl space-y-3 hover:border-emerald-500/40 transition-all">
            <div className="p-2.5 w-fit rounded-xl bg-emerald-500/10 text-emerald-400">
              <Percent className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Pajak PB1 &amp; Service Charge Proporsional</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tidak ada yang dirugikan! Pajak 10% dan Service Charge dihitung berdasarkan nominal porsi pesanan masing-masing individu secara presisi hingga satuan rupiah.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-700/60 bg-slate-900/60 shadow-xl space-y-3 hover:border-amber-500/40 transition-all">
            <div className="p-2.5 w-fit rounded-xl bg-amber-500/10 text-amber-400">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Matriks Pelunasan ("Siapa Bayar ke Siapa")</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Meminimalisir jumlah transaksi transfer antar anggota kelompok. Cukup 1 orang penanggung jawab yang menalangi, sisanya transfer langsung ke penanggung jawab.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-700/60 bg-slate-900/60 shadow-xl space-y-3 hover:border-cyan-500/40 transition-all">
            <div className="p-2.5 w-fit rounded-xl bg-cyan-500/10 text-cyan-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Kartu Rekening Digital &amp; QRIS Upload</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unggah foto QRIS penanggung jawab atau atur nomor rekening BCA/GoPay/OVO. Lengkap dengan tombol Salin Rekening 1-klik untuk kemudahan transfer.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-700/60 bg-slate-900/60 shadow-xl space-y-3 hover:border-teal-500/40 transition-all">
            <div className="p-2.5 w-fit rounded-xl bg-teal-500/10 text-teal-400">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Format WhatsApp &amp; Link Web Interaktif</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hasil perhitungan siap disalin atau dikirim langsung ke grup WA dalam format teks yang rapi dan terstruktur, serta bisa dibagikan via Link Web.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/60 bg-slate-900/40 shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">LANGKAH MUDAH</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">Cara Pakai FairShare</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-base flex items-center justify-center mx-auto border border-emerald-500/30">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-200">Input Anggota &amp; Pesanan</h3>
            <p className="text-xs text-slate-400">Masukkan nama teman dan harga menu masing-masing, atau isi menu patungan bersama.</p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 font-black text-base flex items-center justify-center mx-auto border border-teal-500/30">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-200">Set Pajak &amp; Diskon Promo</h3>
            <p className="text-xs text-slate-400">Sesuaikan persen Pajak PB1 (10%), Service Charge (5%), dan Voucher diskon dari struk kasir.</p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 font-black text-base flex items-center justify-center mx-auto border border-cyan-500/30">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-200">Bagikan ke WhatsApp &amp; QRIS</h3>
            <p className="text-xs text-slate-400">Salin teks tagihan terformat dan bagikan info QRIS transfer langsung ke grup WAG.</p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="space-y-4 max-w-3xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <span>Pertanyaan Sering Diajukan (FAQ)</span>
          </h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-bold text-slate-200 flex items-center justify-between gap-2 hover:text-emerald-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer CTA Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 p-8 text-center border border-emerald-500/30 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
            Siap Nongkrong Bebas Pusing Recehan?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Gunakan FairShare sekarang untuk menghitung patungan struk makanan dalam hitungan detik.
          </p>
          <div className="pt-3">
            <button
              type="button"
              onClick={onGoToCalculator}
              className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-xl shadow-emerald-500/30 transition-all inline-flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Buka Kalkulator FairShare</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
