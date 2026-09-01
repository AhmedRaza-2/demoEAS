import React, { useState } from 'react';
import { INSTAGRAM_POSTS, COMPANY_INFO } from '../data/mockData';
import { InstagramLogo, FacebookLogo } from './BrandIcons';
import { Heart, MessageCircle, Share2, ExternalLink, Play, Film, CheckCircle2, X, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { InstagramPost } from '../types';

interface InstagramFeedSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const InstagramFeedSection: React.FC<InstagramFeedSectionProps> = ({
  onOpenBooking
}) => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'embed'>('grid');

  const handleShare = (post: InstagramPost) => {
    if (navigator.share) {
      navigator.share({
        title: `Empire Auto Spa - ${post.carModel}`,
        text: post.caption,
        url: COMPANY_INFO.instagramUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${COMPANY_INFO.instagramUrl}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="instagram" className="py-20 bg-[#080B11] relative border-t border-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Instagram Profile Header Card */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0E131F] to-slate-900 border border-slate-800 p-6 sm:p-8 mb-12 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Profile Avatar & Bio */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
              {/* Instagram Profile Picture */}
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] blur-sm opacity-85 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-black overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center p-2 text-center">
                    <span className="font-['Syne',sans-serif] font-black text-cyan-400 text-xs tracking-wider">EMPIRE</span>
                    <span className="text-[8px] font-bold text-slate-300 tracking-widest">AUTO SPA</span>
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-['Syne',sans-serif] text-white">
                    empire.auto_spa
                  </h2>
                  <span className="p-0.5 rounded-full bg-cyan-500 text-black" title="Verified Studio Account">
                    <CheckCircle2 className="w-4 h-4 fill-cyan-400 text-black" />
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono border border-slate-700">
                    Auto Detailing Studio
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-normal">
                  Paint Protection Film (PPF) • UV & Black Tints • Auto Detailing • 10H Ceramic Coating
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-cyan-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{COMPANY_INFO.address}</span>
                </div>

                {/* Follower Stats */}
                <div className="flex items-center justify-center sm:justify-start gap-6 pt-2 text-xs font-mono">
                  <div>
                    <span className="font-bold text-white">340+</span>{' '}
                    <span className="text-slate-400">posts</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">12.8K</span>{' '}
                    <span className="text-slate-400">followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">450</span>{' '}
                    <span className="text-slate-400">following</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow on Instagram & Social Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:opacity-95 transition-opacity flex items-center gap-2 shadow-lg shadow-pink-600/20"
              >
                <InstagramLogo className="w-4 h-4" />
                <span>Follow @empire.auto_spa</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={COMPANY_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-2"
              >
                <FacebookLogo className="w-4 h-4" />
                <span>Facebook</span>
              </a>
            </div>

          </div>
        </div>

        {/* Section Heading & View Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase text-pink-400 flex items-center gap-2 mb-1">
              <InstagramLogo className="w-4 h-4" />
              <span>Studio Feed • G-9 Markaz Islamabad</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Syne',sans-serif] uppercase text-white">
              Latest Cars Detailed & Armored
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-cyan-500 text-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Studio Gallery
              </button>
              <button
                onClick={() => setViewMode('embed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-colors ${
                  viewMode === 'embed'
                    ? 'bg-cyan-500 text-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Live Profile Embed
              </button>
            </div>

            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group ml-2"
            >
              <span>View Instagram</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Live Embed View vs Grid View */}
        {viewMode === 'embed' ? (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-2 max-w-lg">
              <InstagramLogo className="w-12 h-12 mx-auto" />
              <h4 className="text-xl font-bold font-['Syne',sans-serif] text-white">
                Official @empire.auto_spa Instagram Hub
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Browse our real-time reels, client vehicle deliveries, PPF installations, and daily studio stories in G-9 Markaz Islamabad.
              </p>
            </div>

            <div className="w-full max-w-xl rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-6 text-center space-y-4 shadow-xl">
              <p className="text-xs font-mono text-cyan-400">
                Direct Instagram Profile Link:
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white font-mono break-all">
                https://www.instagram.com/empire.auto_spa/
              </div>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <InstagramLogo className="w-4 h-4" />
                  <span>Open @empire.auto_spa on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setViewMode('grid')}
                  className="px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  Return to Studio Gallery
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Instagram Posts Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSTAGRAM_POSTS.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-cyan-950/40 flex flex-col justify-between"
              >
                {/* Media Container */}
                <div className="relative aspect-square overflow-hidden bg-slate-950">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Badge: Post Type / Video / Carousel */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {post.isPinned && (
                      <span className="px-2 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] text-amber-300 border border-amber-400/40 font-mono font-bold">
                        Pinned
                      </span>
                    )}
                    {post.type === 'video' && (
                      <span className="p-1.5 rounded-md bg-black/80 backdrop-blur-md text-white border border-slate-700">
                        <Play className="w-3.5 h-3.5 fill-white text-white" />
                      </span>
                    )}
                    {post.type === 'carousel' && (
                      <span className="p-1.5 rounded-md bg-black/80 backdrop-blur-md text-white border border-slate-700">
                        <Film className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay with Likes & Comments */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6 text-white font-bold backdrop-blur-xs">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 fill-white text-white" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer with Caption Preview */}
                <div className="p-4 space-y-2 bg-[#090C14] border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-cyan-400" />
                      <span>{post.serviceDone}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {post.timestamp}
                    </span>
                  </div>

                  <h4 className="text-white font-bold text-sm font-['Syne',sans-serif] line-clamp-1">
                    {post.carModel}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Interactive Post Modal Viewer */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-cyan-500/40 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/80 text-white hover:text-cyan-400 transition-colors border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image/Video View */}
            <div className="md:w-1/2 bg-black flex items-center justify-center relative min-h-[300px]">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.caption}
                className="w-full h-full max-h-[70vh] object-contain"
              />
              {selectedPost.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/80 flex items-center justify-center text-black shadow-lg shadow-cyan-500/50">
                    <Play className="w-8 h-8 fill-black text-black ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Right Information & Comments Column */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-4 bg-[#090C14]">
              {/* Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-xs">
                  EA
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white">empire.auto_spa</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">G-9 Markaz, Islamabad</span>
                </div>
              </div>

              {/* Caption */}
              <div className="space-y-3 flex-1">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-xs font-mono text-cyan-400 uppercase block mb-1">
                    Car & Package
                  </span>
                  <div className="text-sm font-bold text-white font-['Syne',sans-serif]">
                    {selectedPost.carModel} • {selectedPost.serviceDone}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedPost.caption}
                </p>
                
                <div className="text-[11px] text-slate-500 font-mono">
                  Posted {selectedPost.timestamp}
                </div>
              </div>

              {/* Interaction Bar */}
              <div className="space-y-4 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5 text-rose-400">
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      {selectedPost.likes} likes
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <MessageCircle className="w-4 h-4" />
                      {selectedPost.comments} comments
                    </span>
                  </div>

                  <button
                    onClick={() => handleShare(selectedPost)}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1 text-xs"
                    title="Share Post"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
                  </button>
                </div>

                {/* Booking & Instagram Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      onOpenBooking();
                    }}
                    className="py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-cyan-500 text-black hover:bg-cyan-400 transition-colors flex items-center justify-center gap-1.5"
                  >
                    Book This Service
                  </button>

                  <a
                    href={COMPANY_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 rounded-xl font-semibold uppercase tracking-wider text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <InstagramLogo className="w-4 h-4" />
                    <span>Open in Instagram</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};

