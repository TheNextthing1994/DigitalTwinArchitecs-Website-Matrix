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
    const dotCount = 1000;
    const radius = Math.min(canvas.width, canvas.height) * 0.35;

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
      
      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.5;
      
      rotation += 0.0015;

      ctx.fillStyle = '#111111'; // rich-carbon
      
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
          className="fixed inset-0 z-[100] bg-white-flash flex items-center justify-center overflow-hidden"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-20"
          />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.62, 0.16, 0.13, 1.01] }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-rich-carbon mb-4 uppercase">
                EXPONENTIAL<span className="text-electric-teal">.</span>
              </h1>
              
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-neural-fog" />
                <span className="text-pulse-ash font-mono text-[10px] uppercase tracking-[0.5em]">
                  Loading Systems
                </span>
                <div className="h-[1px] w-12 bg-neural-fog" />
              </div>
            </motion.div>
            
            <div className="absolute bottom-[-100px] w-48 h-[1px] bg-neural-fog overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-rich-carbon"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
