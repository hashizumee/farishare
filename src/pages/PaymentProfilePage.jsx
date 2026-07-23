import React, { useState } from 'react';
import { CreditCard, QrCode, Copy, Check, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { formatRupiah } from '../utils/formatter';

const BANK_PRESETS = [
  'BCA', 'Mandiri', 'BNI', 'BRI', 'Seabank', 'BSI', 'GoPay', 'OVO', 'Dana', 'ShopeePay', 'QRIS'
];

export default function PaymentProfilePage({ paymentInfo, onSavePaymentInfo }) {
  const [form, setForm] = useState({ ...paymentInfo });
  const [copied, setCopied] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSavePaymentInfo(form);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleCopyAccount = () => {
    if (!form.accountNumber) return;
    navigator.clipboard.writeText(form.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-24 animate-fade-in max-w-4xl mx-auto">
      
      {/* Page Title Header */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/60 bg-slate-900/60 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Profil Rekening &amp; QRIS Pembayaran</h2>
            <p className="text-xs text-slate-400">Atur kartu digital &amp; info transfer yang akan dikirim ke teman</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Left Column: Digital Bank Card Preview Showcase */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200 px-1">Preview Kartu Digital</h3>

          {/* Card Component */}
          <div className="relative rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-cyan-950 p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 text-slate-100 overflow-hidden space-y-6">
            
            {/* Card Background Glow Accents */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top Row: Chip & Bank Name */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-amber-400 to-amber-200 border border-amber-300/50 shadow-inner flex items-center justify-center">
                  <div className="w-6 h-4 border border-amber-700/30 rounded-sm" />
                </div>
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">DEBIT / TRANSFER</span>
              </div>
              <span className="text-lg font-black text-cyan-300 tracking-wider">
                {form.bankName || 'BANK'}
              </span>
            </div>

            {/* Middle Row: Account Number */}
            <div className="relative z-10 my-4">
              <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                NOMOR REKENING / ID E-WALLET
              </span>
              <div className="font-mono text-xl sm:text-2xl font-black tracking-widest text-slate-100 select-all">
                {form.accountNumber || '1234 •••• •••• 7890'}
              </div>
            </div>

            {/* Bottom Row: Holder Name & Copy Action */}
            <div className="flex items-center justify-between relative z-10 border-t border-slate-700/60 pt-4">
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase">ATAS NAMA (HOLDER)</span>
                <span className="text-sm font-extrabold text-slate-100 uppercase tracking-wide">
                  {form.accountHolder || 'NAMA PEMILIK REKENING'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyAccount}
                disabled={!form.accountNumber}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 px-3 py-1.5 rounded-lg shadow-md transition-all active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
                <span>{copied ? 'Tersalin!' : 'Salin Rekening'}</span>
              </button>
            </div>

          </div>

          {/* Notes display */}
          {form.notes && (
            <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-cyan-400 block mb-0.5">Catatan Transfer:</span>
              <p className="italic text-slate-400">{form.notes}</p>
            </div>
          )}

          {/* Styled QRIS Placeholder */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 bg-slate-900/40 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300">
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>Standar QRIS Indonesia</span>
            </div>
            <p className="text-[11px] text-slate-400">Siap menerima transfer otomatis via BCA Mobile, GoPay, OVO, ShopeePay, Dana, &amp; Mobile Banking.</p>
          </div>

        </div>

        {/* Right Column: Edit Details Form */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 bg-slate-900/60 shadow-xl">
          <h3 className="text-sm font-bold text-slate-200 mb-4 border-b border-slate-800 pb-2">
            Edit Informasi Rekening
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Bank Name & Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Pilih Bank / E-Wallet
              </label>
              <input
                type="text"
                value={form.bankName}
                onChange={(e) => handleChange('bankName', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-cyan-500 mb-2"
                placeholder="misal: BCA, GoPay, OVO, QRIS"
              />
              <div className="flex flex-wrap gap-1">
                {BANK_PRESETS.map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => handleChange('bankName', b)}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-all ${
                      form.bankName === b
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-800 text-slate-400 border-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nomor Rekening / Nomor HP
              </label>
              <input
                type="text"
                value={form.accountNumber}
                onChange={(e) => handleChange('accountNumber', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-500"
                placeholder="misal: 1234567890"
              />
            </div>

            {/* Account Holder */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Atas Nama Pemilik Rekening (A.N.)
              </label>
              <input
                type="text"
                value={form.accountHolder}
                onChange={(e) => handleChange('accountHolder', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-cyan-500"
                placeholder="misal: Andi Wijaya"
              />
            </div>

            {/* Custom QRIS Image Upload */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Upload QRIS Sendiri (Opsional)</span>
                {form.qrisImage && (
                  <button
                    type="button"
                    onClick={() => handleChange('qrisImage', '')}
                    className="text-[10px] text-rose-400 hover:underline"
                  >
                    Hapus Gambar
                  </button>
                )}
              </label>

              {form.qrisImage ? (
                <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-950 p-2 text-center">
                  <img
                    src={form.qrisImage}
                    alt="Custom QRIS"
                    className="max-h-48 mx-auto object-contain rounded-lg"
                  />
                  <span className="text-[10px] text-emerald-400 font-bold block mt-1.5">
                    ✓ QRIS Tersimpan! Siap ditampilkan di struk
                  </span>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl cursor-pointer bg-slate-950/40 hover:bg-slate-900 transition-all text-center">
                  <QrCode className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs font-semibold text-slate-200">Klik untuk upload foto QRIS</span>
                  <span className="text-[10px] text-slate-500">Format PNG/JPG (Maks 2MB)</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 3 * 1024 * 1024) {
                          alert('Ukuran gambar terlalu besar. Maksimal 3MB.');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleChange('qrisImage', reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>

            {/* Save Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 text-xs font-extrabold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{savedNotice ? 'Berhasil Disimpan!' : 'Simpan Rekening Ini'}</span>
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}
