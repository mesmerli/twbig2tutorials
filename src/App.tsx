/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RulesSection } from './components/RulesSection';
import { ComboAnalyzer } from './components/ComboAnalyzer';
import { QuizZone } from './components/QuizZone';
import { PracticeGame } from './components/PracticeGame';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { HelpCircle, Award, Layers, Flame, BookOpen, Star } from 'lucide-react';

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const [activeSegment, setActiveSegment] = useState<'rules' | 'analyzer' | 'quiz' | 'practice'>('rules');
  const { language, setLanguage, t } = useLanguage();

  const renderContent = () => {
    switch (activeSegment) {
      case 'rules':
        return <RulesSection />;
      case 'analyzer':
        return <ComboAnalyzer />;
      case 'quiz':
        return <QuizZone />;
      case 'practice':
        return <PracticeGame />;
    }
  };

  return (
    <div className="min-h-screen bg-forest text-cream font-sans relative" id="applet-root">
      {/* Decorative gold ambient edge */}
      <div className="h-1.5 bg-gold w-full" />

      {/* Floating Header Banner */}
      <header className="bg-forest-dark border-b border-[#ffffff15] shadow-xl py-5 md:py-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* Logo Name & Icon */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="w-11 h-11 bg-gold text-forest rounded-xl flex items-center justify-center font-serif font-black text-xl shadow-lg rotate-2 shrink-0 select-none">
              ♣2
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-serif font-black text-gold tracking-tight">{t.title}</h1>
                <span className="text-[10px] bg-gold/20 text-gold font-bold border border-gold/30 px-2 py-0.5 rounded-full select-none whitespace-nowrap">
                  {t.badge}
                </span>
              </div>
              <p className="text-xs text-cream/70 font-light tracking-wide">{t.subtitle}</p>
            </div>
          </div>

          {/* Master tabs + Language Switcher on right */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
            {/* Core Master Sections Tab List (Header Level) */}
            <nav className="flex bg-forest p-1 rounded-xl border border-[#ffffff15]" id="master-nav">
              <button
                onClick={() => setActiveSegment('rules')}
                className={`text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-lg cursor-pointer transition-all ${
                  activeSegment === 'rules'
                    ? 'bg-gold text-forest shadow-md font-black'
                    : 'text-cream/60 hover:text-cream hover:bg-[#ffffff08]'
                }`}
              >
                {t.navIntro}
              </button>
              <button
                onClick={() => setActiveSegment('analyzer')}
                className={`text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-lg cursor-pointer transition-all ${
                  activeSegment === 'analyzer'
                    ? 'bg-gold text-forest shadow-md font-black'
                    : 'text-cream/60 hover:text-cream hover:bg-[#ffffff08]'
                }`}
              >
                {t.navAnalyzer}
              </button>
              <button
                onClick={() => setActiveSegment('quiz')}
                className={`text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-lg cursor-pointer transition-all ${
                  activeSegment === 'quiz'
                    ? 'bg-gold text-forest shadow-md font-black'
                    : 'text-cream/60 hover:text-cream hover:bg-[#ffffff08]'
                }`}
              >
                {t.navQuiz}
              </button>
              <button
                onClick={() => setActiveSegment('practice')}
                className={`text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-lg cursor-pointer transition-all ${
                  activeSegment === 'practice'
                    ? 'bg-gold text-forest shadow-md font-black'
                    : 'text-cream/60 hover:text-cream hover:bg-[#ffffff08]'
                }`}
              >
                {t.navPractice}
              </button>
            </nav>

            {/* Language Selection Bar (Styled beautifully) */}
            <div className="flex bg-forest p-1 rounded-xl border border-[#ffffff15]" id="lang-switcher">
              <button
                type="button"
                onClick={() => setLanguage('zh')}
                className={`text-xs py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer ${
                  language === 'zh'
                    ? 'bg-gold text-forest font-black shadow-md'
                    : 'text-cream/60 hover:text-cream hover:bg-[#ffffff08]'
                }`}
              >
                繁中
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`text-xs py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-gold text-forest font-black shadow-md'
                    : 'text-cream/60 hover:text-cream hover:bg-[#ffffff08]'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Visual Arena Grid container */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Interactive Step-by-Step Intro card inside Rules */}
        {activeSegment === 'rules' && (
          <div className="bg-gradient-to-br from-forest-dark to-[#0F172A] rounded-3xl p-6 md:p-8 text-cream shadow-2xl relative overflow-hidden border border-[#ffffff10]">
            <div className="absolute top-0 right-0 p-8 text-[120px] font-black font-sans leading-none text-gold/10 rotate-12 select-none pointer-events-none">
              ♠2
            </div>
            
            <div className="relative z-10 max-w-xl space-y-4">
              <span className="text-[10px] bg-gold/20 text-gold border border-gold/30 font-black tracking-widest uppercase px-3 py-1 rounded-full">
                {t.welcomeLabel}
              </span>
              <h2 className="text-3xl md:text-4.5xl font-serif font-black text-gold italic leading-tight tracking-tight">
                {t.welcomeTitle}
              </h2>
              <p className="text-sm text-cream/90 leading-relaxed font-light">
                {t.welcomeIntro}
              </p>
              
              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  onClick={() => setActiveSegment('analyzer')}
                  className="bg-gold hover:bg-yellow-400 text-forest font-black text-xs px-4 py-3 rounded-lg active:scale-95 transition-all shadow cursor-pointer flex items-center gap-1.5 border-none outline-none"
                >
                  <Layers className="w-4 h-4" /> {t.btnExperience}
                </button>
                <button
                  onClick={() => setActiveSegment('practice')}
                  className="border border-gold/70 hover:bg-gold/10 text-gold font-bold text-xs px-4 py-3 rounded-lg active:scale-95 transition-all shadow cursor-pointer flex items-center gap-1.5"
                >
                  <Flame className="w-4 h-4 text-gold animate-pulse" /> {t.btnBattle}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic section injection */}
        <section id="academic-panel" className="transition-all duration-300">
          {renderContent()}
        </section>

        {/* Informative Footer Credits */}
        <footer className="text-center py-10 border-t border-[#ffffff10] text-xs text-cream/40 space-y-2">
          <p className="font-semibold text-cream/60">{t.footerTitle}</p>
          <p className="italic">{t.footerSub}</p>
        </footer>
      </main>
    </div>
  );
}
