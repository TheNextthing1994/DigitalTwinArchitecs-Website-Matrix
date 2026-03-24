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
    <section id="methodology" className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              {t.methodology.title} <br />
              <span className="text-emerald-700">{t.methodology.highlight}</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              {t.methodology.subtitle}
            </p>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <step.icon className="text-emerald-700 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{step.title}</h4>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-emerald-900/20 blur-[100px] rounded-full" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden group"
            >
              {/* Glass Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-45 pointer-events-none group-hover:translate-x-10 group-hover:translate-y-10 transition-transform duration-1000" />

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="text-xs font-mono text-slate-400">vayflow_v2.config.json</div>
              </div>
              
              <pre className="font-mono text-sm text-emerald-500/90 overflow-x-auto relative z-10">
                {`{
  "project": "DigitalTwin_Standard",
  "infrastructure": {
    "backend": "Surreal DB 3.0",
    "ai_engine": "LLM_Orchestrator",
    "deployment": "Edge_Native"
  },
  "workflow": [
    "knowledge_extraction",
    "standardization",
    "automation_loop"
  ],
  "status": "scaling_optimized"
}`}
              </pre>
              
              <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Cpu className="text-emerald-500 w-5 h-5" />
                  </div>
                  <span className="text-white font-bold tracking-tight">VayFlow Core</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                  Live System
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
