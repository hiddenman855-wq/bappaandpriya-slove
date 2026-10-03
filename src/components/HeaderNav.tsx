import React from 'react';
import { Volume2, VolumeX, Sparkles, RotateCcw, Heart } from 'lucide-react';
import { chapterTitles } from '../data/content';

interface HeaderNavProps {
  currentChapter: number;
  onHomeClick: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenResetModal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentChapter,
  onHomeClick,
  isPlayingMusic,
  onToggleMusic,
  reducedMotion,
  onToggleReducedMotion,
  onOpenResetModal,
}) => {
  const chapterBengaliIndex = ['১', '২', '৩', '৪', '৫', '৬', '৭'];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#E8A3B5]/30 bg-[#FFF8F0]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Wordmark */}
        <button
          onClick={onHomeClick}
          className="text-left text-base sm:text-lg font-semibold tracking-tight text-[#A61B3C] transition-opacity hover:opacity-80 focus:outline-none flex items-center gap-2"
        >
          <Heart className="h-4 w-4 fill-[#A61B3C]" />
          <span>প্রিয়ার কাছে বাপ্পার সাতটি চিঠি</span>
        </button>

        {/* Zone 2: Current Chapter Status (Sequential indicator, no skipping) */}
        <div className="hidden md:flex items-center gap-2 text-xs sm:text-sm font-medium text-[#49343B]/80 bg-[#FCE7EF]/50 px-3.5 py-1.5 rounded-full border border-[#E8A3B5]/30">
          <span className="text-[#A61B3C] font-semibold">
            {chapterBengaliIndex[currentChapter - 1]}ম অধ্যায়:
          </span>
          <span className="truncate max-w-[200px]">{chapterTitles[currentChapter].shortTitle}</span>
        </div>

        {/* Zone 3: Actions (Music Toggle + Settings) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Music Button */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'সুর বন্ধ করো' : 'সুর চালু করো'}
            aria-label={isPlayingMusic ? 'সুর বন্ধ করো' : 'সুর চালু করো'}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-[#E8A3B5]/50 bg-white/80 hover:bg-[#FCE7EF] text-[#49343B] transition-colors whitespace-nowrap shadow-xs"
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="h-4 w-4 text-[#A61B3C] animate-pulse" />
                <span className="hidden sm:inline">সুর বন্ধ করো</span>
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4 text-[#49343B]/60" />
                <span className="hidden sm:inline">সুর চালু করো</span>
              </>
            )}
          </button>

          {/* Reduced Motion Toggle Button */}
          <button
            onClick={onToggleReducedMotion}
            title={reducedMotion ? 'অ্যানিমেশন স্বাভাবিক করো' : 'অ্যানিমেশন কমাও'}
            aria-label={reducedMotion ? 'অ্যানিমেশন স্বাভাবিক করো' : 'অ্যানিমেশন কমাও'}
            className={`p-2 rounded-lg border border-[#E8A3B5]/50 transition-colors text-xs ${
              reducedMotion
                ? 'bg-[#E8A3B5]/30 text-[#A61B3C]'
                : 'bg-white/80 hover:bg-[#FCE7EF] text-[#49343B]'
            }`}
          >
            <Sparkles className="h-4 w-4" />
          </button>

          {/* Reset button */}
          <button
            onClick={onOpenResetModal}
            title="তথ্য পুনর্স্থাপন"
            aria-label="তথ্য পুনর্স্থাপন"
            className="p-2 rounded-lg border border-[#E8A3B5]/50 bg-white/80 hover:bg-[#FCE7EF] text-[#49343B] transition-colors text-xs"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
