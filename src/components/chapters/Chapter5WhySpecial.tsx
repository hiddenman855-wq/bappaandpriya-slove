import React, { useState } from 'react';
import { SpecialQuality } from '../../types';
import { getStoredQualities, saveStoredQualities } from '../../utils/storage';
import { ChapterFooterNav } from '../ChapterFooterNav';
import { Smile, Sparkles, Heart, MessageCircle, Star, Edit3, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface Chapter5WhySpecialProps {
  onPrev: () => void;
  onNext: () => void;
}

export const Chapter5WhySpecial: React.FC<Chapter5WhySpecialProps> = ({
  onPrev,
  onNext,
}) => {
  const [qualities, setQualities] = useState<SpecialQuality[]>(getStoredQualities);
  const [expandedId, setExpandedId] = useState<string | null>(qualities[0].id);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'smile':
        return <Smile className="h-5 w-5 text-[#A61B3C]" />;
      case 'sparkles':
        return <Sparkles className="h-5 w-5 text-[#A61B3C]" />;
      case 'heart':
        return <Heart className="h-5 w-5 text-[#A61B3C]" />;
      case 'message':
        return <MessageCircle className="h-5 w-5 text-[#A61B3C]" />;
      case 'star':
      default:
        return <Star className="h-5 w-5 text-[#A61B3C]" />;
    }
  };

  const handleToggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const startEditNote = (q: SpecialQuality, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(q.id);
    setTempNote(q.userNote || '');
    setExpandedId(q.id);
  };

  const saveNote = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = qualities.map((q) => {
      if (q.id === id) {
        return { ...q, userNote: tempNote.trim() };
      }
      return q;
    });
    setQualities(updated);
    saveStoredQualities(updated);
    setEditingId(null);
    setToastMessage('ব্যক্তিগত ভাবনা সংরক্ষিত হয়েছে');
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
          <Heart className="h-3.5 w-3.5 fill-[#FCE7EF]" />
          <span>পঞ্চম চিঠি · তুমি বিশেষ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#49343B] font-serif-bn leading-snug">
          তুমি আমার কাছে এত বিশেষ কেন
        </h1>
        <p className="text-sm sm:text-base text-[#49343B]/80 max-w-xl mx-auto leading-relaxed font-sans-bn">
          মানুষ কাউকে ভালোবাসে তার অতিরঞ্জিত রূপ দেখে নয়, বরং তার সহজাত সুন্দর মন ও ব্যক্তিত্বকে ভালোবেসে।
        </p>
      </div>

      {/* 5 Quality Cards */}
      <div className="space-y-4">
        {qualities.map((q) => {
          const isExpanded = expandedId === q.id;
          const isEditing = editingId === q.id;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'bg-[#FFFDF9] border-[#E8A3B5] shadow-sm'
                  : 'bg-white/80 border-[#E8A3B5]/40 hover:border-[#E8A3B5] shadow-xs'
              }`}
            >
              {/* Header bar */}
              <div
                onClick={() => handleToggleExpand(q.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FCE7EF] border border-[#E8A3B5]/30">
                    {getIcon(q.iconType)}
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#A61B3C] uppercase tracking-wider">
                      বৈশিষ্ট্য {q.orderNumber}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#49343B] font-serif-bn">
                      {q.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isEditing && (
                    <button
                      onClick={(e) => startEditNote(q, e)}
                      title="ব্যক্তিগত নোট যুক্ত করুন"
                      className="text-xs text-[#A61B3C] hover:text-[#8B1430] p-1.5 rounded-lg hover:bg-[#FCE7EF] transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  )}
                  <div className="text-[#49343B]/60 p-1">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>
              </div>

              {/* Expandable Body */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-[#E8A3B5]/20 space-y-4 animate-in fade-in duration-200">
                  <p className="text-sm sm:text-base text-[#49343B] font-serif-bn leading-relaxed">
                    {q.defaultDescription}
                  </p>

                  {/* Personal note section */}
                  {isEditing ? (
                    <div className="pt-2 space-y-2" onClick={(e) => e.stopPropagation()}>
                      <label className="block text-xs font-semibold text-[#A61B3C]">
                        বাপ্পার নিজস্ব অনুভূতি (ঐচ্ছিক):
                      </label>
                      <textarea
                        rows={3}
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        placeholder="এখানে তোমার নিজস্ব কিছু কথা যোগ করো..."
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E8A3B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A61B3C]/30 text-[#49343B]"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => saveNote(q.id, e)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#A61B3C] text-white text-xs font-medium hover:bg-[#8B1430]"
                        >
                          <Check className="h-3 w-3" />
                          <span>সংরক্ষণ করুন</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(null);
                          }}
                          className="px-3 py-1.5 rounded-md border border-[#E8A3B5]/60 text-xs text-[#49343B] hover:bg-slate-50"
                        >
                          বাতিল
                        </button>
                      </div>
                    </div>
                  ) : (
                    q.userNote && (
                      <div className="p-3 bg-[#FFF5F8] rounded-xl border border-[#E8A3B5]/30">
                        <span className="text-[11px] font-semibold text-[#A61B3C] block mb-0.5">
                          বাপ্পার অতিরিক্ত কথা:
                        </span>
                        <p className="text-xs sm:text-sm text-[#49343B] font-sans-bn italic">
                          "{q.userNote}"
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation to Chapter 6 */}
      <ChapterFooterNav
        currentChapter={5}
        onPrev={onPrev}
        onNext={onNext}
        onRestart={() => {}}
        nextButtonCustomText="আগামীর কথা বলি →"
      />
    </div>
  );
};
