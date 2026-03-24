import React from 'react';
import { motion } from 'motion/react';
import { Quote, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AudioVisualizer = () => (
  <div className="flex items-end gap-[2px] h-8">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          height: [8, Math.random() * 32 + 8, 8],
        }}
        transition={{
          duration: 1 + Math.random(),
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-1 bg-emerald-700/60 rounded-full"
      />
    ))}
  </div>
);

export const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 border-y border-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.testimonials.title}
          </h2>
          <p className="text-xl text-slate-400">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {t.testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-slate-950 border border-slate-800 relative group"
            >
              <Quote className="absolute top-6 right-8 text-slate-800 w-12 h-12" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">{item.name[0]}</span>
                </div>
                <div>
                  <h4 className="text-white font-bold">{item.name}</h4>
                  <p className="text-slate-500 text-sm">{item.role}</p>
                </div>
              </div>

              <p className="text-slate-300 text-lg italic mb-10 leading-relaxed">
                "{item.text}"
              </p>

              {/* Audio Player Component */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                </button>
                <div className="flex-1">
                  <AudioVisualizer />
                </div>
                <span className="text-xs font-mono text-slate-500">{item.audioLength}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
