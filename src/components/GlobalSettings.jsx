import React, { useState } from 'react';
import { Percent, Settings, Tag, Coffee, Gift, HeartHandshake, ChevronDown, ChevronUp } from 'lucide-react';
import { formatRupiah, parseRupiah } from '../utils/formatter';

export default function GlobalSettings({ settings, onChange }) {
  const { taxPercent, servicePercent, discountPercent = 0, discountNominal = 0, tipNominal = 0 } = settings;
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleTaxChange = (val) => {
    const num = Math.max(0, Math.min(100, Number(val) || 0));
    onChange({ ...settings, taxPercent: num });
  };

  const handleServiceChange = (val) => {
    const num = Math.max(0, Math.min(100, Number(val) || 0));
    onChange({ ...settings, servicePercent: num });
  };

  const handleDiscountPercentChange = (val) => {
    const num = Math.max(0, Math.min(100, Number(val) || 0));
    onChange({ ...settings, discountPercent: num });
  };

  const handleDiscountNominalChange = (val) => {
    onChange({ ...settings, discountNominal: parseRupiah(val) });
  };

  const handleTipChange = (val) => {
    onChange({ ...settings, tipNominal: parseRupiah(val) });
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/60 bg-slate-900/60 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Pengaturan Biaya &amp; Diskon Restoran</h2>
            <p className="text-xs text-slate-400">Atur Tax, Service Charge, Voucher Promo, &amp; Tips secara proporsional</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/20"
        >
          <span>{showAdvanced ? 'Sembunyikan Opsi Diskon' : '+ Diskon & Tip'}</span>
          {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Service Charge Input */}
        <div className="bg-slate-800/50 rounded-xl p-3.5 border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <Coffee className="w-3.5 h-3.5" />
              <span>Service Charge (%)</span>
            </label>
            <span className="text-[11px] text-slate-400">Biasanya 5% - 7%</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="relative flex-1">
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={servicePercent}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-bold text-amber-300 focus:outline-none focus:border-amber-500 pr-8"
                placeholder="0"
              />
              <Percent className="w-4 h-4 text-slate-500 absolute right-3 top-2" />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1">
            {[0, 5, 7, 10].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleServiceChange(preset)}
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md transition-all ${
                  Number(servicePercent) === preset
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border border-slate-700/60 hover:text-slate-200'
                }`}
              >
                {preset}% {preset === 0 ? '(Bebas)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Tax (PB1 / PPN) Input */}
        <div className="bg-slate-800/50 rounded-xl p-3.5 border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
              <Tag className="w-3.5 h-3.5" />
              <span>Pajak Restoran / PB1 (%)</span>
            </label>
            <span className="text-[11px] text-slate-400">PB1 10% / PPN 11%</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="relative flex-1">
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={taxPercent}
                onChange={(e) => handleTaxChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-bold text-emerald-300 focus:outline-none focus:border-emerald-500 pr-8"
                placeholder="0"
              />
              <Percent className="w-4 h-4 text-slate-500 absolute right-3 top-2" />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1">
            {[0, 10, 11].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleTaxChange(preset)}
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md transition-all ${
                  Number(taxPercent) === preset
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border border-slate-700/60 hover:text-slate-200'
                }`}
              >
                {preset}% {preset === 10 ? '(PB1 Resto)' : preset === 11 ? '(PPN)' : '(Bebas)'}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Advanced Section: Discount & Tip */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          
          {/* Voucher Promo / Discount Input */}
          <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/40">
            <label className="flex items-center gap-1.5 text-xs font-bold text-rose-300 mb-2">
              <Gift className="w-3.5 h-3.5" />
              <span>Diskon Resto / Voucher Promo</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="block text-[10px] text-slate-400 mb-1">Diskon Persen (%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => handleDiscountPercentChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-rose-300 focus:outline-none"
                  placeholder="0%"
                />
              </div>

              <div>
                <span className="block text-[10px] text-slate-400 mb-1">Diskon Nominal (Rp)</span>
                <input
                  type="text"
                  value={discountNominal ? formatRupiah(discountNominal, false) : ''}
                  onChange={(e) => handleDiscountNominalChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-rose-300 focus:outline-none"
                  placeholder="Rp 0"
                />
              </div>
            </div>
          </div>

          {/* Tip Input */}
          <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/40">
            <label className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 mb-2">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Tips Waiter / Driver (Opsional)</span>
            </label>

            <div className="relative">
              <span className="absolute left-2.5 top-2 text-xs font-semibold text-slate-500">Rp</span>
              <input
                type="text"
                value={tipNominal ? formatRupiah(tipNominal, false) : ''}
                onChange={(e) => handleTipChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-2 py-1.5 text-xs font-bold text-cyan-300 focus:outline-none"
                placeholder="0"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Dibagi rata ke seluruh anggota kelompok</p>
          </div>

        </div>
      )}

    </div>
  );
}
