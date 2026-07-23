import React, { useState } from 'react';
import { User, Plus, Trash2, Utensils, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { formatRupiah, parseRupiah } from '../utils/formatter';

const COLOR_PALETTE = [
  { name: 'Emerald', value: '#10b981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  { name: 'Indigo', value: '#6366f1', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400' },
  { name: 'Rose', value: '#f43f5e', bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' },
  { name: 'Amber', value: '#f59e0b', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  { name: 'Cyan', value: '#06b6d4', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { name: 'Purple', value: '#a855f7', bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' }
];

export default function PersonCard({ person, onUpdatePerson, onDeletePerson, personBreakdown }) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const currentColor = COLOR_PALETTE.find(c => c.value === person.color) || COLOR_PALETTE[0];

  const handleNameChange = (newName) => {
    onUpdatePerson({ ...person, name: newName });
  };

  const handleColorChange = (colorValue) => {
    onUpdatePerson({ ...person, color: colorValue });
    setIsColorPickerOpen(false);
  };

  const handleAddItem = () => {
    const newItem = {
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: '',
      price: 0,
      qty: 1
    };
    onUpdatePerson({
      ...person,
      items: [...(person.items || []), newItem]
    });
  };

  const handleItemChange = (itemId, field, value) => {
    const updatedItems = (person.items || []).map(item => {
      if (item.id === itemId) {
        if (field === 'price') {
          return { ...item, price: parseRupiah(value) };
        } else if (field === 'qty') {
          const qty = Math.max(1, Number(value) || 1);
          return { ...item, qty };
        } else {
          return { ...item, [field]: value };
        }
      }
      return item;
    });
    onUpdatePerson({ ...person, items: updatedItems });
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = (person.items || []).filter(item => item.id !== itemId);
    onUpdatePerson({ ...person, items: updatedItems });
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-700/60 bg-slate-900/60 overflow-hidden transition-all shadow-lg hover:border-slate-600/80">
      
      {/* Person Header */}
      <div 
        className="p-3.5 sm:p-4 flex items-center justify-between border-b border-slate-800 bg-slate-900/80 gap-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
          
          {/* Avatar & Color Picker Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-slate-950 shadow-md transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: person.color || '#10b981' }}
              title="Ganti warna avatar"
            >
              {person.name ? person.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
            </button>

            {/* Color Palette Dropdown */}
            {isColorPickerOpen && (
              <div className="absolute top-12 left-0 z-20 bg-slate-800 border border-slate-700 rounded-xl p-2 shadow-2xl flex gap-1.5 backdrop-blur-lg">
                {COLOR_PALETTE.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => handleColorChange(c.value)}
                    className="w-6 h-6 rounded-full border-2 border-slate-900 transition-transform hover:scale-125"
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Name Input */}
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={person.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full bg-transparent font-bold text-slate-100 text-base sm:text-lg focus:outline-none border-b border-transparent focus:border-emerald-500 transition-all placeholder:text-slate-500"
              placeholder="Nama Teman..."
            />
            <div className="text-[11px] text-slate-400 font-medium">
              {(person.items || []).length} pesanan individu
            </div>
          </div>
        </div>

        {/* Breakdown Subtotal & Controls */}
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {personBreakdown && (
            <div className="text-right">
              <span className="block text-xs text-slate-400 font-medium">Est. Total</span>
              <span className="text-sm font-black text-emerald-400">
                {formatRupiah(personBreakdown.total || 0)}
              </span>
            </div>
          )}

          {/* Expand / Collapse Button */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Delete Person Button */}
          <button
            type="button"
            onClick={() => onDeletePerson(person.id)}
            className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
            title="Hapus teman ini"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Item Entries List (Collapsible) */}
      {isExpanded && (
        <div className="p-3.5 sm:p-4 space-y-3">
          
          {(person.items || []).length === 0 ? (
            <div className="text-center py-4 px-2 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/30">
              <Utensils className="w-6 h-6 text-slate-600 mx-auto mb-1" />
              <p className="text-xs text-slate-400 font-medium">Belum ada pesanan individu</p>
              <button
                type="button"
                onClick={handleAddItem}
                className="mt-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/20 transition-all"
              >
                + Tambah Pesanan
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {person.items.map((item, idx) => (
                <div 
                  key={item.id || idx}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700/60 transition-all"
                >
                  {/* Item Name Input */}
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-medium text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    placeholder="Nama Menu (misal: Nasi Goreng)"
                  />

                  <div className="flex items-center gap-2">
                    {/* Price Input */}
                    <div className="relative flex-1 sm:w-36">
                      <span className="absolute left-2.5 top-2 text-xs font-semibold text-slate-500">Rp</span>
                      <input
                        type="text"
                        value={item.price ? formatRupiah(item.price, false) : ''}
                        onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-8 pr-2 py-2 text-xs font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                        placeholder="0"
                      />
                    </div>

                    {/* Qty Stepper */}
                    <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => handleItemChange(item.id, 'qty', Math.max(1, (item.qty || 1) - 1))}
                        className="px-2 py-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 active:bg-slate-700 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-200 min-w-[20px] text-center">
                        {item.qty || 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleItemChange(item.id, 'qty', (item.qty || 1) + 1)}
                        className="px-2 py-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 active:bg-slate-700 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Add Action Button (Fat-finger friendly) */}
          {(person.items || []).length > 0 && (
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full py-2 border border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Pesanan {person.name ? `untuk ${person.name}` : ''}</span>
            </button>
          )}

        </div>
      )}

    </div>
  );
}
