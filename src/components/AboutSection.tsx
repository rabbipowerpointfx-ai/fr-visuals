/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Award, Cpu, Flame, Layers, Library, Sparkles, Star, Terminal, Zap } from "lucide-react";
import { SKILLS, TIMELINE } from "../data/portfolioData";

export default function AboutSection() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "3D & Simulation" | "Compositing & VFX" | "Motion & Editing">("ALL");

  const filteredSkills = activeCategory === "ALL"
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory);

  const stats = [
    { value: "07+", label: "YEARS EXP.", sub: "Simulation & VFX" },
    { value: "115+", label: "COMPLETED SPOTS", sub: "Commercial & VJ Loops" },
    { value: "05M+", label: "DIGITAL PLAYS", sub: "YouTube & Tour Loops" },
    { value: "00", label: "DEADLINES MISSED", sub: "Active Reliability" },
  ];

  return (
    <section id="about" className="py-24 bg-[#080808] relative border-b border-neutral-900 px-6 sm:px-12 overflow-hidden">
      {/* Absolute glow design elements */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full bg-[#E50000]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#E50000]/2 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Top Header */}
        <div className="text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-2.5 font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
            <span className="w-2 h-[1px] bg-[#E50000]"></span>
            <span>INDUSTRY EXPERTISE // BACKSTAGE METRICS</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
              THE ARTIST <span className="italic font-serif font-light text-[#E50000]">& ENGINE</span>
            </h2>
            <p className="text-neutral-400 max-w-sm font-sans font-light text-xs sm:text-sm tracking-wide leading-relaxed">
              Bridging the gap between physics engines and fine-art layouts. Working with premium editorial studios globally.
            </p>
          </div>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Biography Narrative & Core Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E50000]/10 border border-[#E50000]/20 rounded-none text-[#E50000] text-xs font-mono tracking-wider">
                <Terminal className="w-3.5 h-3.5" /> /USR/FAZLE_RABBI/BIO.MD
              </div>
              
              <h3 className="font-display font-semibold text-lg sm:text-2xl text-neutral-100 uppercase tracking-wide leading-relaxed">
                "I combine motion, visual storytelling, and cinematic filmmaking to connect with audiences emotionally."
              </h3>
              
              <p className="text-neutral-400 font-sans font-light text-sm sm:text-base leading-relaxed tracking-wider">
                Fazle Rabbi is a visual creator who started in graphic design and transitioned into motion design, visual effects, and filmmaking. He thrives on visual storytelling and connecting with audiences on a deep emotional level.
              </p>
              
              <p className="text-neutral-400 font-sans font-light text-sm sm:text-base leading-relaxed tracking-wider">
                FR Visuals represents his core expertise: Motion Graphics, CGI Collaboration, Post-Production, Visual Effects (VFX), Digital Content Creation, Color Grading, Video Direction (Documentaries, AVs, OVCs), and Video Editing. Built for absolute visual immersion.
              </p>
            </div>

            {/* Premium Bento Grid style Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-neutral-900">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-neutral-950/60 p-4 border border-neutral-900 rounded-none space-y-2">
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#E50000]">
                    {stat.value}
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-mono text-[9px] text-neutral-300 tracking-wider font-semibold uppercase block leading-tight">
                      {stat.label}
                    </p>
                    <p className="font-sans text-[9px] text-neutral-500 leading-none">
                      {stat.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Technical Skills Mixer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0b0b0b] rounded-none border border-neutral-900 p-6 md:p-8 space-y-6 shadow-xl">
              
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 flex items-center gap-2">
                   <Cpu className="w-3.5 h-3.5 text-[#E50000]" /> GRAPHIC SOFTWARE METRICS
                </span>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-none bg-[#E50000]/10 text-[#E50000] tracking-wider">
                  ACTIVE
                </span>
              </div>

              {/* Skills Filter Tabs */}
              <div className="flex flex-wrap gap-1 bg-neutral-950 p-1.5 rounded-none border border-neutral-900">
                {(["ALL", "3D & Simulation", "Compositing & VFX", "Motion & Editing"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-1 py-1 px-2 rounded-none font-display text-[9px] tracking-widest uppercase transition-all focus:outline-none cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#E50000] text-black font-extrabold"
                        : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {cat.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Skill Slider Lists */}
              <div className="space-y-5">
                {filteredSkills.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-300 uppercase tracking-widest text-[10px] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#E50000]" />
                        {skill.name}
                      </span>
                      <span className="text-[#E50000] font-medium">{skill.level}%</span>
                    </div>
                    {/* Visual Meter Track */}
                    <div className="h-1 bg-neutral-900 rounded-none overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-[#E50000] via-[#ff5252] to-[#E50000] rounded-none transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-neutral-950 rounded-none border border-neutral-900 font-mono text-[9px] text-neutral-500 leading-relaxed uppercase">
                ⚙️ SYSTEMS COMPATIBILITY: NVIDIA RTX 4090 DUAL GRID // REDSHIFT SUITE // COCUDA ACTIVE
              </div>
            </div>
          </div>

        </div>

        {/* Section Breakdown: Immersive Work Timeline Career Road */}
        <div className="pt-12 border-t border-neutral-900/60 max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">— PROFESSIONAL EXPERIENCE TIMELINE</span>
            <h3 className="font-display font-bold text-2xl text-white tracking-tight uppercase">CREATIVE DIRECTORY ROADMAP</h3>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-0 md:before:left-1/2 before:w-[1px] before:bg-neutral-800">
            {TIMELINE.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Anchor Point Bullet */}
                  <div className="absolute left-[3px] md:left-1/2 top-1.5 w-2.5 h-2.5 rounded-full bg-[#E50000] -translate-x-1.5 border-4 border-black z-20 focus:outline-none" />

                  {/* Spacer Area */}
                  <div className="w-full md:w-1/2" />

                  {/* Cards container */}
                  <div className="w-full md:w-1/2 pl-6 md:pl-10 md:pr-10 relative">
                    <div className="bg-[#0a0a0a] border border-neutral-900 hover:border-[#E50000]/40 p-6 rounded-none space-y-3 shadow transition-colors">
                      <span className="font-mono text-[10px] text-[#E50000] font-bold tracking-wider uppercase block">
                        {item.year}
                      </span>
                      <div>
                        <h4 className="font-display font-semibold text-[#f5f5f5] uppercase text-sm">
                          {item.role}
                        </h4>
                        <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                          {item.company}
                        </p>
                      </div>
                      <p className="text-neutral-400 text-xs font-sans font-light leading-relaxed tracking-wide">
                        {item.description}
                      </p>
                      {/* Meta Tags */}
                      <div className="flex flex-wrap gap-1 pt-1 font-mono text-[8px] text-neutral-500 tracking-wider">
                        {item.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="bg-neutral-950 p-[3px] px-2 rounded-none uppercase">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
