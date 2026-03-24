import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  speed: number;
}

export const WarpSpeed: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width: number;
    let height: number;
    const particles: Particle[] = [];
    const particleCount = 600;
    
    // Configuration
    const baseSpeed = 2;
    const acceleration = 1.02;

    const initParticle = (p: Partial<Particle> = {}): Particle => {
      // Random position in a wide area
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.max(width, height) * 2;
      
      return {
        x: p.x ?? Math.cos(angle) * radius,
        y: p.y ?? Math.sin(angle) * radius,
        z: p.z ?? Math.random() * 100 + 10, // Start close
        prevZ: p.z ?? 0,
        speed: baseSpeed + Math.random() * 0.5,
      };
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    const setup = () => {
      resize();
      for (let i = 0; i < particleCount; i++) {
        particles.push(initParticle());
      }
    };

    const draw = () => {
      // Semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.15)'; // Match slate-950
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move AWAY from viewer (towards center)
        p.prevZ = p.z;
        p.z += p.speed;
        p.speed *= acceleration; // Accelerate as they "fall" into the distance

        // Project 3D to 2D
        const scale = 400 / p.z;
        const x2d = centerX + p.x * scale;
        const y2d = centerY + p.y * scale;

        const prevScale = 400 / p.prevZ;
        const prevX2d = centerX + p.x * prevScale;
        const prevY2d = centerY + p.y * prevScale;

        // Draw line (trail)
        const alpha = Math.max(0, 1 - p.z / 2000);
        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha * 0.8})`; // emerald-500
        ctx.lineWidth = Math.max(0.1, 1.5 * scale);
        ctx.beginPath();
        ctx.moveTo(prevX2d, prevY2d);
        ctx.lineTo(x2d, y2d);
        ctx.stroke();

        // Reset particle if it reaches the center (far away)
        if (p.z >= 2000 || (Math.abs(x2d - centerX) < 1 && Math.abs(y2d - centerY) < 1)) {
          particles[i] = initParticle({ z: 10 + Math.random() * 20 });
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    setup();
    draw();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
