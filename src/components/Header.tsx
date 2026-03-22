"use client";

import { useState } from "react";
import Ripple from "./magicui/ripple";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Phone, X } from "lucide-react";

interface ContactButtonProps {
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const ContactButton = ({ isMobile, isOpen, setIsOpen }: ContactButtonProps) => (
  <div className="relative">
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      onClick={() => setIsOpen(!isOpen)}
      className={isMobile 
        ? "relative group overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white rounded-full w-14 h-14 flex items-center justify-center transition-all hover:border-white/30"
        : "relative group overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full text-white font-medium flex items-center gap-2 transition-all hover:border-white/20"
      }
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <Ripple mainCircleSize={100} numCircles={4} mainCircleOpacity={0.15} />
      </div>
      
      {!isMobile && <span className="relative z-10">Contact Us</span>}
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
          >
            <X className={isMobile ? "w-6 h-6" : "w-4 h-4"} />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
          >
            {isMobile ? <Mail className="w-6 h-6" /> : <MessageCircle className="w-4 h-4" />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip for Mobile FAB */}
      {isMobile && (
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-[#121212]/90 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-lg text-sm text-white font-medium whitespace-nowrap shadow-xl">
          Contact
        </div>
      )}
    </motion.button>

    {/* Contact Menu Popover */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 10 : -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: isMobile ? 10 : -10, scale: 0.95 }}
          className={`absolute ${isMobile ? 'bottom-full mb-4' : 'top-full mt-4'} right-0 bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 min-w-[200px] shadow-2xl origin-${isMobile ? 'bottom-right' : 'top-right'}`}
        >
          <a
            href="https://WA.me/919219452228"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-medium text-sm">WhatsApp</div>
              <div className="text-neutral-500 text-xs">+91 92194 52228</div>
            </div>
          </a>

          <a
            href="mailto:amansharmak39@gmail.com"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-medium text-sm">Email Me</div>
              <div className="text-neutral-500 text-xs">amansharmak39@gmail.com</div>
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="fixed top-0 left-0 w-full z-[100] p-6 justify-end pointer-events-none hidden md:flex"
      >
        <div className="pointer-events-auto">
          <ContactButton isMobile={false} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </motion.header>

      {/* Mobile FAB */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="fixed bottom-8 right-6 z-50 flex md:hidden pointer-events-auto"
      >
        <ContactButton isMobile={true} isOpen={isOpen} setIsOpen={setIsOpen} />
      </motion.div>
    </>
  );
}
