import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { chapterTitles } from '../data/content';

interface ChapterFooterNavProps {
  currentChapter: number;
  onPrev: () => void;
  onNext: () => void;
  onRestart: () => void;
  nextButtonCustomText?: string;
}

export const ChapterFooterNav: React.FC<ChapterFooterNavProps> = ({
  currentChapter,
  onPrev,
  onNext,
  onRestart,
  nextButtonCustomText,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 mt-8 border-t border-[#E8A3B5]/30">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        {/* Previous Button */}
        {currentChapter > 1 ? (
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E8A3B5]/60 bg-white/90 hover:bg-[#FCE7EF] text-[#49343B] font-medium text-sm transition-all shadow-xs"
          >
            <ArrowLeft className="h-4 w-4 text-[#A61B3C]" />
            <span>পূর্ববর্তী অধ্যায়: {chapterTitles[currentChapter - 1].shortTitle}</span>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* Next or Restart Button */}
        {currentChapter < 7 ? (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A61B3C] hover:bg-[#8B1430] text-white font-medium text-sm sm:text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>{nextButtonCustomText || `পরবর্তী অধ্যায়: ${chapterTitles[currentChapter + 1].shortTitle}`}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A61B3C] hover:bg-[#8B1430] text-white font-medium text-sm sm:text-base transition-all shadow-md hover:shadow-lg"
          >
            <RotateCcw className="h-4 w-4" />
            <span>প্রথম চিঠি থেকে আবার শুরু করো</span>
          </button>
        )}
      </div>
    </div>
  );
};
