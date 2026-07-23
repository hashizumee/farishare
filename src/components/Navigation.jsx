import React from 'react';
import { Calculator, Scale, History, CreditCard } from 'lucide-react';

export default function Navigation({ activeTab, onTabChange, pendingCount = 0, historyCount = 0 }) {
  const tabs = [
    {
      id: 'calculator',
      label: 'Kalkulator',
      icon: Calculator
    },
    {
      id: 'settlement',
      label: 'Pelunasan',
      icon: Scale,
      badge: pendingCount > 0 ? `${pendingCount}` : null
    },
    {
      id: 'history',
      label: 'Riwayat Struk',
      icon: History,
      badge: historyCount > 0 ? `${historyCount}` : null
    },
    {
      id: 'payment',
      label: 'Kartu Rekening',
      icon: CreditCard
    }
  ];

  return (
    <>
      {/* Desktop Segmented Control Bar */}
      <nav className="hidden md:block bg-slate-950/60 border-b border-slate-800/60 backdrop-blur-md py-2.5 sticky top-16 z-20">
        <div className="max-w-6xl mx-auto px-4 flex justify-center">
          <div className="inline-flex items-center gap-1 bg-slate-900/90 border border-slate-800/80 p-1.5 rounded-2xl shadow-inner">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>

                  {tab.badge && (
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-slate-950 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-xl px-2 py-2 shadow-2xl">
        <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center py-2 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-500/10 font-extrabold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] leading-tight">{tab.label}</span>
                {tab.badge && !isActive && (
                  <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
