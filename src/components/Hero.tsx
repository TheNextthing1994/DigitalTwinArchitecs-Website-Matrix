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
      language === 'ru' ? "min-h-[75vh] pt-20 md:pt-24 pb-12" : "min-h-[85vh] pt-24 md:pt-32 pb-24"
    )}>
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      {/* 3D Particle Animation Background */}
      <ParticleWave />

      <div className="container mx-auto px-6 relative z-30">
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
              "font-bold text-white tracking-tighter leading-[0.9]",
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
              "text-slate-400 max-w-2xl leading-relaxed",
              language === 'ru' ? "text-base md:text-lg mb-6 md:mb-8" : "text-base md:text-xl mb-8 md:mb-10"
            )}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 pointer-events-auto"
          >
            <a 
              href="#contact" 
              className={cn(
                "group relative px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-500",
                "bg-gradient-to-br from-emerald-400/90 via-emerald-600/90 to-blue-600/90 backdrop-blur-xl",
                "border border-white/30 border-t-white/50",
                "text-white shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)]",
                "hover:translate-y-[-6px] hover:shadow-[0_30px_60px_rgba(16,185,129,0.5)] hover:scale-[1.02]",
                "active:translate-y-[2px] active:scale-[0.98] active:shadow-[0_10px_20px_rgba(0,0,0,0.4)]",
                "flex items-center justify-center gap-3 overflow-hidden"
              )}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shine_2s_infinite] pointer-events-none" />
              
              {/* Inner glow pulse */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:animate-pulse pointer-events-none" />
              
              <span className="relative z-10 drop-shadow-md">{t.hero.cta1}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10 drop-shadow-md" />
            </a>
            <a 
              href="#case-studies" 
              className={cn(
                "group relative px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-500",
                "bg-white/10 backdrop-blur-2xl",
                "border border-white/20 border-t-white/40",
                "text-white shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]",
                "hover:translate-y-[-6px] hover:bg-white/20 hover:shadow-[0_30px_60px_rgba(255,255,255,0.15)] hover:scale-[1.02]",
                "active:translate-y-[2px] active:scale-[0.98] active:shadow-[0_10px_20px_rgba(0,0,0,0.3)]",
                "text-center overflow-hidden flex items-center justify-center"
              )}
            >
              {/* Colorful hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="relative z-10 drop-shadow-md">{t.hero.cta2}</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Gradient Transition */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
