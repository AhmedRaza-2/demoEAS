import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { WhatsAppLogo, InstagramLogo, FacebookLogo } from './BrandIcons';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation } from 'lucide-react';
import { ContactMessage } from '../types';
import { db, doc, setDoc } from '../lib/firebase';

interface InteractiveMapContactProps {
  onMessageSubmitted: (msg: ContactMessage) => void;
}

export const InteractiveMapContact: React.FC<InteractiveMapContactProps> = ({
  onMessageSubmitted
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [carDetails, setCarDetails] = useState('');
  const [serviceInterest, setServiceInterest] = useState('Paint Protection Film (PPF)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    const msgId = `msg-${Date.now()}`;
    const newMsg: ContactMessage = {
      id: msgId,
      name,
      phone,
      email: email || undefined,
      carDetails,
      serviceInterest,
      message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    try {
      const docRef = doc(db, 'inquiries', msgId);
      await setDoc(docRef, newMsg);
    } catch (err) {
      console.warn('Inquiry Firestore write fallback to local state:', err);
    } finally {
      onMessageSubmitted(newMsg);
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setPhone('');
        setEmail('');
        setCarDetails('');
        setMessage('');
      }, 3500);
    }
  };

  return (
    <section id="location" className="py-20 bg-[#06080D] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[#00E5FF] text-xs font-mono uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Islamabad Flagship Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Syne',sans-serif] uppercase tracking-tight text-white">
            VISIT US OR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#38BDF8]">REQUEST A QUOTE</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Located in the heart of Islamabad at G-9 Markaz. Drop by for a free paint depth inspection or send your inquiry below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Studio Information & Interactive Google Map */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Contact Details Card */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold font-['Syne',sans-serif] text-white uppercase flex items-center gap-2">
                <span>Empire Auto Spa Islamabad</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-['Syne',sans-serif]">Studio Address</strong>
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Clock className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-['Syne',sans-serif]">Studio Hours</strong>
                    <span>{COMPANY_INFO.workingHours}</span>
                    <span className="block text-[11px] text-emerald-400 mt-0.5">Open 7 Days a Week</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Phone className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-['Syne',sans-serif]">Direct Phones & WhatsApp</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <a
                        href={`tel:${COMPANY_INFO.phone1}`}
                        className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[#00E5FF] hover:border-cyan-400 font-mono text-xs"
                      >
                        {COMPANY_INFO.phone1}
                      </a>
                      <a
                        href={`tel:${COMPANY_INFO.phone2}`}
                        className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs"
                      >
                        {COMPANY_INFO.phone2}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels Strip */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-2 hover:bg-emerald-900 transition-colors"
                >
                  <WhatsAppLogo className="w-4 h-4" />
                  <span>WhatsApp Direct</span>
                </a>

                <a
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-pink-950/50 border border-pink-500/40 text-pink-300 flex items-center gap-2 hover:bg-pink-900 transition-colors"
                >
                  <InstagramLogo className="w-4 h-4" />
                  <span>@empire.auto_spa</span>
                </a>

                <a
                  href={COMPANY_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-200 flex items-center gap-2 hover:bg-slate-700 transition-colors"
                >
                  <FacebookLogo className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            {/* Google Map Embedded Frame for G-9 Markaz Islamabad */}
            <div className="rounded-3xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-xl relative aspect-[16/10]">
              <iframe
                title="Empire Auto Spa Location G-9 Markaz Islamabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13278.435773821034!2d73.0234!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbe39d424b91b%3A0x6b8eb7c569e2c65a!2sG-9%20Markaz%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Get Directions Floating Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/85 backdrop-blur-md p-3 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#00E5FF] text-black">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">G-9 Markaz, Islamabad</span>
                    <span className="text-[10px] text-[#00E5FF] font-mono">10 Mins from F-6/F-7 / Blue Area</span>
                  </div>
                </div>

                <a
                  href={COMPANY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900"
                >
                  Directions
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Integrated Inquiry & Quick Quote Request Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-[#0A0D16] to-slate-900 border border-cyan-500/30 shadow-2xl space-y-6">
              
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-[#00E5FF]">Quick Quote & Consultation</span>
                <h3 className="text-2xl font-bold font-['Syne',sans-serif] text-white uppercase">
                  Send Vehicle Inquiry
                </h3>
                <p className="text-xs text-slate-400">
                  Fill out your car details and our lead technician will reply with a customized quote via WhatsApp/Call within 15 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-white font-bold text-lg font-['Syne',sans-serif]">Inquiry Dispatched!</h4>
                  <p className="text-xs text-slate-300">
                    Thank you, {name}! Our team in G-9 Markaz has received your request and will contact you at {phone}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bilal Khan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0300 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Car Make & Model</label>
                      <input
                        type="text"
                        placeholder="e.g. 2024 Honda Civic RS"
                        value={carDetails}
                        onChange={(e) => setCarDetails(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Service Required</label>
                      <select
                        value={serviceInterest}
                        onChange={(e) => setServiceInterest(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                      >
                        <option>Paint Protection Film (PPF)</option>
                        <option>Premium Detailing (German Products - Rs. 17,999)</option>
                        <option>Complete Detailing (Rs. 11,999)</option>
                        <option>Interior Detailing (Rs. 5,999)</option>
                        <option>Exterior Detailing (Rs. 7,500)</option>
                        <option>Premium Wash (Rs. 2,999)</option>
                        <option>9H / 10H Ceramic Coating</option>
                        <option>UV & Black Window Tints</option>
                        <option>Paint Correction / Swirl Removal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Your Message or Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about the current condition of your paint, scratches, desired finish date, or budget..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#00E5FF] via-[#38BDF8] to-[#22D3EE] text-black hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Free Quote Inquiry'}</span>
                  </button>

                  <p className="text-[10px] text-center text-slate-500 font-mono">
                    🔒 Synced to Empire Auto Spa Studio Database • G-9 Markaz Islamabad
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
