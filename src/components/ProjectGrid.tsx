import React, { useState } from "react";
import { Grid } from "lucide-react";
import { Project } from "../types";
import VideoCard from "./VideoCard";

interface ProjectGridProps {
  projects: Project[];
  onProjectSelect: (project: Project, index: number) => void;
}

export default function ProjectGrid({ projects, onProjectSelect }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    "ALL",
    "MOTION GRAPHICS",
    "CGI & VFX",
    "DOCUMENTARY & COMMERCIAL"
  ];

  // Filtering projects based on active selection (case-insensitive to support standard strings)
  const filteredProjects = selectedCategory === "ALL"
    ? projects
    : projects.filter(
        (p) => p.category.toUpperCase() === selectedCategory
      );

  return (
    <section id="projects" className="py-24 bg-[#050505] relative border-b border-zinc-900 px-6 sm:px-12">
      {/* Background visual atmosphere glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[#E50000]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Title details */}
        <div className="text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-2.5 font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
            <span className="w-2 h-[1px] bg-[#E50000]"></span>
            <span>SHOWCASE WORKSPACE // SANITY DRIVEN SIMULATOR</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
              PORTFOLIO <span className="italic font-serif font-light text-[#E50000]">// DIRECTORY</span>
            </h2>
            <p className="text-neutral-400 max-w-sm font-sans font-light text-xs sm:text-sm tracking-wide leading-relaxed">
              Curated animations, documentary films, and interactive visual loops crafted by Fazle Rabbi. Instantly stream 4K playbacks on hover.
            </p>
          </div>
        </div>

        {/* State-driven Categorized Slider Menu */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 border-y border-zinc-900 py-6">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-none font-display font-medium text-[10px] tracking-widest uppercase transition-all duration-300 relative focus:outline-none cursor-pointer ${
                  isActive
                    ? "text-[#E50000] bg-[#E50000]/10 border border-[#E50000]/30 shadow-[0_0_15px_rgba(229,0,0,0.1)]"
                    : "text-neutral-400 bg-neutral-900/30 hover:text-white border border-transparent hover:border-zinc-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Curated Grid Mapping list of VideoCards */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-zinc-900 rounded-none space-y-4">
            <Grid className="w-12 h-12 mx-auto text-neutral-800 animate-pulse" />
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
              DATABASE OVERFLOW EMPTY FOR SELECTED CATEGORY
            </p>
            <button
              onClick={() => setSelectedCategory("ALL")}
              className="text-[#E50000] text-xs font-mono underline hover:text-white"
            >
              LOAD ALL PORTFOLIO ITEMS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              // Ensure Arrow details list coordinates map to global array index correctly
              const originalIndex = projects.findIndex((p) => p.id === project.id);
              return (
                <VideoCard
                  key={project.id}
                  project={project}
                  onSelect={() => onProjectSelect(project, originalIndex >= 0 ? originalIndex : index)}
                />
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
