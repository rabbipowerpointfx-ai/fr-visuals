/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Grid, Eye, Flame, PlayCircle, Trophy, ArrowUpRight } from "lucide-react";
import { Project } from "../types";

interface PortfolioGridProps {
  projects: Project[];
  onProjectSelect: (project: Project, index: number) => void;
}

export default function PortfolioGrid({ projects, onProjectSelect }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("ALL WORK");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const categories = [
    "ALL WORK",
    "CGI & VFX",
    "MOTION DESIGN",
    "VJ LOOPS & 3D ART",
    "COMMERCIALS"
  ];

  // Filtering projects based on selection
  const filteredProjects = selectedCategory === "ALL WORK"
    ? projects
    : projects.filter(p => p.category.toUpperCase() === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-[#050505] relative border-b border-neutral-900 px-6 sm:px-12">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[#E50000]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-15">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-2.5 font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
            <span className="w-2 h-[1px] bg-[#E50000]"></span>
            <span>SHOWCASE WORKSPACE // CURATED PIECES</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
              PORTFOLIO <span className="italic font-serif font-light text-[#E50000]">// DIRECTORY</span>
            </h2>
            <p className="text-neutral-400 max-w-sm font-sans font-light text-xs sm:text-sm tracking-wide leading-relaxed">
              Curated simulations, commercial products, and high-tempo artistic visual loops designed for global brands. Direct links to 4K streams.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 border-y border-neutral-900 py-6">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-none font-display font-medium text-[10px] tracking-widest uppercase transition-all duration-300 relative focus:outline-none cursor-pointer ${
                  isActive
                    ? "text-[#E50000] bg-[#E50000]/10 border border-[#E50000]/30 shadow-[0_0_15px_rgba(229,0,0,0.1)]"
                    : "text-neutral-400 bg-neutral-900/30 hover:text-white border border-transparent hover:border-neutral-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Grid Layout */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-neutral-900 rounded-xl space-y-4">
            <Grid className="w-12 h-12 mx-auto text-neutral-700 animate-pulse" />
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
              DATABASE EMPTY FOR THE ELECTED CATEGORY
            </p>
            <button
              onClick={() => setSelectedCategory("ALL WORK")}
              className="text-[#E50000] text-xs font-mono underline hover:text-white"
            >
              LOAD ALL WORKSPACE ITEMS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const isHovered = hoveredCardId === project.id;
              return (
                <article
                  key={project.id}
                  className="group relative flex flex-col bg-[#0b0b0b] rounded-none border border-neutral-900 hover:border-[#E50000]/30 p-2.5 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1 select-none"
                  onMouseEnter={() => setHoveredCardId(project.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  {/* Aspect Ratio Sized Media Canvas Wrapper */}
                  <div className="relative aspect-[16/10] rounded-none overflow-hidden bg-neutral-950 w-full">
                    {/* Visual Project Thumbnail */}
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 pointer-events-none"
                    />

                    {/* Gradient Overlay Mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 transition-opacity duration-300 group-hover:opacity-90" />

                    {/* Left Emissive Strip */}
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 z-10">
                      <span className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-none bg-black/80 border border-neutral-800 text-neutral-300">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="flex items-center gap-0.5 font-mono text-[8px] px-2 py-0.5 rounded-none bg-[#E50000]/10 border border-[#E50000]/20 text-[#E50000] uppercase tracking-widest">
                          <Flame className="w-2.5 h-2.5 animate-pulse" /> POPULAR
                        </span>
                      )}
                    </div>

                    {/* Top Right Duration Specs */}
                    {project.duration && (
                      <span className="absolute top-2.5 right-2.5 font-mono text-[8px] text-neutral-400 px-2.5 py-1 rounded-none bg-black/80 border border-neutral-800 z-10">
                        {project.duration}
                      </span>
                    )}

                    {/* Hover Active Play Indicator overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <button
                        onClick={() => onProjectSelect(project, index)}
                        className="p-4 rounded-full bg-[#E50000] text-black font-semibold hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg shadow-[#E50000]/20"
                        title="Open Cinematic Player"
                      >
                        <PlayCircle className="w-8 h-8 fill-current text-black" />
                      </button>
                    </div>
                  </div>

                  {/* Caption Details */}
                  <div className="px-2 pt-5 pb-3 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display font-semibold text-sm text-neutral-100 hover:text-white transition-colors uppercase tracking-wide line-clamp-1">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-neutral-600 shrink-0 group-hover:text-[#E50000] transition-colors" />
                      </div>
                      <p className="font-sans font-light text-neutral-400 text-xs line-clamp-2 leading-relaxed tracking-wide">
                        {project.description}
                      </p>
                    </div>

                    {/* Integrated Tools list footer */}
                    <div className="flex flex-wrap gap-1 items-center pt-2 border-t border-neutral-800 font-mono text-[9px] text-[#E50000] uppercase tracking-wide">
                      {project.tools.slice(0, 3).map((tool, idx) => (
                        <span key={idx} className="bg-neutral-900/40 p-1 px-2 rounded-none border border-neutral-950">
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="text-neutral-500">+{project.tools.length - 3} MORE</span>
                      )}
                    </div>
                  </div>

                  {/* Card click overlay */}
                  <div
                    className="absolute inset-0 cursor-pointer z-0"
                    onClick={() => onProjectSelect(project, index)}
                  />
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
