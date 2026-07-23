import React from 'react';
import { Receipt, CheckCircle, HelpCircle, ArrowRight, Wallet, ShoppingBag } from 'lucide-react';
import { formatRupiah } from '../utils/formatter';

export default function ReceiptSummary({ calculations, globalSettings }) {
  const { peopleBreakdown = [], subtotalAll = 0, serviceTotalAll = 0, taxTotalAll = 0, grandTotal = 0 } = calculations;

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/60 bg-slate-900/60 shadow-xl mb-24">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Hasil Rincian Pembagian (Breakdown)</h2>
            <p className="text-xs text-slate-400">Proporsi pajak ({globalSettings.taxPercent}%) &amp; servis ({globalSettings.servicePercent}%) dihitung adil per individu</p>
          </div>
        </div>
      </div>

      {/* Grid Cards Per Person */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
        {peopleBreakdown.map((person) => {
          return (
            <div
              key={person.id}
              className="rounded-xl bg-slate-800/60 border border-slate-700/80 p-4 space-y-3 relative overflow-hidden transition-all hover:border-emerald-500/40 shadow-md flex flex-col justify-between"
            >
              {/* Top Accent Line with Person's Color */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: person.color || '#10b981' }}
              />

              <div>
                {/* Person Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs text-slate-950"
                      style={{ backgroundColor: person.color || '#10b981' }}
                    >
                      {person.name ? person.name.charAt(0).toUpperCase() : '?'}
                    </span>
                    <h3 className="font-extrabold text-slate-100 text-base">{person.name}</h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                    {(person.items || []).length} Menu
                  </span>
                </div>

                {/* Items Summary list */}
                <div className="space-y-1 text-xs border-t border-b border-slate-700/50 py-2.5 my-2">
                  {(person.items || []).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-300">
                      <span className="truncate pr-2">• {item.name || 'Pesanan'} ({item.qty || 1}x)</span>
                      <span className="font-semibold text-slate-200">{formatRupiah(item.price * (item.qty || 1))}</span>
                    </div>
                  ))}

                  {(person.sharedItemsShare || []).map((sh, idx) => (
                    <div key={'sh_' + idx} className="flex items-center justify-between text-cyan-300 text-[11px]">
                      <span className="truncate pr-2">🤝 {sh.name} ({sh.splitWithCount} org)</span>
                      <span className="font-semibold">{formatRupiah(sh.shareAmount)}</span>
                    </div>
                  ))}

                  {(!person.items || person.items.length === 0) && (!person.sharedItemsShare || person.sharedItemsShare.length === 0) && (
                    <div className="text-slate-500 italic text-[11px] text-center py-1">Tidak ada pesanan</div>
                  )}
                </div>

                {/* Calculation Breakdown Details */}
                <div className="space-y-1 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Subtotal Menu</span>
                    <span>{formatRupiah(person.subtotal)}</span>
                  </div>
                  {person.serviceShare > 0 && (
                    <div className="flex items-center justify-between text-amber-300/80">
                      <span>Service ({globalSettings.servicePercent}%)</span>
                      <span>+{formatRupiah(person.serviceShare)}</span>
                    </div>
                  )}
                  {person.taxShare > 0 && (
                    <div className="flex items-center justify-between text-emerald-300/80">
                      <span>Tax ({globalSettings.taxPercent}%)</span>
                      <span>+{formatRupiah(person.taxShare)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Pay Footer */}
              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">TOTAL BAYAR</span>
                <span className="text-lg font-black text-emerald-400 tracking-tight">
                  {formatRupiah(person.total)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Total Summary Box */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-4 shadow-inner">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs font-bold text-slate-400">RINGKASAN SELURUH TAGIHAN RESTORAN</div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-slate-300">
            <span>Pesanan Murni: <strong className="text-slate-100">{formatRupiah(subtotalAll)}</strong></span>
            <span>•</span>
            <span>Service: <strong className="text-amber-300">{formatRupiah(serviceTotalAll)}</strong></span>
            <span>•</span>
            <span>Pajak: <strong className="text-emerald-300">{formatRupiah(taxTotalAll)}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="block text-[11px] font-bold text-slate-400 uppercase">Grand Total Aplikasi</span>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              {formatRupiah(grandTotal)}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
