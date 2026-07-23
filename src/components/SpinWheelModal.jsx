import React, { useState, useEffect } from 'react';
import { X, Sparkles, Trophy, Play, Plus, Trash2, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

const DEFAULT_COLORS = ['#10b981', '#6366f1', '#f43f5e', '#f59e0b', '#06b6d4', '#a855f7', '#ec4899', '#3b82f6'];

export default function SpinWheelModal({ isOpen, onClose, people = [] }) {
  if (!isOpen) return null;

  const [customPeople, setCustomPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);

  // Synchronize when modal opens
  useEffect(() => {
    if (people && people.length > 0) {
      setCustomPeople(people.map((p, i) => ({
        id: p.id || 'sp_' + i,
        name: p.name || `Peserta ${i + 1}`,
        color: p.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]
      })));
    } else {
      setCustomPeople([
        { id: 'sp_1', name: 'Andi', color: '#10b981' },
        { id: 'sp_2', name: 'Budi', color: '#6366f1' },
        { id: 'sp_3', name: 'Citra', color: '#f43f5e' }
      ]);
    }
  }, [isOpen, people]);

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const nextColor = DEFAULT_COLORS[customPeople.length % DEFAULT_COLORS.length];
    const newEntry = {
      id: 'sp_' + Date.now(),
      name: newName.trim(),
      color: nextColor
    };
    setCustomPeople(prev => [...prev, newEntry]);
    setNewName('');
  };

  const handleRemovePerson = (id) => {
    if (customPeople.length <= 1) {
      alert('Minimal harus ada 1 peserta di roda traktiran.');
      return;
    }
    setCustomPeople(prev => prev.filter(p => p.id !== id));
  };

  const handleSpin = () => {
    if (isSpinning || customPeople.length === 0) return;

    setIsSpinning(true);
    setWinner(null);

    // Pick random winner index
    const winnerIndex = Math.floor(Math.random() * customPeople.length);
    const sliceDegree = 360 / customPeople.length;
    // Calculate rotation to align selected segment to top (90 deg pointer)
    const extraRotations = 6 * 360; // 6 full spins
    const targetDegree = extraRotations + (360 - (winnerIndex * sliceDegree + sliceDegree / 2));

    setRotation(targetDegree);

    setTimeout(() => {
      setIsSpinning(false);
      const selected = customPeople[winnerIndex];
      setWinner(selected);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 4200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden flex flex-col items-center p-5 text-center max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <div className="flex items-center gap-2 text-left">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Roda Traktiran FairShare 🎲</h3>
              <p className="text-xs text-slate-400">Tambah peserta &amp; putar roda untuk menentukan siapa yang traktir!</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Person Form */}
        <form onSubmit={handleAddPerson} className="w-full flex items-center gap-2 mb-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            placeholder="Tambah nama peserta roda... (misal: Joko)"
          />
          <button
            type="submit"
            disabled={!newName.trim()}
            className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl shadow-md transition-all flex items-center gap-1 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah</span>
          </button>
        </form>

        {/* Active Participants Chips */}
        <div className="w-full flex flex-wrap gap-1.5 justify-center mb-2 max-h-24 overflow-y-auto p-1 bg-slate-950/40 rounded-xl border border-slate-800">
          {customPeople.map((person) => (
            <span
              key={person.id}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border bg-slate-900 border-slate-700 text-slate-200"
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: person.color }} />
              <span>{person.name}</span>
              <button
                type="button"
                onClick={() => handleRemovePerson(person.id)}
                className="p-0.5 text-slate-400 hover:text-rose-400"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Wheel Display Container */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 my-2 flex items-center justify-center shrink-0">
          
          {/* Top Arrow Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-md" />

          {/* SVG Wheel */}
          <div
            className="w-full h-full rounded-full border-4 border-slate-800 shadow-2xl overflow-hidden transition-transform duration-[4200ms] cubic-bezier(0.15, 0.99, 0.35, 1)"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {customPeople.map((person, idx) => {
                const total = customPeople.length;
                const angle = 360 / total;
                const startAngle = idx * angle;
                const endAngle = (idx + 1) * angle;

                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                const largeArcFlag = angle > 180 ? 1 : 0;
                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                const midAngle = startAngle + angle / 2;
                const labelX = 50 + 32 * Math.cos((Math.PI * midAngle) / 180);
                const labelY = 50 + 32 * Math.sin((Math.PI * midAngle) / 180);

                return (
                  <g key={person.id || idx}>
                    <path d={pathData} fill={person.color || '#3b82f6'} stroke="#0f172a" strokeWidth="0.5" />
                    <text
                      x={labelX}
                      y={labelY}
                      fill="#ffffff"
                      fontSize="4.2"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                      transform={`rotate(${midAngle + 90}, ${labelX}, ${labelY})`}
                    >
                      {person.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Knob */}
          <div className="absolute w-11 h-11 rounded-full bg-slate-950 border-2 border-amber-400 shadow-xl flex items-center justify-center text-[10px] font-black text-amber-400">
            FS
          </div>

        </div>

        {/* Winner Announcement */}
        {winner && (
          <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 my-2 animate-bounce flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-200">
              Pemenang Traktiran: <span className="text-amber-400 font-extrabold uppercase">{winner.name}</span> 🎉
            </span>
          </div>
        )}

        {/* Spin Button */}
        <button
          type="button"
          onClick={handleSpin}
          disabled={isSpinning || customPeople.length === 0}
          className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{isSpinning ? 'Memutar Roda...' : `Putar Roda (${customPeople.length} Peserta)`}</span>
        </button>

      </div>
    </div>
  );
}
