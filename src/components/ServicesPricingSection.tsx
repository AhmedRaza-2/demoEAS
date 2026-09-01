import React, { useState } from 'react';
import { SERVICES_PACKAGES, SPECIALTY_SERVICES, COMPANY_INFO } from '../data/mockData';
import { WhatsAppLogo } from './BrandIcons';
import { ServicePackage } from '../types';
import { Check, Calendar, Sparkles, Shield, Clock, Zap, Star, ShieldCheck } from 'lucide-react';

interface ServicesPricingSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesPricingSection: React.FC<ServicesPricingSectionProps> = ({
  onSelectService
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'detailing' | 'ppf_coating' | 'specialty'>('all');

  const filteredPackages = SERVICES_PACKAGES.filter((pkg) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'detailing') return pkg.category === 'detailing';
    if (activeTab === 'ppf_coating') return pkg.category === 'ppf' || pkg.category === 'coating' || pkg.category === 'tints';
    return true;
  });

  return (
    <section id="services" className="py-20 bg-[#080B11] relative">
      {/* Visual accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>Official Price Menu & Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Syne',sans-serif] uppercase tracking-tight text-white">
            TRANSPARENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400">SERVICES & PRICING</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No hidden charges. From quick maintenance snow foam washes to German paint correction and full body PPF armor in G-9 Markaz Islamabad.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { key: 'all', label: 'All Services' },
              { key: 'detailing', label: 'Detailing Packages' },
              { key: 'ppf_coating', label: 'PPF, Ceramic & Tints' },
              { key: 'specialty', label: 'Specialty Ala-Carte' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-black shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Service Package Cards Grid */}
        {activeTab !== 'specialty' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => {
              const isGerman = pkg.germanProducts;
              const isPopular = pkg.popular;

              return (
                <div
                  key={pkg.id}
                  className={`group relative rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                    isGerman
                      ? 'bg-gradient-to-b from-slate-900 via-[#0B0F19] to-[#0A0D15] border-2 border-cyan-400/80 shadow-xl shadow-cyan-950/40'
                      : isPopular
                      ? 'bg-gradient-to-b from-slate-900 via-[#0A0D16] to-[#080B11] border border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                      : 'bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/30'
                  }`}
                >
                  {/* Top Badge Strip */}
                  <div className="relative">
                    {/* Image Preview Banner */}
                    <div className="h-44 w-full relative overflow-hidden bg-slate-950">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                      
                      {/* Badge if present */}
                      {pkg.badge && (
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider backdrop-blur-md ${
                            isGerman
                              ? 'bg-black/90 border border-amber-400/60 text-amber-300 shadow-md'
                              : 'bg-cyan-950/90 border border-cyan-400/60 text-cyan-300 shadow-md'
                          }`}>
                            {pkg.badge}
                          </span>
                        </div>
                      )}

                      {/* Duration Pill */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-slate-300 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          {pkg.duration}
                        </span>
                      </div>

                      {/* Price Title Overlay */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                            {pkg.category.toUpperCase()}
                          </span>
                          <h2 className="text-lg font-extrabold font-['Syne',sans-serif] text-white group-hover:text-cyan-300 transition-colors">
                            {pkg.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                    
                    {/* Pricing Display */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono block">Package Price</span>
                        <div className="text-2xl font-black font-['Syne',sans-serif] text-cyan-400">
                          {pkg.priceDisplay}
                        </div>
                      </div>
                      {typeof pkg.price === 'number' && (
                        <span className="text-[10px] text-slate-400 font-mono bg-slate-900 px-2 py-1 rounded border border-slate-800">
                          Sedan / Hatchback
                        </span>
                      )}
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pkg.shortDesc}
                    </p>

                    {/* Features Checklist matching posters */}
                    <div className="space-y-2 pt-1 border-t border-slate-800/80">
                      <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                        Included In Package:
                      </div>
                      <ul className="space-y-1.5">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                            <span className="mt-0.5 rounded-full p-0.5 bg-cyan-950 border border-cyan-500/40 text-cyan-400 shrink-0">
                              <Check className="w-3 h-3" />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended for note */}
                    <div className="text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 italic">
                      <span className="text-cyan-400 font-semibold not-italic">Best For: </span>
                      {pkg.recommendedFor}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectService(pkg.id)}
                        className={`w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-1.5 ${
                          isGerman
                            ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-black hover:from-cyan-300 hover:to-sky-300 shadow-md shadow-cyan-500/30'
                            : 'bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Package</span>
                      </button>

                      <a
                        href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Empire%20Auto%20Spa,%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20(${encodeURIComponent(pkg.priceDisplay)})%20package.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl font-semibold uppercase tracking-wider text-xs bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <WhatsAppLogo className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Specialty Services Section */}
        {(activeTab === 'all' || activeTab === 'specialty') && (
          <div className="mt-16 pt-12 border-t border-slate-900">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <div className="text-xs font-mono uppercase text-cyan-400">
                Custom Ala-Carte Treatments
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Syne',sans-serif] uppercase text-white">
                PREMIUM SPECIALTY SERVICES
              </h2>
              <p className="text-xs text-slate-400">
                Targeted restoration for headlights, glass coatings, water spots, and engine bays with prices on inspection.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SPECIALTY_SERVICES.map((serv) => (
                <div
                  key={serv.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <h2 className="font-bold text-white text-sm font-['Syne',sans-serif] group-hover:text-cyan-300">
                        {serv.name}
                      </h2>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-400 font-bold">
                      {serv.startingPrice}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {serv.desc}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] font-mono text-slate-500">Inspection in Studio</span>
                    <button
                      onClick={() => onSelectService(serv.id)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      Inquire / Book →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* "WHY CHOOSE US?" Banner matching the user's poster */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0A0E18] to-slate-900 border border-cyan-500/30 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                The Empire Difference
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Syne',sans-serif] uppercase text-white">
                WHY CHOOSE EMPIRE AUTO SPA?
              </h2>
              <p className="text-xs text-slate-400">
                We bring master detailing standards to Islamabad, rejecting substandard wash methods that scratch luxury clear coats.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { title: 'Premium Imported Products', desc: 'Authentic German & USA compounds, ceramic quartz, and self-healing TPU films.' },
                { title: 'Professional Studio Equipment', desc: 'High-intensity daylight LED hex inspection bays and steam extractors.' },
                { title: 'Trained Detailing Experts', desc: 'Certified PPF and paint correction masters with years of super-car experience.' },
                { title: 'Safe Scratchless Wash Method', desc: 'pH-neutral snow foam & 2-bucket grit guard protocol protecting factory paint.' },
                { title: 'Customer Satisfaction Guaranteed', desc: 'Every vehicle is inspected under dual-spectrum lighting before delivery.' },
                { title: 'Prime Location in G-9 Markaz', desc: 'Convenient studio in Islamabad with customer lounge and live updates.' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-xs font-bold text-white font-['Syne',sans-serif]">{item.title}</h2>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
