import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppLogo, InstagramLogo } from './BrandIcons';
import { COMPANY_INFO } from '../data/mockData';
import { User } from '../lib/firebase';
import { UserProfile } from '../types';
import { Calendar, MapPin, Menu, X, ShieldCheck, Lock, User as UserIcon, LogIn, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenAdmin: () => void;
  onOpenAuth: () => void;
  onOpenMyBookings: () => void;
  activeSection: string;
  user: User | null;
  userProfile: UserProfile | null;
  userBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdmin,
  onOpenAuth,
  onOpenMyBookings,
  activeSection,
  user,
  userProfile,
  userBookingsCount
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services & Pricing', href: '#services' },
    { name: 'PPF Armor', href: '#ppf' },
    { name: 'Studio Feed', href: '#instagram' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' }
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#05080E] border-b border-cyan-950/60 text-xs py-1.5 px-4 text-slate-300 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs truncate">
            <span className="flex items-center gap-1 text-[#00E5FF] font-medium truncate">
              <MapPin className="w-3 h-3 text-[#00E5FF] shrink-0" />
              <span className="truncate">G-9/4 Islamabad</span>
            </span>
            <span className="hidden sm:inline-block text-slate-700">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Studio Open Daily
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0 ml-auto">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Empire%20Auto%20Spa,%20I%20would%20like%20to%20inquire%20about%20detailing/PPF%20for%20my%20car.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors text-[11px]"
            >
              <WhatsAppLogo className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>

            {/* Admin trigger button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[10px] bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-1.5 py-0.5 rounded border border-slate-800 transition-colors"
              title="Studio Management Dashboard"
            >
              <Lock className="w-3 h-3 text-cyan-400" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080B11]/95 backdrop-blur-md border-b border-cyan-950/80 shadow-xl shadow-cyan-950/30 py-2.5'
            : 'bg-[#080B11]/85 backdrop-blur-sm border-b border-slate-800/40 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo matching the user's uploaded image style */}
          <a href="#" className="flex items-center gap-2 group">
            <BrandLogo size={scrolled ? 'sm' : 'md'} showTagline={!scrolled} />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl text-xs tracking-wider uppercase font-bold transition-all duration-200 ${
                    isActive
                      ? 'text-[#00E5FF] bg-cyan-950/60 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-[#00E5FF] hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action CTAs (Hidden on mobile/tablet, visible on lg+) */}
          <div className="hidden lg:flex items-center gap-2">
            {/* My Passes Icon Button */}
            <button
              onClick={onOpenMyBookings}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-[#00E5FF] transition-all flex items-center gap-1.5 text-xs relative"
              title="View my appointment passes and live status"
            >
              <Calendar className="w-4 h-4 text-[#00E5FF]" />
              <span className="hidden xl:inline text-xs font-semibold">Passes</span>
              {userBookingsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#00E5FF] text-black text-[10px] font-bold flex items-center justify-center">
                  {userBookingsCount}
                </span>
              )}
            </button>

            {/* Auth / Account Profile Button */}
            <button
              onClick={onOpenAuth}
              className="p-1.5 px-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs"
            >
              {user ? (
                <>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-5 h-5 rounded-full object-cover border border-[#00E5FF]"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-cyan-950 text-[#00E5FF] flex items-center justify-center font-bold text-[10px] border border-cyan-400/40">
                      {user.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <span className="max-w-[70px] truncate font-bold text-slate-200 text-xs">
                    {user.displayName?.split(' ')[0] || 'Account'}
                  </span>
                </>
              ) : (
                <>
                  <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-bold text-slate-300 text-xs hidden sm:inline">Sign In</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Empire%20Auto%20Spa,%20I%20want%20to%20get%20a%20quote%20for%20my%20car.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80 transition-all flex items-center gap-1.5"
              title="Chat on WhatsApp"
            >
              <WhatsAppLogo className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="relative group overflow-hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#00E5FF] via-[#38BDF8] to-[#22D3EE] text-black hover:brightness-110 transition-all duration-200 shadow-md shadow-cyan-500/25 active:scale-95 shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
            </button>
          </div>

          {/* Mobile menu controls (Visible on screens < lg) */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300"
              title="Chat on WhatsApp"
            >
              <WhatsAppLogo className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] text-black shadow-md shadow-cyan-500/20"
            >
              Book
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#00E5FF]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#080B11] border-b border-cyan-900/50 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-2xl">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-[#00E5FF] hover:bg-cyan-950/30 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-[#00E5FF] text-xs font-mono">→</span>
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] text-black flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Studio Appointment
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="w-full py-2 rounded-xl font-bold text-xs bg-slate-900 border border-slate-800 text-[#00E5FF] flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                My Service Passes ({userBookingsCount})
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl text-xs font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-2"
                >
                  <WhatsAppLogo className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
                <a
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl text-xs font-semibold bg-pink-950/50 border border-pink-500/40 text-pink-300 flex items-center justify-center gap-2"
                >
                  <InstagramLogo className="w-3.5 h-3.5" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
