import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

import { ParticleWave } from './ParticleWave';
import { PhysicsCloud } from './PhysicsCloud';

export const Hero = ({ onTileClick }: { onTileClick: (text: string) => void }) => {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white-flash">
      {/* Subtle Dot Grid Background (replacing ParticleWave for this specific minimalist look) */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #111 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.62, 0.16, 0.13, 1.01] }}
          className="flex flex-col items-center"
        >
          <div className="mb-8 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.5em] text-pulse-ash">
            <span>·</span>
            {t.hero.badge}
            <span>·</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold text-rich-carbon leading-[0.9] mb-12 max-w-5xl">
            {t.hero.title1} <br />
            {t.hero.title2} <br />
            {t.hero.title3}
          </h1>

          <p className="text-pulse-ash max-w-2xl text-sm md:text-base leading-relaxed mb-16 font-medium">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-8 items-center">
            <a 
              href="#contact" 
              className="px-12 py-4 bg-rich-carbon text-white-flash rounded-full font-bold text-sm tracking-widest hover:bg-core-black transition-all duration-300"
            >
              {t.hero.cta1}
            </a>
            <a 
              href="#solutions" 
              className="text-rich-carbon font-bold text-sm tracking-widest hover:text-electric-teal transition-colors duration-300"
            >
              {t.hero.cta2}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white-flash to-transparent pointer-events-none" />
    </section>
  );
};
