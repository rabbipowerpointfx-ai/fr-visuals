import React from "react";

interface LogoProps {
  className?: string; // size details
  textColor?: string;
  hideText?: boolean;
}

export default function Logo({ className = "w-10 h-10", textColor = "text-[#E50000]", hideText = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Icon Wrapper with a Solid White Background matching the uploaded design */}
      <div className={`bg-white rounded-md p-1.5 flex items-center justify-center shadow-lg shadow-black/25 border border-white/80 shrink-0 ${className}`}>
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full filter transition-transform duration-500 hover:rotate-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rich vibrant red sun circle */}
          <circle cx="250" cy="235" r="170" fill="#E50000" />

          {/* Dynamic calligraphic paintbrush strokes overlay forming high-contrast 'FR' */}
          {/* Stroke 1: Top major sweeping crossbar with rising lift */}
          <path
            d="M 40 135 C 90 205, 185 220, 298 90 C 310 75, 323 60, 335 48"
            stroke="#000000"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Stroke 1 Shadow/Depth taper */}
          <path
            d="M 50 145 C 95 210, 180 220, 280 110"
            stroke="#000000"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />

          {/* Stroke 2: Graceful curving vertical stem down to bottom-left */}
          <path
            d="M 162 170 C 182 230, 192 310, 155 385 C 151 393, 144 400, 137 406"
            stroke="#000000"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />

          {/* Stroke 3: Middle diagonal F crossbar / connector */}
          <path
            d="M 135 315 L 185 302"
            stroke="#000000"
            strokeWidth="13"
            strokeLinecap="round"
            fill="none"
          />

          {/* Stroke 4: Curved R Loop */}
          <path
            d="M 215 185 C 275 182, 310 215, 290 268 C 276 304, 238 312, 196 302"
            stroke="#000000"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Stroke 5: Sweeping flared R leg going down-right */}
          <path
            d="M 252 290 C 300 330, 355 365, 415 365"
            stroke="#000000"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />

          {/* Stroke 6: Bottom accent droplet segment */}
          <path
            d="M 235 345 C 245 365, 240 380, 225 390"
            stroke="#000000"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />

          {/* Centered 'visuals' text matching the uploaded logo image */}
          <text
            x="250"
            y="460"
            textAnchor="middle"
            dx="10"
            fill="#E50000"
            className="font-sans font-normal text-[36px]"
            style={{ letterSpacing: "0.5em" }}
          >
            visuals
          </text>
        </svg>
      </div>

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
