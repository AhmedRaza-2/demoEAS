import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { WhatsAppLogo } from './BrandIcons';
import { X, Send, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    'Hi! I want a PPF quote for my car.',
    'What are your available slots for German Detailing?',
    'I want to inquire about Nano Ceramic Tints.'
  ];

  const handleSend = (textToSend?: string) => {
    const message = textToSend || customMsg || 'Hi Empire Auto Spa, I would like to inquire about services.';
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Chat Popover */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 rounded-3xl bg-[#090C14] border border-emerald-500/40 shadow-2xl overflow-hidden mb-2 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-900/80 border border-emerald-400 text-emerald-300 flex items-center justify-center font-bold text-xs">
                  <WhatsAppLogo className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black"></span>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm font-['Syne',sans-serif]">
                  Empire Auto Spa Studio
                </h4>
                <span className="text-[10px] text-emerald-400 font-mono">
                  Usually replies in 5 minutes • G-9 Islamabad
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#06080D]">
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 space-y-1">
              <p className="text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Assalam-o-Alaikum!</span>
              </p>
              <p>Welcome to Empire Auto Spa. How can we help protect or detail your car today?</p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Quick Questions:</span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="w-full p-2 rounded-xl text-left text-[11px] bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-colors flex items-center justify-between"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <span className="text-emerald-400 font-mono">→</span>
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-950/80 hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-emerald-300/60"
        title="Chat on WhatsApp"
        aria-label="Open WhatsApp Chat"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white text-[9px] font-bold text-black items-center justify-center">1</span>
        </span>
        <WhatsAppLogo className="w-7 h-7" />
      </button>
    </div>
  );
};
