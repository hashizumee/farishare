import React, { useState } from 'react';
import { X, Sparkles, Trophy, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SpinWheelModal({ isOpen, onClose, people = [] }) {
  if (!isOpen) return null;

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);

  const activePeople = people.length > 0 ? people : [
    { id: '1', name: 'Teman 1', color: '#10b981' },
    { id: '2', name: 'Teman 2', color: '#6366f1' },
    { id: '3', name: 'Teman 3', color: '#f43f5e' }
  ];

  const handleSpin = () => {
    if (isSpinning || activePeople.length === 0) return;

    setIsSpinning(true);
    setWinner(null);

    // Pick random winner index
    const winnerIndex = Math.floor(Math.random() * activePeople.length);
    const sliceDegree = 360 / activePeople.length;
    // Calculate rotation to align selected segment to top (90 deg pointer)
    const extraRotations = 5 * 360; // 5 full spins
    const targetDegree = extraRotations + (360 - (winnerIndex * sliceDegree + sliceDegree / 2));

    setRotation(targetDegree);

    setTimeout(() => {
      setIsSpinning(false);
      const selected = activePeople[winnerIndex];
      setWinner(selected);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden flex flex-col items-center p-6 text-center">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-left">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Roda Traktiran FairShare 🎲</h3>
              <p className="text-xs text-slate-400">Putar roda untuk menentukan siapa yang menalangi/traktir!</p>
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

        {/* Wheel Display Container */}
        <div className="relative w-64 h-64 my-4 flex items-center justify-center">
          
          {/* Top Arrow Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-md" />

          {/* SVG Wheel */}
          <div
            className="w-full h-full rounded-full border-4 border-slate-800 shadow-2xl overflow-hidden transition-transform duration-[4000ms] cubic-bezier(0.15, 0.99, 0.35, 1)"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {activePeople.map((person, idx) => {
                const total = activePeople.length;
                const angle = 360 / total;
                const startAngle = idx * angle;
                const endAngle = (idx + 1) * angle;

                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                const largeArcFlag = angle > 180 ? 1 : 0;
                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                // Label angle text positioning
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
                      fontSize="4.5"
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
          <div className="absolute w-12 h-12 rounded-full bg-slate-950 border-2 border-amber-400 shadow-xl flex items-center justify-center text-xs font-black text-amber-400">
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
          disabled={isSpinning}
          className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{isSpinning ? 'Memutar Roda...' : 'Putar Roda Sekarang!'}</span>
        </button>

      </div>
    </div>
  );
}
