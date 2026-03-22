"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform, animate, AnimationPlaybackControls } from "framer-motion";

const projects = [
  {
    title: "Zenith Trade",
    description: "Advanced crypto exchange platform with seamless mobile experiences.",
    year: "2024",
    brand: "#3b82f6",
    image: "/projects/zenith.jpg",
  },
  {
    title: "Surmaya",
    description: "Immersive mobile UI design for a music streaming app.",
    year: "2023",
    brand: "#6366f1",
    image: "/projects/surmaya.jpg",
  },
  {
    title: "DataViz",
    description: "Interactive data visualization platform for real-time intelligence.",
    year: "2024",
    brand: "#2563eb",
    image: "/projects/dataviz.jpg",
  },
  {
    title: "FocusFlow",
    description: "Minimalist remote-work dashboard designed for deep productivity.",
    year: "2024",
    brand: "#fb923c",
    image: "/projects/focusflow.jpg",
  },
  {
    title: "Startup Blueprint",
    description: "A digital roadmap for entrepreneurs from ideation to success.",
    year: "2024",
    brand: "#9333ea",
    image: "/projects/startup.jpg",
  },
  {
    title: "Character Art",
    description: "Stylized digital portrait illustration exploring modern aesthetics.",
    year: "2024",
    brand: "#2dd4bf",
    image: "/projects/persona.jpg",
  },
  {
    title: "Noir Minimal",
    description: "Editorial line-art illustration focused on shadow and geometry.",
    year: "2024",
    brand: "#ea580c",
    image: "/projects/noir.jpg",
  },
  {
    title: "Smart City",
    description: "Isometric 3D illustration exploring future urban environments.",
    year: "2024",
    brand: "#a855f7",
    image: "/projects/smart_city.jpg",
  },
  {
    title: "TransitHub",
    description: "Redefining urban commute with live bus tracking and booking.",
    year: "2024",
    brand: "#f59e0b",
    image: "/projects/transit.jpg",
  },
  {
    title: "Pulse Fitness",
    description: "Data-intensive health dashboard for monitoring real-time vitals.",
    year: "2024",
    brand: "#f43f5e",
    image: "/projects/fitness.jpg",
  },
  {
    title: "Lumina Night",
    description: "Serene night-time illustration featuring a lighthouse by the water.",
    year: "2024",
    brand: "#fbbf24",
    image: "/projects/lighthouse.jpg",
  },
  {
    title: "CyberStack",
    description: "Isometric visualization of a modern cloud server infrastructure.",
    year: "2024",
    brand: "#a855f7",
    image: "/projects/server.jpg",
  }
];

