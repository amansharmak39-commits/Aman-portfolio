"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  progress: MotionValue<number>;
}

export default function Overlay({ progress }: OverlayProps) {
  // Translate Y for parallax effects
  //const y1 = useTransform(progress, [0, 0.2], [0, -200]);
  //const opacity1 = useTransform(progress, [0, 0.1, 0.2], [1, 1, 0]);

  const y2 = useTransform(progress, [0.2, 0.4], [100, -100]);
  const opacity2 = useTransform(progress, [0.2, 0.3, 0.4], [0, 1, 0]);

  const y3 = useTransform(progress, [0.5, 0.7], [100, -100]);
  const opacity3 = useTransform(progress, [0.5, 0.6, 0.7], [0, 1, 0]);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-start items-center">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-8 lg:p-24 text-white">

        {/* Hero Section (0% - 15% Scroll) */}
        <motion.div
          style={{
            opacity: useTransform(progress, [0, 0.1, 0.15], [1, 1, 0]),
            y: useTransform(progress, [0, 0.15], [0, -100])
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="relative mt-28 absolute flex flex-col items-center text-center max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mb-6 px-8 py-2 rounded-full bg-white/8 backdrop-blur-1xl border border-white/20 text-white text-xs md:text-sm font-mono tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            Graphic Designer & UI/UX Designer
          </motion.div>

          <motion.h1
            className="text-base md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900"
          >
            Aman Sharma
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-neutral-200 max-w-2xl leading-relaxed font-light shadow-sm mb-12"
          >
            Designing <span className="text-white font-medium">clean, modern, and user-focused</span> digital experiences for web and mobile.
          </motion.p>

          {/* Interactive Skill Balls */}
          <div className="flex gap-4 md:gap-6 justify-center">
            {['Figma', 'Photoshop', 'Illustrator'].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1 + (i * 0.1),
                  type: "spring",
                  stiffness: 260,
                  damping: 26
                }}
                whileHover={{
                  y: -12,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderColor: "rgba(255,255,255,0.3)",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
                }}
                className="group relative px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl cursor-default transition-colors duration-500"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${skill === 'Figma' ? 'bg-[#F24E1E]' :
                    skill === 'Photoshop' ? 'bg-[#31A8FF]' : 'bg-[#FF9A00]'
                    } shadow-[0_0_10px_currentColor]`} />
                  <span className="text-[11px] md:text-xs font-mono tracking-widest uppercase text-neutral-300 group-hover:text-white transition-colors">
                    {skill}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stage 2 (30% - 45% Scroll) */}
        <motion.div
          style={{
            opacity: useTransform(progress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]),
            y: useTransform(progress, [0.25, 0.5], [100, -100])
          }}
          className="absolute left-8 lg:left-24 max-w-xl text-left"
        >
          <motion.h2 className="text-3xl md:text-6xl font-bold tracking-tight leading-tight mb-6 text-white">
            Transforming <span className="text-white/50 italic font-medium">complex ideas</span> into stunning digital reality.
          </motion.h2>
          <p className="text-lg md:text-xl text-neutral-200 font-light leading-relaxed">
            I specialize in crafting <span className="text-white font-medium">functional and visually compelling</span> interfaces for mobile and web platforms.
          </p>
        </motion.div>

        {/* Stage 3 (60% - 75% Scroll) */}
        <motion.div
          style={{
            opacity: useTransform(progress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]),
            y: useTransform(progress, [0.55, 0.8], [100, -100])
          }}
          className="absolute right-8 lg:right-24 max-w-xl text-right"
        >
          <motion.h2 className="text-3xl md:text-6xl font-bold tracking-tight leading-tight mb-6 text-white">
            User-Centered <span className="text-white/50 italic font-medium">Product Design</span> & Creative Mastery.
          </motion.h2>
          <p className="text-lg md:text-xl text-neutral-200 font-light leading-relaxed ml-auto max-w-lg">
            Expertly utilizing <span className="text-white font-medium">Figma, Adobe Illustrator & Photoshop</span> to build research-driven design solutions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
