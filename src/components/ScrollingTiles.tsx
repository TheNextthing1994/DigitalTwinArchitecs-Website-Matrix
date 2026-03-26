import React, { useMemo, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';
import { targetGroupCategories } from '../constants/targetGroups';

interface ScrollingTilesProps {
  onTileClick: (text: string) => void;
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const Tile: React.FC<{ text: string; onClick: (text: string) => void }> = ({ text, onClick }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        rotateX: 5,
        rotateY: 2,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(text)}
      style={{ perspective: "1000px" }}
      className={cn(
        "px-6 md:px-10 py-4 md:py-5 rounded-2xl bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-emerald-950/30 backdrop-blur-xl border border-white/10",
        "text-white font-semibold whitespace-nowrap transition-all duration-500 text-sm md:text-base cursor-pointer shrink-0 relative group overflow-hidden",
        "shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_50px_rgba(16,185,129,0.3)]",
        "flex items-center justify-center"
      )}
    >
      {/* Glass Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none opacity-50" />
      
      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 border border-emerald-500/5 rounded-2xl pointer-events-none" />
      
      {/* Animated Green Glow on Hover */}
      <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-500" />
      
      {/* Bottom Edge Highlight for 3D effect */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <span className="relative z-10 group-hover:text-emerald-300 transition-colors duration-300 tracking-wide">
        {text}
      </span>
    </motion.div>
  );
};

const ScrollingRow: React.FC<{ 
  items: string[]; 
  speed: number; 
  direction: number; 
  onTileClick: (text: string) => void 
}> = ({ items, speed, direction, onTileClick }) => {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const dragDistance = useRef(0);

  // Quadruple items to ensure we always have enough coverage for wrapping
  const duplicatedItems = useMemo(() => [...items, ...items, ...items, ...items], [items]);

  useAnimationFrame((t, delta) => {
    if (isDragging.current) return;
    
    // speed is percentage of one set per second
    // Since we have 4 sets, 1 set is 25% of total width
    let moveBy = direction * speed * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  // Wrap between -25 and 0
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastPointerX.current = e.clientX;
    dragDistance.current = 0;
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const deltaX = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    dragDistance.current += Math.abs(deltaX);
    
    const totalWidth = containerRef.current.scrollWidth;
    const percentDelta = (deltaX / totalWidth) * 100;
    baseX.set(baseX.get() + percentDelta);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleTileClick = (text: string) => {
    if (dragDistance.current < 10) {
      onTileClick(text);
    }
  };

  return (
    <div 
      className="relative flex overflow-hidden py-2 cursor-grab active:cursor-grabbing touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <motion.div
        ref={containerRef}
        style={{ x, width: 'max-content' }}
        className="flex gap-6 px-4 items-center"
      >
        {duplicatedItems.map((group, i) => (
          <Tile key={`${group}-${i}`} text={group} onClick={handleTileClick} />
        ))}
      </motion.div>
    </div>
  );
};

export const ScrollingTiles: React.FC<ScrollingTilesProps> = ({ onTileClick }) => {
  const { language } = useLanguage();
  
  const handleTileClick = (text: string) => {
    let prefilled = '';
    if (language === 'de') {
      prefilled = `Ich bin ${text} und möchte durch einen Digitalen Zwilling folgende Aufgaben automatisieren: `;
    } else if (language === 'ru') {
      prefilled = `Я ${text} и хочу автоматизировать следующие задачи с помощью Диджитал Двойника: `;
    } else {
      prefilled = `Со ${text} ву/ю, суна лаьа Диджитал Шалвинаца хIара gIуллакхаш автоматхочун кепе ерзо: `;
    }
    onTileClick(prefilled);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get flat list of all target groups for current language
  const allGroups = useMemo(() => {
    const langData = targetGroupCategories[language] || targetGroupCategories.de;
    return langData.flatMap(cat => cat.items);
  }, [language]);

  // Split target groups into two sets for the two rows
  const midPoint = Math.ceil(allGroups.length / 2);
  const row1 = allGroups.slice(0, midPoint);
  const row2 = allGroups.slice(midPoint);

  return (
    <div id="solutions" className="pb-24 pt-12 bg-slate-950 overflow-hidden flex flex-col gap-8 relative z-20">
      {/* Background Glows for 3D depth */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Edge Fading Gradients */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-6 mb-2">
        <h2 className="text-center text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] opacity-50">
          {language === 'de' ? 'Unsere Zielgruppen & Expertisen' : 
           language === 'ru' ? 'Наши целевые группы и экспертизы' : 
           'Вайн целеви группаш а, говзаллаш а'}
        </h2>
      </div>

      <ScrollingRow items={row1} speed={1} direction={-1} onTileClick={handleTileClick} />
      <ScrollingRow items={row2} speed={0.8} direction={1} onTileClick={handleTileClick} />
    </div>
  );
};
