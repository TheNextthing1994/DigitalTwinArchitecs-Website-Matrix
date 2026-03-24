import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScrollingTiles } from './components/ScrollingTiles';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { Methodology } from './components/Methodology';
import { Footer } from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const [prefilledMessage, setPrefilledMessage] = useState('');

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-700 selection:text-white">
        <Header />
        <main>
          <Hero onTileClick={setPrefilledMessage} />
          <ScrollingTiles onTileClick={setPrefilledMessage} />
          <CaseStudies />
          <Testimonials />
          <Methodology />
        </main>
        <Footer prefilledMessage={prefilledMessage} />
      </div>
    </LanguageProvider>
  );
}
