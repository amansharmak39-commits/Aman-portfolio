"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function GlassCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ultra-fluid spring physics for that "floating orb" sensation
  const springConfig = { damping: 35, stiffness: 250, mass: 0.8 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null
      );
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden md:block">
      {/* Precision Tracking Light Dot (Visual Center) */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-1 h-1 bg-white rounded-full z-10 opacity-40 blur-[0.5px]"
      />

      {/* Main Glass Sphere Body */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 1.4 : 1,
          rotate: isPointer ? 45 : 0,
        }}
        className="relative w-12 h-12"
      >
        <div className="absolute inset-0 rounded-full border border-white/40 bg-white/5 backdrop-blur-xl shadow-[0_10px_40px_rgba(255,255,255,0.1),inset_0_0_20px_rgba(255,255,255,0.1)] overflow-hidden">
          
          {/* Primary Top Reflection (Glint) */}
          <div className="absolute top-[10%] left-[20%] w-[45%] h-[25%] bg-gradient-to-b from-white/60 to-transparent rounded-full blur-[1px] rotate-[-25deg]" />
          
          {/* Secondary Sharp Highlight */}
          <div className="absolute top-[15%] right-[25%] w-2 h-2 bg-white/70 rounded-full blur-[1px]" />
          
          {/* Bottom Shadow/Depth for Orb Shape */}
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
          
          {/* Side Sheen */}
          <div className="absolute top-[40%] left-[5%] w-[10%] h-[30%] bg-white/20 blur-[2px] rounded-full" />
          
          {/* Internal Glowing Core */}
          <div className="absolute inset-[25%] rounded-full bg-white/5 blur-md" />

          {/* Lens Distortion Effect Simulation */}
          <div className="absolute inset-0 rounded-full border-[1.5px] border-white/10" />
        </div>

        {/* Ambient Halo Surround */}
        <div className="absolute inset-[-40%] rounded-full bg-white/[0.03] blur-2xl opacity-40" />
        
        {/* Dynamic Interaction Glow */}
        <motion.div 
          animate={{
            opacity: isPointer ? 0.3 : 0,
            scale: isPointer ? 1.2 : 0.8
          }}
          className="absolute inset-[-10%] rounded-full bg-white/10 blur-xl pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
