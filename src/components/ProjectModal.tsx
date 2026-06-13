/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { X, Calendar, User, ExternalLink, Tag, Clock, ChevronLeft, ChevronRight, Laptop } from "lucide-react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onNavigate?: (direction: "next" | "prev") => void;
}

export default function ProjectModal({ project, onClose, onNavigate }: ProjectModalProps) {
  
  // Lock body scroll of main page when modal is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Keyboard navigation overrides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (onNavigate) {
        if (e.key === "ArrowLeft") onNavigate("prev");
        if (e.key === "ArrowRight") onNavigate("next");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNavigate]);

  // Extract YouTube ID from link
  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = "";
    try {
      if (url.includes("v=")) {
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get("v") || "";
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
      } else {
        // Fallback for raw ID passed
        videoId = url;
      }
    } catch (e) {
      videoId = "F_f8lY10t_M"; // fallback beautiful ID
    }
    return `https://www.youtube.com/embed/${videoId || "F_f8lY10t_M"}?autoplay=1&mute=0&rel=0&modestbranding=1`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl transition-all duration-300">
      
      {/* Outer Click Close handler */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

      {/* Main Glassmorphic Wrapper */}
      <div className="relative w-full max-w-5xl rounded-none border border-neutral-800 bg-[#0c0c0c] overflow-hidden max-h-[92vh] flex flex-col z-10 shadow-2xl shadow-[#E50000]/5">
        
        {/* Header Action Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-900 bg-[#0d0d0d]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#E50000] p-1 px-2.5 rounded-none bg-[#E50000]/10 border border-[#E50000]/20">
              {project.category}
            </span>
            <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
              // PROJECT ID: {project.id}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {onNavigate && (
              <div className="flex items-center border border-neutral-800 rounded-none bg-[#101010]/90 mr-4">
                <button
                  onClick={() => onNavigate("prev")}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors cursor-pointer"
                  title="Previous Project (Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-4 bg-neutral-800" />
                <button
                  onClick={() => onNavigate("next")}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors cursor-pointer"
                  title="Next Project (Right Arrow)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <button
               onClick={onClose}
              className="p-2 rounded-none bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#E50000]/40 hover:bg-[#E50000]/10 transition-all duration-200 cursor-pointer"
              title="Close (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body Scroll Area */}
        <div className="overflow-y-auto flex-1">
          {/* Immersive YouTube Video Frame Container */}
          <div className="relative w-full aspect-video bg-black border-b border-neutral-900 shadow-md">
            <iframe
              src={getYouTubeEmbedUrl(project.youtubeUrl)}
              className="absolute top-0 left-0 w-full h-full"
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Detailed Project Information Metadata */}
          <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col lg:flex-row gap-8 justify-between">
              
              {/* Product Headline & Description */}
              <div className="space-y-4 flex-1">
                <h2 className="font-display font-black text-2xl md:text-3xl tracking-tight text-white uppercase leading-normal">
                  {project.title}
                </h2>
                <div className="h-[2px] w-24 bg-[#E50000]" />
                <p className="text-neutral-300 font-sans font-light text-sm md:text-md leading-relaxed tracking-wider">
                  {project.description}
                </p>
              </div>

              {/* Specific Metadata List */}
              <div className="w-full lg:w-80 shrink-0 space-y-4 bg-neutral-950/80 p-5 rounded-none border border-neutral-900">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#E50000] mb-2">— METADATA SPECIFICATIONS</p>
                
                <div className="space-y-3 font-sans text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                    <span className="text-neutral-500 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <User className="w-3.5 h-3.5 text-neutral-600" /> ARTIST ROLE
                    </span>
                    <span className="text-neutral-200 font-medium text-right max-w-[160px] truncate">{project.role}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                    <span className="text-neutral-500 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <Laptop className="w-3.5 h-3.5 text-neutral-600" /> CLIENT
                    </span>
                    <span className="text-neutral-200 font-medium text-right">{project.client}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                    <span className="text-neutral-500 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <Calendar className="w-3.5 h-3.5 text-neutral-600" /> TIMELINE YEAR
                    </span>
                    <span className="font-mono text-neutral-300">{project.year}</span>
                  </div>

                  {project.duration && (
                    <div className="flex justify-between items-center py-2 border-b border-neutral-900">
                      <span className="text-neutral-500 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                        <Clock className="w-3.5 h-3.5 text-neutral-600" /> REEL LENGTH
                      </span>
                      <span className="font-mono text-[#E50000]">{project.duration}</span>
                    </div>
                  )}
                </div>

                <a
                  href={project.youtubeUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-none bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-white hover:border-[#E50000] hover:bg-[#E50000]/5 transition-all text-center focus:outline-none"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#E50000]" />
                  VIEW SOURCE ON YOUTUBE
                </a>
              </div>

            </div>

            {/* Configured Software Tools Stack */}
            <div className="space-y-3 pt-4 border-t border-neutral-900">
              <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-[0.2em] flex items-center gap-2">
                <Tag className="w-3 h-3 text-[#E50000]" /> SOFTWARE TOOLPIECES & RENDERS UTILIZED
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-none bg-[#121212] text-neutral-300 hover:text-white border border-neutral-800 transition-colors uppercase tracking-wider font-mono text-[10px]"
                  >
                    🚀 {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
