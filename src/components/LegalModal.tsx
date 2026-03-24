import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'imprint' | 'privacy';
}

export const LegalModal = ({ isOpen, onClose, type }: LegalModalProps) => {
  const { t } = useLanguage();
  
  // Fallback to German if not available in other languages
  const content = type === 'imprint' ? t.footer.imprintContent : t.footer.privacyContent;

  if (!content) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl max-h-[80vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
              <h2 className="text-2xl font-bold text-white">{content.title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="prose prose-invert max-w-none space-y-8">
                {content.sections.map((section: any, index: number) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-lg font-bold text-emerald-400 uppercase tracking-wider">
                      {section.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-800 bg-slate-900/50 text-center">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20"
              >
                Schließen
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
