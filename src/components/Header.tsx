import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Cpu, Globe } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.solutions, href: '#solutions' },
    { name: t.nav.caseStudies, href: '#case-studies' },
    { name: t.nav.methodology, href: '#methodology' },
    { name: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-md border-slate-800 py-3'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-900/20">
            <Cpu className="text-slate-950 w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            DigitalTwin<span className="text-emerald-700">Architecs</span>.io
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-emerald-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-2 border-l border-slate-800 pl-8 ml-2">
            <button 
              onClick={() => setLanguage('de')}
              className={cn(
                "text-xs font-bold transition-colors",
                language === 'de' ? "text-emerald-600" : "text-slate-500 hover:text-white"
              )}
            >
              DE
            </button>
            <span className="text-slate-800 text-xs">|</span>
            <button 
              onClick={() => setLanguage('ru')}
              className={cn(
                "text-xs font-bold transition-colors",
                language === 'ru' ? "text-emerald-600" : "text-slate-500 hover:text-white"
              )}
            >
              RU
            </button>
          </div>

          <a
            href="#contact"
            className="px-5 py-2 bg-white text-slate-950 rounded-full text-sm font-semibold hover:bg-emerald-700 hover:text-white transition-all"
          >
            {t.nav.start}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex items-center gap-2 mr-2">
            <button 
              onClick={() => setLanguage(language === 'de' ? 'ru' : 'de')}
              className="text-emerald-600 text-xs font-bold flex items-center gap-1"
            >
              <Globe className="w-3 h-3" />
              {language.toUpperCase()}
            </button>
          </div>
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="w-full py-3 bg-emerald-700 text-white rounded-lg text-center font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.strategy}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
