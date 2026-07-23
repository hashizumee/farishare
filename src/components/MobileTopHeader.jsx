import React from 'react';
import { Menu, Sparkles, RotateCcw } from 'lucide-react';

export default function MobileTopHeader({ onOpenSidebar, onOpenWheel, onReset }) {
  return (
    <header className="lg:hidden sticky top-0 z-30 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-xl px-4 h-14 flex items-center justify-between">
      
      {/* Left: Hamburger Menu & Brand */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="p-2 text-slate-200 hover:text-emerald-400 rounded-xl bg-slate-900 border border-slate-800 active:scale-95 transition-all"
          title="Buka Sidebar Navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5">
          <span className="text-base font-black tracking-tight text-slate-100 font-sans">
            Fair<span className="text-emerald-400">Share</span>
          </span>
          <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            PRO
          </span>
        </div>
      </div>

      {/* Right: Quick Roda Traktiran & Reset */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenWheel}
          className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1"
          title="Putar Roda Traktiran"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">Roda</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs font-bold"
          title="Reset Data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

    </header>
  );
}
