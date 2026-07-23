import React from 'react';
import { RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

export default function Header({ onReset, isSaved, onOpenWheel, onGoHome }) {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-xl transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand & Mark Button */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-3 text-left group transition-transform active:scale-95 focus:outline-none"
        >
          {/* Bespoke Logo Icon */}
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-4 h-4 rounded-md bg-gradient-to-tr from-emerald-400 to-teal-300 transform rotate-45 shadow-sm shadow-emerald-500/50" />
            <div className="absolute inset-0 rounded-xl bg-emerald-500/10 blur-sm pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-slate-100 font-sans">
                Fair<span className="text-emerald-400">Share</span>
              </span>
              <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden md:block">
              Kalkulator Patungan &amp; Tax Presisi
            </p>
          </div>
        </button>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Spin Wheel Game Button */}
          <button
            type="button"
            onClick={onOpenWheel}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-full transition-all active:scale-95 shadow-sm"
            title="Putar Roda Traktiran"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Roda Traktiran 🎲</span>
          </button>

          {/* Saved Status Indicator */}
          {isSaved ? (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="hidden sm:inline">Tersimpan di HP</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Auto-Save Aktif</span>
            </div>
          )}

          {/* Reset Action Button */}
          <button
            onClick={onReset}
            type="button"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-rose-400 bg-slate-900 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 px-3.5 py-1.5 rounded-full transition-all active:scale-95 shadow-sm"
            title="Reset data kalkulator"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

        </div>

      </div>
    </header>
  );
}
