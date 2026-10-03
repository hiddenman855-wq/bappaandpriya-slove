import React from 'react';
import { commitments } from '../../data/content';
import { ChapterFooterNav } from '../ChapterFooterNav';
import { Heart, Compass, CheckCircle2 } from 'lucide-react';

interface Chapter6PromisesProps {
  onPrev: () => void;
  onNext: () => void;
}

export const Chapter6Promises: React.FC<Chapter6PromisesProps> = ({
  onPrev,
  onNext,
}) => {
  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Chapter Kicker & Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 text-[#A61B3C] text-xs font-semibold uppercase tracking-wider">
          <Compass className="h-3.5 w-3.5" />
          <span>ষষ্ঠ চিঠি · আগামীর অঙ্গীকার</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#49343B] font-serif-bn leading-snug">
          আমি শুধু প্রতিশ্রুতি দিতে চাই না, শিখতেও চাই।
        </h1>
        <p className="text-sm sm:text-base text-[#49343B]/80 max-w-xl mx-auto leading-relaxed font-sans-bn">
          মুখের মিষ্টি কথার চেয়ে আচরণের পরিবর্তন বেশি গুরুত্বপূর্ণ। এখানে রইল আগামীর জন্য আমার আন্তরিক প্রচেষ্টাগুলো।
        </p>
      </div>

      {/* 5 Commitment Cards */}
      <div className="space-y-4">
        {commitments.map((c) => (
          <div
            key={c.id}
            className="group rounded-2xl p-5 sm:p-6 bg-[#FFFDF9] border border-[#E8A3B5]/40 shadow-xs hover:border-[#A61B3C]/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FCE7EF] text-[#A61B3C] mt-0.5 group-hover:scale-105 transition-transform">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#A61B3C]">
                    অঙ্গীকার {c.orderNumber}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#49343B] font-serif-bn">
                    {c.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#49343B]/90 font-sans-bn leading-relaxed">
                  {c.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sincere Reassurance Quote at Bottom */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#FFF5F8] via-[#FFFDF9] to-[#FFF5F8] border border-[#E8A3B5]/50 text-center space-y-2">
        <Heart className="h-5 w-5 text-[#A61B3C] mx-auto fill-[#FCE7EF]" />
        <p className="text-base sm:text-lg font-serif-bn font-semibold text-[#A61B3C] leading-relaxed">
          “বিশ্বাস ফিরে পেতে সময় লাগতে পারে। আমি সেই সময় এবং তোমার অনুভূতির মূল্য দিতে চাই।”
        </p>
        <p className="text-xs sm:text-sm text-[#49343B]/70 font-sans-bn">
          কোনো কিছু জবরদস্তি করে ফিরে পাওয়া যায় না, আমি শান্তভাবে ধৈর্যের সাথে অপেক্ষা করতে প্রস্তুত।
        </p>
      </div>

      {/* Navigation to Chapter 7 */}
      <ChapterFooterNav
        currentChapter={6}
        onPrev={onPrev}
        onNext={onNext}
        onRestart={() => {}}
        nextButtonCustomText="শেষ চিঠিটা পড়বে? →"
      />
    </div>
  );
};
