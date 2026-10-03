/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { ChapterProgress } from './components/ChapterProgress';
import { PetalsCanvas } from './components/PetalsCanvas';
import { Chapter1Envelope } from './components/chapters/Chapter1Envelope';
import { Chapter2Timeline } from './components/chapters/Chapter2Timeline';
import { Chapter3Apology } from './components/chapters/Chapter3Apology';
import { Chapter4Scrapbook } from './components/chapters/Chapter4Scrapbook';
import { Chapter5WhySpecial } from './components/chapters/Chapter5WhySpecial';
import { Chapter6Promises } from './components/chapters/Chapter6Promises';
import { Chapter7FinalLetter } from './components/chapters/Chapter7FinalLetter';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { romanticAudio } from './utils/audio';
import {
  getReducedMotionSetting,
  saveReducedMotionSetting,
  resetAllPersonalData,
} from './utils/storage';

export default function App() {
  // Sync chapter with hash/URL (#chapter-1 to #chapter-7)
  const getChapterFromLocation = (): number => {
    try {
      const hash = window.location.hash;
      const match = hash.match(/chapter-(\d)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num >= 1 && num <= 7) return num;
      }
      const pathMatch = window.location.pathname.match(/chapter\/(\d)/);
      if (pathMatch) {
        const num = parseInt(pathMatch[1], 10);
        if (num >= 1 && num <= 7) return num;
      }
    } catch (e) {
      // fallback
    }
    return 1;
  };

  const [currentChapter, setCurrentChapter] = useState<number>(getChapterFromLocation);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(getReducedMotionSetting);
  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);

  // Handle browser back and forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentChapter(getChapterFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateToChapter = (chapterNum: number) => {
    if (chapterNum < 1) chapterNum = 1;
    if (chapterNum > 7) chapterNum = 7;
    setCurrentChapter(chapterNum);
    window.location.hash = `chapter-${chapterNum}`;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const handleToggleMusic = () => {
    const playing = romanticAudio.toggle();
    setIsPlayingMusic(playing);
  };

  const handleToggleReducedMotion = () => {
    const next = !reducedMotion;
    setReducedMotion(next);
    saveReducedMotionSetting(next);
  };

  const handleConfirmReset = () => {
    resetAllPersonalData();
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen bg-[#FFF8F0] text-[#49343B] font-sans-bn flex flex-col selection:bg-[#E8A3B5]/30 selection:text-[#A61B3C]">
      {/* Background Petals & Hearts Animation Canvas */}
      <PetalsCanvas reducedMotion={reducedMotion} />

      {/* Top Bar Navigation (Skipping removed; External website button added) */}
      <HeaderNav
        currentChapter={currentChapter}
        onHomeClick={() => navigateToChapter(1)}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
        onOpenResetModal={() => setResetModalOpen(true)}
      />

      {/* Progress Bar (Sequential indicator only, clicking to skip removed) */}
      <ChapterProgress currentChapter={currentChapter} />

      {/* Main Chapter Content */}
      <main className="relative z-10 flex-1">
        {currentChapter === 1 && (
          <Chapter1Envelope
            onNextChapter={() => navigateToChapter(2)}
            reducedMotion={reducedMotion}
          />
        )}

        {currentChapter === 2 && (
          <Chapter2Timeline
            onPrev={() => navigateToChapter(1)}
            onNext={() => navigateToChapter(3)}
          />
        )}

        {currentChapter === 3 && (
          <Chapter3Apology
            onPrev={() => navigateToChapter(2)}
            onNext={() => navigateToChapter(4)}
          />
        )}

        {currentChapter === 4 && (
          <Chapter4Scrapbook
            onPrev={() => navigateToChapter(3)}
            onNext={() => navigateToChapter(5)}
          />
        )}

        {currentChapter === 5 && (
          <Chapter5WhySpecial
            onPrev={() => navigateToChapter(4)}
            onNext={() => navigateToChapter(6)}
          />
        )}

        {currentChapter === 6 && (
          <Chapter6Promises
            onPrev={() => navigateToChapter(5)}
            onNext={() => navigateToChapter(7)}
          />
        )}

        {currentChapter === 7 && (
          <Chapter7FinalLetter
            onRestart={() => navigateToChapter(1)}
            reducedMotion={reducedMotion}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="relative z-10 py-6 border-t border-[#E8A3B5]/30 bg-[#FFFDF9]/80 text-center font-sans-bn px-4">
        <p className="text-xs text-[#49343B]/60">
          প্রিয়ার কাছে বাপ্পার সাতটি চিঠি · ভালোবাসার ও শ্রদ্ধার সাথে নিবেদিত
        </p>
      </footer>

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