// Double formatting for infinite loop
const allProjects = [...projects, ...projects];

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Use MotionValues for high-performance slider sync
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });
  const xPercentage = useTransform(smoothX, (v) => `${v}%`);

  // Create a loop effect
  useEffect(() => {
    // We animate from 0 to -50% of the track width for infinite scrolling
    const animation: AnimationPlaybackControls = animate(x, -50, {
      duration: 35,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop"
    });

    if (hoveredIdx !== null) {
      animation.pause();
    } else {
      animation.play();
    }

    return () => animation.stop();
  }, [x, hoveredIdx]);

  const handleStep = (direction: 'left' | 'right') => {
    // A step should move by approximately one card width plus gap
    // In a loop of 0 to -50%, we have 'projects.length' cards in that 50%
    const stepSize = 50 / projects.length;
    const currentX = x.get();

    // Calculate target, adding/subtracting stepSize
    const targetX = direction === 'left' ? currentX + stepSize : currentX - stepSize;

    // Use a spring for the transition
    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 35,
      mass: 0.5,
      onUpdate: (latest) => {
        // Continuous normalization during animation to keep it within [0, -50]
        if (latest > 0) x.set(latest - 50);
        else if (latest < -50) x.set(latest + 50);
      }
    });
  };

  return (
    <section className="relative w-full bg-[#121212] py-24 overflow-hidden border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          type: "spring", 
          damping: 30, 
          stiffness: 200,
          duration: 0.8
        }}
        className="px-6 lg:px-24 mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-tight">
          My Creative <span className="text-white/20 italic font-medium">Design</span>
        </h2>
      </motion.div>

      <div className="relative w-full max-md:overflow-visible overflow-hidden block md:flex group/track py-12">
        <motion.div
          ref={trackRef}
          style={{ x: xPercentage }}
          className="grid grid-cols-1 sm:grid-cols-2 md:flex md:whitespace-nowrap gap-8 md:gap-12 justify-items-center selection:bg-transparent max-md:!transform-none"
        >
          {allProjects.map((project, idx) => (
            <div
              key={idx}
              className="shrink-0"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <RefinedSmallCard
                project={project}
                isFocused={hoveredIdx === idx}
                isAnyHovered={hoveredIdx !== null}
                onClick={() => project.image && setSelectedImage(project.image)}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Manual Navigation Arrows */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 200,
          delay: 0.2
        }}
        className="hidden md:flex justify-center items-center gap-6 mt-16 px-6 lg:px-24"
      >
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleStep('left')}
          onMouseEnter={() => setHoveredIdx(-2)} // Pause auto-slide
          onMouseLeave={() => setHoveredIdx(null)} // Resume
          className="p-4 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-xl transition-colors hover:border-white/30 group"
          aria-label="Previous Projects"
        >
          <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
        </motion.button>

        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Manual Navigation</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleStep('right')}
          onMouseEnter={() => setHoveredIdx(-2)} // Pause auto-slide
          onMouseLeave={() => setHoveredIdx(null)} // Resume
          className="p-4 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-xl transition-colors hover:border-white/30 group"
          aria-label="Next Projects"
        >
          <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
        </motion.button>
      </motion.div>

      {/* Cinematic Side Gradients */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#121212] via-[#121212]/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#121212] via-[#121212]/50 to-transparent z-10 pointer-events-none" />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/98 p-4 md:p-12 backdrop-blur-3xl"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-10 right-10 z-10 p-5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all scale-100 active:scale-90"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="relative w-full max-w-6xl h-full max-h-[85vh] rounded-[40px] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Project Fullscreen"
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProjectProps {
  project: {
    title: string;
    description: string;
    year: string;
    brand: string;
    image: string;
  };
  onClick: () => void;
  isFocused: boolean;
  isAnyHovered: boolean;
}

function RefinedSmallCard({ project, onClick, isFocused, isAnyHovered }: ProjectProps) {
  return (
    <motion.div
      onClick={onClick}
      animate={{
        // Focused card grows aggressively, others shrink for depth
        scale: isFocused ? 1.15 : isAnyHovered ? 0.85 : 1,
        opacity: isFocused ? 1 : isAnyHovered ? 0.4 : 1,
        filter: isFocused ? "brightness(1.1) saturate(1.1)" : isAnyHovered ? "brightness(0.5) blur(2px)" : "brightness(1) blur(0px)",
        zIndex: isFocused ? 20 : 10,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
        mass: 1
      }}
      whileHover={{
        borderColor: "rgba(255,255,255,0.2)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
      }}
      className={`group relative w-[280px] md:w-[320px] aspect-[3/4.2] rounded-[38px] overflow-hidden bg-[#161616] cursor-pointer border border-white/[0.04] shadow-xl`}
    >
      <div className="absolute inset-0 z-0">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-all duration-1000 blur-[2px] group-hover:blur-0 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/95 via-[#000000]/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full h-full p-7 flex flex-col justify-between items-start">
        <div className="flex justify-between items-center w-full transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 px-3.5 py-1 rounded-full text-[10px] font-mono text-white/80">
            {project.year}
          </div>
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-3.5 rounded-full hover:bg-white/20 transition-all shadow-md">
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        <div className="w-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <div className="bg-black/30 backdrop-blur-[40px] border border-white/5 p-6 rounded-[28px] group-hover:bg-black/50 transition-colors">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight line-clamp-1">
              {project.title}
            </h3>
            <p className="text-white/30 text-[11px] leading-relaxed line-clamp-2 group-hover:text-white/60 transition-colors">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute top-8 right-8 w-2 h-2 rounded-full transition-opacity duration-500 opacity-40 group-hover:opacity-100 shadow-[0_0_20px_currentColor]"
        style={{ color: project.brand, backgroundColor: 'currentColor' }}
      />
    </motion.div>
  );
}
