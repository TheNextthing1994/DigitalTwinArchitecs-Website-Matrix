import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

export const Footer = ({ 
  prefilledMessage, 
  onOpenLegal 
}: { 
  prefilledMessage?: string;
  onOpenLegal: (type: 'imprint' | 'privacy') => void;
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (prefilledMessage) {
      setMessage(prefilledMessage);
    }
  }, [prefilledMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = '436604763085';
    const text = `*Neue Anfrage von der Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Nachricht:* ${message}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer id="contact" className="bg-transparent pt-16 md:pt-24 pb-12 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-blue-900/20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_bottom,rgba(29,78,216,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-24">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 tracking-tight">
              {t.footer.ctaTitle} <br />
              <span className="text-emerald-700">{t.footer.ctaHighlight}</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 mb-10 md:mb-12 max-w-md">
              {t.footer.ctaDesc}
            </p>
            
              <div className="space-y-4 md:space-y-6">
                <a href="mailto:office@digitaltwinarchitecs.io" className="flex items-center gap-4 text-slate-300 hover:text-emerald-400 transition-colors text-sm md:text-base">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                    <Mail className="text-emerald-700 w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="break-all">office@digitaltwinarchitecs.io</span>
                </a>
                <a href="tel:+436604763085" className="flex items-center gap-4 text-slate-300 hover:text-emerald-400 transition-colors text-sm md:text-base">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                    <Phone className="text-emerald-700 w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span>+43 (0)660 47 63 085</span>
                </a>
                <div className="flex items-center gap-4 text-slate-300 text-sm md:text-base">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                  <MapPin className="text-emerald-700 w-4 h-4 md:w-5 md:h-5" />
                </div>
                <span>Bregenz, Österreich</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-800">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest">{t.footer.form.name}</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-700 outline-none transition-colors text-sm md:text-base"
                    placeholder={t.footer.form.namePlaceholder}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest">{t.footer.form.email}</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-700 outline-none transition-colors text-sm md:text-base"
                    placeholder={t.footer.form.emailPlaceholder}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest">{t.footer.form.message}</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {t.footer.automationTasks.map((task, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setMessage(prev => prev + (prev.length > 0 && !prev.endsWith(' ') ? ' ' : '') + task + ', ')}
                      className={cn(
                        "text-[10px] md:text-xs px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all duration-300",
                        "bg-white/5 backdrop-blur-md border border-white/10",
                        "text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40",
                        "shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_20px_rgba(16,185,129,0.2)]",
                        "hover:-translate-y-1 active:translate-y-0"
                      )}
                    >
                      + {task}
                    </button>
                  ))}
                </div>
                <textarea 
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-700 outline-none transition-colors resize-none text-sm md:text-base"
                  placeholder={t.footer.form.messagePlaceholder}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3.5 md:py-4 bg-emerald-700 text-white rounded-xl font-bold text-base md:text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-900/20"
              >
                {t.footer.form.send}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 md:pt-12 border-t border-slate-900 gap-6 md:gap-8">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-600/20 rounded-lg blur-[2px]" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-emerald-900/30 rounded-lg border border-white/10 backdrop-blur-sm" />
              <div className="relative flex items-center justify-center font-black text-xs md:text-sm tracking-tighter select-none">
                <span className="text-white">D</span>
                <span className="text-emerald-400 -ml-0.5">T</span>
              </div>
            </div>
            <span className="text-slate-400 font-medium text-xs md:text-sm">
              © 2026 DigitalTwinArchitecs.io
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="w-4 h-4 md:w-5 md:h-5" /></a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter className="w-4 h-4 md:w-5 md:h-5" /></a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="w-4 h-4 md:w-5 md:h-5" /></a>
          </div>

          <div className="flex gap-6 md:gap-8 text-xs md:text-sm text-slate-500">
            <button 
              onClick={() => onOpenLegal('imprint')} 
              className="hover:text-white transition-colors"
            >
              {t.footer.links.imprint}
            </button>
            <button 
              onClick={() => onOpenLegal('privacy')} 
              className="hover:text-white transition-colors"
            >
              {t.footer.links.privacy}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
