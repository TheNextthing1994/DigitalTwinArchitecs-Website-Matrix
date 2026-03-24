import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { cn } from '../lib/utils';

interface PhysicsCloudProps {
  items: string[];
  onClick: (text: string) => void;
}

export const PhysicsCloud: React.FC<PhysicsCloudProps> = ({ items, onClick }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [bodies, setBodies] = useState<{ id: number; text: string; body: Matter.Body }[]>([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 0 } // No gravity for floating effect
    });
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
      }
    });
    renderRef.current = render;

    // Create runner
    const runner = Runner.create();
    runnerRef.current = runner;

    // Boundaries
    const thickness = 100;
    const wallOptions = { isStatic: true, render: { visible: false } };
    const walls = [
      Bodies.rectangle(width / 2, -thickness / 2, width, thickness, wallOptions), // Top
      Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, wallOptions), // Bottom
      Bodies.rectangle(-thickness / 2, height / 2, thickness, height, wallOptions), // Left
      Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, wallOptions), // Right
    ];

    // Create bodies for items
    const newBodies = items.map((text, i) => {
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * (height - 60) + 30;
      
      // Approximate size based on text length
      const w = text.length * 10 + 40;
      const h = 40;

      const body = Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: 12 },
        restitution: 0.8,
        friction: 0.1,
        frictionAir: 0.02,
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent',
        }
      });

      // Initial random velocity
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      });

      return { id: body.id, text, body };
    });

    setBodies(newBodies);
    Composite.add(engine.world, [...walls, ...newBodies.map(b => b.body)]);

    // Mouse constraint
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(engine.world, mouseConstraint);

    // Keep mouse in sync with scroll
    render.mouse = mouse;

    // Run
    Render.run(render);
    Runner.run(runner, engine);

    // Resize handler
    const handleResize = () => {
      if (!sceneRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      const newHeight = sceneRef.current.clientHeight;

      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      render.options.width = newWidth;
      render.options.height = newHeight;

      // Update walls
      Matter.Body.setPosition(walls[0], { x: newWidth / 2, y: -thickness / 2 });
      Matter.Body.setPosition(walls[1], { x: newWidth / 2, y: newHeight + thickness / 2 });
      Matter.Body.setPosition(walls[2], { x: -thickness / 2, y: newHeight / 2 });
      Matter.Body.setPosition(walls[3], { x: newWidth + thickness / 2, y: newHeight / 2 });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(sceneRef.current);

    // Floating force
    Events.on(engine, 'beforeUpdate', () => {
      newBodies.forEach(b => {
        const force = 0.0001;
        Matter.Body.applyForce(b.body, b.body.position, {
          x: (Math.random() - 0.5) * force,
          y: (Math.random() - 0.5) * force
        });
      });
    });

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [items]);

  // Sync React components with Matter.js bodies
  const [positions, setPositions] = useState<{ [key: number]: { x: number; y: number; angle: number } }>({});

  useEffect(() => {
    let requestRef: number;
    const update = () => {
      const newPositions: { [key: number]: { x: number; y: number; angle: number } } = {};
      bodies.forEach(b => {
        newPositions[b.id] = {
          x: b.body.position.x,
          y: b.body.position.y,
          angle: b.body.angle
        };
      });
      setPositions(newPositions);
      requestRef = requestAnimationFrame(update);
    };
    requestRef = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef);
  }, [bodies]);

  return (
    <div ref={sceneRef} className="relative w-full h-full overflow-visible">
      {/* Background Label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <span className="text-emerald-500 font-mono text-xs uppercase tracking-[0.3em]">
          hier drin
        </span>
      </div>

      {bodies.map((b) => {
        const pos = positions[b.id];
        if (!pos) return null;

        return (
          <div
            key={b.id}
            onClick={() => onClick(b.text)}
            className={cn(
              "absolute cursor-pointer select-none",
              "px-4 py-2 rounded-xl bg-slate-800/90 backdrop-blur-md border border-slate-600/50",
              "text-white font-bold whitespace-nowrap transition-colors duration-300 text-sm md:text-base shadow-xl",
              "hover:text-emerald-400 hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:bg-slate-900"
            )}
            style={{
              left: pos.x,
              top: pos.y,
              transform: `translate(-50%, -50%) rotate(${pos.angle}rad)`,
              pointerEvents: 'auto'
            }}
          >
            {b.text}
          </div>
        );
      })}
    </div>
  );
};
