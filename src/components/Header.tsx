import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 h-[var(--header-height)] flex items-center",
        isScrolled ? "bg-white-flash/80 backdrop-blur-md border-b border-neural-fog" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-rich-carbon flex items-center justify-center rounded-sm group-hover:bg-core-black transition-colors">
            <Zap className="w-5 h-5 text-white-flash" />
          </div>
          <span className="font-bold text-xl tracking-tighter text-rich-carbon">
            EXPONENTIAL<span className="text-pulse-ash">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-12">
          <a href="#solutions" className="text-[10px] font-mono uppercase tracking-[0.3em] text-pulse-ash hover:text-rich-carbon transition-colors">{t.nav.solutions}</a>
          <a href="#case-studies" className="text-[10px] font-mono uppercase tracking-[0.3em] text-pulse-ash hover:text-rich-carbon transition-colors">{t.nav.caseStudies}</a>
          <a href="#methodology" className="text-[10px] font-mono uppercase tracking-[0.3em] text-pulse-ash hover:text-rich-carbon transition-colors">{t.nav.methodology}</a>
          <a href="#contact" className="text-[10px] font-mono uppercase tracking-[0.3em] text-pulse-ash hover:text-rich-carbon transition-colors">{t.nav.contact}</a>
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-neural-fog/30 p-1 rounded-full">
            {(['de', 'ru', 'ce'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  "w-8 h-8 rounded-full text-[10px] font-bold transition-all",
                  language === lang 
                    ? "bg-rich-carbon text-white-flash shadow-lg" 
                    : "text-pulse-ash hover:text-rich-carbon"
                )}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          
          <a 
            href="https://wa.me/4917623230638"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-6 py-2 bg-rich-carbon text-white-flash rounded-full text-xs font-bold tracking-widest hover:bg-core-black transition-all"
          >
            {t.nav.strategy}
          </a>
        </div>
      </div>
    </header>
  );
};
