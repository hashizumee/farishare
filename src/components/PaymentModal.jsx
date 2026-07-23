import React from 'react';
import { X, CreditCard, Check, QrCode } from 'lucide-react';

const BANK_PRESETS = [
  'BCA', 'Mandiri', 'BNI', 'BRI', 'Seabank', 'BSI', 'GoPay', 'OVO', 'Dana', 'ShopeePay', 'QRIS'
];

export default function PaymentModal({ isOpen, onClose, paymentInfo, onSave }) {
  if (!isOpen) return null;

  const [form, setForm] = React.useState({ ...paymentInfo });

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Info Rekening Pembayaran</h3>
              <p className="text-xs text-slate-400">Untuk dicantumkan saat berbagi tagihan ke WA</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
          
          {/* Bank / E-Wallet Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Bank / E-Wallet
            </label>
            <input
              type="text"
              value={form.bankName}
              onChange={(e) => handleChange('bankName', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-cyan-500 mb-2"
              placeholder="misal: BCA, GoPay, OVO"
            />
            {/* Presets */}
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
              Nomor Rekening / No. HP
            </label>
            <input
              type="text"
              value={form.accountNumber}
              onChange={(e) => handleChange('accountNumber', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-500"
              placeholder="misal: 1234567890"
            />
          </div>

          {/* Account Holder Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Atas Nama (A.N.)
            </label>
            <input
              type="text"
              value={form.accountHolder}
              onChange={(e) => handleChange('accountHolder', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-cyan-500"
              placeholder="misal: Andi Wijaya"
            />
          </div>

          {/* Transfer Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Catatan Transfer (Opsional)
            </label>
            <textarea
              rows="2"
              value={form.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
              placeholder="misal: Tolong kabari kalau sudah transfer ya guys!"
            />
          </div>

          {/* QRIS Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span>Foto QRIS (Opsional)</span>
              {form.qrisImage && (
                <button
                  type="button"
                  onClick={() => handleChange('qrisImage', '')}
                  className="text-[10px] text-rose-400 hover:underline"
                >
                  Hapus
                </button>
              )}
            </label>
            {form.qrisImage ? (
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-950 p-2 text-center">
                <img src={form.qrisImage} alt="QRIS Preview" className="max-h-36 mx-auto object-contain rounded-lg" />
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 p-2.5 border border-dashed border-slate-700 hover:border-cyan-500 rounded-xl cursor-pointer bg-slate-950/40 hover:bg-slate-900 transition-all text-xs font-semibold text-slate-300">
                <QrCode className="w-4 h-4 text-cyan-400" />
                <span>Upload Foto QRIS</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => handleChange('qrisImage', reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            )}
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Info</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
