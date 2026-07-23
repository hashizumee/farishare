import React from 'react';
import { UserPlus, Users, Sparkles, Plus } from 'lucide-react';
import PersonCard from './PersonCard';

const DEFAULT_COLORS = ['#10b981', '#6366f1', '#f43f5e', '#f59e0b', '#06b6d4', '#a855f7'];

const PRESET_GROUPS = {
  'Grup Kantor': ['Andi', 'Budi', 'Citra', 'Deni'],
  'Grup Nongkrong': ['Eka', 'Fani', 'Gilang'],
  'Grup Kontrakan': ['Hadi', 'Irfan', 'Joko', 'Kiki']
};

export default function PeopleManager({ people, onUpdatePeople, calculations }) {
  
  const handleAddPerson = () => {
    const nextColor = DEFAULT_COLORS[people.length % DEFAULT_COLORS.length];
    const newPerson = {
      id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: `Teman ${people.length + 1}`,
      color: nextColor,
      items: [
        { id: 'i_' + Date.now(), name: '', price: 0, qty: 1 }
      ]
    };
    onUpdatePeople([...people, newPerson]);
  };

  const handleLoadPresetGroup = (names) => {
    const newPeopleList = names.map((name, idx) => ({
      id: 'p_' + Date.now() + '_' + idx,
      name: name,
      color: DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
      items: [{ id: 'i_' + Date.now() + '_' + idx, name: '', price: 0, qty: 1 }]
    }));
    onUpdatePeople(newPeopleList);
  };

  const handleUpdatePerson = (updatedPerson) => {
    const updated = people.map(p => p.id === updatedPerson.id ? updatedPerson : p);
    onUpdatePeople(updated);
  };

  const handleDeletePerson = (personId) => {
    const updated = people.filter(p => p.id !== personId);
    onUpdatePeople(updated);
  };

  const breakdownMap = React.useMemo(() => {
    const map = new Map();
    if (calculations && calculations.peopleBreakdown) {
      calculations.peopleBreakdown.forEach(p => map.set(p.id, p));
    }
    return map;
  }, [calculations]);

  return (
    <div className="space-y-4 mb-6">
      
      {/* Section Header & Add Person Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 glass-panel rounded-2xl p-4 border border-slate-700/60 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Daftar Orang &amp; Pesanan</h2>
            <p className="text-xs text-slate-400">Masukkan nama &amp; pesanan individu masing-masing anggota</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddPerson}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3.5 sm:px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Tambah Orang</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Loader */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold text-slate-400 shrink-0">⚡ Templat Cepat:</span>
        {Object.entries(PRESET_GROUPS).map(([groupName, names]) => (
          <button
            key={groupName}
            type="button"
            onClick={() => handleLoadPresetGroup(names)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/70 text-[11px] font-semibold shrink-0 transition-all"
          >
            + {groupName} ({names.length} org)
          </button>
        ))}
      </div>

      {/* People Grid */}
      {people.length === 0 ? (
        <div className="glass-panel rounded-2xl p-8 text-center border-2 border-dashed border-slate-800 bg-slate-900/30">
          <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-300">Belum Ada Orang</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">Klik tombol di bawah untuk menambah anggota pertama</p>
          <button
            type="button"
            onClick={handleAddPerson}
            className="text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-4 py-2 rounded-xl shadow-md"
          >
            + Tambah Orang Pertama
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {people.map(person => (
            <PersonCard
              key={person.id}
              person={person}
              onUpdatePerson={handleUpdatePerson}
              onDeletePerson={handleDeletePerson}
              personBreakdown={breakdownMap.get(person.id)}
            />
          ))}
        </div>
      )}

    </div>
  );
}
