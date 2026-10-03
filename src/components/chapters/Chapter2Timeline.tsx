import React, { useState } from 'react';
import { TimelineMilestone } from '../../types';
import { getStoredTimeline, saveStoredTimeline } from '../../utils/storage';
import { ChapterFooterNav } from '../ChapterFooterNav';
import { Edit3, Check, Camera, Sparkles, Heart } from 'lucide-react';

interface Chapter2TimelineProps {
  onPrev: () => void;
  onNext: () => void;
}

export const Chapter2Timeline: React.FC<Chapter2TimelineProps> = ({
  onPrev,
  onNext,
}) => {
  const [milestones, setMilestones] = useState<TimelineMilestone[]>(getStoredTimeline);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempText, setTempText] = useState('');
  const [tempDate, setTempDate] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const startEditing = (m: TimelineMilestone) => {
    setEditingId(m.id);
    setTempText(m.userDescription || m.defaultDescription);
    setTempDate(m.datePlaceholder || '');
  };

  const saveEditing = (id: string) => {
    const updated = milestones.map((m) => {
      if (m.id === id) {
        return {
          ...m,
          userDescription: tempText.trim(),
          datePlaceholder: tempDate.trim(),
        };
      }
      return m;
    });
    setMilestones(updated);
    saveStoredTimeline(updated);
    setEditingId(null);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size < 3MB
    if (file.size > 3 * 1024 * 1024) {
      alert('ছবির আকার ৩ মেগাবাইটের কম হতে হবে।');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const updated = milestones.map((m) => {
          if (m.id === id) {
            return { ...m, image: reader.result as string };
          }
          return m;
        });
        setMilestones(updated);
        saveStoredTimeline(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Chapter Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-1.5 text-[#A61B3C] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          <span>দ্বিতীয় চিঠি · আমাদের গল্প</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#49343B] font-serif-bn leading-snug">
          কিছু মানুষ জীবনে এসে অনেক মুহূর্তকে বিশেষ করে দেয়।
        </h1>
        <p className="text-sm sm:text-base text-[#49343B]/80 max-w-2xl mx-auto leading-relaxed font-sans-bn">
          আমাদের গল্পের প্রতিটি ছোট্ট মুহূর্তের মধ্যেও লুকিয়ে থাকে কিছু অনুভূতি, যা সহজে ভুলে যাওয়া যায় না।
        </p>
      </div>

      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#A61B3C] text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <Check className="h-4 w-4" />
          <span>স্মৃতির বিবরণ ব্রাউজারে সংরক্ষিত হয়েছে</span>
        </div>
      )}

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#E8A3B5]/40 space-y-12 sm:space-y-14 ml-3 sm:ml-6">
        {milestones.map((m, idx) => {
          const isEditing = editingId === m.id;
          const displayContent = m.userDescription || m.defaultDescription;

          return (
            <div key={m.id} className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#FFF8F0] border-2 border-[#A61B3C] shadow-sm">
                <Heart className="h-3.5 w-3.5 text-[#A61B3C] fill-[#FCE7EF]" />
              </div>

              {/* Milestone Card */}
              <div className="rounded-2xl p-5 sm:p-7 bg-[#FFFDF9] border border-[#E8A3B5]/40 shadow-xs hover:border-[#E8A3B5] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8A3B5]/20 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FCE7EF] text-[#A61B3C] text-xs font-bold">
                      {m.orderNumber}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#49343B] font-serif-bn">
                      {m.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#49343B]/60 font-sans-bn italic">
                      {m.datePlaceholder || 'বিশেষ মুহূর্ত'}
                    </span>
                    {!isEditing && (
                      <button
                        onClick={() => startEditing(m)}
                        className="flex items-center gap-1 text-xs text-[#A61B3C] hover:text-[#8B1430] px-2 py-1 rounded-md hover:bg-[#FCE7EF] transition-colors"
                        title="ব্যক্তিগত স্মৃতি যোগ বা পরিবর্তন করুন"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>সম্পাদনা</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Optional Media Framing */}
                {m.image && (
                  <div className="relative mb-5 overflow-hidden rounded-xl border border-[#E8A3B5]/30 max-h-64 sm:max-h-72 w-full group/img bg-[#FFF5F8]">
                    <img
                      src={m.image}
                      alt={m.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 group-hover/img:scale-102"
                    />
                    <label className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs cursor-pointer backdrop-blur-xs transition-colors">
                      <Camera className="h-3.5 w-3.5" />
                      <span>ছবি পরিবর্তন</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(m.id, e)}
                      />
                    </label>
                  </div>
                )}

                {/* Content Area: View or Edit */}
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#A61B3C] mb-1">
                        তারিখ বা স্থান (ঐচ্ছিক):
                      </label>
                      <input
                        type="text"
                        value={tempDate}
                        onChange={(e) => setTempDate(e.target.value)}
                        placeholder="যেমন: সেই মিষ্টি বৃষ্টিমুখর দিন..."
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[#E8A3B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A61B3C]/30 text-[#49343B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A61B3C] mb-1">
                        তোমার অনুভূতি বা স্মৃতি:
                      </label>
                      <textarea
                        rows={4}
                        value={tempText}
                        onChange={(e) => setTempText(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[#E8A3B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A61B3C]/30 text-[#49343B] leading-relaxed"
                        placeholder="এখানে তোমার নিজস্ব অনুভূতির কথা লেখো..."
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => saveEditing(m.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#A61B3C] text-white text-xs font-medium hover:bg-[#8B1430] transition-colors"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>সংরক্ষণ করুন</span>
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-2 rounded-lg border border-[#E8A3B5]/60 text-xs text-[#49343B] hover:bg-slate-50 transition-colors"
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#49343B] font-serif-bn text-base sm:text-lg leading-relaxed">
                    {displayContent}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center text-xs text-[#49343B]/60 font-sans-bn">
        * এই পৃষ্ঠার যেকোনা স্মৃতি আপনি ইচ্ছেমতো সম্পাদনা করতে পারেন, যা সম্পূর্ণভাবে আপনার ব্রাউজারে সংরক্ষিত থাকবে।
      </div>

      {/* Navigation to Chapter 3 */}
      <ChapterFooterNav
        currentChapter={2}
        onPrev={onPrev}
        onNext={onNext}
        onRestart={() => {}}
        nextButtonCustomText="এবার আমার মনের কথাগুলো শোনো →"
      />
    </div>
  );
};
