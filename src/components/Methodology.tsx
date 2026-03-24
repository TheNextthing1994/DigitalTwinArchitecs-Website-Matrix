import React from 'react';
import { motion } from 'motion/react';
import { Zap, Database, Cpu, Globe, Layers } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Methodology = () => {
  const { t } = useLanguage();

  const steps = [
    {
      title: t.methodology.steps[0].title,
      desc: t.methodology.steps[0].desc,
      icon: Zap
    },
    {
      title: t.methodology.steps[1].title,
      desc: t.methodology.steps[1].desc,
      icon: Layers
    },
    {
      title: t.methodology.steps[2].title,
      desc: t.methodology.steps[2].desc,
      icon: Cpu
    },
    {
      title: t.methodology.steps[3].title,
      desc: t.methodology.steps[3].desc,
      icon: Database
    },
    {
      title: t.methodology.steps[4].title,
      desc: t.methodology.steps[4].desc,
      icon: Globe
    }
  ];

  return (
    <section id="methodology" className="py-32 bg-white-flash overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="mb-8 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.5em] text-pulse-ash">
              <span>·</span>
              {t.nav.methodology}
              <span>·</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-rich-carbon mb-8 tracking-tighter uppercase leading-[0.9]">
              {t.methodology.title} <br />
              <span className="text-electric-teal">{t.methodology.highlight}</span>
            </h2>
            
            <p className="text-pulse-ash mb-16 leading-relaxed max-w-xl">
              {t.methodology.subtitle}
            </p>

            <div className="space-y-12">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, ease: [0.62, 0.16, 0.13, 1.01] }}
                  className="flex gap-8 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-rich-carbon flex items-center justify-center group-hover:bg-core-black transition-colors">
                    <step.icon className="text-white-flash w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-rich-carbon font-bold text-lg mb-2 uppercase tracking-tight">{step.title}</h4>
                    <p className="text-pulse-ash text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-electric-teal/5 blur-[120px] rounded-full" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.62, 0.16, 0.13, 1.01] }}
              className="relative p-12 rounded-sm bg-white border border-neural-fog shadow-[0_40px_80px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-12 relative z-10">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-neural-fog" />
                  <div className="w-2 h-2 rounded-full bg-neural-fog" />
                  <div className="w-2 h-2 rounded-full bg-neural-fog" />
                </div>
                <div className="text-[10px] font-mono text-pulse-ash uppercase tracking-widest">exponential_core.config</div>
              </div>
              
              <pre className="font-mono text-sm text-rich-carbon overflow-x-auto relative z-10 leading-relaxed">
                {`{
  "project": "Exponential_Core",
  "focus": {
    "source": "Human_Intelligence",
    "mode": "Exponential_Growth",
    "goal": "Solving_Hard_Challenges"
  },
  "capabilities": [
    "AI_&_Biotech",
    "Robotics_&_Space",
    "Blockchain_Systems"
  ],
  "status": "active_innovation"
}`}
              </pre>
              
              <div className="mt-12 pt-12 border-t border-neural-fog flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-rich-carbon flex items-center justify-center">
                    <Cpu className="text-white-flash w-5 h-5" />
                  </div>
                  <span className="text-rich-carbon font-bold tracking-tight uppercase text-sm">Exponential Engine v5.0</span>
                </div>
                <div className="px-4 py-1 rounded-full bg-electric-teal/10 text-electric-teal text-[10px] font-bold uppercase tracking-widest">
                  System Active
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
