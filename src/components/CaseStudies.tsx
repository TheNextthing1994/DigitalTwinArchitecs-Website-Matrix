import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Factory, 
  Briefcase, 
  Gamepad2, 
  Stethoscope,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const CaseStudies = () => {
  const { t } = useLanguage();

  const units = [
    {
      id: 'rodar',
      title: t.caseStudies.units.rodar.title,
      description: t.caseStudies.units.rodar.desc,
      icon: ShoppingBag,
      color: 'from-emerald-700 to-emerald-900',
      image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'osman',
      title: t.caseStudies.units.osman.title,
      description: t.caseStudies.units.osman.desc,
      icon: Factory,
      color: 'from-emerald-800 to-slate-900',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'max',
      title: t.caseStudies.units.max.title,
      description: t.caseStudies.units.max.desc,
      icon: Briefcase,
      color: 'from-emerald-900 to-black',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'gamezone',
      title: t.caseStudies.units.gamezone.title,
      description: t.caseStudies.units.gamezone.desc,
      icon: Gamepad2,
      color: 'from-purple-500 to-pink-600',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'wolber',
      title: t.caseStudies.units.wolber.title,
      description: t.caseStudies.units.wolber.desc,
      icon: Stethoscope,
      color: 'from-red-500 to-orange-600',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="case-studies" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              {t.caseStudies.title}
            </h2>
            <p className="text-xl text-slate-400">
              {t.caseStudies.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-sm">
            {t.caseStudies.badge} <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit, index) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-[450px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900"
            >
              <div className="absolute inset-0">
                <img 
                  src={unit.image} 
                  alt={unit.title}
                  className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${unit.color} flex items-center justify-center mb-6 shadow-lg shadow-emerald-900/40`}>
                  <unit.icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-600 transition-colors">
                  {unit.title}
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6 opacity-80">
                  {unit.description}
                </p>
                <button className="w-fit flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest group/btn">
                  {t.caseStudies.details}
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
          
          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-slate-800 bg-slate-900/50 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-6">
              <Sparkles className="text-emerald-700 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t.caseStudies.missingTitle}</h3>
            <p className="text-slate-400 mb-8">
              {t.caseStudies.missingDesc}
            </p>
            <button className="px-6 py-3 bg-white text-slate-950 rounded-full font-bold hover:bg-emerald-700 hover:text-white transition-all">
              {t.caseStudies.missingCta}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
