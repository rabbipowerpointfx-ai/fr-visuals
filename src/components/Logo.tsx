import React from "react";
import logo from "../assets/fr-visuals-logo.png";

export default function Logo({ hideText = false })  {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt="FR Visuals Logo"
        className="w-10 h-10 object-contain"
      />

      {!hideText && (
        <div className="flex flex-col">
          <span className="font-bold text-white">
            FR VISUALS<span className="text-red-500">.</span>
          </span>
          <p className="text-xs text-gray-400">MOTION STUDIO</p>
        </div>
      )}
    </div>
  );
}
