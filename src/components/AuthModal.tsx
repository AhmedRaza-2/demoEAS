import React, { useState } from 'react';
import { User, signInWithGoogle, logOut } from '../lib/firebase';
import { UserProfile } from '../types';
import { X, LogIn, LogOut, Shield, CheckCircle2, User as UserIcon, Mail, Phone, Car, Calendar, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  userProfile: UserProfile | null;
  userBookingsCount?: number;
  onOpenMyBookings?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  userProfile,
  userBookingsCount = 0,
  onOpenMyBookings
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setError(err?.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await logOut();
      onClose();
    } catch (err: any) {
      setError('Failed to log out.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0B0F17] border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-[#0E1626] to-slate-900 border-b border-cyan-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 text-[#00E5FF] flex items-center justify-center shadow-lg shadow-cyan-950/50">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-[#00E5FF] tracking-wider">
                Empire Auto Spa • Authentication
              </div>
              <h3 className="text-base font-bold font-['Syne',sans-serif] text-white">
                {user ? 'Customer Studio Account' : 'Sign In with Google'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300">
              {error}
            </div>
          )}

          {user ? (
            /* Signed-in Profile View */
            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/20">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-14 h-14 rounded-full border-2 border-[#00E5FF] object-cover shadow-md shadow-cyan-500/20"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-cyan-950 border border-cyan-400/50 text-[#00E5FF] flex items-center justify-center font-bold text-xl">
                    {user.displayName?.[0] || 'U'}
                  </div>
                )}

                <div className="space-y-0.5 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold text-base font-['Syne',sans-serif] truncate">
                      {user.displayName || 'Valued Customer'}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold bg-cyan-950 border border-cyan-400/40 text-[#00E5FF]">
                      {userProfile?.role === 'admin' ? 'Studio Staff' : 'Verified Client'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate font-mono">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Quick Profile Summary stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Active Appointments
                  </span>
                  <div className="text-xl font-bold font-['Syne',sans-serif] text-[#00E5FF]">
                    {userBookingsCount}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Studio Tier
                  </span>
                  <div className="text-sm font-bold font-['Syne',sans-serif] text-emerald-400 mt-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>VIP Member</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {onOpenMyBookings && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenMyBookings();
                    }}
                    className="w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] text-black hover:from-[#22D3EE] hover:to-[#0284C7] transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>View My Bookings & Live Status</span>
                  </button>
                )}

                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold font-mono text-slate-400 hover:text-rose-400 bg-slate-950 border border-slate-800 hover:border-rose-900 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of Empire Auto Spa</span>
                </button>
              </div>
            </div>
          ) : (
            /* Signed-out View */
            <div className="space-y-5 text-center">
              <div className="space-y-2">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sign in with your Google account to track your detailing appointments, view live bay progress, auto-fill your contact details, and save your vehicle specs.
                </p>
                <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-left space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>Real-time status tracking from reception to delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>Instant WhatsApp dispatch & digital service record</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>Verified customer review access</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-2xl font-bold tracking-wide text-xs bg-white hover:bg-slate-100 text-slate-900 flex items-center justify-center gap-3 shadow-lg shadow-white/10 transition-all active:scale-[0.99]"
              >
                {/* Google "G" logo */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>{loading ? 'Connecting...' : 'Continue with Google'}</span>
              </button>

              <p className="text-[10px] font-mono text-slate-500">
                Secure Firebase OAuth Authentication • Empire Auto Spa G-9 Islamabad
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
