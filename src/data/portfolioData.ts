/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Skill, TimelineItem, ContactMessage } from "../types";

// Static premium initial projects with high-quality visual backdrops and actual motion/VFX tags
export const INITIAL_PROJECTS: Project[] = [
  {
    id: "vfx-anomaly",
    title: "NEO-TOKYO ANOMALY // CGI & VFX Environment Study",
    slug: "neo-tokyo-anomaly",
    category: "CGI & VFX",
    description: "A dark cyberpunk environment landscape layout built using CGI pre-viz, combining advanced environment projection, matte paint workflows, and custom VFX. Volumetric dark alley lighting and atmospheric heavy rain simulations completed in post-production with compositing.",
    youtubeUrl: "https://www.youtube.com/watch?v=F_f8lY10t_M",
    youtubeId: "F_f8lY10t_M",
    thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    featured: true,
    role: "Visual Effects (VFX) Artist & Compositor",
    tools: ["After Effects", "DaVinci Resolve", "Photoshop", "Cinema 4D"],
    client: "Pixelworks VFX Labs",
    year: "2024",
    duration: "2:15"
  },
  {
    id: "vj-entropy",
    title: "METALLIC ENTROPY // Abstract Particle Loop 4K",
    slug: "metallic-entropy",
    category: "Motion Graphics",
    description: "Generative particle simulation exploring metal grain flow and reflective elements. Created carefully to trace sharp rhythm pulses, showcasing advanced timing layouts and custom kinetic vectors.",
    youtubeUrl: "https://www.youtube.com/watch?v=9_C8M_0A7-U",
    youtubeId: "9_C8M_0A7-U",
    thumbnail: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    featured: true,
    role: "Senior Motion Graphics Designer",
    tools: ["After Effects", "Premiere Pro", "Illustrator", "DaVinci Resolve"],
    client: "Sound Lab Promotions",
    year: "2025",
    duration: "1:00"
  },
  {
    id: "heritage-doc",
    title: "PADMA SAGA // Independent Documentary Film",
    slug: "padma-saga",
    category: "Documentary & Commercial",
    description: "A cinematic documentary short highlighting the emotional storytelling and daily struggles of local fishermen. Shot entirely on location, graded in DaVinci Resolve, focusing on capturing honest human resilience and warm evening palettes.",
    youtubeUrl: "https://www.youtube.com/watch?v=zAg_T7fC7zQ",
    youtubeId: "zAg_T7fC7zQ",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    featured: true,
    role: "Video Director & Lead Editor",
    tools: ["Premiere Pro", "DaVinci Resolve", "Audition", "Media Encoder"],
    client: "Independent Film Showcase",
    year: "2023",
    duration: "4:30"
  },
  {
    id: "vfx-singularity",
    title: "QUANTUM IGNITION // Advanced Simulation Trailer",
    slug: "quantum-ignition",
    category: "CGI & VFX",
    description: "Experimental post-production study centering volumetric smoke simulations and heavy color manipulation. Includes complex keying, mask tracking, and multi-layered particle glow adjustments.",
    youtubeUrl: "https://www.youtube.com/watch?v=KzXg5k84Zms",
    youtubeId: "KzXg5k84Zms",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    featured: false,
    role: "VFX Supervisor",
    tools: ["After Effects", "DaVinci Resolve", "Photoshop", "Audition"],
    client: "Interactive Studios Ltd",
    year: "2022",
    duration: "1:45"
  },
  {
    id: "vj-obelisk",
    title: "SYNAPSE GLITCH // Rhythmic Video Loop",
    slug: "synapse-glitch",
    category: "Motion Graphics",
    description: "High-octane sound-reactive visual opener mixing abstract shapes with dynamic typography. Engineered for vertical club screens and dynamic projection panels, showing intense speed cuts.",
    youtubeUrl: "https://www.youtube.com/watch?v=bAtA0K9D024",
    youtubeId: "bAtA0K9D024",
    thumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    featured: false,
    role: "Motion Graphics Editor",
    tools: ["After Effects", "Premiere Pro", "Photoshop", "Illustrator"],
    client: "BassNation Visuals",
    year: "2024",
    duration: "1:15"
  },
  {
    id: "com-sneaker",
    title: "GRAND FESTIVAL PROMO // Commercial AV Opener",
    slug: "grand-festival-promo",
    category: "Documentary & Commercial",
    description: "High-speed promotional video showcasing corporate event openers. Combines rapid-fire video editing, motion design, and rich audio track layering to capture crowd excitement and sponsors.",
    youtubeUrl: "https://www.youtube.com/watch?v=Vl8dF2j3q40",
    youtubeId: "Vl8dF2j3q40",
    thumbnail: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=800&q=80",
    featured: false,
    role: "Digital Content Maker & Editor",
    tools: ["Premiere Pro", "DaVinci Resolve", "Media Encoder", "After Effects"],
    client: "CEMS Bangladesh Expo",
    year: "2024",
    duration: "0:45"
  }
];

