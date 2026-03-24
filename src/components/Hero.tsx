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
    <section className={cn(
      "relative flex items-center overflow-hidden bg-slate-950",
      language === 'ru' ? "min-h-[75vh] pt-20 md:pt-24" : "min-h-[85vh] pt-24 md:pt-32"
    )}>
      {/* 3D Particle Animation Background */}
      <ParticleWave />

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl relative z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-600 text-xs font-bold uppercase tracking-widest pointer-events-auto",
              language === 'ru' ? "mb-3 md:mb-4" : "mb-4 md:mb-6"
            )}
          >
            <Sparkles className="w-3 h-3" />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn(
              "font-bold text-white tracking-tighter leading-[0.9] pointer-events-auto",
              language === 'ru' ? "text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6" : "text-4xl md:text-7xl lg:text-8xl mb-6 md:mb-8"
            )}
          >
            {t.hero.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-900">
              {t.hero.title2}
            </span>{' '}
            {t.hero.title3}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "text-slate-400 max-w-2xl leading-relaxed pointer-events-auto",
              language === 'ru' ? "text-base md:text-lg mb-6 md:mb-8" : "text-base md:text-xl mb-8 md:mb-10"
            )}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
          >
            <a 
              href="#contact" 
              className="group px-8 py-4 bg-emerald-700 text-white rounded-full font-bold text-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
            >
              {t.hero.cta1}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#case-studies" 
              className="px-8 py-4 bg-slate-900 text-white border border-slate-800 rounded-full font-bold text-lg hover:bg-slate-800 transition-all text-center"
            >
              {t.hero.cta2}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Gradient Transition */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
