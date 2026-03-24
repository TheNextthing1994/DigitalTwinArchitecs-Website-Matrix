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
    const dotCount = 1500;
    const radius = Math.min(canvas.width, canvas.height) * 0.4;

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
      
      const centerX = canvas.width * 0.3; // Position globe on the left
      const centerY = canvas.height * 0.5;
      
      rotation += 0.002;

      ctx.fillStyle = '#10b981'; // emerald-500
      
      dots.forEach(dot => {
        // Rotate around Y axis
        const x = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
        const z = dot.x * Math.sin(rotation) + dot.z * Math.cos(rotation);
        const y = dot.y;

        // Simple perspective projection
        const perspective = 1000 / (1000 + z);
        const px = centerX + x * perspective;
        const py = centerY + y * perspective;

        // Only draw dots that are "in front" or slightly behind for a 3D effect
        if (z < radius * 0.5) {
          const opacity = Math.max(0.1, (radius - z) / (radius * 2));
          const size = Math.max(0.5, 2 * perspective);
          
          ctx.beginPath();
          ctx.globalAlpha = opacity;
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Add a subtle glow behind the globe
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.2);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.1)');
      gradient.addColorStop(1, 'transparent');
      ctx.globalAlpha = 1;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for fade out animation
    }, 3000);

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
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center overflow-hidden"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
          />
          
          <div className="container mx-auto px-6 relative z-10 flex flex-col items-end justify-center h-full">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-right"
            >
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white mb-2">
                DigitalTwin<span className="text-emerald-500">Architecs</span>
              </h1>
              <div className="flex items-center justify-end gap-4">
                <div className="h-[2px] w-24 bg-emerald-500/50" />
                <span className="text-emerald-500 font-bold tracking-[0.3em] text-sm uppercase">
                  .io
                </span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 2, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-emerald-500/20"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
