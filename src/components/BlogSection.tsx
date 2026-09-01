import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { BookOpen, Clock, Calendar, ArrowRight, X, Shield, Sparkles, User, Tag } from 'lucide-react';

interface BlogSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onOpenBooking
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20 bg-[#080B11] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Master Detailing & PPF Knowledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Syne',sans-serif] uppercase tracking-tight text-white">
            AUTOMOTIVE CARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">ARTICLES & GUIDES</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Expert insights from our Islamabad master detailers on protecting your vehicle against Pakistan's weather, highway gravel, and bore water damage.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0A0D15] border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-cyan-950/30"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-['Syne',sans-serif] text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read More Footer */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-cyan-500/40"
                  />
                  <span className="text-slate-300 font-medium">{post.author.name}</span>
                </div>

                <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article →
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#090C14] border border-cyan-500/40 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
                <Tag className="w-3.5 h-3.5" />
                <span>{selectedPost.category}</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-['Syne',sans-serif] text-white leading-tight">
                  {selectedPost.title}
                </h2>
                
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span>By {selectedPost.author.name} ({selectedPost.author.role})</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              {/* Cover Banner */}
              <div className="rounded-2xl overflow-hidden aspect-[21/9] bg-slate-950 border border-slate-800">
                <img
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Content Paragraphs */}
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-light">
                {selectedPost.content.map((p, idx) => (
                  <p key={idx} className="leading-7">
                    {p}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* In-Article CTA Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-sky-950 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-white font-bold text-base font-['Syne',sans-serif]">
                    Ready to protect your vehicle?
                  </h4>
                  <p className="text-xs text-slate-300">
                    Visit Empire Auto Spa in G-9 Markaz Islamabad for a paint assessment.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-cyan-500 text-black hover:bg-cyan-400 transition-colors shrink-0"
                >
                  Book Assessment
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
