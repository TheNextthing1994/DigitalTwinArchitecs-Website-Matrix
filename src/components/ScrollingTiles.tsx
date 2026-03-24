import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

interface ScrollingTilesProps {
  onTileClick: (text: string) => void;
}

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
        "px-10 py-5 rounded-2xl bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-emerald-950/30 backdrop-blur-xl border border-white/10",
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

export const ScrollingTiles: React.FC<ScrollingTilesProps> = ({ onTileClick }) => {
  const { t, language } = useLanguage();
  
  const handleTileClick = (text: string) => {
    const prefilled = language === 'de' 
      ? `Ich bin ${text} und möchte folgende Aufgaben automatisieren: `
      : `Я ${text} и хочу автоматизировать следующие задачи: `;
    onTileClick(prefilled);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Split target groups into two sets for the two rows
  const midPoint = Math.ceil(t.targetGroups.length / 2);
  const row1 = t.targetGroups.slice(0, midPoint);
  const row2 = t.targetGroups.slice(midPoint);

  // Duplicate items for seamless loop
  const duplicatedRow1 = [...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2];

  return (
    <div className={cn(
      "pb-24 pt-0 bg-slate-950 overflow-hidden flex flex-col gap-8 relative z-20",
      language === 'ru' ? "-mt-16 md:-mt-24" : "-mt-24 md:-mt-32"
    )}>
      {/* Background Glows for 3D depth */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Edge Fading Gradients */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-6 mb-2">
        <h2 className="text-center text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] opacity-50">
          {language === 'de' ? 'Unsere Zielgruppen & Expertisen' : 'Наши целевые группы и экспертизы'}
        </h2>
      </div>

      {/* Row 1: Right to Left */}
      <div className="relative flex overflow-hidden py-2">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 80,
              ease: "linear",
            },
          }}
          className="flex gap-6 px-4 items-center"
          style={{ width: 'max-content' }}
        >
          {duplicatedRow1.map((group, i) => (
            <Tile key={`${group}-${i}`} text={group} onClick={handleTileClick} />
          ))}
        </motion.div>
      </div>

      {/* Row 2: Left to Right */}
      <div className="relative flex overflow-hidden py-2">
        <motion.div
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 90,
              ease: "linear",
            },
          }}
          className="flex gap-6 px-4 items-center"
          style={{ width: 'max-content' }}
        >
          {duplicatedRow2.map((group, i) => (
            <Tile key={`${group}-${i}`} text={group} onClick={handleTileClick} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
