import React, { useState, useEffect } from "react";
import { Film, Grid, User, Mail, Sparkles } from "lucide-react";
import { getMessages } from "../data/portfolioData";
import logo from "../assets/fr-visuals-logo.png";

interface HeaderProps {
  onAdminToggle: () => void;
  isAdminOpen: boolean;
  activeSection: string;
}

export default function Header({
  onAdminToggle,
  isAdminOpen,
  activeSection,
}: HeaderProps) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[#050505]/90 backdrop-blur-md border-b border-neutral-900"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* LOGO */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <img
              src={logo}
              alt="FR Visuals Logo"
              className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-105"
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

          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-[#101010]/60 p-1 rounded-full border border-neutral-900 backdrop-blur">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-widest transition ${
                      isActive
                        ? "bg-[#E50000] text-white"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="w-px h-5 bg-neutral-800" />

            <button
              onClick={onAdminToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded border text-xs uppercase tracking-wider transition ${
                isAdminOpen
                  ? "border-[#E50000] text-[#E50000]"
                  : "border-neutral-800 text-neutral-300 hover:text-[#E50000]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              CMS
              {unreadCount > 0 && (
                <span className="ml-2 text-[10px] bg-[#E50000] text-black px-1.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-6 text-white">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-xl uppercase flex items-center gap-2"
              >
                <Icon />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
