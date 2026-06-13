/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronDown, Monitor, Film, PlayCircle, Eye } from "lucide-react";
import Logo from "./Logo";
import Image from "./Image";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showreelCover, setShowreelCover] = useState(false);
  const [activeFrequencies, setActiveFrequencies] = useState<number[]>(new Array(16).fill(5));

  // Audio spectrum simulation bar pulses when sound is active
  useEffect(() => {
    let animationId: number;
    const updateSpectrum = () => {
      if (!isMuted && isPlaying) {
        setActiveFrequencies(Math.random() > 0.1 
          ? Array.from({ length: 16 }, () => Math.floor(Math.random() * 40) + 5)
          : Array.from({ length: 16 }, () => Math.floor(Math.random() * 10) + 3)
        );
      } else {
        setActiveFrequencies(new Array(16).fill(2));
      }
      animationId = requestAnimationFrame(updateSpectrum);
    };
    
    updateSpectrum();
    return () => cancelAnimationFrame(animationId);
  }, [isMuted, isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(err => console.log("Video play interrupted:", err));
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMute = !isMuted;
      videoRef.current.muted = nextMute;
      setIsMuted(nextMute);
    }
  };

  const handleScrollDown = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Heavy Obsidian Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/80 z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505]/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505]/40 to-transparent z-10 pointer-events-none" />

      {/* Cyber Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,15,15,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(229,0,0,0.01),rgba(0,0,0,0.01),rgba(229,0,0,0.01))] bg-[size:100%_4px,3px_100%] z-10 opacity-70 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[#E50000]/10 z-10 animate-scanline pointer-events-none" />

      {/* Background Cinematic Video Loop */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105 pointer-events-none"
        src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c05423886566afec499df5e6e3d233e7&profile_id=139&oauth2_token_id=57447761"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Visual background ambient glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-[#E50000]/5 blur-[120px] pointer-events-none z-0" />

      {/* Hero Core Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-between pt-32 pb-16">
        
        {/* Top bar tech specifications */}
        <div className="hidden lg:flex items-center justify-between font-mono text-[9px] tracking-[0.25em] text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50000] animate-ping"></span>
            <span className="text-neutral-400 uppercase">FEATURED REEL</span>
            <span className="text-neutral-600">|</span>
            <span>CINEMATIC AUDIO ACTIVE</span>
          </div>
          <div>
            <span>PREMIERE PRO // DAVINCI RESOLVE COLOR SYSTEM</span>
          </div>
        </div>

        {/* Central Display Typography */}
        <div className="my-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Image
              src="/logo.png"
              alt="FR Visuals Hero Logo"
              width={28}
              height={28}
              className="w-7 h-7 select-none"
              removeBackground="white"
            />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-300">
              FAZLE RABBI // DIRECTORS EDIT
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[0.9] text-white">
            MOTION & VFX<br />
            <span className="italic font-serif font-light text-[#E50000] opacity-90">
              Aesthetics in Motion
            </span>
          </h1>

          <p className="text-neutral-300 font-sans font-light text-base sm:text-xl max-w-2xl leading-relaxed tracking-wide">
            High-octane motion graphics, CGI & VFX, and cinematic documentary content. Combining raw emotion with advanced post-production, keying, and aesthetic color grading workflows.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={handleScrollDown}
              className="px-8 py-4 rounded bg-[#E50000] text-black font-display font-extrabold text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#E50000]/25 cursor-pointer"
            >
              EXPLORE PROJECTS
            </button>
            <button
              onClick={togglePlay}
              className="px-6 py-4 rounded border border-neutral-800 bg-black/60 backdrop-blur-sm text-white font-display font-bold text-xs tracking-widest uppercase hover:bg-neutral-900 transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> PAUSE REEL
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> RESUME REEL
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Interactive Settings & Indicator */}
        <div className="flex items-center justify-between pt-6 border-t border-neutral-900/40">
          
          {/* Mute & Real-time Pulsing Equalizer wave */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMute}
              className="p-3 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#E50000] transition-colors focus:outline-none cursor-pointer"
              title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-[#E50000]" />}
            </button>

            <div className="flex items-end gap-[2px] h-6 w-32 px-1">
              {activeFrequencies.map((val, idx) => (
                <div
                  key={idx}
                  className="w-[3px] bg-[#E50000] rounded-t transition-all duration-100 ease-out"
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
            <span className="font-mono text-[9px] text-neutral-600 tracking-wider uppercase hidden sm:inline-block">
              {isMuted ? "SOUND OVERLAY INACTIVE" : "REEL AMBIENT BROADCAST"}
            </span>
          </div>

          {/* Pulse down indicator */}
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-1 group font-mono text-[9px] tracking-[0.2em] text-neutral-500 hover:text-white cursor-pointer"
          >
            <span>SCROLL DOWN</span>
            <div className="w-5 h-8 rounded-full border border-neutral-800 flex items-start justify-center p-1 group-hover:border-[#E50000] transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E50000] animate-bounce" />
            </div>
          </button>

        </div>
      </div>
    </section>
  );
}
