"use client";

import { LinkIcon, Linkedin, Globe, Award, BookOpen, Briefcase } from "lucide-react";
import { motion, Variants, Transition } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const SPRING_CONFIG: Transition = {
  type: "spring",
  damping: 30,
  stiffness: 200,
  mass: 1
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      ...SPRING_CONFIG,
      duration: 0.8
    }
  }
};

export default function Resume() {
  return (
    <section className="w-full bg-[#121212] py-16 md:py-32 px-6 lg:px-24 border-t border-white/5 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-24">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6 md:mb-8">
            About <span className="text-white/20 italic font-medium">Me</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-8">
              <p className="text-lg md:text-2xl text-white/80 leading-relaxed font-light mt-4 md:mt-0">
                Hello! I&apos;m <span className="text-white font-semibold">Aman Sharma</span>, a passionate Graphic Designer and UI/UX Designer based in Uttar Pradesh, India.
              </p>
              <p className="text-base md:text-lg text-white/40 mt-4 md:mt-6 leading-relaxed max-w-4xl">
                I specialize in creating user-centered digital experiences that are both visually appealing and easy to use. My focus is on transforming complex ideas into clean, intuitive, and engaging designs for web and mobile platforms.
              </p>
              <p className="text-base md:text-lg text-white/40 mt-4 leading-relaxed max-w-4xl">
                I have strong expertise in UI/UX design, illustration, and visual storytelling, and I enjoy exploring modern design trends to craft innovative digital products.
              </p>
              <p className="text-base md:text-lg text-white/40 mt-4 leading-relaxed max-w-4xl">
                With hands-on experience in tools like <span className="text-white/60">Figma, Adobe Illustrator, and Photoshop</span>, I create designs that balance creativity, usability, and functionality. My goal is to design experiences that not only look great but also solve real user problems.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4 mt-6 lg:mt-0">
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                href="https://www.behance.net/amansharma09" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white/5 text-white hover:bg-white/10 border border-white/10 rounded-2xl font-medium transition-all backdrop-blur-md"
              >
                <LinkIcon className="w-5 h-5" />
                Behance Portfolio
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                href="https://www.linkedin.com/in/aman-sharma-b464a4375/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-[#0a66c2]/10 text-[#0a66c2] hover:bg-[#0a66c2]/20 border border-[#0a66c2]/30 rounded-2xl font-medium transition-all backdrop-blur-md"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn Profile
              </motion.a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Experience & Education */}
          <div className="lg:col-span-8 space-y-16 md:space-y-24">
            
            {/* Experience */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
                <div className="p-2 md:p-3 bg-white/5 rounded-2xl border border-white/10">
                  <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-white/60" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Work Experience</h3>
              </div>
              
              <div className="relative border-l border-white/10 pl-6 md:pl-10 ml-3 md:ml-6 space-y-12">
                <div className="relative">
                  <div className="absolute w-4 h-4 bg-white rounded-full -left-[32px] md:-left-[48px] top-2 border-4 border-[#121212] shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-white">Graphic Designer (Remote)</h4>
                      <p className="text-white/60 text-lg mt-1 font-medium">What a Story • Indore, India</p>
                    </div>
                    <div className="text-white/30 font-mono text-sm mt-3 md:mt-0 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      Sep &apos;24 — Oct &apos;25 • 1.2 Years
                    </div>
                  </div>
                  <ul className="space-y-4 text-white/40 text-lg">
                    <li className="flex gap-4">
                      <span className="shrink-0 w-1.5 h-1.5 bg-white/20 rounded-full mt-3" />
                      <span>Designed 20+ high-fidelity illustrated visuals for explainer videos, improving brand storytelling.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="shrink-0 w-1.5 h-1.5 bg-white/20 rounded-full mt-3" />
                      <span>Created user-centric UI designs for mobile and web platforms focusing on modern aesthetics.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="shrink-0 w-1.5 h-1.5 bg-white/20 rounded-full mt-3" />
                      <span>Collaborated with cross-functional teams to deliver innovative and creative design solutions.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <BookOpen className="w-6 h-6 text-white/60" />
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">Education</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5, backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.15)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="bg-white/[0.02] border border-white/5 rounded-[32px] p-10 transition-colors duration-500"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold text-white">BA in Arts</h4>
                    <span className="text-white/20 font-mono text-sm font-medium">2023 — Present</span>
                  </div>
                  <p className="text-white/60 text-lg">SW. Narendra Singh Mahavidyalaya • Kanpur, India</p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm font-mono">
                      GPA: 7.8
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                      Currently Pursuing
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Skills, Certs & Languages */}
          <div className="lg:col-span-4 space-y-20">
            
            {/* Skills */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-widest text-white/30">Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {["Graphic Design", "UI/UX", "Illustration", "Visual Storytelling", "Wireframing", "Prototyping", "Icon Design"].map((skill) => (
                  <motion.span 
                    key={skill} 
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderColor: "rgba(255,255,255,0.2)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="px-5 py-2.5 rounded-2xl border border-white/5 bg-white/5 text-white/70 text-sm font-medium cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-5 h-5 text-white/40" />
                <h3 className="text-xl font-bold text-white uppercase tracking-widest text-white/30">Certifications</h3>
              </div>
              <div className="p-8 rounded-[28px] border border-white/5 bg-white/[0.02] hover:border-white/10 transition-colors">
                <h4 className="text-white font-bold text-lg mb-1">Graphic Designing Certification</h4>
                <p className="text-white/40 text-sm">AIM Computer Academy • July 2024</p>
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-8">
                <Globe className="w-5 h-5 text-white/40" />
                <h3 className="text-xl font-bold text-white uppercase tracking-widest text-white/30">Languages</h3>
              </div>
              <div className="flex gap-4">
                {["Hindi", "English"].map(lang => (
                  <div key={lang} className="flex-1 p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
                    <span className="text-white font-bold">{lang}</span>
                    <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: lang === "Hindi" ? "100%" : "85%" }}
                        className="h-full bg-white/20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
