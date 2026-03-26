import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const dots: { x: number; y: number; z: number }[] = [];
    const dotCount = 1200;
    const radius = Math.min(canvas.width, canvas.height) * 0.45;

    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotCount);
      const theta = Math.sqrt(dotCount * Math.PI) * phi;

      dots.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width * 0.35;
      const centerY = canvas.height * 0.5;
      
      rotation += 0.0015;

      ctx.fillStyle = '#10b981'; // emerald-500
      
      dots.forEach(dot => {
        const x = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
        const z = dot.x * Math.sin(rotation) + dot.z * Math.cos(rotation);
        const y = dot.y;

        const perspective = 1000 / (1000 + z);
        const px = centerX + x * perspective;
        const py = centerY + y * perspective;

        if (z < radius * 0.5) {
          const opacity = Math.max(0.05, (radius - z) / (radius * 3));
          const size = Math.max(0.3, 1.5 * perspective);
          
          ctx.beginPath();
          ctx.globalAlpha = opacity;
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000);
    }, 2500);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.62, 0.16, 0.13, 1.01] }}
          className="fixed inset-0 z-[100] bg-slate-950 flex items-center overflow-hidden"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-40"
          />

          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="hidden md:block w-1/3" /> {/* Spacer for the globe on the left */}
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.62, 0.16, 0.13, 1.01] }}
              className="flex flex-col items-center md:items-start md:pl-20"
            >
              <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-600/20 rounded-2xl blur-md" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/40 to-emerald-900/40 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl" />
                <div className="relative flex items-center justify-center font-black text-3xl tracking-tighter select-none">
                  <span className="text-white">D</span>
                  <span className="text-emerald-400 -ml-1">T</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 uppercase text-center md:text-left">
                DigitalTwin<span className="text-emerald-600">Architect</span>.io
              </h1>
              
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-slate-800" />
                <span className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em]">
                  Initializing Twin
                </span>
                <div className="h-[1px] w-12 bg-slate-800" />
              </div>

              <div className="mt-12 w-48 h-[1px] bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-emerald-600"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
