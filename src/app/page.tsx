"use client"
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Header from "@/components/Header";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212]">
      <Header />
      <ScrollyCanvas />
      <Projects />
      <Resume />

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full py-12 text-center text-neutral-500 text-sm border-t border-white/10 bg-[#121212]"
      >
        <p>© {new Date().getFullYear()} Aman Sharma. All rights reserved.</p>
        <p className="mt-2">Graphic Designer & Illustrator based in Kanpur, India.</p>
      </motion.footer>
    </main>
  );
}
