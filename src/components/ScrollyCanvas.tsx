"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 75;

const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(2, "0");
  return `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    // Preload all images
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, []);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !images[index] || !isLoaded) return;

    const img = images[index];
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas;

    // Object-fit: cover logic using actual canvas internal dimensions
    const canvasWidth = width / dpr;
    const canvasHeight = height / dpr;
    
    const canvasAspectRatio = canvasWidth / canvasHeight;
    const imageAspectRatio = img.width / img.height;

    let renderWidth, renderHeight, xOffset, yOffset;

    if (canvasAspectRatio > imageAspectRatio) {
      renderWidth = canvasWidth;
      renderHeight = canvasWidth / imageAspectRatio;
      xOffset = 0;
      yOffset = (canvasHeight - renderHeight) / 2;
    } else {
      renderHeight = canvasHeight;
      renderWidth = canvasHeight * imageAspectRatio;
      xOffset = (canvasWidth - renderWidth) / 2;
      yOffset = 0;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, xOffset, yOffset, renderWidth, renderHeight);
    ctx.restore();
  }, [images, isLoaded]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      renderFrame(Math.round(frameIndex.get()));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, frameIndex, renderFrame]);

  useEffect(() => {
    if (isLoaded) {
      renderFrame(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded) {
      renderFrame(Math.round(latest));
    }
  });

  //... (Start of modified file)
  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#121212]">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
        <Overlay progress={smoothProgress} />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white z-50 bg-[#121212]">
            <div className="animate-pulse">Loading experience...</div>
          </div>
        )}
      </div>
    </div>
  );
}
