import React from 'react';
import { BrandLogo } from './BrandLogo';
import { InstagramLogo, FacebookLogo, WhatsAppLogo } from './BrandIcons';
import { COMPANY_INFO, SERVICES_PACKAGES } from '../data/mockData';
import { MapPin, Phone, Mail, Shield, Heart, Lock } from 'lucide-react';

interface FooterProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-[#040609] border-t border-slate-900 text-slate-400 text-xs">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Philosophy Column */}
          <div className="lg:col-span-4 space-y-4 text-center sm:text-left">
            <div className="inline-block">
              <BrandLogo size="md" showTagline={true} />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto sm:mx-0">
              Islamabad’s premier auto detailing and paint protection sanctuary. Specializing in self-healing TPU PPF, German nano-ceramic coatings, and paint perfection in G-9 Markaz.
            </p>
            <div className="pt-1 flex items-center justify-center sm:justify-start gap-3">
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/40 transition-colors shadow-md"
                title="Follow Empire Auto Spa on Instagram"
              >
                <InstagramLogo className="w-5 h-5" />
              </a>
              <a
                href={COMPANY_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors shadow-md"
                title="Connect on Facebook"
              >
                <FacebookLogo className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors shadow-md"
                title="Chat on WhatsApp"
              >
                <WhatsAppLogo className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Service Packages Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm font-['Syne',sans-serif] uppercase tracking-wider">
              Signature Packages
            </h4>
            <ul className="space-y-2">
              {SERVICES_PACKAGES.map((pkg) => (
                <li key={pkg.id}>
                  <button
                    onClick={() => onOpenBooking(pkg.id)}
                    className="hover:text-cyan-400 transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>{pkg.name}</span>
                    <span className="font-mono text-[10px] text-cyan-500">{pkg.priceDisplay}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Hours & Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm font-['Syne',sans-serif] uppercase tracking-wider">
              Islamabad Studio
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{COMPANY_INFO.phone1} / {COMPANY_INFO.phone2}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 text-slate-300 mt-2">
                <span className="text-cyan-400 font-semibold block">Hours:</span>
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Service Coverage Areas (SEO & Local Visibility) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm font-['Syne',sans-serif] uppercase tracking-wider">
              Serving Areas
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              G-9 Markaz • F-6 • F-7 • F-8 • F-10 • F-11 • E-7 • Blue Area • Bahria Town • DHA Islamabad • Rawalpindi Cantt.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-cyan-400 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Studio Admin Portal</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900/80 py-6 px-4 bg-[#020406]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Empire Auto Spa. Detailing • Protection • Perfection. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Islamabad, Pakistan</span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">Drive Clean. Drive Premium.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
