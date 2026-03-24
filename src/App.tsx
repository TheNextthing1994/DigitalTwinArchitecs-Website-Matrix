import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScrollingTiles } from './components/ScrollingTiles';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { Methodology } from './components/Methodology';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LanguageProvider>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className={`min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-700 selection:text-white ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
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
