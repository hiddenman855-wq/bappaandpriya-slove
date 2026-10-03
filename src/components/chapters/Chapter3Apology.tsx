import React, { useState } from 'react';
import { ApologyData } from '../../types';
import { getStoredApology, saveStoredApology } from '../../utils/storage';
import { ChapterFooterNav } from '../ChapterFooterNav';
import { HeartHandshake, Check, Edit2, ShieldAlert } from 'lucide-react';

interface Chapter3ApologyProps {
  onPrev: () => void;
  onNext: () => void;
}

export const Chapter3Apology: React.FC<Chapter3ApologyProps> = ({
  onPrev,
  onNext,
}) => {
  const [apologyData, setApologyData] = useState<ApologyData>(getStoredApology);
  const [isEditingMistake, setIsEditingMistake] = useState(false);
  const [isEditingLesson, setIsEditingLesson] = useState(false);
  const [mistakeInput, setMistakeInput] = useState(apologyData.mistakeText);
  const [lessonInput, setLessonInput] = useState(apologyData.lessonLearnedText);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveMistake = () => {
    const updated = { ...apologyData, mistakeText: mistakeInput.trim() };
    setApologyData(updated);
    saveStoredApology(updated);
    setIsEditingMistake(false);
    showToast('ভুলের বিবরণ সংরক্ষিত হয়েছে');
  };

  const handleSaveLesson = () => {
    const updated = { ...apologyData, lessonLearnedText: lessonInput.trim() };
    setApologyData(updated);
    saveStoredApology(updated);
    setIsEditingLesson(false);
    showToast('শিক্ষার কথা সংরক্ষিত হয়েছে');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#A61B3C] text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in duration-300">
          <Check className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Chapter Kicker & Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 text-[#A61B3C] text-xs font-semibold uppercase tracking-wider">
          <HeartHandshake className="h-3.5 w-3.5" />
          <span>তৃতীয় চিঠি · আমার ভুল, আমার ক্ষমা চাওয়া</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#49343B] font-serif-bn leading-snug">
          শুধু সরি বললেই সব ঠিক হয় না, আমি সেটা বুঝি।
        </h1>
        <p className="text-sm sm:text-base text-[#49343B]/80 max-w-xl mx-auto leading-relaxed font-sans-bn">
          ক্ষমা চাওয়া কোনো আনুষ্ঠানিকতা নয়; এটি নিজের ভুল উপলব্ধি করা এবং অপরকে দেওয়া কষ্টের গভীরতা স্বীকার করার অঙ্গীকার।
        </p>
      </div>

      {/* Elegant Letter Container */}
      <div className="rounded-2xl p-6 sm:p-10 bg-letter-paper border border-[#E8A3B5]/50 shadow-md space-y-8">
        {/* Heartfelt Letter Content */}
        <div className="space-y-5 text-[#49343B] font-serif-bn text-base sm:text-lg leading-relaxed border-b border-[#E8A3B5]/30 pb-8">
          <p className="font-bold text-[#A61B3C] text-xl">
            প্রিয়া,
          </p>
          <p>
            আমার কোনো কথা বা আচরণে যদি তোমার কষ্ট হয়ে থাকে, আমি সত্যিই দুঃখিত। তোমার কষ্টকে ছোট করে দেখতে চাই না। শুধু সরি বললেই সবকিছু আগের মতো হয়ে যাবে, এমনটা আমি ভাবি না।
          </p>
          <p>
            সম্পর্কে ভুল বোঝাবুঝি বা অসাবধানতা ঘটা অস্বাভাবিক নয়, কিন্তু নিজের দোষ ঢাকতে অজুহাত খোঁজা অন্যায়। আমি কোনো অজুহাত দিতে চাই না। তোমার অভিমান, তোমার নীরবতা আর তোমার ব্যথার প্রতি আমার পূর্ণ শ্রদ্ধা আছে।
          </p>
          <p>
            আমি চাই তোমার কথা মন দিয়ে শুনতে, নিজের ভুল বুঝতে এবং আচরণের মাধ্যমে পরিবর্তন দেখাতে। তুমি যখন স্বচ্ছন্দ বোধ করবে, তখন কথা বলতে চাইলে আমি শুনব। তোমার সিদ্ধান্তকে সবসময় আমি মর্যাদা দেব।
          </p>
        </div>

        {/* Section 1: The Mistake (Editable) */}
        <div className="rounded-xl p-5 bg-[#FFF8F0] border border-[#E8A3B5]/40 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-[#A61B3C] font-serif-bn flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              <span>আমি যে ভুলটার জন্য ক্ষমা চাইছি:</span>
            </h3>
            {!isEditingMistake && (
              <button
                onClick={() => {
                  setMistakeInput(apologyData.mistakeText);
                  setIsEditingMistake(true);
                }}
                className="flex items-center gap-1 text-xs text-[#A61B3C] hover:text-[#8B1430] px-2 py-1 rounded-md hover:bg-[#FCE7EF] transition-colors"
              >
                <Edit2 className="h-3 w-3" />
                <span>সম্পাদনা</span>
              </button>
            )}
          </div>

          {isEditingMistake ? (
            <div className="space-y-3">
              <textarea
                rows={4}
                value={mistakeInput}
                onChange={(e) => setMistakeInput(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#E8A3B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A61B3C]/30 text-[#49343B] leading-relaxed"
                placeholder="নিজের ভুলটি স্পষ্টভাবে লিখুন..."
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveMistake}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A61B3C] text-white text-xs font-medium hover:bg-[#8B1430]"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>সংরক্ষণ করুন</span>
                </button>
                <button
                  onClick={() => setIsEditingMistake(false)}
                  className="px-3 py-1.5 rounded-lg border border-[#E8A3B5]/60 text-xs text-[#49343B] hover:bg-slate-50"
                >
                  বাতিল
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm sm:text-base text-[#49343B] font-sans-bn leading-relaxed italic bg-white/60 p-3 rounded-lg border border-[#E8A3B5]/20">
              "{apologyData.mistakeText}"
            </p>
          )}
        </div>

        {/* Section 2: Lesson Learned (Editable) */}
        <div className="rounded-xl p-5 bg-[#FFF8F0] border border-[#E8A3B5]/40 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-[#A61B3C] font-serif-bn flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>এই ভুল থেকে আমি যা শিখেছি:</span>
            </h3>
            {!isEditingLesson && (
              <button
                onClick={() => {
                  setLessonInput(apologyData.lessonLearnedText);
                  setIsEditingLesson(true);
                }}
                className="flex items-center gap-1 text-xs text-[#A61B3C] hover:text-[#8B1430] px-2 py-1 rounded-md hover:bg-[#FCE7EF] transition-colors"
              >
                <Edit2 className="h-3 w-3" />
                <span>সম্পাদনা</span>
              </button>
            )}
          </div>

          {isEditingLesson ? (
            <div className="space-y-3">
              <textarea
                rows={4}
                value={lessonInput}
                onChange={(e) => setLessonInput(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#E8A3B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A61B3C]/30 text-[#49343B] leading-relaxed"
                placeholder="এই ভুল থেকে আপনি কী শিক্ষা নিয়েছেন..."
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveLesson}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A61B3C] text-white text-xs font-medium hover:bg-[#8B1430]"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>সংরক্ষণ করুন</span>
                </button>
                <button
                  onClick={() => setIsEditingLesson(false)}
                  className="px-3 py-1.5 rounded-lg border border-[#E8A3B5]/60 text-xs text-[#49343B] hover:bg-slate-50"
                >
                  বাতিল
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm sm:text-base text-[#49343B] font-sans-bn leading-relaxed italic bg-white/60 p-3 rounded-lg border border-[#E8A3B5]/20">
              "{apologyData.lessonLearnedText}"
            </p>
          )}
        </div>

        {/* Quiet Reassurance Note */}
        <div className="pt-2 text-center text-xs text-[#49343B]/70 font-sans-bn leading-normal">
          🔒 উল্লেখিত বক্তব্য সম্পূর্ণ ব্যক্তিগত এবং শুধুমাত্র আপনার বর্তমান ব্রাউজারে সংরক্ষিত থাকবে। কোনো সার্ভারে তথ্য পাঠানো হয় না।
        </div>
      </div>

      {/* Navigation to Chapter 4 */}
      <ChapterFooterNav
        currentChapter={3}
        onPrev={onPrev}
        onNext={onNext}
        onRestart={() => {}}
        nextButtonCustomText="আমাদের স্মৃতিগুলো দেখি →"
      />
    </div>
  );
};
