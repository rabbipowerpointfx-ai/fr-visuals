import React from "react";
import logo from "../assets/fr-visuals-logo.png";

interface LogoProps {
  className?: string;
  textColor?: string;
  hideText?: boolean;
}

export default function Logo({
  className = "w-10 h-10",
  hideText = false,
}: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      
      <div className={`flex items-center justify-center shrink-0 ${className}`}>
        <img
          src={logo}
          alt="FR Visuals Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {!hideText && (
        <div className="flex flex-col">
          <span className="font-black text-[#F0F0F0] text-xl uppercase">
            FR VISUALS<span className="text-[#E50000]">.</span>
          </span>

          <p className="text-xs uppercase tracking-widest text-neutral-400">
            MOTION STUDIO
          </p>
        </div>
      )}
    </div>
  );
}
