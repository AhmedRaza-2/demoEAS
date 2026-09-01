import React, { useState, useEffect } from 'react';
import { SERVICES_PACKAGES, ADD_ONS, COMPANY_INFO } from '../data/mockData';
import { Booking, VehicleType, UserProfile } from '../types';
import { User, db, collection, addDoc, doc, setDoc } from '../lib/firebase';
import { WhatsAppLogo } from './BrandIcons';
import { 
  X, Calendar, Clock, Car, Check, Shield, AlertCircle, 
  Sparkles, CheckCircle2, ChevronRight, ArrowLeft, Download, Share2, Copy, MapPin 
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  user: User | null;
  userProfile: UserProfile | null;
  onBookingCreated: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  user,
  userProfile,
  onBookingCreated
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Form State
  const [vehicleType, setVehicleType] = useState<VehicleType>('sedan');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('2024');
  
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || 'premium-german-detailing');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  const [bookingDate, setBookingDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState('11:00 AM (Morning Detailing Bay)');

  const [customerName, setCustomerName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState(userProfile?.phoneNumber || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notes, setNotes] = useState('');

  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (user) {
      if (user.displayName && !customerName) setCustomerName(user.displayName);
      if (user.email && !email) setEmail(user.email);
    }
  }, [user]);

  if (!isOpen) return null;

  const currentService = SERVICES_PACKAGES.find((s) => s.id === selectedServiceId) || SERVICES_PACKAGES[0];

  // Price Calculation
  const isInspectionQuote = currentService.price === 'Prices on Inspection';
  const basePrice = typeof currentService.price === 'number' ? currentService.price : 0;
  
  // Surcharge by vehicle size (Sedan baseline, SUV +15%, Luxury/Supercar +20%)
  const sizeMultiplier = vehicleType === 'suv' ? 1.15 : vehicleType === 'luxury' ? 1.20 : vehicleType === 'crossover' ? 1.10 : 1.0;
  
  const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
    const found = ADD_ONS.find((a) => a.id === addOnId);
    return sum + (found ? found.price : 0);
  }, 0);

  const calculatedBase = Math.round(basePrice * sizeMultiplier);
  const finalEstimatedTotal = isInspectionQuote ? 'Quote on Inspection' : calculatedBase + addOnsTotal;

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !carMake || !carModel) return;

    setIsSubmitting(true);
    const bookingId = `EAS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: bookingId,
      userId: user?.uid,
      customerName,
      phone,
      email: email || undefined,
      carMake,
      carModel,
      carYear,
      vehicleType,
      serviceId: selectedServiceId,
      serviceName: currentService.name,
      selectedAddOns,
      date: bookingDate,
      timeSlot,
      estimatedTotal: finalEstimatedTotal,
      notes: notes || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: user ? 'google_auth' : 'website'
    };

    try {
      // Save directly to Firestore collection
      const docRef = doc(db, 'bookings', bookingId);
      await setDoc(docRef, newBooking);
    } catch (err) {
      console.warn('Firestore write fallback to local storage:', err);
    } finally {
      onBookingCreated(newBooking);
      setCreatedBooking(newBooking);
      setIsSubmitting(false);
      setStep(4);
    }
  };

  const getWhatsAppBookingText = (b: Booking) => {
    const addOnNames = b.selectedAddOns
      .map((id) => ADD_ONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const message = `*EMPIRE AUTO SPA - NEW APPOINTMENT CONFIRMATION*\n` +
      `---------------------------------------\n` +
      `📋 *Booking ID:* ${b.id}\n` +
      `👤 *Client Name:* ${b.customerName}\n` +
      `📞 *Phone:* ${b.phone}\n` +
      `✉️ *Email:* ${b.email || 'N/A'}\n` +
      `🚗 *Vehicle:* ${b.carYear} ${b.carMake} ${b.carModel} (${b.vehicleType.toUpperCase()})\n` +
      `⚡ *Primary Service:* ${b.serviceName}\n` +
      `${addOnNames ? `➕ *Selected Add-ons:* ${addOnNames}\n` : ''}` +
      `📅 *Preferred Date:* ${b.date}\n` +
      `⏰ *Time Slot:* ${b.timeSlot}\n` +
      `💰 *Estimated Total:* ${typeof b.estimatedTotal === 'number' ? `Rs. ${b.estimatedTotal.toLocaleString()}` : b.estimatedTotal}\n` +
      `${b.notes ? `📝 *Special Notes:* ${b.notes}\n` : ''}` +
      `---------------------------------------\n` +
      `📍 *Studio:* G-9 Markaz, Islamabad (Next to Shell)\n` +
      `_Please confirm my slot and studio bay availability._`;

    return encodeURIComponent(message);
  };

  const handleCopyBookingId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  const downloadCalendarFile = (b: Booking) => {
    const icsContent = 
      "BEGIN:VCALENDAR\n" +
      "VERSION:2.0\n" +
      "PRODID:-//Empire Auto Spa//Appointment Booking//EN\n" +
      "BEGIN:VEVENT\n" +
      `SUMMARY:Empire Auto Spa - ${b.serviceName}\n` +
      `DESCRIPTION:Appointment #${b.id} for ${b.carMake} ${b.carModel}. Total: ${b.estimatedTotal}\n` +
      `LOCATION:Empire Auto Spa, G-9 Markaz, Islamabad\n` +
      `STATUS:CONFIRMED\n` +
      "END:VEVENT\n" +
      "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `EmpireAutoSpa-${b.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090D16] border border-[#00E5FF]/40 shadow-2xl shadow-cyan-950/80 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-[#0B1220] to-slate-900 border-b border-cyan-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-400/40 text-[#00E5FF] flex items-center justify-center font-bold shadow-md shadow-cyan-950/60">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-[#00E5FF] tracking-wider">
                Empire Auto Spa • G-9 Islamabad Studio
              </div>
              <h3 className="text-lg font-bold font-['Syne',sans-serif] text-white">
                Online Studio Booking & Instant Quote
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

        {/* Step Indicator (1 to 3) */}
        {step < 4 && (
          <div className="px-6 py-3 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#00E5FF] font-bold' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 1 ? 'bg-cyan-950 border border-[#00E5FF] text-[#00E5FF]' : 'bg-slate-900 border border-slate-700'
              }`}>1</span>
              <span>Vehicle</span>
            </div>
            <div className={`h-px w-8 ${step >= 2 ? 'bg-[#00E5FF]/40' : 'bg-slate-800'}`}></div>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#00E5FF] font-bold' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 2 ? 'bg-cyan-950 border border-[#00E5FF] text-[#00E5FF]' : 'bg-slate-900 border border-slate-700'
              }`}>2</span>
              <span>Package</span>
            </div>
            <div className={`h-px w-8 ${step >= 3 ? 'bg-[#00E5FF]/40' : 'bg-slate-800'}`}></div>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#00E5FF] font-bold' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 3 ? 'bg-cyan-950 border border-[#00E5FF] text-[#00E5FF]' : 'bg-slate-900 border border-slate-700'
              }`}>3</span>
              <span>Date & Info</span>
            </div>
          </div>
        )}

        {/* STEP 1: VEHICLE DETAILS */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-2">
                1. Select Vehicle Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'sedan', label: 'Sedan', icon: '🚗' },
                  { id: 'suv', label: 'SUV / 4x4', icon: '🚙' },
                  { id: 'crossover', label: 'Crossover', icon: '🚘' },
                  { id: 'hatchback', label: 'Hatchback', icon: '🚙' },
                  { id: 'luxury', label: 'Luxury / Super', icon: '🏎️' }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setVehicleType(type.id as VehicleType)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      vehicleType === type.id
                        ? 'bg-cyan-950/80 border-[#00E5FF] text-[#00E5FF] shadow-lg shadow-cyan-950/60 scale-[1.02]'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-xs font-bold font-['Syne',sans-serif]">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Make / Brand *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BMW / Toyota / Honda"
                  value={carMake}
                  onChange={(e) => setCarMake(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Model Variant *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 740Li / Civic RS / Fortuner"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Model Year</label>
                <input
                  type="text"
                  placeholder="e.g. 2024"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                disabled={!carMake || !carModel}
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] text-black hover:from-[#22D3EE] hover:to-[#0284C7] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95"
              >
                <span>Continue to Service Packages</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SERVICE & ADD-ONS */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            <div>
              <label className="block text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-2">
                2. Select Primary Detailing / PPF Package
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICES_PACKAGES.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedServiceId(pkg.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-2 ${
                      selectedServiceId === pkg.id
                        ? 'bg-cyan-950/80 border-[#00E5FF] text-white shadow-lg shadow-cyan-950/50'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold font-['Syne',sans-serif] text-white">
                        {pkg.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {pkg.shortDesc}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-[#00E5FF] block">
                        {pkg.priceDisplay}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {pkg.duration}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Add-Ons */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-2">
                Optional Studio Upgrades & Ala-Carte Add-Ons
              </label>
              
              <div className="space-y-2">
                {ADD_ONS.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddOn(addon.id)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-cyan-950/50 border-[#00E5FF]/60 text-white shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          isChecked ? 'bg-[#00E5FF] border-[#00E5FF] text-black' : 'border-slate-700 bg-slate-900'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-200">{addon.name}</div>
                          <div className="text-[10px] text-slate-400">{addon.description}</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#00E5FF]">
                        {addon.priceDisplay}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subtotal Banner */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Current Estimate Breakdown</span>
                <span className="text-xs text-slate-200 font-medium">
                  {currentService.name} ({vehicleType.toUpperCase()})
                </span>
              </div>
              <div className="text-xl font-black font-['Syne',sans-serif] text-[#00E5FF]">
                {typeof finalEstimatedTotal === 'number'
                  ? `Rs. ${finalEstimatedTotal.toLocaleString()}`
                  : finalEstimatedTotal}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] text-black hover:from-[#22D3EE] hover:to-[#0284C7] transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25"
              >
                <span>Select Date & Contact Info</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DATE, TIME & CUSTOMER INFO */}
        {step === 3 && (
          <form onSubmit={handleCompleteBooking} className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Preferred Appointment Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Studio Bay Time Slot *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                >
                  <option>10:00 AM (Studio Opening Slot)</option>
                  <option>11:00 AM (Morning Detailing Bay)</option>
                  <option>12:30 PM (Midday Slot)</option>
                  <option>02:00 PM (Afternoon PPF Bay)</option>
                  <option>04:00 PM (Paint Correction Slot)</option>
                  <option>06:00 PM (Evening Quick Detailing)</option>
                  <option>08:00 PM (Late Night Vehicle Dropoff)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  WhatsApp / Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0309 0009904 / 0300..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Email Address (For Digital Invoice & Status)
              </label>
              <input
                type="email"
                placeholder="customer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Special Instructions or Vehicle Condition
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Swirl marks on black bonnet, leather seat cleaning required..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
              ></textarea>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#00E5FF] via-[#38BDF8] to-[#22D3EE] text-black hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/30 active:scale-95 disabled:opacity-60"
              >
                <Check className="w-4 h-4" />
                <span>{isSubmitting ? 'Saving to Studio...' : 'Confirm Studio Booking'}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: COMPREHENSIVE CONFIRMATION PASS (CUSTOMER & BUSINESS MECHANISM) */}
        {step === 4 && createdBooking && (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950 border border-[#00E5FF]/60 text-[#00E5FF] flex items-center justify-center mx-auto shadow-xl shadow-cyan-950/80">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest">
                Appointment Registered & Synced with Studio
              </span>
              <h3 className="text-2xl font-bold font-['Syne',sans-serif] text-white uppercase">
                Ready for Your {createdBooking.carMake} {createdBooking.carModel}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Your appointment is securely recorded in the Empire Auto Spa live queue for <span className="text-[#00E5FF] font-bold">{createdBooking.date} at {createdBooking.timeSlot}</span>.
              </p>
            </div>

            {/* Official Digital Studio Booking Pass Card */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 text-left space-y-3 relative overflow-hidden shadow-2xl">
              {/* Studio Watermark */}
              <div className="absolute right-3 top-3 text-[10px] font-mono text-cyan-400/30 uppercase tracking-widest">
                Official Studio Pass
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Booking Reference</span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black font-mono text-[#00E5FF]">#{createdBooking.id}</span>
                    <button
                      onClick={() => handleCopyBookingId(createdBooking.id)}
                      className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs flex items-center gap-1"
                      title="Copy Reference"
                    >
                      <Copy className="w-3 h-3" />
                      <span className="text-[9px]">{copiedId ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Live Status</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950/80 border border-amber-400/50 text-amber-300">
                    <Clock className="w-3 h-3" />
                    Pending Studio Bay Assignment
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400">Client:</span>
                  <p className="font-bold text-white">{createdBooking.customerName} ({createdBooking.phone})</p>
                </div>
                <div>
                  <span className="text-slate-400">Vehicle:</span>
                  <p className="font-bold text-white">{createdBooking.carYear} {createdBooking.carMake} {createdBooking.carModel} ({createdBooking.vehicleType.toUpperCase()})</p>
                </div>
                <div>
                  <span className="text-slate-400">Selected Service:</span>
                  <p className="font-bold text-[#00E5FF]">{createdBooking.serviceName}</p>
                </div>
                <div>
                  <span className="text-slate-400">Estimated Total:</span>
                  <p className="font-black text-[#00E5FF] font-mono text-sm">
                    {typeof createdBooking.estimatedTotal === 'number'
                      ? `Rs. ${createdBooking.estimatedTotal.toLocaleString()}`
                      : createdBooking.estimatedTotal}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{COMPANY_INFO.address}</span>
                </span>
                <span className="font-mono text-[10px] text-emerald-400 font-bold">
                  ✓ Database Synced
                </span>
              </div>
            </div>

            {/* Confirmation Mechanism Action Buttons */}
            <div className="space-y-3 pt-1">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${getWhatsAppBookingText(createdBooking)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl font-bold uppercase tracking-wider text-xs bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all active:scale-[0.99]"
              >
                <WhatsAppLogo className="w-4 h-4" />
                <span>1-Click Dispatch Booking to Studio WhatsApp ({COMPANY_INFO.phone1})</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => downloadCalendarFile(createdBooking)}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Save to Calendar</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-cyan-950/60 border border-cyan-400/40 text-[#00E5FF] hover:bg-cyan-900/60 transition-colors"
                >
                  Return to Home
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
