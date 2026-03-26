import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScrollingTiles } from './components/ScrollingTiles';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { Methodology } from './components/Methodology';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { LegalModal } from './components/LegalModal';
import { LanguageProvider } from './contexts/LanguageContext';

import { WarpSpeed } from './components/WarpSpeed';

export default function App() {
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'imprint' | 'privacy' }>({
    isOpen: false,
    type: 'imprint'
  });

  const openLegal = (type: 'imprint' | 'privacy') => {
    setLegalModal({ isOpen: true, type });
  };

  return (
    <LanguageProvider>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className={`min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-700 selection:text-white ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <Header onTileClick={setPrefilledMessage} />
        <main>
          <Hero onTileClick={setPrefilledMessage} />
          <ScrollingTiles onTileClick={setPrefilledMessage} />
          <CaseStudies />
          <Testimonials />
          
          <div className="relative">
            {/* Warp Speed background for Methodology and Footer */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <WarpSpeed />
            </div>
            <div className="relative z-10">
              <Methodology />
              <Footer 
                prefilledMessage={prefilledMessage} 
                onOpenLegal={openLegal}
              />
            </div>
          </div>
        </main>
        
        <LegalModal 
          isOpen={legalModal.isOpen} 
          type={legalModal.type} 
          onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))} 
        />
      </div>
    </LanguageProvider>
  );
}
