/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectGrid from "./components/ProjectGrid";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import ProjectModal from "./components/ProjectModal";
import AdminPanel from "./components/AdminPanel";
import Logo from "./components/Logo";
import Image from "./components/Image";
import { Project } from "./types";
import { getProjects } from "./data/portfolioData";
import { Layers, Film, Youtube, Globe, Heart, ShieldAlert, Cpu } from "lucide-react";

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(-1);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Load and cache active projects
  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleProjectsUpdate = (updated: Project[]) => {
    setProjects(updated);
  };

  // Nav scroll interceptor to highlight header section markers accurately
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const homeSection = document.getElementById("home");
      const projectsSection = document.getElementById("projects");
      const aboutSection = document.getElementById("about");
      const contactSection = document.getElementById("contact");

      const threshold = windowHeight / 3;

      if (contactSection && scrollY >= contactSection.offsetTop - threshold) {
        setActiveSection("contact");
      } else if (aboutSection && scrollY >= aboutSection.offsetTop - threshold) {
        setActiveSection("about");
      } else if (projectsSection && scrollY >= projectsSection.offsetTop - threshold) {
        setActiveSection("projects");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modal navigation arrow cycling
  const handleModalNavigate = (direction: "next" | "prev") => {
    if (projects.length === 0 || selectedProjectIndex === -1) return;
    
    let newIndex = selectedProjectIndex;
    if (direction === "next") {
      newIndex = (selectedProjectIndex + 1) % projects.length;
    } else {
      newIndex = (selectedProjectIndex - 1 + projects.length) % projects.length;
    }
    
    setSelectedProject(projects[newIndex]);
    setSelectedProjectIndex(newIndex);
  };

  const handleProjectSelect = (project: Project, index: number) => {
    setSelectedProject(project);
    setSelectedProjectIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] selection:bg-[#E50000] selection:text-black">
      
      {/* Absolute Cinematic Ambient Orbs */}
      <div className="fixed top-0 left-10 w-96 h-96 rounded-full bg-[#E50000]/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-10 w-96 h-96 rounded-full bg-[#E50000]/2 blur-[120px] pointer-events-none z-0" />

      {/* Main Page Headers */}
      <Header
        onAdminToggle={() => setIsAdminOpen(!isAdminOpen)}
        isAdminOpen={isAdminOpen}
        activeSection={activeSection}
      />

      {/* Core Section Elements */}
      <main className="relative z-10">
        {/* Full screen showreel hero */}
        <Hero />

        {/* Portfolio Dynamic Showroom */}
        <ProjectGrid
          projects={projects}
          onProjectSelect={handleProjectSelect}
        />

        {/* Artist Experience, Bio & Skill metrics */}
        <AboutSection />

        {/* Glassmorphic Contact & Brief Inquiry */}
        <ContactSection />
      </main>

      {/* Immersive Modular Video Details Player */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => {
            setSelectedProject(null);
            setSelectedProjectIndex(-1);
          }}
          onNavigate={handleModalNavigate}
        />
      )}

      {/* Sanity Studio Admin Simulator drawer */}
      {isAdminOpen && (
        <AdminPanel
          onClose={() => setIsAdminOpen(false)}
          onProjectsUpdate={handleProjectsUpdate}
        />
      )}

      {/* Bespoke Cinematic Footer */}
      <footer className="bg-[#030303] border-t border-neutral-900/60 py-16 px-6 sm:px-12 relative z-10 overflow-hidden">
        
        {/* Fine-art micro mesh details */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950" />
        
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-neutral-900/60">
            {/* Logo Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="FR Visuals Footer Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 select-none scale-100 hover:scale-105 active:scale-95 transition-transform duration-300"
                  removeBackground="white"
                />
                <div className="flex flex-col">
                  <span className="font-display font-black tracking-tighter text-[#F0F0F0] text-xl italic uppercase leading-none">
                    FR VISUALS<span className="text-[#E50000]">.</span>
                  </span>
                  <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-neutral-400 mt-1 leading-none">
                    MOTION STUDIO
                  </p>
                </div>
              </div>
              <p className="font-sans text-[11px] text-neutral-500 tracking-wider">
                Digital storytelling in motion. Synthesizing light, filmmaking layouts, and cinematic visual art.
              </p>
            </div>

            {/* Quick Interactive Anchors */}
            <div className="flex flex-wrap gap-6 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
              <span className="hover:text-[#E50000] cursor-help" title="DHAKA, BD DIRECTORY">📍 DHAKA, BD // GLOBAL REMOTE</span>
              <span>•</span>
              <a href="https://vimeo.com" target="_blank" referrerPolicy="no-referrer" className="hover:text-[#E50000] transition-colors">VIMEO_REEL</a>
              <span>•</span>
              <a href="https://behance.net" target="_blank" referrerPolicy="no-referrer" className="hover:text-[#E50000] transition-colors">BEHANCE_PORTFOLIO</a>
              <span>•</span>
              <a href="https://youtube.com" target="_blank" referrerPolicy="no-referrer" className="hover:text-[#E50000] transition-colors">YOUTUBE_REELS</a>
              <span>•</span>
              <a href="https://linkedin.com" target="_blank" referrerPolicy="no-referrer" className="hover:text-[#E50000] transition-colors">LINKEDIN_CONNECT</a>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 font-mono text-[9px] text-neutral-600 uppercase">
            <div className="space-y-1">
              <p>© FR VISUALS — ALL RIGHTS RESERVED. SECURED GLOBAL RIGHTS.</p>
              <p className="flex items-center gap-1.5 lowercase">
                made with <Heart className="w-3 h-3 text-red-500 fill-current" /> and Tailwind for creative visionaries
              </p>
            </div>

            <div className="flex items-center gap-4 bg-neutral-950 p-2.5 px-3.5 border border-neutral-900/80 rounded-none w-full lg:w-auto overflow-hidden">
              <Cpu className="w-3.5 h-3.5 text-[#E50000] animate-pulse shrink-0" />
              <span className="truncate">METRIC STACKS OK // ENGINE STATUS: ONLINE (UTC)</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
