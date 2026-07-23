import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageSquare, Link } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateWhatsAppSummary } from '../utils/formatter';
import { encodeStateToUrl } from '../utils/urlSharer';

export default function ExportModal({
  isOpen,
  onClose,
  people,
  sharedItems,
  calculations,
  globalSettings,
  paymentInfo,
  receiptTarget
}) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const formattedText = generateWhatsAppSummary({
    people,
    sharedItems,
    calculations,
    globalSettings,
    paymentInfo,
    receiptTarget
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyLink = () => {
    const url = encodeStateToUrl({ people, sharedItems, globalSettings });
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    handleCopy();
    const encoded = encodeURIComponent(formattedText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Bagikan Rincian Tagihan</h3>
              <p className="text-xs text-slate-400">Teks terformat &amp; link web interaktif untuk grup WA</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text Preview Box */}
        <div className="p-4 overflow-y-auto flex-1">
          <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed select-all">
            {formattedText}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex flex-col gap-3">
          
          <div className="flex items-center justify-between">
            {copied || linkCopied ? (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{linkCopied ? 'Link Web Tersalin! 🎉' : 'Teks Tersalin ke Clipboard! 🎉'}</span>
              </span>
            ) : (
              <span className="text-xs text-slate-400">
                Pilih metode ekspor pilihanmu
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 px-3 py-2.5 rounded-xl text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all flex items-center justify-center gap-1.5"
            >
              <Link className="w-4 h-4 text-cyan-400" />
              <span>{linkCopied ? 'Link Tersalin!' : 'Salin Link Web'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`flex-1 px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                copied
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-emerald-400" />}
              <span>{copied ? 'Tersalin!' : 'Salin Teks WA'}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="flex-1 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Buka WA</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
