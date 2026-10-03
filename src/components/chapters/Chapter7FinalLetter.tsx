import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  Send,
  Check,
  X,
  MessageSquareHeart,
  Ticket,
  Flower2,
  Scroll,
  Smile,
  ShieldCheck,
  Coffee,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  getStoredResponse,
  saveStoredResponse,
  getStoredCoupons,
  saveStoredCoupons,
} from '../../utils/storage';
import { PriyaResponse } from '../../types';
import rosesLetterArt from '../../assets/images/romantic_roses_letter_1791037076820.jpg';

interface Chapter7FinalLetterProps {
  onRestart: () => void;
  reducedMotion: boolean;
}

export const Chapter7FinalLetter: React.FC<Chapter7FinalLetterProps> = ({
  onRestart,
  reducedMotion,
}) => {
  // Navigation tabs for Chapter 7's rich interactive contents
  const [activeTab, setActiveTab] = useState<'letter' | 'coupons' | 'rose'>('letter');

  // Modal and response state
  const [modalOpen, setModalOpen] = useState(false);
  const [savedResponse, setSavedResponse] = useState<PriyaResponse | null>(getStoredResponse);
  const [selectedChoice, setSelectedChoice] = useState<'talk' | 'need_time' | null>(
    savedResponse?.choice || null
  );
  const [replyMessage, setReplyMessage] = useState(savedResponse?.message || '');
  const [responseSubmitted, setResponseSubmitted] = useState(!!savedResponse);

  // Coupons state
  const [redeemedCoupons, setRedeemedCoupons] = useState<Record<string, boolean>>(getStoredCoupons);

  // Rose affirmations state
  const [revealedPetals, setRevealedPetals] = useState<number[]>([0]);

  const couponsList = [
    {
      id: 'coupon-1',
      title: 'শান্ত শ্রবণ অঙ্গীকার',
      tagline: 'কোনো বিতর্ক বা পাল্টা যুক্তি ছাড়া',
      description:
        'প্রিয়া যখনই চাইবে, বাপ্পা নিজের কোনো মতামত বা যুক্তি না চাপিয়ে শান্তভাবে শুধু প্রিয়ার সমস্ত কথা ও অনুভূতি মন দিয়ে শুনবে।',
      icon: ShieldCheck,
    },
    {
      id: 'coupon-2',
      title: 'এক কাপ কফি ও নিরিবিলি বিকেল',
      tagline: 'প্রিয়ার পছন্দের যেকোনো প্রিয় জায়গায়',
      description:
        'সব রাগ-অভিমানের অবসান ঘটিয়ে একান্তে পছন্দের চা বা কফির কাপে চুমুক দিয়ে শান্ত ও আনন্দময় সময় কাটানোর প্রতিশ্রুতি।',
      icon: Coffee,
    },
    {
      id: 'coupon-3',
      title: 'নিঃশর্ত অভিমান ভাঙানি',
      tagline: 'বাপ্পার পক্ষ থেকে আন্তরিক প্রচেষ্টা',
      description:
        'প্রিয়ার যেকোনো দিন মন খারাপ থাকলে কোনো অহংকার বা দ্বিধা ছাড়া বাপ্পা তাকে হাসাতে ও স্বস্তি এনে দিতে পাশে থাকবে।',
      icon: Smile,
    },
  ];

  const roseAffirmations = [
    {
      id: 0,
      title: 'প্রথম অনুভূতির পাপড়ি',
      text: 'তোমার সরল হাসিটুকুই আমার পৃথিবীর সবচেয়ে বড় আলো। সেই আলো কখনো নিভে যেতে দিতে চাই না।',
    },
    {
      id: 1,
      title: 'দ্বিতীয় অনুভূতির পাপড়ি',
      text: 'সম্পর্কের চাহিদার চেয়েও তোমার মানসিক শান্তি আর স্বস্তি আমার কাছে অনেক বেশি দামি।',
    },
    {
      id: 2,
      title: 'তৃতীয় অনুভূতির পাপড়ি',
      text: 'আমার ভুলের সম্পূর্ণ দায় আমার নিজের। তোমার আবেগকে খাটো করে দেখার কোনো অধিকার আমার নেই।',
    },
    {
      id: 3,
      title: 'চতুর্থ অনুভূতির পাপড়ি',
      text: 'তুমি যেভাবে হাসো, যেভাবে ভাবো—তুমি যেমন, ঠিক তেমনই আমার কাছে সবচেয়ে অনন্য ও সম্মানিত।',
    },
    {
      id: 4,
      title: 'পঞ্চম অনুভূতির পাপড়ি',
      text: 'যেকোনো পরিস্থিতিতে তুমি যেখানেই থাকো না কেন, তোমার সুস্থতা ও আনন্দের জন্য বাপ্পার আন্তরিক শুভকামনা থাকবে।',
    },
  ];

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleSelectChoice = (choice: 'talk' | 'need_time') => {
    setSelectedChoice(choice);
    if (!reducedMotion && choice === 'talk') {
      try {
        confetti({
          particleCount: 35,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#A61B3C', '#E8A3B5', '#FCE7EF'],
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleSubmitResponse = () => {
    if (!selectedChoice) return;
    const newResponse: PriyaResponse = {
      choice: selectedChoice,
      message: replyMessage.trim(),
      timestamp: new Date().toLocaleString('bn-BD'),
    };
    setSavedResponse(newResponse);
    saveStoredResponse(newResponse);
    setResponseSubmitted(true);
    if (!reducedMotion) {
      try {
        confetti({
          particleCount: 40,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#A61B3C', '#E8A3B5', '#FFF8F0'],
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleToggleCoupon = (id: string) => {
    const updated = { ...redeemedCoupons, [id]: !redeemedCoupons[id] };
    setRedeemedCoupons(updated);
    saveStoredCoupons(updated);

    if (!redeemedCoupons[id] && !reducedMotion) {
      try {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#A61B3C', '#E8A3B5', '#FCE7EF'],
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleRevealPetal = (index: number) => {
    if (!revealedPetals.includes(index)) {
      setRevealedPetals([...revealedPetals, index]);
      if (!reducedMotion) {
        try {
          confetti({
            particleCount: 15,
            spread: 50,
            origin: { y: 0.65 },
            colors: ['#E8A3B5', '#FCE7EF', '#A61B3C'],
          });
        } catch (e) {
          // ignore
        }
      }
    }
  };

  const bengaliNumerals = ['১', '২', '৩', '৪', '৫'];

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Chapter Kicker & Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 text-[#A61B3C] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          <span>সপ্তম চিঠি · সমাপ্তি ও বিশেষ নিবেদন</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#49343B] font-serif-bn leading-snug">
          প্রিয়া, শেষবারের মতো একটা কথা বলি…
        </h1>
        <p className="text-sm sm:text-base text-[#49343B]/80 max-w-xl mx-auto leading-relaxed font-sans-bn">
          সব ক্ষোভ, অভিমান আর দূরত্বের ঊর্ধ্বে শুধু এটুকু বলতে চেয়েছিলাম। তোমার জন্য সাজিয়ে রাখা এই ছোট্ট জায়গাটি তোমার।
        </p>
      </div>

      {/* Interactive Tabs Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 mb-8 bg-[#FCE7EF]/60 rounded-2xl max-w-md mx-auto border border-[#E8A3B5]/40 shadow-xs">
        <button
          onClick={() => setActiveTab('letter')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeTab === 'letter'
              ? 'bg-[#A61B3C] text-white shadow-xs'
              : 'text-[#49343B] hover:text-[#A61B3C] hover:bg-white/60'
          }`}
        >
          <Scroll className="h-4 w-4" />
          <span>বাপ্পার শেষ চিঠি</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeTab === 'coupons'
              ? 'bg-[#A61B3C] text-white shadow-xs'
              : 'text-[#49343B] hover:text-[#A61B3C] hover:bg-white/60'
          }`}
        >
          <Ticket className="h-4 w-4" />
          <span>ভালোবাসার ৩টি কুপন</span>
        </button>

        <button
          onClick={() => setActiveTab('rose')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            activeTab === 'rose'
              ? 'bg-[#A61B3C] text-white shadow-xs'
              : 'text-[#49343B] hover:text-[#A61B3C] hover:bg-white/60'
          }`}
        >
          <Flower2 className="h-4 w-4" />
          <span>গোলাপের পাপড়ি</span>
        </button>
      </div>

      {/* TAB 1: THE FINAL LETTER */}
      {activeTab === 'letter' && (
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Main Letter Card */}
          <div className="rounded-2xl p-6 sm:p-10 bg-letter-paper border border-[#E8A3B5]/50 shadow-xl space-y-6 relative overflow-hidden">
            {/* Header Art Frame */}
            <div className="relative h-44 sm:h-56 w-full rounded-xl overflow-hidden border border-[#E8A3B5]/30 mb-6">
              <img
                src={rosesLetterArt}
                alt="গোলাপ ও চিঠি"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#49343B]/45 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-white text-xs sm:text-sm font-serif-bn font-medium">
                আন্তরিক অনুতাপ ও শ্রদ্ধায় নিবেদিত
              </div>
            </div>

            {/* Letter Text */}
            <div className="space-y-4 text-[#49343B] font-serif-bn text-base sm:text-lg leading-relaxed">
              <p className="font-bold text-[#A61B3C] text-xl">
                প্রিয়া,
              </p>
              <p>
                এই সাতটি অধ্যায়ে তোমাকে অনেক কথা বললাম। সবকিছুর শেষে শুধু এটুকু বলতে চাই—আমার কোনো কথা বা আচরণে যদি তোমার কষ্ট হয়ে থাকে, আমি সত্যিই দুঃখিত।
              </p>
              <p>
                আমি তোমার অনুভূতিগুলোকে সম্মান করতে চাই এবং নিজের ভুল থেকে শিখতে চাই। তুমি যখন স্বচ্ছন্দ বোধ করবে, তখন যদি আমার কথা একবার শুনতে চাও, আমি মন দিয়ে তোমার কথাও শুনব।
              </p>
              <p>
                তোমার ওপর কোনো চাপ নেই। শুধু চেয়েছিলাম, আমার মনের কথাগুলো তোমাকে জানাতে। সম্পর্কের থেকেও তোমার মানসিক শান্তি আর স্বস্তি আমার কাছে অনেক বেশি দামি।
              </p>
            </div>

            {/* Animated Signature Section */}
            <div className="pt-6 border-t border-[#E8A3B5]/30 flex flex-col items-end">
              <p className="text-sm font-sans-bn text-[#49343B]/70">
                অনেক আন্তরিকতা নিয়ে,
              </p>
              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, x: 20 }}
                animate={reducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="pt-2 text-right"
              >
                <span className="font-romantic text-2xl sm:text-3xl text-[#A61B3C] block tracking-wide">
                  তোমার বাপ্পা।
                </span>
              </motion.div>
            </div>

            {/* Highlight Action Button */}
            <div className="pt-6 text-center">
              <button
                onClick={handleOpenModal}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#A61B3C] hover:bg-[#8B1430] text-white font-medium text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquareHeart className="h-5 w-5" />
                <span>আমার একটা কথা শুনবে?</span>
              </button>
            </div>

            {/* Display saved response if already given */}
            {savedResponse && (
              <div className="mt-6 p-4 rounded-xl bg-[#FFF5F8] border border-[#E8A3B5]/40 text-left space-y-1 text-xs sm:text-sm">
                <span className="font-semibold text-[#A61B3C] block">
                  প্রিয়ার বর্তমান অভিমত:
                </span>
                <p className="text-[#49343B] font-medium">
                  {savedResponse.choice === 'talk'
                    ? '❝ আমি কথা বলতে চাই ❞'
                    : '❝ আমার একটু সময় দরকার ❞'}
                </p>
                {savedResponse.message && (
                  <p className="text-[#49343B]/80 italic pt-1">
                    "{savedResponse.message}"
                  </p>
                )}
                {savedResponse.timestamp && (
                  <span className="text-[11px] text-[#49343B]/60 block pt-1">
                    সময়: {savedResponse.timestamp}
                  </span>
                )}
                <span className="text-[11px] text-[#49343B]/50 block pt-0.5">
                  (এই ডিভাইসে সংরক্ষিত)
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* TAB 2: THREE REDEEMABLE LIFETIME LOVE COUPONS */}
      {activeTab === 'coupons' && (
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center max-w-lg mx-auto mb-4">
            <h3 className="text-lg sm:text-xl font-bold font-serif-bn text-[#49343B]">
              প্রিয়ার জন্য বাপ্পার ৩টি চিরন্তন কুপন
            </h3>
            <p className="text-xs sm:text-sm text-[#49343B]/70 mt-1">
              যেকোনো সময়, যেকোনো পরিস্থিতিতে প্রিয়া এই কুপনগুলো দাবি করতে পারবে। বাপ্পা সানন্দে তা পালন করতে বাধ্য থাকবে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {couponsList.map((coupon, idx) => {
              const isRedeemed = !!redeemedCoupons[coupon.id];
              const Icon = coupon.icon;

              return (
                <div
                  key={coupon.id}
                  className={`relative flex flex-col justify-between rounded-2xl p-5 border-2 transition-all duration-300 ${
                    isRedeemed
                      ? 'bg-gradient-to-b from-[#FFF5F8] to-[#FFFDF9] border-[#A61B3C] shadow-md ring-2 ring-[#A61B3C]/20'
                      : 'bg-[#FFFDF9] border-[#E8A3B5]/50 hover:border-[#E8A3B5] shadow-xs'
                  }`}
                >
                  {/* Decorative Ticket Punch Notch */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-[#FFF8F0] border-b-2 border-[#E8A3B5]" />

                  <div className="space-y-3 pt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FCE7EF] text-[#A61B3C]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#A61B3C] bg-[#FCE7EF] px-2.5 py-0.5 rounded-full">
                        কুপন {bengaliNumerals[idx]}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold font-serif-bn text-[#49343B]">
                        {coupon.title}
                      </h4>
                      <p className="text-xs text-[#A61B3C] font-medium mt-0.5">
                        {coupon.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-[#49343B]/80 font-sans-bn leading-relaxed pt-1">
                      {coupon.description}
                    </p>
                  </div>

                  {/* Stamp & Action */}
                  <div className="pt-5 mt-4 border-t border-dashed border-[#E8A3B5]/40 flex flex-col items-center gap-2">
                    {isRedeemed ? (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#A61B3C] border border-[#A61B3C] px-3 py-1 rounded-lg bg-[#FCE7EF]/50">
                        <Check className="h-3.5 w-3.5" />
                        <span>প্রিয়া কর্তৃক সংরক্ষিত ✓</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-[#49343B]/60 italic">
                        এখনো ব্যবহৃত হয়নি
                      </span>
                    )}

                    <button
                      onClick={() => handleToggleCoupon(coupon.id)}
                      className={`w-full py-2 rounded-xl text-xs font-medium transition-all ${
                        isRedeemed
                          ? 'bg-[#49343B]/10 hover:bg-[#49343B]/20 text-[#49343B]'
                          : 'bg-[#A61B3C] hover:bg-[#8B1430] text-white shadow-xs'
                      }`}
                    >
                      {isRedeemed ? 'কুপন ফিরিয়ে রাখো' : 'কুপনটি গ্রহণ করো'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-[#FFF5F8] border border-[#E8A3B5]/40 text-center text-xs text-[#49343B]/80">
            💡 এই কুপনগুলোর কোনো মেয়াদ শেষ হওয়ার তারিখ নেই। এগুলো আজীবনের জন্য প্রিয়ার কাছে সংরক্ষিত থাকবে।
          </div>
        </motion.div>
      )}

      {/* TAB 3: BLOOMING ROSE OF AFFIRMATIONS */}
      {activeTab === 'rose' && (
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center max-w-lg mx-auto mb-2">
            <h3 className="text-lg sm:text-xl font-bold font-serif-bn text-[#49343B]">
              অনুভূতির ফোটা গোলাপ
            </h3>
            <p className="text-xs sm:text-sm text-[#49343B]/70 mt-1">
              প্রতিটি পাপড়ির ভেতরে লুকিয়ে আছে বাপ্পার একটি করে আন্তরিক অনুভূতি। পাপড়িতে স্পর্শ করে অনুভূতিগুলো উন্মোচন করো।
            </p>
          </div>

          {/* Rose Petal Explorer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roseAffirmations.map((item, index) => {
              const isRevealed = revealedPetals.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => handleRevealPetal(item.id)}
                  className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isRevealed
                      ? 'bg-[#FFFDF9] border-[#E8A3B5] shadow-xs'
                      : 'bg-[#FFF5F8] border-[#E8A3B5]/50 hover:border-[#A61B3C] hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FCE7EF] text-[#A61B3C]">
                      <Heart
                        className={`h-4 w-4 ${isRevealed ? 'fill-[#A61B3C]' : 'opacity-60'}`}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-[#A61B3C]">
                      পাপড়ি {bengaliNumerals[index]}
                    </span>
                  </div>

                  {isRevealed ? (
                    <div className="space-y-2 animate-in fade-in duration-300">
                      <h4 className="text-xs font-bold text-[#A61B3C] uppercase tracking-wider">
                        {item.title}
                      </h4>
                      <p className="text-sm font-serif-bn text-[#49343B] leading-relaxed">
                        "{item.text}"
                      </p>
                    </div>
                  ) : (
                    <div className="py-6 text-center space-y-1">
                      <Sparkles className="h-5 w-5 text-[#A61B3C] mx-auto opacity-70 animate-pulse" />
                      <p className="text-xs font-medium text-[#A61B3C]">
                        স্পর্শ করে উন্মোচন করুন
                      </p>
                      <p className="text-[11px] text-[#49343B]/50">
                        গোপন অনুভূতি
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center text-xs text-[#49343B]/60 font-sans-bn pt-2">
            উন্মোচিত অনুভূতি: {bengaliNumerals[revealedPetals.length - 1] || '০'} / ৫
          </div>
        </motion.div>
      )}

      {/* Response Modal Dialog */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
              exit={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl bg-[#FFFDF9] border border-[#E8A3B5] p-6 sm:p-8 shadow-2xl space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-[#49343B]/60 hover:text-[#A61B3C] rounded-lg hover:bg-[#FCE7EF] transition-colors"
                aria-label="বন্ধ করুন"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCE7EF] text-[#A61B3C] mx-auto">
                  <Heart className="h-6 w-6 fill-[#A61B3C]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#49343B] font-serif-bn">
                  প্রিয়া, তোমার মনের কথাটা জানাতে পারো
                </h3>
                <p className="text-xs sm:text-sm text-[#49343B]/80 leading-relaxed font-sans-bn">
                  তুমি চাইলে তোমার মনের কথাটা আমাকে জানাতে পারো। আমি মন দিয়ে শুনতে চাই।
                </p>
              </div>

              {/* Two respectful choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleSelectChoice('talk')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedChoice === 'talk'
                      ? 'border-[#A61B3C] bg-[#FCE7EF]/70 ring-2 ring-[#A61B3C]/20 shadow-xs'
                      : 'border-[#E8A3B5]/50 bg-white hover:bg-[#FCE7EF]/30'
                  }`}
                >
                  <p className="font-semibold text-sm text-[#A61B3C] flex items-center gap-1.5">
                    <Check
                      className={`h-4 w-4 ${selectedChoice === 'talk' ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <span>আমি কথা বলতে চাই</span>
                  </p>
                  <p className="text-xs text-[#49343B]/70 mt-1">
                    মন খুলে সব কথা বলা এবং শোনার ইচ্ছা।
                  </p>
                </button>

                <button
                  onClick={() => handleSelectChoice('need_time')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedChoice === 'need_time'
                      ? 'border-[#A61B3C] bg-[#FCE7EF]/70 ring-2 ring-[#A61B3C]/20 shadow-xs'
                      : 'border-[#E8A3B5]/50 bg-white hover:bg-[#FCE7EF]/30'
                  }`}
                >
                  <p className="font-semibold text-sm text-[#A61B3C] flex items-center gap-1.5">
                    <Check
                      className={`h-4 w-4 ${selectedChoice === 'need_time' ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <span>আমার একটু সময় দরকার</span>
                  </p>
                  <p className="text-xs text-[#49343B]/70 mt-1">
                    নিজের মতো করে ভাবার ও শান্ত হওয়ার অবকাশ।
                  </p>
                </button>
              </div>

              {/* Empathetic Feedback */}
              {selectedChoice === 'talk' && (
                <div className="p-3.5 rounded-xl bg-[#FFF5F8] border border-[#E8A3B5]/40 text-xs sm:text-sm text-[#49343B] space-y-1">
                  <p className="font-semibold text-[#A61B3C]">
                    ধন্যবাদ প্রিয়া।
                  </p>
                  <p>
                    তুমি যখনই স্বচ্ছন্দ বোধ করবে, আমি গভীর আগ্রহ ও মনোযোগ নিয়ে তোমার অনুভূতি ও কথা শুনতে অপেক্ষা করছি।
                  </p>
                </div>
              )}

              {selectedChoice === 'need_time' && (
                <div className="p-3.5 rounded-xl bg-[#FFF8F0] border border-[#E8A3B5]/40 text-xs sm:text-sm text-[#49343B] space-y-1">
                  <p className="font-semibold text-[#A61B3C]">
                    অবশ্যই প্রিয়া, তুমি যতটুকু সময় চাও নাও।
                  </p>
                  <p>
                    তোমার মন শান্ত হওয়া এবং স্বস্তি পাওয়াই সবচেয়ে গুরুত্বপূর্ণ। তোমার ওপর কোনো চাপ নেই, কোনো তাড়াহুড়ো নেই।
                  </p>
                </div>
              )}

              {/* Optional Message Field */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#49343B]">
                  তোমার মনের কোনো কথা (ঐচ্ছিক):
                </label>
                <textarea
                  rows={3}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="যদি কিছু বলতে বা লিখতে চাও..."
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E8A3B5] bg-white focus:outline-none focus:ring-2 focus:ring-[#A61B3C]/30 text-[#49343B]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-[#49343B]/60">
                  🔒 উত্তরটি কেবল এই ব্রাউজারে সংরক্ষিত থাকবে
                </span>

                <button
                  onClick={handleSubmitResponse}
                  disabled={!selectedChoice}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#A61B3C] hover:bg-[#8B1430] disabled:opacity-50 text-white font-medium text-xs sm:text-sm transition-colors shadow-xs"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{responseSubmitted ? 'আপডেট করুন' : 'জমা দিন'}</span>
                </button>
              </div>

              {responseSubmitted && (
                <p className="text-center text-xs text-[#A61B3C] font-semibold pt-1">
                  ✓ তোমার বার্তাটি সংরক্ষিত হয়েছে।
                </p>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Final Closing Sentiment */}
      <div className="mt-14 text-center space-y-4 pb-8">
        <p className="text-lg sm:text-xl font-romantic text-[#A61B3C]">
          এই ছোট্ট গল্পটা পড়ার জন্য ধন্যবাদ, প্রিয়া।
        </p>

        {/* Exclusive Buttons: Other Website + WhatsApp Buy Similar Website */}
        <div className="pt-2 max-w-lg mx-auto p-5 rounded-2xl bg-[#FFFDF9] border border-[#E8A3B5]/60 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Button 1: Other Website */}
            <a
              href="https://jhingalalahuhuhuhu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E8A3B5] bg-white hover:bg-[#FCE7EF] text-[#49343B] text-xs sm:text-sm font-semibold transition-all shadow-xs"
              title="আমাদের অন্য ওয়েবসাইট দেখুন"
            >
              <span>আমাদের অন্য ওয়েবসাইট</span>
              <ExternalLink className="h-4 w-4 text-[#A61B3C]" />
            </a>

            {/* Button 2: WhatsApp Buy Similar Website */}
            <a
              href={`https://wa.me/918250560656?text=${encodeURIComponent(
                "নমস্কার! আমি 'প্রিয়ার কাছে বাপ্পার সাতটি চিঠি' ওয়েবসাইটের মতো একটি সুন্দর ও রোমান্টিক ব্যক্তিগত ওয়েবসাইট তৈরি করতে চাই। বিস্তারিত জানালে খুশি হব।"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg"
              title="হোয়াটসঅ্যাপে এমন ওয়েবসাইট অর্ডার করুন"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span>অনুরূপ ওয়েবসাইট অর্ডার করুন</span>
            </a>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onRestart}
            className="text-xs text-[#49343B]/70 hover:text-[#A61B3C] underline px-3 py-2 transition-colors"
          >
            প্রথম পাতা থেকে আবার শুরু করুন
          </button>
        </div>
      </div>
    </div>
  );
};
