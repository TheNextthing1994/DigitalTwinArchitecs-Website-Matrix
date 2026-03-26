import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../translations';
import { targetGroupCategories } from '@/src/constants/targetGroups';

interface HeaderProps {
  onTileClick?: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onTileClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<'none' | 'solutions' | 'categories'>('none');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const categories = targetGroupCategories[language] || targetGroupCategories.de;

  const navLinks = [
    { name: t.nav.solutions, href: '#solutions', hasSubmenu: true },
    { name: t.nav.caseStudies, href: '#case-studies' },
    { name: t.nav.methodology, href: '#methodology' },
    { name: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setActiveSubmenu('none');
      setSelectedCategory(null);
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.hasSubmenu) {
      setActiveSubmenu('solutions');
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveSubmenu('categories');
  };

  const handleCategoryItemClick = (item: string) => {
    if (onTileClick) {
      let prefilled = '';
      if (language === 'de') {
        prefilled = `Ich bin ${item} und möchte durch einen Digitalen Zwilling folgende Aufgaben automatisieren: `;
      } else if (language === 'ru') {
        prefilled = `Я ${item} и хочу автоматизировать следующие задачи с помощью Диджитал Двойника: `;
      } else {
        prefilled = `Со ${item} ву/ю, суна лаьа Диджитал Шалвинаца хIара гIуллакхаш автоматхочун кепе ерзо: `;
      }
      onTileClick(prefilled);
    }
    setIsMobileMenuOpen(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBack = () => {
    if (activeSubmenu === 'categories') {
      setActiveSubmenu('solutions');
      setSelectedCategory(null);
    } else if (activeSubmenu === 'solutions') {
      setActiveSubmenu('none');
    }
  };

  const getBackLabel = () => {
    if (language === 'ru') return 'Назад';
    if (language === 'ce') return 'Юхане';
    return 'Zurück';
  };

  const getCategoryLabel = () => {
    if (language === 'ru') return 'Категории';
    if (language === 'ce') return 'Категореш';
    return 'Kategorien';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        (isScrolled || isMobileMenuOpen)
          ? 'bg-slate-950 border-slate-800 py-3'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 md:gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            {/* 3D Glass Background Layers */}
            <div className="absolute inset-0 bg-emerald-600/20 rounded-xl blur-sm group-hover:bg-emerald-500/30 transition-colors" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/40 to-emerald-900/40 rounded-xl border border-white/20 backdrop-blur-md shadow-xl" />
            
            {/* The "DT" Text with 3D effect */}
            <div className="relative flex items-center justify-center font-black text-lg md:text-xl tracking-tighter select-none">
              <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">D</span>
              <span className="text-emerald-400 -ml-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">T</span>
              
              {/* Subtle light reflection */}
              <div className="absolute top-1 left-1 w-4 h-4 bg-white/20 rounded-full blur-[2px] pointer-events-none" />
            </div>
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tighter text-white">
            DigitalTwin<span className="text-emerald-700">Architect</span>.io
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
            <span className="text-slate-800 text-xs">|</span>
            <button 
              onClick={() => setLanguage('ce')}
              className={cn(
                "text-xs font-bold transition-colors",
                language === 'ce' ? "text-emerald-600" : "text-slate-500 hover:text-white"
              )}
            >
              CE
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
              onClick={() => {
                const langs: Language[] = ['de', 'ru', 'ce'];
                const nextIndex = (langs.indexOf(language) + 1) % langs.length;
                setLanguage(langs[nextIndex]);
              }}
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
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
            <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 top-[65px] md:top-[73px] md:hidden bg-slate-950 z-40 flex flex-col"
            style={{ height: 'calc(100vh - 65px)' }}
          >
            <div className="flex flex-col p-6 gap-4 overflow-y-auto flex-1">
              {activeSubmenu === 'none' ? (
                <>
                  {navLinks.map((link) => (
                    <div key={link.name} className="flex items-center justify-between border-b border-slate-800/50 pb-4">
                      <a
                        href={link.href}
                        className="text-xl font-bold text-white tracking-tight"
                        onClick={() => handleNavClick(link)}
                      >
                        {link.name}
                      </a>
                      {link.hasSubmenu && (
                        <button 
                          onClick={() => setActiveSubmenu('solutions')}
                          className="p-2 bg-slate-900 rounded-full text-emerald-500"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <a
                    href="#contact"
                    className="w-full py-4 mt-4 bg-emerald-600 text-white rounded-xl text-center font-bold text-lg shadow-lg shadow-emerald-900/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.nav.strategy}
                  </a>
                </>
              ) : activeSubmenu === 'solutions' ? (
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-2 text-emerald-500 font-semibold mb-4"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    {getBackLabel()}
                  </button>
                  <h3 className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-2">{getCategoryLabel()}</h3>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryClick(cat.name)}
                      className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-left group"
                    >
                      <span className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">{cat.name}</span>
                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-2 text-emerald-500 font-semibold mb-4"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    {selectedCategory}
                  </button>
                  <div className="grid grid-cols-1 gap-3">
                    {categories.find(c => c.name === selectedCategory)?.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleCategoryItemClick(item)}
                        className="p-4 bg-slate-900/30 border border-slate-800/50 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all text-left text-sm"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
