import React, { useState, useEffect } from "react";
import { PlayCircle, Film, ArrowUpRight } from "lucide-react";
import { Project } from "../types";

interface VideoCardProps {
  project: Project;
  onSelect: () => void;
  key?: string;
}

export default function VideoCard({ project, onSelect }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Parse or retrieve YouTube ID
  const youtubeId = project.youtubeId || (() => {
    try {
      if (project.youtubeUrl.includes("v=")) {
        const urlParams = new URLSearchParams(new URL(project.youtubeUrl).search);
        return urlParams.get("v") || "";
      } else if (project.youtubeUrl.includes("youtu.be/")) {
        return project.youtubeUrl.split("youtu.be/")[1]?.split("?")[0] || "";
      }
    } catch (e) {
      // parse failure
    }
    return "F_f8lY10t_M";
  })();

  // Delay loading the video by a tiny bit to avoid triggering unnecessary heavy loads on fast mouse-overs
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isHovered) {
      t = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 350);
    } else {
      setShouldLoadVideo(false);
    }
    return () => clearTimeout(t);
  }, [isHovered]);

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <article
      className="group relative flex flex-col bg-[#0b0b0b] rounded-none border border-zinc-850 hover:border-[#E50000]/50 p-2 overflow-hidden transition-all duration-500 ease-out select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* High-performance visual preview stage */}
      <div className="relative aspect-[16/10] rounded-none overflow-hidden bg-black w-full">
        {/* Fallback support for youtube thumbnail image load failures */}
        <img
          src={thumbnailUrl}
          onError={(e) => {
            (e.target as HTMLImageElement).src = project.thumbnail || "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80";
          }}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 pointer-events-none"
        />

        {/* Gradient Shadow Overlay Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

        {/* Optimized Muted Hover Playback Stream */}
        {shouldLoadVideo && (
          <div className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 z-10">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&modestbranding=1&iv_load_policy=3&showinfo=0&rel=0&disablekb=1&fs=0`}
              className="absolute inset-0 w-full h-full scale-[1.35] object-cover"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={project.title}
            />
            {/* Overlay shield to prevent active video clicking conflict */}
            <div className="absolute inset-0 bg-black/10 z-20" />
          </div>
        )}

        {/* Emissive Visual Badges */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 z-20">
          <span className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-none bg-black border border-zinc-800 text-neutral-300">
            {project.category}
          </span>
          {project.featured && (
            <span className="flex items-center gap-0.5 font-mono text-[8.5px] px-2 py-0.5 rounded-none bg-[#E50000]/10 border border-[#E50000]/20 text-[#E50000] uppercase tracking-widest font-semibold">
              <Film className="w-2.5 h-2.5 animate-pulse" /> SIGNATURE
            </span>
          )}
        </div>

        {/* Center Hover Action Marker */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
          <button
            onClick={onSelect}
            className="p-3.5 rounded-full bg-[#E50000] text-black font-semibold hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg shadow-[#E50000]/20"
          >
            <PlayCircle className="w-8 h-8 fill-current text-black" />
          </button>
        </div>
      </div>

      {/* Fine-art Copy Panels */}
      <div className="px-2 pt-4 pb-2 flex flex-col flex-1 justify-between gap-3 relative z-20">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2 cursor-pointer" onClick={onSelect}>
            <h3 className="font-display font-medium text-xs sm:text-sm text-neutral-100 group-hover:text-white transition-all uppercase tracking-wide line-clamp-1">
              {project.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 shrink-0 group-hover:text-[#E50000] transition-colors" />
          </div>
          <p className="font-sans font-light text-neutral-400 text-xs line-clamp-2 leading-relaxed tracking-wider">
            {project.description}
          </p>
        </div>

        {/* Tools tag labels */}
        <div className="flex flex-wrap gap-1 items-center pt-2.5 border-t border-zinc-900 font-mono text-[9px] text-[#E50000] uppercase tracking-wider">
          {project.tools.slice(0, 3).map((tool, idx) => (
            <span key={idx} className="bg-zinc-950 p-0.5 px-1.5 rounded-none border border-zinc-900">
              {tool}
            </span>
          ))}
          {project.tools.length > 3 && (
            <span className="text-zinc-600">+{project.tools.length - 3}</span>
          )}
        </div>
      </div>

      {/* Primary Click handler overlay */}
      <div
        className="absolute inset-0 cursor-pointer z-0"
        onClick={onSelect}
      />
    </article>
  );
}
