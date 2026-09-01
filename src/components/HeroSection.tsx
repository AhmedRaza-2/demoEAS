import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { WhatsAppLogo } from './BrandIcons';
import { Shield, Sparkles, Zap, Calendar, Star, MapPin, ChevronRight, CheckCircle2, Award, ShieldCheck, Gem, SunMedium, Car } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  onExplorePackages: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExplorePackages
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Studio Lighting Background Effects */}
      <div className="absolute inset-0 bg-[#080B11]">
        {/* Hexagonal detailing studio grid pattern overlay */}
        <div className="absolute inset-0 studio-grid opacity-40"></div>
        {/* Dynamic cyan car light beams */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 car-light-beam blur-2xl opacity-60 pointer-events-none"></div>
        <div className="absolute -top-24 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080B11] to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Location & Trust Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold tracking-wide backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="flex items-center gap-1 font-mono uppercase">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                G-9 Markaz, Islamabad
              </span>
              <span className="text-cyan-600">•</span>
              <span className="text-slate-200 font-medium">Premier Luxury Detailing & PPF Studio</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] tracking-tight text-white uppercase leading-[1.15]">
                AUTOMOTIVE <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 drop-shadow-[0_0_25px_rgba(6,182,212,0.5)]">
                  PERFECTION
                </span> & SHIELD.
              </h1>
              <p className="text-base sm:text-lg font-normal text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Protect your investment with <span className="text-white font-semibold">Self-Healing TPU PPF</span>, German nano-ceramic coatings, and multi-stage paint correction.
              </p>
            </div>

            {/* Core Services Bullet Matrix matching the user posters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 pb-1">
              {[
                { icon: ShieldCheck, color: 'text-cyan-400', title: 'PPF Film', subtitle: 'Self-Healing TPU' },
                { icon: Gem, color: 'text-sky-400', title: 'Ceramic 10H', subtitle: 'German Formulas' },
                { icon: SunMedium, color: 'text-amber-400', title: 'UV Tints', subtitle: '85% Heat Reject' },
                { icon: Car, color: 'text-teal-400', title: 'Auto Detailing', subtitle: 'From Rs. 2,999' }
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-3 text-left transition-all group backdrop-blur-sm shadow-sm"
                  >
                    <IconComponent className={`w-5 h-5 ${item.color} mb-2`} />
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 font-['Syne',sans-serif]">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {item.subtitle}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500 text-black hover:from-cyan-300 hover:to-sky-300 transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 flex items-center justify-center gap-2 group active:scale-98"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Book Appointment</span>
                <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Empire%20Auto%20Spa,%20I%20would%20like%20to%20get%20a%20quote%20for%20my%20car.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm bg-slate-900/90 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-950/50 hover:border-emerald-400 transition-all flex items-center justify-center gap-2"
              >
                <WhatsAppLogo className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              <button
                onClick={onExplorePackages}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              >
                View Packages
              </button>
            </div>

            {/* Social Proof Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-white font-bold">{COMPANY_INFO.googleRating}</span>
                <span>({COMPANY_INFO.googleReviewCount} Google Reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>100% Genuine Imported Chemicals</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Certified PPF Applicators</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Studio Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glowing Aura Frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-cyan-500/40 via-sky-600/20 to-transparent blur-xl opacity-70"></div>
              
              {/* Studio Showcase Card */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#0B0F19] border border-cyan-500/30 overflow-hidden shadow-2xl p-4 sm:p-5 space-y-4">
                
                {/* Header within card */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-mono font-bold text-[10px]">
                      EA
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider font-['Syne',sans-serif]">
                        Empire Studio Islamabad
                      </div>
                      <div className="text-[10px] text-cyan-400 font-mono">
                        Active Studio Bay • G-9 Markaz
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Slots Open
                  </span>
                </div>

                {/* Split Car Concept Image with Poster styling */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] group border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80"
                    alt="BMW in Empire Auto Spa Studio with PPF Gloss"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle split overlay label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono uppercase mb-1">
                          Miracle TPU PPF + 10H Ceramic
                        </span>
                        <h2 className="text-white font-bold text-base font-['Syne',sans-serif]">
                          BMW 7 Series High-Gloss Shield
                        </h2>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-mono">Status</span>
                        <span className="text-xs font-bold text-emerald-400">Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Laser line effect */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-cyan-400 shadow-[0_0_10px_#06b6d4]"></div>
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-700">
                    RAW PAINT
                  </div>
                  <div className="absolute top-3 right-3 bg-cyan-950/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-cyan-300 border border-cyan-500/40">
                    PPF ARMOR
                  </div>
                </div>

                {/* Quick Service Highlights */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Premium Wash starting at
                    </span>
                    <span className="font-mono font-bold text-cyan-300">Rs. 2,999</span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                      <Shield className="w-3.5 h-3.5 text-sky-400" />
                      Interior Deep Detail starting at
                    </span>
                    <span className="font-mono font-bold text-sky-300">Rs. 5,999</span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-gradient-to-r from-cyan-950/60 to-sky-950/40 border border-cyan-500/30">
                    <span className="text-cyan-200 flex items-center gap-1.5 font-medium">
                      <Award className="w-3.5 h-3.5 text-cyan-400" />
                      German Detailing Package
                    </span>
                    <span className="font-mono font-bold text-cyan-300">Rs. 17,999</span>
                  </div>
                </div>

                {/* Quick button inside card */}
                <button
                  onClick={() => onOpenBooking()}
                  className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Select Date & Vehicle
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
