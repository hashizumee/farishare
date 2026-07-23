import React from 'react';
import { Home, Calculator, Scale, History, CreditCard } from 'lucide-react';

export default function Navigation({ activeTab, onTabChange, pendingCount = 0, historyCount = 0 }) {
  const tabs = [
    {
      id: 'landing',
      label: 'Beranda',
      icon: Home
    },
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
      label: 'Kartu QRIS',
      icon: CreditCard
    }
  ];

  return (
    <nav className="sticky top-16 z-20 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl py-2">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        
        {/* Horizontal Scrollable Tab Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-extrabold shrink-0 transition-all active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800/80'
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
  );
}
