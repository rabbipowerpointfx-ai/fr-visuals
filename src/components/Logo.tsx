import React from "react";

interface LogoProps {
  className?: string;
  textColor?: string;
  hideText?: boolean;
}

export default function Logo({
  className = "w-10 h-10",
  textColor = "text-[#E50000]",
  hideText = false,
}: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      
      {/* Logo Image */}
      <div className={`flex items-center justify-center shrink-0 ${className}`}>
        <img
          src="/src/assets/fr-visuals-logo.png"
          alt="FR Visuals Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text Part */}
      {!hideText && (
        <div className="flex flex-col">
          <span className="font-display font-black tracking-tighter text-[#F0F0F0] text-xl italic uppercase leading-none">
            FR VISUALS<span className="text-[#E50000]">.</span>
          </span>

          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-neutral-400 mt-1 leading-none">
            MOTION STUDIO
          </p>
        </div>
      )}
    </div>
  );
}
