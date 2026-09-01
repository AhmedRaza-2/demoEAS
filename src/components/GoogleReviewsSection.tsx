import React, { useState } from 'react';
import { GOOGLE_REVIEWS, COMPANY_INFO } from '../data/mockData';
import { GoogleReview } from '../types';
import { GoogleLogo } from './BrandIcons';
import { Star, CheckCircle2, ThumbsUp, MessageSquarePlus, Camera, Sparkles, X, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';

export const GoogleReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>(GOOGLE_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCar, setNewCar] = useState('');
  const [newService, setNewService] = useState('Paint Protection Film (PPF)');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: GoogleReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`,
      rating: newRating,
      date: 'Just now',
      verified: true,
      carServiced: newCar || 'Client Vehicle',
      service: newService,
      comment: newComment,
      likesCount: 1,
      isNew: true
    };

    setReviews([newRev, ...reviews]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
      setNewAuthor('');
      setNewCar('');
      setNewComment('');
    }, 1800);
  };

  return (
    <section id="reviews" className="py-20 bg-[#06080D] relative border-t border-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rating Header Banner - Modeled directly on Google Knowledge Panel Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 mb-12 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Google Rating Overview */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* Google G Logo Badge */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-3 shadow-xl flex items-center justify-center shrink-0 border border-slate-200">
                <GoogleLogo className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-['Syne',sans-serif] text-white">
                    Empire Auto Spa
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-mono text-cyan-300">
                    Google Verified Studio
                  </span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <span className="text-3xl font-black font-['Syne',sans-serif] text-white">
                    {COMPANY_INFO.googleRating}.0
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    ({COMPANY_INFO.googleReviewCount} Google reviews)
                  </span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
              </div>
            </div>

            {/* Google Review CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-lg shadow-white/10"
              >
                <MessageSquarePlus className="w-4 h-4 text-slate-900" />
                <span>Write a review</span>
              </button>

              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>

          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0A0D15] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Author & Verified Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
                    />
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{rev.author}</span>
                        {rev.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                        <span>{rev.date}</span>
                        {rev.isNew && (
                          <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 font-semibold text-[9px] border border-cyan-500/40">
                            New
                          </span>
                        )}
                        {rev.photosCount && (
                          <span className="flex items-center gap-1 text-[10px] text-slate-400">
                            <Camera className="w-3 h-3 text-cyan-400" />
                            {rev.photosCount} photos
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Car & Service Badges */}
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                    <span>{rev.carServiced}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {rev.service}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Studio Owner Response if present */}
              {rev.ownerReply && (
                <div className="p-3 rounded-xl bg-slate-950/80 border-l-2 border-cyan-400 text-[11px] text-slate-300 space-y-1">
                  <div className="font-bold text-cyan-400 flex items-center gap-1">
                    <span>Response from Empire Auto Spa (Owner)</span>
                  </div>
                  <p className="text-slate-400">{rev.ownerReply}</p>
                </div>
              )}

              {/* Likes counter */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-cyan-500" />
                  <span>{rev.likesCount} people found this helpful</span>
                </span>
                <span className="font-mono text-cyan-500 flex items-center gap-1">
                  <GoogleLogo className="w-3 h-3" />
                  <span>Verified Client</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-5">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="text-xs font-mono uppercase text-cyan-400 flex items-center gap-1.5">
                <GoogleLogo className="w-3.5 h-3.5" />
                <span>Google Maps Review Portal</span>
              </div>
              <h3 className="text-xl font-bold font-['Syne',sans-serif] text-white uppercase">
                Write a Review for Empire Auto Spa
              </h3>
            </div>

            {submittedSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-white font-bold">Review Published!</h4>
                <p className="text-xs text-slate-300">Thank you for rating your detailing experience with Empire Auto Spa Islamabad.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Star Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 text-amber-400 focus:outline-none"
                      >
                        <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad Malik"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Car Model</label>
                    <input
                      type="text"
                      placeholder="e.g. BMW 5 Series / Civic RS"
                      value={newCar}
                      onChange={(e) => setNewCar(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Service Performed</label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option>Paint Protection Film (PPF)</option>
                    <option>Premium Detailing (German Products)</option>
                    <option>9H / 10H Ceramic Coating</option>
                    <option>Interior Detailing (Rs. 5,999)</option>
                    <option>Complete Detailing (Rs. 11,999)</option>
                    <option>UV & Black Tints</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Feedback *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your satisfaction with the finish, paint shine, studio hospitality, and turnaround..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-cyan-500 text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/25"
                >
                  Post Verified Review
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};