export const SKILLS: Skill[] = [
  { name: "Adobe Premiere Pro (Video Editing)", level: 96, category: "Motion & Editing", iconName: "film" },
  { name: "Adobe After Effects (Motion Graphics)", level: 98, category: "Motion & Editing", iconName: "image" },
  { name: "DaVinci Resolve (Color Grading)", level: 92, category: "Motion & Editing", iconName: "aperture" },
  { name: "Adobe Audition (Sound Engineering)", level: 85, category: "Motion & Editing", iconName: "waves" },
  
  { name: "Visual Effects (VFX & Keying)", level: 91, category: "Compositing & VFX", iconName: "crosshair" },
  { name: "Post-Production Compositing", level: 90, category: "Compositing & VFX", iconName: "layers" },
  { name: "Photoshop & Illustrator (CGI Assets)", level: 94, category: "Compositing & VFX", iconName: "box" },
  
  { name: "Adobe Media Encoder & Bridge", level: 90, category: "3D & Simulation", iconName: "terminal" },
  { name: "CGI & Cinematic Direction", level: 88, category: "3D & Simulation", iconName: "aperture" },
  { name: "Digital Storytelling", level: 95, category: "3D & Simulation", iconName: "sparkles" },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2015 - PRESENT",
    role: "Freelance Motion Graphics Designer, Film Maker & VFX Artist",
    company: "Self-Employed (FR Visuals)",
    description: "Directing high-fidelity documentary shorts, client commercial AVs, and custom motion layout systems. Collaborates closely on color grading, digital content creation, and vfx integration with worldclass brands.",
    tags: ["Premiere Pro", "After Effects", "DaVinci Resolve", "VFX"]
  },
  {
    year: "2013 - 2015",
    role: "VFX Supervisor",
    company: "PIXELWORKS LTD",
    description: "Led the creative visual effects team. Directed visual compositions, multi-layer green-screen keying, rotoscoping pipelines, and motion-tracking integrations for commercial television ads.",
    tags: ["VFX Supervision", "After Effects", "Compositing", "Photoshop"]
  },
  {
    year: "2011 - 2013",
    role: "Visualizer",
    company: "CEMS BANGLADESH LTD",
    description: "Designed high-impact multimedia screens and trade-expo intro videos. Engineered massive event promotional videos (AVs/OVCs) utilizing fast editing cuts, audio integration, and title animation graphics.",
    tags: ["Intro Videos", "Video Editing", "Audition", "Illustrator"]
  },
  {
    year: "2009 - 2010",
    role: "UI Designer",
    company: "TECHNOLOGY SOLUTIONS LTD",
    description: "Crafted interactive interfaces, motion-graphics guides and digital graphics assets. Established standard layouts and brand typography guides.",
    tags: ["UI Design", "Illustrator", "Photoshop", "Bridge"]
  },
  {
    year: "2009",
    role: "Creative Design Intern",
    company: "ADCOMM LTD",
    description: "Supported marketing art directors on print layout designs, asset pre-compositions, and digital brand mockups. Pioneered several successful visual campaign patterns.",
    tags: ["Graphic Design", "Photoshop", "Illustrator", "Intership"]
  }
];

// Helper functions for mock Sanity CMS integration
const STORAGE_KEY = "fr_visuals_cms_projects";

export function getProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Local storage lookup failed, reverting to default portfolio:", e);
  }
  return INITIAL_PROJECTS;
}

export function saveProject(project: Project): Project[] {
  const current = getProjects();
  const existingIndex = current.findIndex(p => p.id === project.id);
  
  if (existingIndex > -1) {
    current[existingIndex] = project;
  } else {
    current.unshift(project);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return current;
}

export function deleteProject(id: string): Project[] {
  const current = getProjects().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return current;
}

export function resetPortfolioToDefaults(): Project[] {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
  return INITIAL_PROJECTS;
}

// Helpers for the local client inquiries
const MESSAGES_KEY = "fr_visuals_client_messages";

export function getMessages(): ContactMessage[] {
  try {
    const stored = localStorage.getItem(MESSAGES_KEY);
    if (stored) {
       return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to retrieve local client inquiries:", e);
  }
  return [];
}

export function addMessage(msg: Omit<ContactMessage, "id" | "timestamp" | "read">): ContactMessage[] {
  const current = getMessages();
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    timestamp: new Date().toISOString(),
    read: false
  };
  current.unshift(newMsg);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(current));
  return current;
}

export function toggleMessageRead(id: string): ContactMessage[] {
  const current = getMessages().map(m => m.id === id ? { ...m, read: !m.read } : m);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(current));
  return current;
}

export function deleteMessage(id: string): ContactMessage[] {
  const current = getMessages().filter(m => m.id !== id);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(current));
  return current;
}
