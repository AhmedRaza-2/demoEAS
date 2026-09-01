import React from 'react';
import { Booking } from '../types';
import { COMPANY_INFO, ADD_ONS } from '../data/mockData';
import { WhatsAppLogo } from './BrandIcons';
import { X, Calendar, Clock, Car, CheckCircle2, AlertCircle, Phone, FileText, ChevronRight, Sparkles, MapPin } from 'lucide-react';

interface CustomerBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onOpenBooking: () => void;
}

export const CustomerBookingsModal: React.FC<CustomerBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onOpenBooking
}) => {
  if (!isOpen) return null;

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/90 border border-cyan-400/60 text-[#00E5FF]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Studio Confirmed (Bay Reserved)
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950/90 border border-indigo-400/60 text-indigo-300">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            In-Bay Detailing / PPF Application
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/90 border border-emerald-400/60 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Finished • Ready for Pickup
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-950/90 border border-rose-400/60 text-rose-300">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/90 border border-amber-400/60 text-amber-300">
            <Clock className="w-3.5 h-3.5" />
            Pending Studio Review
          </span>
        );
    }
  };

  const getWhatsAppBookingText = (b: Booking) => {
    const message = `*EMPIRE AUTO SPA - APPOINTMENT INQUIRY*\n` +
      `---------------------------------------\n` +
      `📋 *Booking ID:* ${b.id}\n` +
      `👤 *Client:* ${b.customerName}\n` +
      `🚗 *Vehicle:* ${b.carYear} ${b.carMake} ${b.carModel}\n` +
      `⚡ *Service:* ${b.serviceName}\n` +
      `📅 *Date:* ${b.date} at ${b.timeSlot}\n` +
      `📊 *Status:* ${b.status.toUpperCase()}\n` +
      `---------------------------------------\n` +
      `Hi, I would like to check on my vehicle appointment status.`;
    return encodeURIComponent(message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#090C14] border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 overflow-hidden my-6 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-[#0C1220] to-slate-900 border-b border-cyan-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-400/40 text-[#00E5FF] flex items-center justify-center font-bold shadow-md shadow-cyan-950/50">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-[#00E5FF] tracking-wider">
                Empire Auto Spa • Live Studio Queue
              </div>
              <h3 className="text-lg font-bold font-['Syne',sans-serif] text-white">
                My Appointments & Service Passes ({bookings.length})
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                <Car className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-['Syne',sans-serif]">
                  No Appointments Found
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  You haven't scheduled any detailing or PPF services yet. Book online to reserve a certified studio bay.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#00E5FF] text-black hover:bg-cyan-300 transition-all shadow-md shadow-cyan-500/25"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 shadow-lg shadow-black/40"
              >
                {/* Top row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-900">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-400/30 text-[#00E5FF] font-mono text-xs font-bold">
                      #{b.id}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Booked {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    {getStatusBadge(b.status)}
                  </div>
                </div>

                {/* Main details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Vehicle</span>
                    <div className="font-bold text-white text-sm truncate">
                      {b.carYear} {b.carMake} {b.carModel}
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase">
                      {b.vehicleType}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Service Package</span>
                    <div className="font-bold text-[#00E5FF] truncate">
                      {b.serviceName}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Est. Total: <strong className="text-white font-mono">{typeof b.estimatedTotal === 'number' ? `Rs. ${b.estimatedTotal.toLocaleString()}` : b.estimatedTotal}</strong>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Studio Schedule</span>
                    <div className="font-bold text-white">
                      📅 {b.date}
                    </div>
                    <span className="text-[11px] font-mono text-amber-300">
                      ⏰ {b.timeSlot}
                    </span>
                  </div>
                </div>

                {/* Studio Notes & Add-ons */}
                {b.adminNotes && (
                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-400/20 text-xs text-cyan-200">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#00E5FF] block">
                      Studio Manager Note:
                    </span>
                    {b.adminNotes}
                  </div>
                )}

                {/* Footer action buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>{COMPANY_INFO.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${getWhatsAppBookingText(b)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl font-bold uppercase tracking-wider text-[11px] bg-emerald-950 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900 transition-colors flex items-center gap-1.5"
                    >
                      <WhatsAppLogo className="w-3.5 h-3.5" />
                      <span>WhatsApp Studio Support</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Direct Helpline: <a href={`tel:${COMPANY_INFO.phone1}`} className="text-[#00E5FF] font-bold">{COMPANY_INFO.phone1}</a>
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#00E5FF] text-black hover:bg-cyan-300 transition-all shadow-md shadow-cyan-500/25"
          >
            + New Appointment
          </button>
        </div>

      </div>
    </div>
  );
};
