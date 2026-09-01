import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, Shield, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';

export const BeforeAfterSlider: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProject = GALLERY_ITEMS[activeProjectIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="transformations" className="py-20 bg-[#06080D] relative border-t border-slate-900 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visible Studio Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Syne',sans-serif] uppercase tracking-tight text-white">
            TRANSFORMATION & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">PPF COMPARISON</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Drag the interactive slider below to witness how our multi-stage paint correction, TPU self-healing PPF, and deep interior steam extraction bring neglected vehicles back to showroom condition.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {GALLERY_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveProjectIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeProjectIndex === idx
                  ? 'bg-cyan-950/80 border border-cyan-500/60 text-cyan-300 shadow-md shadow-cyan-950/50'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <span className="font-mono text-[10px] text-cyan-500">0{idx + 1}</span>
              <span>{item.car}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {item.category}
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Split-View Comparison Canvas */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 shadow-2xl bg-black select-none">
            
            <div
              ref={containerRef}
              className="relative w-full aspect-[16/9] sm:aspect-[21/10] cursor-ew-resize overflow-hidden"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
            >
              {/* "AFTER" Image (Full background layer) */}
              <img
                src={currentProject.afterImage}
                alt={`After ${currentProject.title}`}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />

              {/* "BEFORE" Image (Clipped layer) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none transition-[width] duration-75 ease-out"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentProject.beforeImage}
                  alt={`Before ${currentProject.title}`}
                  className="absolute inset-0 w-full h-full object-cover object-center max-w-none pointer-events-none filter brightness-90 contrast-90"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                    height: '100%'
                  }}
                />
                
                {/* Before overlay badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-red-500/40 text-red-300 text-xs font-mono font-bold tracking-wider uppercase">
                    BEFORE (Raw / Scratched)
                  </div>
                </div>
              </div>

              {/* After overlay badge */}
              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <div className="px-3 py-1 rounded-md bg-cyan-950/80 backdrop-blur-md border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
                  AFTER (Empire Spa Perfection ✨)
                </div>
              </div>

              {/* Slider Divider Line */}
              <div
                className="absolute inset-y-0 w-[3px] bg-gradient-to-b from-cyan-300 via-sky-400 to-cyan-500 shadow-[0_0_15px_#06b6d4] pointer-events-none z-30 transition-[left] duration-75 ease-out"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Draggable Circular Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] flex items-center justify-center text-cyan-300 cursor-ew-resize">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom hint banner */}
              <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none z-20">
                <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-slate-300 font-medium flex items-center gap-1.5 border border-slate-700">
                  <ArrowLeftRight className="w-3 h-3 text-cyan-400" />
                  <span>Drag slider left or right to inspect clarity</span>
                </div>
              </div>
            </div>

            {/* Project Details Footer Strip */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 to-[#0A0E17] border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    {currentProject.packageUsed}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Time in Studio: {currentProject.completionTime}
                  </span>
                </div>
                <h2 className="text-white font-bold text-base sm:text-lg mt-1 font-['Syne',sans-serif]">
                  {currentProject.title}
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  {currentProject.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Vehicle</span>
                  <span className="text-xs font-bold text-white">{currentProject.car}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
