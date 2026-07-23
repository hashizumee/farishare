import React, { useState } from 'react';
import { History, BookmarkPlus, FolderOpen, Trash2, Calendar, Users, TrendingUp, Sparkles, Check } from 'lucide-react';
import { formatRupiah } from '../utils/formatter';

export default function HistoryPage({
  historyList = [],
  onSaveCurrentBill,
  onLoadBill,
  onDeleteBill,
  currentGrandTotal
}) {
  const [saveTitle, setSaveTitle] = useState('');
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!saveTitle.trim()) return;
    onSaveCurrentBill(saveTitle);
    setSaveTitle('');
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 2500);
  };

  const totalSpentAllHistory = historyList.reduce((sum, item) => sum + (item.grandTotal || 0), 0);
  const avgSpentPerBill = historyList.length > 0 ? totalSpentAllHistory / historyList.length : 0;

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      
      {/* Page Header & Save Active Bill Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/60 bg-slate-900/60 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Riwayat Struk &amp; Arsip Patungan</h2>
            <p className="text-xs text-slate-400">Simpan sesi kalkulasi untuk dibuka kembali kapan saja</p>
          </div>
        </div>

        {/* Save Current Session Widget */}
        <form onSubmit={handleSave} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            value={saveTitle}
            onChange={(e) => setSaveTitle(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            placeholder="Nama Struk Ini (misal: Makan Malam Holycow 23 Juli)"
          />
          <button
            type="submit"
            disabled={!saveTitle.trim()}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            {isSavedSuccess ? <Check className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
            <span>{isSavedSuccess ? 'Tersimpan!' : 'Simpan Struk Aktif'}</span>
          </button>
        </form>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-panel p-4 rounded-xl border border-slate-700/60 bg-slate-900/60">
          <span className="block text-[10px] font-bold text-slate-400 uppercase">Total Pengeluaran Tersimpan</span>
          <span className="text-xl font-black text-emerald-400">{formatRupiah(totalSpentAllHistory)}</span>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-slate-700/60 bg-slate-900/60">
          <span className="block text-[10px] font-bold text-slate-400 uppercase">Rata-rata per Struk</span>
          <span className="text-xl font-black text-cyan-400">{formatRupiah(avgSpentPerBill)}</span>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-slate-700/60 bg-slate-900/60">
          <span className="block text-[10px] font-bold text-slate-400 uppercase">Jumlah Struk Terarsip</span>
          <span className="text-xl font-black text-slate-200">{historyList.length} Struk</span>
        </div>
      </div>

      {/* History Grid List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-200 px-1">Daftar Struk Tersimpan ({historyList.length})</h3>

        {historyList.length === 0 ? (
          <div className="glass-panel rounded-2xl p-8 text-center border-2 border-dashed border-slate-800 bg-slate-900/20">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-300">Belum Ada Riwayat Struk</h4>
            <p className="text-xs text-slate-500 mt-1">Ketik nama pada kolom di atas untuk menyimpan struk aktif saat ini</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {historyList.map((item) => {
              const formattedDate = new Date(item.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

              return (
                <div
                  key={item.id}
                  className="rounded-2xl p-4 bg-slate-900/80 border border-slate-700/80 hover:border-emerald-500/40 transition-all shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-extrabold text-slate-100 text-base truncate pr-2">{item.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {item.peopleCount} Orang
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formattedDate}</span>
                    </div>

                    <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50 mb-3 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Total Struk:</span>
                      <span className="text-base font-black text-emerald-400">{formatRupiah(item.grandTotal)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 gap-2">
                    <button
                      type="button"
                      onClick={() => onLoadBill(item)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3 py-2 rounded-xl transition-all shadow-md"
                    >
                      <FolderOpen className="w-4 h-4 text-slate-950" />
                      <span>Buka Struk Ini</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteBill(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-rose-500/10 rounded-xl border border-slate-700 transition-colors"
                      title="Hapus dari riwayat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
