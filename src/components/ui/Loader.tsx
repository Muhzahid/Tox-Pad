"use client";

import React, { useEffect, useState, ReactElement } from "react";
import { FiMail, FiUsers, FiTarget } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { PiNetworkFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa6"; 

const floatingIcons = [
  { icon: BsStars, top: "25%", left: "20%" },
  { icon: FiMail, top: "45%", left: "15%" },
  { icon: FiUsers, top: "65%", left: "25%" },
  { icon: PiNetworkFill, top: "40%", right: "25%" },
  { icon: FiTarget, top: "70%", right: "15%" },
  { icon: FiUsers, top: "20%", right: "20%", hasTooltip: true },
];

const TooltipIcon = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
  const outerSize = size === "lg" ? "w-[60px] h-[60px]" : "w-10 h-10";
  const innerSize = size === "lg" ? "w-[42px] h-[42px]" : "w-7 h-7";
  const iconSize = size === "lg" ? "text-2xl" : "text-sm";
  return (
    <div className={`${outerSize} bg-white rounded-t-full rounded-r-full rounded-bl-none flex items-center justify-center shadow-xl drop-shadow-2xl`}>
      <div className={`${innerSize} rounded-full bg-[#031d2e] flex items-center justify-center`}>
         {FaUser({ className: `text-cyan-400 ${iconSize}` } as any) as ReactElement}
      </div>
    </div>
  )
}

export default function Loader() {
  const [loading, setLoading] = useState(true);

  // Auto-hide
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000); // Increased loader time so you can appreciate the animation!
    return () => clearTimeout(t);
  }, []);

  if (!loading) return null;

  return (
    <main className="fixed inset-0 z-[9999] overflow-hidden text-white flex flex-col justify-center items-center bg-[#060b19]">
      {/* Background radiant glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none -translate-x-1/4 translate-y-1/4"></div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050814] via-[#091530] to-[#0433a3] opacity-60 pointer-events-none" />

      {/* Floating honeycomb icons */}
      <div className="absolute inset-0 max-w-[1200px] mx-auto pointer-events-none">
        {floatingIcons.map((item, i) => {
          const Icon = item.icon as any;
          return (
            <div
              key={i}
              className="absolute animate-[float_6s_ease-in-out_infinite] transition-transform duration-700"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                animationDelay: `${i * 0.7}s`,
              }}
            >
              <div className="relative">
                {/* Hexagon */}
                <div
                  className="h-[52px] w-[52px] bg-[#121c3b]/80 flex items-center justify-center opacity-90 backdrop-blur-md"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  {Icon({ className: "text-gray-400 text-lg" } as any) as ReactElement}
                </div>
                
                {/* Small Tooltip attached */}
                {item.hasTooltip && (
                  <div className="absolute -top-5 -right-5 animate-bounce">
                    <TooltipIcon size="sm" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Center loader */}
      <div className="relative z-10 flex flex-col items-center text-center mt-[-40px]">
        {/* Animated glowing orb */}
        <div className="relative mb-12 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border-2 border-blue-400/40 animate-[spin_8s_linear_infinite] shadow-[0_0_80px_10px_#1e40af] bg-gradient-to-tr from-[#020b1f] to-[#06184a]" />
          <div className="absolute inset-2 rounded-full border border-cyan-400/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60" />
          <div className="absolute inset-8 rounded-full bg-blue-500/20 blur-xl" />

          {/* Center Map Marker Tooltip */}
          <div className="absolute z-20 animate-[float_4s_ease-in-out_infinite]">
            <TooltipIcon size="lg" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold tracking-wide text-white mb-3 relative z-10">
          Extracting Information...
        </h1>
        <p className="text-[#a0abc0] text-[15px] max-w-sm px-4 leading-relaxed font-medium relative z-10">
          We are extracting information from the above honey combs to your system
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </main>
  );
}