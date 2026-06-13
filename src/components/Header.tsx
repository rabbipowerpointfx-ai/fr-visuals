/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Film, Grid, User, Mail, Sparkles, Inbox, RefreshCw, Layers } from "lucide-react";
import { getMessages } from "../data/portfolioData";
import Logo from "./Logo";
import Image from "./Image";

interface HeaderProps {
  onAdminToggle: () => void;
  isAdminOpen: boolean;
  activeSection: string;
}

export default function Header({ onAdminToggle, isAdminOpen, activeSection }: HeaderProps) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Poll for message count to handle real-time contact states
  useEffect(() => {
    const checkUnread = () => {
      const msgs = getMessages();
      const unread = msgs.filter((m) => !m.read).length;
      setUnreadCount(unread);
    };

    checkUnread();
    const interval = setInterval(checkUnread, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "REEL", icon: Film },
    { id: "projects", label: "PORTFOLIO", icon: Grid },
    { id: "about", label: "EXPERTISE", icon: User },
    { id: "contact", label: "INQUIRE", icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        id="header-nav"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[#050505]/90 backdrop-blur-md border-b border-neutral-900"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
          >
            <Image
              src="/logo.png"
              alt="FR Visuals Brand Logo"
              width={80}
              height={80}
              priority
              className="w-20 h-20 select-none scale-100 hover:scale-105 active:scale-95 transition-transform duration-300"
              removeBackground="white"
            />
            <div className="flex flex-col">
              <span className="font-display font-black tracking-tighter text-[#F0F0F0] text-xl italic uppercase leading-none group-hover:text-[#E50000] transition-colors">
                FR VISUALS<span className="text-[#E50000]">.</span>
              </span>
              <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-neutral-400 mt-1 leading-none">
                MOTION STUDIO
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-[#101010]/60 p-1 rounded-full border border-neutral-900 backdrop-blur">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full font-display font-medium text-xs tracking-widest uppercase transition-all duration-300 relative focus:outline-none ${
                      isActive
                        ? "text-white bg-[#E50000] shadow-[0_4px_20px_rgba(229,0,0,0.3)]"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-neutral-500"}`} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Studio CMS Switcher */}
            <div className="h-4 w-[1px] bg-neutral-800"></div>

            <button
              onClick={onAdminToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded border font-mono text-xs tracking-wider transition-all duration-300 relative focus:outline-none cursor-pointer ${
                isAdminOpen
                  ? "border-[#E50000] text-[#E50000] bg-[#E50000]/10 glow-orange"
                  : "border-neutral-800 text-neutral-300 hover:border-[#E50000] hover:text-[#E50000] hover:bg-[#E50000]/5 glow-orange"
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAdminOpen ? "animate-spin" : ""}`} />
              STUDIO CMS
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E50000] font-mono text-[9px] font-bold text-black animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>
          </nav>

          {/* Handheld/Mobile actions */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={onAdminToggle}
              className={`p-2 rounded border transition-colors relative ${
                isAdminOpen ? "border-[#E50000] text-[#E50000] bg-[#E50000]/10" : "border-neutral-800 text-neutral-400"
              }`}
              title="Studio CMS"
            >
              <Sparkles className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#E50000] text-[8px] font-bold text-black font-mono">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 border border-neutral-800 rounded bg-[#101010]/80 text-white focus:outline-none"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                <span
                  className={`w-5 h-[1.5px] bg-white rounded-full transition-transform duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`w-5 h-[1.5px] bg-white rounded-full transition-opacity duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-5 h-[1.5px] bg-white rounded-full transition-transform duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Handheld Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 flex flex-col justify-center px-12 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="space-y-6 flex flex-col items-start font-display">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E50000] mb-4">
            — DIRECTORY NAVIGATION
          </p>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-4 text-2xl tracking-widest font-semibold uppercase text-left transition-colors focus:outline-none ${
                  isActive ? "text-[#E50000]" : "text-neutral-400 hover:text-white"
                }`}
              >
                <IconComponent className={`w-6 h-6 ${isActive ? "text-[#E50000]" : "text-neutral-600"}`} />
                {item.label}
              </button>
            );
          })}

          <div className="w-full h-[1px] bg-neutral-900 my-4" />

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onAdminToggle();
            }}
            className="flex items-center gap-3 text-lg tracking-widest text-[#E50000] font-semibold uppercase focus:outline-none"
          >
            <Sparkles className="w-5 h-5 text-[#E50000]" />
            STUDIO CMS PANEL
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#E50000] text-xs text-black font-bold font-mono">
                {unreadCount} NEW
              </span>
            )}
          </button>
        </div>

        <div className="absolute bottom-8 left-12 right-12 flex justify-between items-center text-neutral-600 font-mono text-[9px]">
          <span>© FR VISUALS</span>
          <span className="text-[#E50000]/40">ONLINE STAGE</span>
        </div>
      </div>
    </>
  );
}
