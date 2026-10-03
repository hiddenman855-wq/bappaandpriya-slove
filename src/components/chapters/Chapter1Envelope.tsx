import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Mail, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import envelopeArt from '../../assets/images/romantic_vintage_envelope_1791037035142.jpg';

interface Chapter1EnvelopeProps {
  onNextChapter: () => void;
  reducedMotion: boolean;
}

export const Chapter1Envelope: React.FC<Chapter1EnvelopeProps> = ({
  onNextChapter,
  reducedMotion,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (!reducedMotion) {
        try {
          confetti({
            particleCount: 25,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#A61B3C', '#E8A3B5', '#FCE7EF', '#FFD1DC'],
          });
        } catch (e) {
          // ignore if canvas-confetti fails
        }
      }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[500px] h-[500px] bg-gradient-to-tr from-[#FCE7EF] via-[#E8A3B5]/20 to-transparent rounded-full blur-3xl opacity-70 animate-pulse-glow" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center space-y-6">
        {/* Editorial Subtitle & Main Heading */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#A61B3C] uppercase">
            প্রিয়ার কাছে বাপ্পার সাতটি চিঠি
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#49343B] font-serif-bn leading-tight">
            প্রিয়া, তোমার জন্য কিছু কথা জমিয়ে রেখেছি…
          </h1>
          <p className="text-sm sm:text-base text-[#49343B]/80 max-w-lg mx-auto font-sans-bn leading-relaxed">
            হয়তো সব কথা ঠিকভাবে বলতে পারিনি, তাই আজ একটু অন্যভাবে বলতে চাই।
          </p>
        </div>

        {/* Envelope Container */}
        <div className="pt-4 pb-2">
          {!isOpen ? (
            <motion.div
              initial={reducedMotion ? {} : { scale: 0.95, opacity: 0 }}
              animate={reducedMotion ? {} : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative max-w-md mx-auto"
            >
              {/* Envelope illustration card */}
              <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#FFFDF9] to-[#FFF5F8] border border-[#E8A3B5]/40 envelope-shadow">
                {/* Visual Artwork Thumbnail */}
                <div className="relative mx-auto mb-6 h-48 sm:h-56 w-full rounded-xl overflow-hidden border border-[#E8A3B5]/30 shadow-inner">
                  <img
                    src={envelopeArt}
                    alt="প্রিয়ার জন্য ভালোবাসার সিলমোহর লাগানো চিঠি"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#49343B]/30 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-medium text-[#A61B3C] shadow-xs">
                    শুধু তোমার জন্য
                  </div>
                </div>

                {/* Wax seal accent */}
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#A61B3C] text-white shadow-md ring-4 ring-[#FCE7EF]">
                    <Heart className="h-6 w-6 fill-white" />
                  </div>
                  <span className="text-xs text-[#49343B]/70 font-medium">
                    বাপ্পার পক্ষ থেকে একান্ত নিবেদন
                  </span>

                  {/* Primary Trigger Button */}
                  <button
                    onClick={handleOpenEnvelope}
                    className="mt-4 flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#A61B3C] hover:bg-[#8B1430] text-white font-medium text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Mail className="h-4 w-4" />
                    <span>চিঠিটা খুলবে?</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.95 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl mx-auto"
              >
                {/* Revealed Letter Paper */}
                <div className="relative rounded-2xl p-6 sm:p-10 bg-letter-paper border border-[#E8A3B5]/50 shadow-xl text-left space-y-6">
                  {/* Decorative corner rose */}
                  <div className="flex items-center justify-between border-b border-[#E8A3B5]/30 pb-4">
                    <div className="flex items-center gap-2 text-[#A61B3C]">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        প্রথম চিঠি
                      </span>
                    </div>
                    <span className="text-xs text-[#49343B]/60 font-sans-bn">
                      শুধু তোমার জন্য
                    </span>
                  </div>

                  {/* Letter Body */}
                  <div className="space-y-4 text-[#49343B] font-serif-bn leading-relaxed text-base sm:text-lg">
                    <p className="font-bold text-[#A61B3C] text-xl">
                      প্রিয় প্রিয়া,
                    </p>
                    <p>
                      এই ছোট্ট জায়গাটা শুধু তোমার জন্য তৈরি করেছি। এখানে আমার কিছু কথা, কিছু স্মৃতি আর মনের কিছু অনুভূতি রেখেছি।
                    </p>
                    <p>
                      সময় নিয়ে পড়ো। প্রতিটি পাতায় তোমার জন্য কিছু কথা আছে। হয়তো মুখোমুখি যা বলতে সাহস পাইনি বা বোঝাতে পারিনি, এখানে সেগুলো খুব শান্তভাবে তোমার সামনে রাখতে চেয়েছি।
                    </p>
                    <p className="text-sm font-sans-bn text-[#49343B]/80 pt-2 border-t border-[#E8A3B5]/20">
                      আমার কোনো তাড়াহুড়ো নেই, তুমি তোমার মতো করে প্রতিটি অধ্যায় অনুভব করো।
                    </p>
                  </div>

                  {/* Letter Footer Signature & Next Action */}
                  <div className="pt-6 border-t border-[#E8A3B5]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-left w-full sm:w-auto">
                      <p className="text-xs text-[#49343B]/60 font-sans-bn">ইতি,</p>
                      <p className="text-lg font-romantic text-[#A61B3C]">তোমার বাপ্পা</p>
                    </div>

                    <button
                      onClick={onNextChapter}
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-xl bg-[#A61B3C] hover:bg-[#8B1430] text-white font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                      <span>আমাদের গল্প শুরু হোক</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};
