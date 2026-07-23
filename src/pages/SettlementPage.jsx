import React from 'react';
import { Scale, CheckCircle2, Clock, ArrowRight, MessageSquare, ShieldCheck, Wallet, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatRupiah } from '../utils/formatter';

export default function SettlementPage({
  appState,
  calculations,
  onPayerChange,
  onTogglePaidStatus,
  onOpenExportModal
}) {
  const { peopleBreakdown = [], settlements = [], payerPerson, collectedAmount = 0, pendingAmount = 0, grandTotal = 0 } = calculations;
  const payerId = appState.payerId;

  const handlePayerSelect = (e) => {
    onPayerChange(e.target.value);
  };

  const handleRemindWhatsApp = (settlement) => {
    const text = `Hai *${settlement.fromName}*! 👋\n\nTotal patungan makan bersama kamu sebesar *${formatRupiah(settlement.amount)}* belum ditransfer ke *${settlement.toName}*.\n\nMohon transfer ya guys! Terima kasih. ⚡`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const percentCollected = grandTotal > 0 ? Math.round((collectedAmount / grandTotal) * 100) : 0;

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      
      {/* Page Header */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/60 bg-slate-900/60 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Matriks Pelunasan ("Siapa Bayar ke Siapa")</h2>
              <p className="text-xs text-slate-400">Menentukan penanggung jawab struk &amp; meminimalisir transaksi antar anggota</p>
            </div>
          </div>

          {/* Payer Selector */}
          <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/80 flex items-center gap-2">
            <label className="text-xs font-bold text-slate-300 shrink-0">
              Menalangi Struk:
            </label>
            <select
              value={payerId || ''}
              onChange={handlePayerSelect}
              className="bg-slate-900 text-amber-300 font-bold text-xs rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:border-amber-500"
            >
              {peopleBreakdown.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({formatRupiah(p.total)})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Progress Bar Collection Status */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/60 bg-slate-900/60 shadow-xl">
        <div className="flex items-center justify-between mb-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-200">
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span>Status Pengumpulan Uang</span>
          </div>
          <span className="font-extrabold text-emerald-400">{percentCollected}% Lunas</span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex mb-3">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
            style={{ width: `${percentCollected}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
            <span className="block text-[10px] text-slate-400">Total Terkumpul (Lunas)</span>
            <span className="font-extrabold text-emerald-400 text-sm">{formatRupiah(collectedAmount)}</span>
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
            <span className="block text-[10px] text-slate-400">Total Belum Ditransfer</span>
            <span className="font-extrabold text-amber-400 text-sm">{formatRupiah(pendingAmount)}</span>
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50 col-span-2 sm:col-span-1">
            <span className="block text-[10px] text-slate-400">Target Struk Kasir</span>
            <span className="font-extrabold text-slate-200 text-sm">{formatRupiah(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Settlements Cards Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-200 px-1">Daftar Wajib Transfer ({settlements.length} Orang)</h3>

        {settlements.length === 0 ? (
          <div className="glass-panel rounded-2xl p-8 text-center border border-slate-800 text-slate-400 text-xs">
            Tidak ada transaksi transfer yang perlu dilakukan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {settlements.map((st) => (
              <div
                key={st.fromId}
                className={`rounded-2xl p-4 border transition-all shadow-md flex flex-col justify-between ${
                  st.isPaid
                    ? 'bg-slate-900/40 border-emerald-500/30'
                    : 'bg-slate-900/80 border-amber-500/30 hover:border-amber-500/60'
                }`}
              >
                <div>
                  {/* Direction Visual */}
                  <div className="flex items-center justify-between mb-3">
                    {/* From Person */}
                    <div className="flex items-center gap-2">
                      <span
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-slate-950"
                        style={{ backgroundColor: st.fromColor }}
                      >
                        {st.fromName ? st.fromName.charAt(0).toUpperCase() : '?'}
                      </span>
                      <span className="font-extrabold text-slate-100 text-sm">{st.fromName}</span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500" />

                    {/* To Payer */}
                    <div className="flex items-center gap-2">
                      <span
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-slate-950"
                        style={{ backgroundColor: st.toColor }}
                      >
                        {st.toName ? st.toName.charAt(0).toUpperCase() : '?'}
                      </span>
                      <span className="font-extrabold text-slate-100 text-sm">{st.toName}</span>
                    </div>
                  </div>

                  {/* Transfer Amount */}
                  <div className="bg-slate-800/60 rounded-xl p-3 text-center border border-slate-700/50 mb-3">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Nominal Transfer</span>
                    <span className="text-xl font-black text-amber-300 tracking-tight">
                      {formatRupiah(st.amount)}
                    </span>
                  </div>
                </div>

                {/* Actions & Status Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 gap-2">
                  {/* Status Toggle Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onTogglePaidStatus(st.fromId);
                      if (!st.isPaid) {
                        try {
                          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
                        } catch (e) {}
                      }
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all ${
                      st.isPaid
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                    }`}
                  >
                    {st.isPaid ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>LUNAS</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>Tandai Lunas</span>
                      </>
                    )}
                  </button>

                  {/* Remind Button */}
                  <button
                    type="button"
                    onClick={() => handleRemindWhatsApp(st)}
                    className="p-2 text-slate-400 hover:text-emerald-400 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700"
                    title="Ingatkan via WA"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Share Button Footer */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onOpenExportModal}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Bagikan Rincian Lengkap ke WhatsApp</span>
        </button>
      </div>

    </div>
  );
}
