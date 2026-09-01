import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { WhatsAppLogo } from './BrandIcons';
import { Shield, Sparkles, Sun, Droplets, Award, CheckCircle2, ChevronRight, Flame, ShieldAlert, Cpu } from 'lucide-react';

interface PPFFeaturesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const PPFFeaturesSection: React.FC<PPFFeaturesSectionProps> = ({
  onOpenBooking
}) => {
  const [selectedPack, setSelectedPack] = useState<'full' | 'front' | 'custom'>('full');

  const packages = {
    full: {
      name: 'Full Body Complete TPU Armor',
      coverage: '100% of Painted Panels + Headlights + Door Cups + Pillar Gloss',
      ideal: 'High-end luxury vehicles, supercars, and brand new factory showroom deliveries.',
      warranty: '10-Year Warranty against yellowing, bubbling, and cracking.',
      highlights: ['Full Bonnet, Bumpers, Wings, Doors, Roof & Trunk', 'Wrapped Edges for Invisible Seamless Finish', 'Self-Healing Heat Reactive Topcoat']
    },
    front: {
      name: 'Front High-Impact Highway Package',
      coverage: 'Front Bumper + Full Hood + Front Fenders + Headlights + Side Mirrors',
      ideal: 'Daily motorway commuters on M-2 / Islamabad Expressway facing gravel & stone chips.',
      warranty: '7-Year Certified Warranty.',
      highlights: ['Maximum protection where 95% of road debris hits', 'Seamless edge wrapping on hood & fenders', 'High-gloss optical clarity matching factory paint']
    },
    custom: {
      name: 'Custom High-Wear Protection (Wear & Tear)',
      coverage: 'Bumper Corners + Door Edges + Door Cups + Boot Luggage Lip + Rocker Panels',
      ideal: 'Urban protection against parking dings, luggage scratches, and fingernail marks.',
      warranty: '5-Year Certified Warranty.',
      highlights: ['Budget-friendly defense for high-risk contact points', 'Fast 1-day turnaround time', 'Preserves factory resale condition']
    }
  };

  return (
    <section id="ppf" className="py-20 bg-[#06080D] relative border-t border-slate-900 overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs font-mono uppercase">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ultimate Paint Defense Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Syne',sans-serif] uppercase tracking-tight text-white">
            PAINT PROTECTION FILM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">(PPF)</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            PPF acts like an invisible ballistic shield, protecting your car's original paint from stone chips, scratches, stains, harsh UV rays, and everyday wear. Keep your car looking brand new, every single day.
          </p>
        </div>

        {/* 5 Core Pillars from the User's Poster */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
          {[
            {
              icon: ShieldAlert,
              title: 'Protects from Scratches & Chips',
              desc: 'Absorbs heavy kinetic impacts from flying road gravel on Islamabad highways.'
            },
            {
              icon: Sun,
              title: 'UV Ray Protection',
              desc: 'Blocks 99.9% harmful UV rays to prevent yellowing, clear-coat oxidation, and paint fading.'
            },
            {
              icon: Flame,
              title: 'Self-Healing Technology',
              desc: 'Minor swirl marks and wash scratches magically disappear under sunlight or warm water.'
            },
            {
              icon: Droplets,
              title: 'Stain & Chemical Resistance',
              desc: 'Resists acidic bird droppings, harsh bore water minerals, tree sap, and road tar.'
            },
            {
              icon: Award,
              title: 'Preserves Original Paint & Resale',
              desc: 'When removed years later, factory paint underneath remains 100% pristine.'
            }
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0A0D15] border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 flex flex-col items-center text-center space-y-3 group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-cyan-950/50">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h2 className="text-xs font-bold text-white font-['Syne',sans-serif] uppercase tracking-wide">
                {pillar.title}
              </h2>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Coverage Visualizer & Package Selector */}
        <div className="rounded-3xl bg-slate-900/90 border border-cyan-500/40 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Package Selector */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400">
                  Select PPF Configuration
                </span>
                <h2 className="text-2xl font-bold font-['Syne',sans-serif] text-white uppercase mt-1">
                  Choose Your Level of Shielding
                </h2>
              </div>

              {/* Selector Buttons */}
              <div className="space-y-2">
                {(['full', 'front', 'custom'] as const).map((packKey) => (
                  <button
                    key={packKey}
                    onClick={() => setSelectedPack(packKey)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center justify-between border ${
                      selectedPack === packKey
                        ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm font-['Syne',sans-serif]">
                        {packages[packKey].name}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {packages[packKey].coverage}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400 ml-2">
                      {packKey === 'full' ? '10-Yr' : packKey === 'front' ? '7-Yr' : '5-Yr'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Package Specs */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                <div className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>{packages[selectedPack].warranty}</span>
                </div>
                <p className="text-xs text-slate-300">
                  <span className="text-slate-400 font-mono">Recommended: </span>
                  {packages[selectedPack].ideal}
                </p>
                <ul className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {packages[selectedPack].highlights.map((h, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PPF Booking CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking('ppf-paint-protection-film')}
                  className="flex-1 py-3 px-5 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-cyan-400 to-sky-400 text-black hover:from-cyan-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                >
                  <Shield className="w-4 h-4" />
                  <span>Book PPF Appointment</span>
                </button>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Empire%20Auto%20Spa,%20I%20want%20a%20PPF%20quote%20for%20my%20car.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl font-semibold uppercase tracking-wider text-xs bg-slate-950 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/40 transition-colors flex items-center justify-center gap-2"
                >
                  <WhatsAppLogo className="w-4 h-4" />
                  <span>WhatsApp Quote</span>
                </a>
              </div>

            </div>

            {/* Right: Technical Infographic Banner */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-black aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
                  alt="PPF Installation Studio at Empire Auto Spa"
                  className="w-full h-full object-cover filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                
                {/* Floating Technical Specs overlay */}
                <div className="absolute bottom-4 inset-x-4 space-y-2">
                  <div className="bg-black/80 backdrop-blur-md p-3 rounded-xl border border-slate-700/80">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase">
                      Film Specifications
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-1.5 text-center">
                      <div className="bg-slate-900/90 p-1.5 rounded">
                        <div className="text-[10px] text-slate-400">Thickness</div>
                        <div className="text-xs font-bold text-white">8.5 Mil (215µm)</div>
                      </div>
                      <div className="bg-slate-900/90 p-1.5 rounded">
                        <div className="text-[10px] text-slate-400">Elongation</div>
                        <div className="text-xs font-bold text-cyan-400">&gt; 400% TPU</div>
                      </div>
                      <div className="bg-slate-900/90 p-1.5 rounded">
                        <div className="text-[10px] text-slate-400">Gloss Level</div>
                        <div className="text-xs font-bold text-sky-300">95+ GU Mirror</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slogan Banner from Poster */}
              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-center">
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-300 font-['Syne',sans-serif]">
                  PROTECT YOUR INVESTMENT. DRIVE WITH CONFIDENCE.
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
