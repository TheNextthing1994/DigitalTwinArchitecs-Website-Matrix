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
    <section id="methodology" className="py-32 bg-slate-950 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter leading-[1.1]">
              {t.methodology.title} <br />
              <span className="text-emerald-500">{t.methodology.highlight}</span>
            </h2>
            
            <p className="text-slate-400 mb-16 leading-relaxed max-w-xl text-lg">
              {t.methodology.subtitle}
            </p>

            <div className="space-y-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                    <step.icon className="text-emerald-500 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-1 tracking-tight">{step.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full opacity-50" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl bg-[#0B1120] border border-slate-800 shadow-2xl overflow-hidden"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50 bg-slate-900/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[11px] font-mono text-slate-500 tracking-wider">digital_twin_core.config.json</div>
              </div>
              
              {/* Code Content */}
              <div className="p-8 font-mono text-sm leading-relaxed">
                <div className="text-emerald-400/90">
                  <span className="text-slate-400">{'{'}</span>
                  <div className="pl-4">
                    <span className="text-emerald-400">"project"</span>: <span className="text-emerald-300">"DigitalTwin_Core"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-emerald-400">"identity"</span>: <span className="text-slate-400">{'{'}</span>
                    <div className="pl-4">
                      <span className="text-emerald-400">"source"</span>: <span className="text-emerald-300">"Expert_Knowledge"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-emerald-400">"mode"</span>: <span className="text-emerald-300">"Autonomous_Action"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-emerald-400">"goal"</span>: <span className="text-emerald-300">"Freedom_&_Simplicity"</span>
                    </div>
                    <span className="text-slate-400">{'}'}</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-emerald-400">"capabilities"</span>: <span className="text-slate-400">{'['}</span>
                    <div className="pl-4 text-emerald-300">"24/7_Operation",</div>
                    <div className="pl-4 text-emerald-300">"Decision_Making",</div>
                    <div className="pl-4 text-emerald-300">"Workflow_Automation"</div>
                    <span className="text-slate-400">{']'}</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-emerald-400">"status"</span>: <span className="text-emerald-300">"active_delegation"</span>
                  </div>
                  <span className="text-slate-400">{'}'}</span>
                </div>
              </div>
              
              {/* Terminal Footer */}
              <div className="px-8 py-6 border-t border-slate-800/50 bg-slate-900/20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Cpu className="text-emerald-500 w-5 h-5" />
                  </div>
                  <span className="text-white font-bold tracking-tight text-sm">Twin Engine v4.0</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
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
