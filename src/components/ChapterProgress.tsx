import React from 'react';
import { chapterTitles } from '../data/content';
import { Check } from 'lucide-react';

interface ChapterProgressProps {
  currentChapter: number;
}

export const ChapterProgress: React.FC<ChapterProgressProps> = ({
  currentChapter,
}) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const toBengaliNumber = (num: number): string => {
    return num.toString().replace(/[0-9]/g, (d) => bengaliDigits[parseInt(d, 10)] || d);
  };
  const chapterBengaliIndex = ['১', '২', '৩', '৪', '৫', '৬', '৭'];
  const progressPercent = Math.round((currentChapter / 7) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-2">
      {/* Chapter Title & Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3 text-center sm:text-left">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A61B3C]">
            অধ্যায় {chapterBengaliIndex[currentChapter - 1]} / ৭
          </span>
          <h2 className="text-base sm:text-xl font-bold text-[#49343B] font-serif-bn mt-0.5">
            {chapterTitles[currentChapter].title}
          </h2>
        </div>
        <div className="text-xs text-[#49343B]/60 sm:text-right hidden sm:block">
          <span>অগ্রগতি: {toBengaliNumber(progressPercent)}%</span>
        </div>
      </div>

      {/* Progress Dots / Steps (Pure visual indicator, skipping disabled) */}
      <div className="relative">
        {/* Background track */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-[#E8A3B5]/30 z-0" />
        
        {/* Active track filled */}
        <div
          className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-[#A61B3C] transition-all duration-500 z-0"
          style={{ width: `${((currentChapter - 1) / 6) * 100}%` }}
        />

        {/* Step dots */}
        <div className="relative z-10 flex justify-between items-center">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const isCompleted = num < currentChapter;
            const isCurrent = num === currentChapter;
            return (
              <div
                key={num}
                title={`${chapterBengaliIndex[num - 1]}ম অধ্যায়`}
                className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-xs font-semibold select-none transition-all ${
                  isCurrent
                    ? 'bg-[#A61B3C] text-white shadow-md ring-4 ring-[#FCE7EF] scale-110'
                    : isCompleted
                    ? 'bg-[#E8A3B5] text-white'
                    : 'bg-[#FFFDF9] border border-[#E8A3B5]/60 text-[#49343B]/50'
                }`}
              >
                {isCompleted ? <Check className="h-3.5 w-3.5 stroke-[2.5]" /> : chapterBengaliIndex[num - 1]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
