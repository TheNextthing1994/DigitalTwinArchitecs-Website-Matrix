import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'imprint' | 'privacy';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  const { t } = useLanguage();
  const imprintContent = t.footer.legal.imprint;
  const privacyContent = t.footer.legal.privacy;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
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
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
              <div className="flex items-center gap-3">
                {type === 'imprint' ? (
                  <FileText className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Shield className="w-6 h-6 text-emerald-500" />
                )}
                <h2 className="text-xl font-bold text-white">
                  {type === 'imprint' ? imprintContent.title : privacyContent.title}
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {type === 'imprint' ? (
                <div className="space-y-8">
                  <section>
                    <h3 className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-4">Unternehmensangaben</h3>
                    <p className="text-2xl font-bold text-white mb-2">{imprintContent.company}</p>
                    <div className="flex items-center gap-3 text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span>{imprintContent.address}</span>
                    </div>
                  </section>

                  <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-4">{imprintContent.contact}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-300">
                          <Mail className="w-4 h-4 text-slate-500" />
                          <a href={`mailto:${imprintContent.email}`} className="hover:text-emerald-400 transition-colors">{imprintContent.email}</a>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                          <Phone className="w-4 h-4 text-slate-500" />
                          <a href={`tel:${imprintContent.phone.replace(/\s/g, '')}`} className="hover:text-emerald-400 transition-colors">{imprintContent.phone}</a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-4">Zugehörigkeit</h3>
                      <p className="text-slate-300">{imprintContent.chamber}</p>
                    </div>
                  </section>

                  <section className="pt-6 border-t border-slate-800">
                    <p className="text-slate-500 text-sm italic">
                      {imprintContent.disclaimer}
                    </p>
                  </section>
                </div>
              ) : (
                <div className="space-y-8">
                  <section>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      {privacyContent.intro}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-4">{privacyContent.contact}</h3>
                    <p className="text-slate-300 leading-relaxed">
                      {privacyContent.contactDesc}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-4">{privacyContent.rights}</h3>
                    <p className="text-slate-300 leading-relaxed">
                      {privacyContent.rightsDesc}
                    </p>
                  </section>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
