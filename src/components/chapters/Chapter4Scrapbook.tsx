import React, { useState, useEffect } from 'react';
import { GalleryPhoto } from '../../types';
import { getStoredGallery, saveStoredGallery } from '../../utils/storage';
import { ChapterFooterNav } from '../ChapterFooterNav';
import { Image as ImageIcon, Plus, X, ChevronLeft, ChevronRight, Edit2, Check, Sparkles } from 'lucide-react';

interface Chapter4ScrapbookProps {
  onPrev: () => void;
  onNext: () => void;
}

export const Chapter4Scrapbook: React.FC<Chapter4ScrapbookProps> = ({
  onPrev,
  onNext,
}) => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(getStoredGallery);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);
  const [tempCaption, setTempCaption] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleNextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev! + 1) % photos.length));
  };

  const handlePrevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + photos.length) % photos.length);
  };

  const startEditCaption = (photo: GalleryPhoto, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCaptionId(photo.id);
    setTempCaption(photo.caption);
  };

  const saveCaption = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = photos.map((p) => {
      if (p.id === id) {
        return { ...p, caption: tempCaption.trim() };
      }
      return p;
    });
    setPhotos(updated);
    saveStoredGallery(updated);
    setEditingCaptionId(null);
    setToastMessage('ক্যাপশন সফলভাবে সংরক্ষিত হয়েছে');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleUploadNewPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('ছবির আকার ৩ মেগাবাইটের কম হওয়া আবশ্যক।');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const newPhoto: GalleryPhoto = {
          id: `custom-photo-${Date.now()}`,
          imageUrl: reader.result,
          caption: 'আমাদের নতুন একটি সুন্দর স্মৃতি...',
          altText: 'ব্যবহারকারীর আপলোড করা ব্যক্তিগত ছবি',
          isUserUploaded: true,
        };
        const updated = [...photos, newPhoto];
        setPhotos(updated);
        saveStoredGallery(updated);
        setToastMessage('নতুন ছবি স্ক্র্যাপবুকে যুক্ত হয়েছে');
        setTimeout(() => setToastMessage(null), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#A61B3C] text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in duration-300">
          <Check className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Chapter Kicker & Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 text-[#A61B3C] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          <span>চতুর্থ চিঠি · মধুর স্মৃতিগুলো</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#49343B] font-serif-bn leading-snug">
          কিছু মুহূর্ত ছবির বাইরেও মনে থেকে যায়।
        </h1>
        <p className="text-sm sm:text-base text-[#49343B]/80 max-w-xl mx-auto leading-relaxed font-sans-bn">
          ক্যামেরার ফ্রেম হয়তো সব অনুভূতি বন্দি করতে পারে না, কিন্তু প্রতিটি ছবির পেছনের গল্পটি সারাজীবন উজ্জ্বল থাকে।
        </p>
      </div>

      {/* Action bar: Add custom photo */}
      <div className="flex justify-end mb-6">
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E8A3B5]/60 bg-white/90 hover:bg-[#FCE7EF] text-[#A61B3C] text-xs sm:text-sm font-medium cursor-pointer shadow-xs transition-all">
          <Plus className="h-4 w-4" />
          <span>নিজের ছবি যোগ করুন</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadNewPhoto}
          />
        </label>
      </div>

      {/* Scrapbook Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {photos.map((photo, index) => {
          const isEditing = editingCaptionId === photo.id;

          return (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative bg-[#FFFDF9] p-4 sm:p-5 rounded-2xl border border-[#E8A3B5]/40 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              {/* Scrapbook Washi Tape Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#E8A3B5]/30 -rotate-1 rounded-sm border border-[#E8A3B5]/40 pointer-events-none backdrop-blur-xs" />

              {/* Image Frame */}
              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-[#FFF5F8] border border-[#E8A3B5]/20 mb-4">
                <img
                  src={photo.imageUrl}
                  alt={photo.altText}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#A61B3C]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Caption Area */}
              <div className="pt-2">
                {isEditing ? (
                  <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      value={tempCaption}
                      onChange={(e) => setTempCaption(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded border border-[#E8A3B5] bg-white focus:outline-none focus:ring-1 focus:ring-[#A61B3C]"
                      placeholder="ক্যাপশন লিখুন..."
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => saveCaption(photo.id, e)}
                        className="px-2.5 py-1 bg-[#A61B3C] text-white text-[11px] rounded hover:bg-[#8B1430] flex items-center gap-1"
                      >
                        <Check className="h-3 w-3" />
                        <span>সংরক্ষণ</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCaptionId(null);
                        }}
                        className="px-2 py-1 border border-slate-300 text-[11px] rounded"
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-serif-bn text-[#49343B] leading-relaxed italic">
                      "{photo.caption}"
                    </p>
                    <button
                      onClick={(e) => startEditCaption(photo, e)}
                      title="ক্যাপশন সম্পাদনা করুন"
                      className="opacity-0 group-hover:opacity-100 text-[#A61B3C] p-1 hover:bg-[#FCE7EF] rounded transition-opacity"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-medium transition-colors z-50"
            aria-label="বন্ধ করুন"
          >
            <X className="h-4 w-4" />
            <span>বন্ধ করুন</span>
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevPhoto();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="পূর্ববর্তী ছবি"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextPhoto();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="পরবর্তী ছবি"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Lightbox Image Container */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].imageUrl}
              alt={photos[lightboxIndex].altText}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white text-base sm:text-lg font-serif-bn">
                "{photos[lightboxIndex].caption}"
              </p>
              <p className="text-white/60 text-xs mt-1">
                ছবি {['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '১০'][lightboxIndex] || (lightboxIndex + 1)} / {['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '১০'][photos.length - 1] || photos.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation to Chapter 5 */}
      <ChapterFooterNav
        currentChapter={4}
        onPrev={onPrev}
        onNext={onNext}
        onRestart={() => {}}
        nextButtonCustomText="তুমি আমার কাছে কেন বিশেষ, বলি →"
      />
    </div>
  );
};
