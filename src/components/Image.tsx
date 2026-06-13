import React, { useState } from "react";

interface NextImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  fill?: boolean;
  removeBackground?: "white" | "none";
  className?: string;
  style?: React.CSSProperties;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

/**
 * A beautiful, responsive Next.js-compatible drop-in <Image /> component.
 * In a real Next.js project, simply replace the import path with:
 * `import Image from "next/image"`
 * 
 * To integrate the solid white background logo flawlessly into our premium dark UI,
 * we use a high-fidelity CSS color space inversion technique when `removeBackground` is active:
 * 1. invert(1) maps the white background to black, black text to white, and red to cyan.
 * 2. hue-rotate(180deg) shifts cyan back into our signature crimson red.
 * 3. mix-blend-mode: screen removes the dark background seamlessly with sub-pixel anti-aliasing.
 */
export default function Image({
  src,
  alt,
  width,
  height,
  priority,
  fill,
  className = "",
  style = {},
  removeBackground = "white",
  onError,
  ...props
}: NextImageProps) {
  const [loadFailed, setLoadFailed] = useState(false);

  // If the image fails to load or hasn't been uploaded yet, fall back to our gorgeous embedded vector SVG logo
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoadFailed(true);
    if (onError) onError(e);
  };

  // Base styling for Next.js emulation
  const baseStyle: React.CSSProperties = fill
    ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: "cover",
        ...style,
      }
    : {
        width: width ? `${width}px` : "auto",
        height: height ? `${height}px` : "auto",
        maxWidth: "100%",
        ...style,
      };

  // Premium CSS background removal filters (perfect for dark themes)
  const filterStyle: React.CSSProperties =
    removeBackground === "white"
      ? {
          filter: "invert(1) hue-rotate(180deg) brightness(1.15) contrast(1.1)",
          mixBlendMode: "screen",
          ...baseStyle,
        }
      : baseStyle;

  if (loadFailed) {
    // Elegant inline fallback render matching the branding of FR Visuals
    return (
      <div 
        className={`flex items-center justify-center shrink-0 bg-transparent ${className}`}
        style={{ width: width ? `${width}px` : "100%", height: height ? `${height}px` : "100%" }}
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(229,0,0,0.15)] transition-transform duration-500 hover:rotate-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rich vibrant red sun circle */}
          <circle cx="250" cy="235" r="170" fill="#E50000" />

          {/* Painterly brush elements forming 'FR' */}
          <path
            d="M 40 135 C 90 205, 185 220, 298 90 C 310 75, 323 60, 335 48"
            stroke="#000000"
            strokeWidth="18"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 162 170 C 182 230, 192 310, 155 385 C 151 393, 144 400, 137 406"
            stroke="#000000"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 135 315 L 185 302"
            stroke="#000000"
            strokeWidth="13"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 215 185 C 275 182, 310 215, 290 268 C 276 304, 238 312, 196 302"
            stroke="#000000"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 252 290 C 300 330, 355 365, 415 365"
            stroke="#000000"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 235 345 C 245 365, 240 380, 225 390"
            stroke="#000000"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
          
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
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={filterStyle}
      onError={handleError}
      {...props}
    />
  );
}
