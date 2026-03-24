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
        y: -4,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(text)}
      className={cn(
        "px-10 py-5 rounded-sm bg-white border border-neural-fog",
        "text-rich-carbon font-bold whitespace-nowrap transition-all duration-300 text-sm cursor-pointer shrink-0 relative group overflow-hidden uppercase tracking-widest",
        "shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-rich-carbon",
        "flex items-center justify-center"
      )}
    >
      <span className="relative z-10 group-hover:text-electric-teal transition-colors duration-300">
        {text}
      </span>
    </motion.div>
  );
};

export const ScrollingTiles: React.FC<ScrollingTilesProps> = ({ onTileClick }) => {
  const { t, language } = useLanguage();
  
  const handleTileClick = (text: string) => {
    let prefilled = '';
    if (language === 'de') {
      prefilled = `Ich bin ${text} und möchte durch einen Digitalen Zwilling folgende Aufgaben automatisieren: `;
    } else if (language === 'ru') {
      prefilled = `Я ${text} и хочу автоматизировать следующие задачи с помощью Диджитал Двойника: `;
    } else {
      prefilled = `Со ${text} ву/ю, суна лаьа Диджитал Шалвинаца хIара гIуллакхаш автоматхочун кепе ерзо: `;
    }
    onTileClick(prefilled);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const midPoint = Math.ceil(t.targetGroups.length / 2);
  const row1 = t.targetGroups.slice(0, midPoint);
  const row2 = t.targetGroups.slice(midPoint);

  const duplicatedRow1 = [...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2];

  return (
    <div id="solutions" className={cn(
      "pb-32 pt-16 bg-white-flash overflow-hidden flex flex-col gap-10 relative z-20",
      language === 'ru' ? "-mt-16 md:-mt-24" : "-mt-24 md:-mt-32"
    )}>
      {/* Edge Fading Gradients */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white-flash to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white-flash to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-6 mb-4">
        <h2 className="text-center text-pulse-ash font-mono text-[10px] uppercase tracking-[0.5em]">
          {language === 'de' ? 'Unsere Zielgruppen & Expertisen' : 
           language === 'ru' ? 'Наши целевые группы и экспертизы' : 
           'Вайн целеви группаш а, говзаллаш а'}
        </h2>
      </div>

      {/* Row 1: Right to Left */}
      <div className="relative flex overflow-hidden py-4">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 100,
              ease: "linear",
            },
          }}
          className="flex gap-8 px-4 items-center"
          style={{ width: 'max-content' }}
        >
          {duplicatedRow1.map((group, i) => (
            <Tile key={`${group}-${i}`} text={group} onClick={handleTileClick} />
          ))}
        </motion.div>
      </div>

      {/* Row 2: Left to Right */}
      <div className="relative flex overflow-hidden py-4">
        <motion.div
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 110,
              ease: "linear",
            },
          }}
          className="flex gap-8 px-4 items-center"
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
