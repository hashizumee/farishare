import React, { useState } from 'react';
import { Users, Plus, Trash2, Check, Sparkles, AlertCircle } from 'lucide-react';
import { formatRupiah, parseRupiah } from '../utils/formatter';

export default function SharedItems({ sharedItems = [], people = [], onUpdateSharedItems }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddSharedItem = () => {
    const newItem = {
      id: 'shared_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: '',
      price: 0,
      qty: 1,
      splitWith: [] // Empty means split with everyone
    };
    onUpdateSharedItems([...sharedItems, newItem]);
    setIsFormOpen(true);
  };

  const handleItemChange = (id, field, value) => {
    const updated = sharedItems.map(item => {
      if (item.id === id) {
        if (field === 'price') {
          return { ...item, price: parseRupiah(value) };
        } else if (field === 'qty') {
          return { ...item, qty: Math.max(1, Number(value) || 1) };
        } else {
          return { ...item, [field]: value };
        }
      }
      return item;
    });
    onUpdateSharedItems(updated);
  };

  const toggleParticipant = (itemId, personId) => {
    const updated = sharedItems.map(item => {
      if (item.id === itemId) {
        let current = [...(item.splitWith || [])];
        // If current is empty, it meant all people. Convert to explicit list first if toggling
        if (current.length === 0 && people.length > 0) {
          current = people.map(p => p.id);
        }

        if (current.includes(personId)) {
          current = current.filter(id => id !== personId);
        } else {
          current.push(personId);
        }
        
        // If all people selected again, can simplify to []
        if (current.length === people.length) {
          current = [];
        }

        return { ...item, splitWith: current };
      }
      return item;
    });
    onUpdateSharedItems(updated);
  };

  const setSplitWithAll = (itemId) => {
    const updated = sharedItems.map(item => {
      if (item.id === itemId) {
        return { ...item, splitWith: [] };
      }
      return item;
    });
    onUpdateSharedItems(updated);
  };

  const handleDeleteSharedItem = (id) => {
    const updated = sharedItems.filter(item => item.id !== id);
    onUpdateSharedItems(updated);
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/60 bg-slate-900/60 shadow-xl mb-6">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-100">Menu Patungan (Shared Items)</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Otomatis Dibagi
              </span>
            </div>
            <p className="text-xs text-slate-400">Untuk makanan/minuman yang dimakan bersama (misal: Pizza, Appetizer, Pitcher)</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddSharedItem}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 px-3 py-1.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ Menu Patungan</span>
        </button>
      </div>

      {/* Shared Items List */}
      {sharedItems.length === 0 ? (
        <div className="text-center py-6 px-4 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20">
          <Sparkles className="w-6 h-6 text-slate-600 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">Belum ada menu patungan bersama</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Tambah jika ada menu yang dibagi rata ke beberapa orang</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sharedItems.map((item) => {
            const isSplitAll = !item.splitWith || item.splitWith.length === 0 || item.splitWith.length === people.length;
            const activeParticipantIds = isSplitAll ? people.map(p => p.id) : item.splitWith;
            const totalCost = (item.price || 0) * (item.qty || 1);
            const costPerPerson = activeParticipantIds.length > 0 ? totalCost / activeParticipantIds.length : 0;

            return (
              <div 
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  {/* Item Name */}
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-bold text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                    placeholder="Nama Menu Patungan (misal: Pizza Large)"
                  />

                  {/* Price */}
                  <div className="relative flex-1 sm:w-36">
                    <span className="absolute left-2.5 top-2 text-xs font-semibold text-slate-500">Rp</span>
                    <input
                      type="text"
                      value={item.price ? formatRupiah(item.price, false) : ''}
                      onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-2 py-2 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-500"
                      placeholder="0"
                    />
                  </div>

                  {/* Qty */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400 font-medium">Qty:</span>
                    <input
                      type="number"
                      min="1"
                      value={item.qty || 1}
                      onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                      className="w-14 bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-xs font-bold text-center text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDeleteSharedItem(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Participant Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-slate-300">
                      Dibagi kepada ({activeParticipantIds.length} orang) - <span className="text-cyan-400">{formatRupiah(costPerPerson)} / org</span>:
                    </span>
                    
                    {!isSplitAll && (
                      <button
                        type="button"
                        onClick={() => setSplitWithAll(item.id)}
                        className="text-[11px] text-cyan-400 hover:underline font-semibold"
                      >
                        Pilih Semua Orang
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {people.map((p) => {
                      const isSelected = activeParticipantIds.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => toggleParticipant(item.id, p.id)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                              : 'bg-slate-900 text-slate-500 border-slate-700/60 hover:text-slate-300'
                          }`}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: p.color || '#3b82f6' }}
                          />
                          <span>{p.name || 'Teman'}</span>
                          {isSelected && <Check className="w-3 h-3 text-cyan-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
