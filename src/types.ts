/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  slug?: string;
  category: string;
  description: string;
  youtubeUrl: string;
  youtubeId?: string;
  thumbnail: string;
  featured: boolean;
  role: string;
  tools: string[];
  client: string;
  year: string;
  duration?: string;
  aspectRatio?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Skill {
  name: string;
  level: number; // Percentage (0-100)
  category: "3D & Simulation" | "Compositing & VFX" | "Motion & Editing";
  iconName: string;
}

export interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
}
