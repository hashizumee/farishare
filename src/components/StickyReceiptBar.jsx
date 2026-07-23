import React from 'react';
import { CheckCircle2, AlertTriangle, Share2, CreditCard, Receipt, FileText } from 'lucide-react';
import { formatRupiah, parseRupiah } from '../utils/formatter';

export default function StickyReceiptBar({
  calculatedTotal,
  receiptTarget,
  onReceiptTargetChange,
  onOpenExportModal,
  onOpenPaymentModal
}) {
  const targetNum = Number(receiptTarget) || 0;
  const isTargetSet = targetNum > 0;
  const diff = calculatedTotal - targetNum;
  const isMatch = isTargetSet && diff === 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 shadow-2xl p-3 sm:p-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: App Total vs Physical Receipt Verification */}
        <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
          
          <div>
            <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
              Total Aplikasi
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">
              {formatRupiah(calculatedTotal)}
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block" />

          {/* Physical Receipt Input */}
          <div className="flex items-center gap-2">
            <div className="text-right sm:text-left">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">
                Struk Fisik (Pencocokan)
              </label>
              <div className="relative">
                <span className="absolute left-2 top-1.5 text-xs font-semibold text-slate-500">Rp</span>
                <input
                  type="text"
                  value={receiptTarget ? formatRupiah(receiptTarget, false) : ''}
                  onChange={(e) => onReceiptTargetChange(parseRupiah(e.target.value))}
                  className="w-32 bg-slate-900 border border-slate-700/80 rounded-lg pl-7 pr-2 py-1 text-xs font-bold text-slate-100 focus:outline-none focus:border-emerald-500"
                  placeholder="Isi total struk..."
                />
              </div>
            </div>

            {/* Verification Status Badge */}
            {isTargetSet && (
              <div className="hidden md:flex items-center">
                {isMatch ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 animate-bounce">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Pas 100%!</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/30">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Selisih {formatRupiah(Math.abs(diff))}</span>
                  </span>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right: Main Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          
          {/* Bank / Payment Info Button */}
          <button
            type="button"
            onClick={onOpenPaymentModal}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 px-3.5 py-2.5 rounded-xl transition-all active:scale-95 shadow-md"
            title="Pengaturan info rekening transfer"
          >
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Info</span> Rekening
          </button>

          {/* Export / WhatsApp Share Button */}
          <button
            type="button"
            onClick={onOpenExportModal}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:brightness-110 px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4 text-slate-950" />
            <span>Bagikan Ringkasan</span>
          </button>

        </div>

      </div>
    </div>
  );
}
