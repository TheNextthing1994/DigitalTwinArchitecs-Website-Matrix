import React from 'react';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="relative bg-white-flash border-t border-neural-fog py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-rich-carbon flex items-center justify-center rounded-sm">
                <Zap className="w-5 h-5 text-white-flash" />
              </div>
              <span className="font-bold text-xl tracking-tighter text-rich-carbon">
                EXPONENTIAL<span className="text-pulse-ash">.</span>
              </span>
            </div>
            <p className="text-pulse-ash max-w-md text-sm leading-relaxed">
              {t.footer.description || "Building the next generation of exponential technologies to solve humanity's hardest challenges."}
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.5em] text-rich-carbon mb-8">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-4">
              {['solutions', 'case-studies', 'methodology', 'contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item}`} 
                    className="text-sm text-pulse-ash hover:text-rich-carbon transition-colors"
                  >
                    {t.nav[item as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.5em] text-rich-carbon mb-8">
              {t.footer.contact}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-pulse-ash">
                <Mail className="w-4 h-4 text-rich-carbon" />
                <a href="mailto:info@apt-ai.de" className="hover:text-rich-carbon transition-colors">info@apt-ai.de</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-pulse-ash">
                <Phone className="w-4 h-4 text-rich-carbon" />
                <a href="tel:+4917623230638" className="hover:text-rich-carbon transition-colors">+49 176 23230638</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-pulse-ash">
                <MapPin className="w-4 h-4 text-rich-carbon" />
                <span>Berlin, Germany</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neural-fog flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono uppercase tracking-widest text-pulse-ash">
            © {new Date().getFullYear()} EXPONENTIAL TECHNOLOGIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-mono uppercase tracking-widest text-pulse-ash hover:text-rich-carbon transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-mono uppercase tracking-widest text-pulse-ash hover:text-rich-carbon transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
