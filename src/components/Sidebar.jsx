import React from 'react';
import {
  Home,
  Calculator,
  Scale,
  History,
  CreditCard,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  X,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  onTabChange,
  pendingCount = 0,
  historyCount = 0,
  onOpenWheel,
  onReset,
  isSaved,
  isOpenMobile,
  onCloseMobile
}) {
  const tabs = [
    {
      id: 'landing',
      label: 'Beranda',
      icon: Home,
      desc: 'Halaman Utama & FAQ'
    },
    {
      id: 'calculator',
      label: 'Kalkulator',
      icon: Calculator,
      desc: 'Hitung Pesanan Struk'
    },
    {
      id: 'settlement',
      label: 'Pelunasan',
      icon: Scale,
      desc: 'Matriks Siapa Bayar',
      badge: pendingCount > 0 ? `${pendingCount}` : null
    },
    {
      id: 'history',
      label: 'Riwayat Struk',
      icon: History,
      desc: 'Arsip Data Tersimpan',
      badge: historyCount > 0 ? `${historyCount}` : null
    },
    {
      id: 'payment',
      label: 'Kartu QRIS',
      icon: CreditCard,
      desc: 'Profil Bank & QRIS'
    }
  ];

  const handleSelectTab = (id) => {
    onTabChange(id);
    if (onCloseMobile) onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between p-4 space-y-6">
      {/* Brand Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 shadow-md">
              <div className="w-4 h-4 rounded-md bg-gradient-to-tr from-emerald-400 to-teal-300 transform rotate-45 shadow-sm shadow-emerald-500/50" />
              <div className="absolute inset-0 rounded-xl bg-emerald-500/10 blur-sm pointer-events-none" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-100 font-sans">
                  Fair<span className="text-emerald-400">Share</span>
                </span>
                <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Tax &amp; Split Bill Presisi
              </p>
            </div>
          </div>

          {/* Close button on mobile drawer */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="border-b border-slate-800/80" />

        {/* Navigation Items */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-3">
            MENU UTAMA
          </span>
          <div className="space-y-1 pt-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(tab.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-xs leading-tight">{tab.label}</div>
                      <div className={`text-[10px] font-normal ${isActive ? 'text-slate-900/80' : 'text-slate-400'}`}>
                        {tab.desc}
                      </div>
                    </div>
                  </div>

                  {tab.badge ? (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-slate-950 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  ) : (
                    <ChevronRight className={`w-3.5 h-3.5 opacity-40 ${isActive ? 'text-slate-950 opacity-80' : ''}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Widgets & Bottom Actions */}
      <div className="space-y-3 pt-4 border-t border-slate-800/80">
        
        {/* Spin Wheel Traktiran Button */}
        <button
          type="button"
          onClick={() => {
            onOpenWheel();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-all active:scale-95 text-left"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-extrabold">Roda Traktiran 🎲</span>
          </div>
          <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">SPIN</span>
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={() => {
            onReset();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/90 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition-all text-xs font-bold"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Data Struk</span>
        </button>

        {/* Footer Storage Indicator */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-[10px] text-slate-400">
            <span className="font-bold text-slate-300">Auto-Save HP</span>
            <div>Tersimpan di browser lokal</div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:block w-64 bg-slate-950 border-r border-slate-800/80 fixed top-0 bottom-0 left-0 z-30 overflow-y-auto">
        {navContent}
      </aside>

      {/* Mobile Drawer (Slide Over Backdrop) */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
            onClick={onCloseMobile}
          />
          <aside className="relative w-72 max-w-[85vw] bg-slate-950 border-r border-slate-800 h-full shadow-2xl z-10 animate-slide-in">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
