import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer = ({ prefilledMessage }: { prefilledMessage?: string }) => {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (prefilledMessage) {
      setMessage(prefilledMessage);
    }
  }, [prefilledMessage]);

  return (
    <footer id="contact" className="pt-24 pb-12 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-blue-900/20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_bottom,rgba(29,78,216,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-none">
              {t.footer.ctaTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                {t.footer.ctaHighlight}
              </span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-md">
              {t.footer.ctaDesc}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center">
                  <Mail className="text-emerald-700 w-5 h-5" />
                </div>
                <span>office@digitaltwinarchitecs.io</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center">
                  <Phone className="text-emerald-700 w-5 h-5" />
                </div>
                <span>+43 (0)660 47 63 085</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center">
                  <MapPin className="text-emerald-700 w-5 h-5" />
                </div>
                <span>Bregenz, Österreich</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-800">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t.footer.form.name}</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-700 outline-none transition-colors"
                    placeholder={t.footer.form.namePlaceholder}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t.footer.form.email}</label>
                  <input 
                    type="email" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-700 outline-none transition-colors"
                    placeholder={t.footer.form.emailPlaceholder}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t.footer.form.message}</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {t.footer.automationTasks.map((task, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setMessage(prev => prev + (prev.length > 0 && !prev.endsWith(' ') ? ' ' : '') + task + ', ')}
                      className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-all"
                    >
                      + {task}
                    </button>
                  ))}
                </div>
                <textarea 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-700 outline-none transition-colors resize-none"
                  placeholder={t.footer.form.messagePlaceholder}
                />
              </div>
              <button className="w-full py-4 bg-emerald-700 text-white rounded-xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-900/20">
                {t.footer.form.send}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-900 gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-700 rounded flex items-center justify-center">
              <span className="text-slate-950 font-bold text-xs">DT</span>
            </div>
            <span className="text-slate-400 font-medium">
              © 2026 DigitalTwinArchitecs.io
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
          </div>

          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">{t.footer.links.imprint}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.links.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
