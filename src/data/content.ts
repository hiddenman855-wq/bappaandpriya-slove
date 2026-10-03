import { TimelineMilestone, GalleryPhoto, SpecialQuality, CommitmentItem, ApologyData } from '../types';

import envelopeImg from '../assets/images/romantic_vintage_envelope_1791037035142.jpg';
import sunsetWalkImg from '../assets/images/romantic_sunset_walk_1791037049038.jpg';
import coffeeImg from '../assets/images/romantic_coffee_conversation_1791037063358.jpg';
import rosesLetterImg from '../assets/images/romantic_roses_letter_1791037076820.jpg';

export const siteMeta = {
  title: 'প্রিয়ার কাছে বাপ্পার সাতটি চিঠি',
  tagline: 'কিছু কথা মুখে বলা কঠিন, তাই তোমার জন্য সাজিয়ে রেখেছি সাতটি অধ্যায়।',
  senderName: 'বাপ্পা',
  receiverName: 'প্রিয়া',
};

export const chapterTitles: Record<number, { title: string; shortTitle: string }> = {
  1: {
    title: 'প্রিয়া, তোমাকে কিছু কথা বলার ছিল',
    shortTitle: 'প্রথম চিঠি',
  },
  2: {
    title: 'আমাদের গল্পের শুরু',
    shortTitle: 'আমাদের গল্প',
  },
  3: {
    title: 'আমার ভুল, আমার ক্ষমা চাওয়া',
    shortTitle: 'ক্ষমা চাওয়া',
  },
  4: {
    title: 'আমাদের সুন্দর স্মৃতিগুলো',
    shortTitle: 'মধুর স্মৃতি',
  },
  5: {
    title: 'তুমি আমার কাছে এত বিশেষ কেন',
    shortTitle: 'তুমি বিশেষ',
  },
  6: {
    title: 'আগামীর কাছে আমার প্রতিশ্রুতি',
    shortTitle: 'প্রতিশ্রুতি',
  },
  7: {
    title: 'শেষ পাতায় শুধু তোমার জন্য',
    shortTitle: 'শেষ চিঠি',
  },
};

export const initialTimelineMilestones: TimelineMilestone[] = [
  {
    id: 'milestone-1',
    orderNumber: '১',
    title: 'আমাদের প্রথম দেখা',
    defaultDescription: 'যেদিন প্রথম তোমার চোখের দিকে তাকিয়েছিলাম, সেদিন থেকেই জীবনের অনেক অর্থ নতুন মনে হয়েছিল। সেই দিনটার কথা আজও মনের মধ্যে ঠিক একই রকম উজ্জ্বল হয়ে আছে।',
    userDescription: '',
    image: sunsetWalkImg,
    datePlaceholder: 'আমাদের প্রথম দেখা হওয়ার দিনটি',
  },
  {
    id: 'milestone-2',
    orderNumber: '২',
    title: 'আমাদের প্রথম কথা',
    defaultDescription: 'শুরুতে খানিকটা দ্বিধা আর সংকোচ ছিল, কিন্তু তোমার শান্ত কণ্ঠস্বর আর সহজ হাসি যেন সব জড়তা এক মুহূর্তেই দূর করে দিয়েছিল। সেই প্রথম আলাপের রেশ আজও হৃদয়ে জড়িয়ে আছে।',
    userDescription: '',
    image: coffeeImg,
    datePlaceholder: 'সেই প্রথম দীর্ঘ কথোপকথন',
  },
  {
    id: 'milestone-3',
    orderNumber: '৩',
    title: 'প্রথম বিশেষ মুহূর্তটি',
    defaultDescription: 'কখন যে তুমি সাধারণ একজন থেকে আমার জীবনের সবচেয়ে কাছের আর গুরুত্বপূর্ণ মানুষ হয়ে উঠলে, তা হয়তো অজান্তেই ঘটে গিয়েছিল। সেই বিশেষ মুহূর্তটি আমার কাছে পরম পাওয়া।',
    userDescription: '',
    image: rosesLetterImg,
    datePlaceholder: 'যেদিন বুঝেছিলাম তুমি কতটা আপন',
  },
  {
    id: 'milestone-4',
    orderNumber: '৪',
    title: 'একসঙ্গে কাটানো সুন্দর সময়গুলো',
    defaultDescription: 'ছোট ছোট খুনসুটি, অকারণ হাসি, আর নিরবতার মধ্যেও একে অপরের উপস্থিতি অনুভব করা—এই মুহূর্তগুলোই তো আমাদের সম্পর্কের সবচেয়ে বড় শক্তি ছিল।',
    userDescription: '',
    image: sunsetWalkImg,
    datePlaceholder: 'একসঙ্গে কাটানো প্রিয় বিকেলগুলো',
  },
  {
    id: 'milestone-5',
    orderNumber: '৫',
    title: 'যে স্মৃতিগুলো আজও মনে দোলা দেয়',
    defaultDescription: 'দূরত্ব বা রাগ যাই থাকুক না কেন, তোমার দেওয়া সুন্দর স্মৃতিগুলো সবসময় আমার মনে আলো ছড়ায়। আমি সেই স্মৃতিগুলোকে সযত্নে মনের মণিকোঠায় ধরে রাখতে চাই।',
    userDescription: '',
    image: envelopeImg,
    datePlaceholder: 'যে স্মৃতি কখনো মলিন হবে না',
  },
];

export const defaultApologyData: ApologyData = {
  mistakeText: 'আমার যে আচরণ বা কথায় তুমি গভীর কষ্ট পেয়েছ, আমি তার সম্পূর্ণ দায় স্বীকার করছি। হয়তো আমার অসাবধানতা বা বোঝার অভাব তোমাকে আঘাত করেছে, যার জন্য আমি মনেপ্রাণে অনুতপ্ত।',
  lessonLearnedText: 'এই ভুল থেকে আমি শিখেছি যে—সম্পর্কে জেদ বা তর্কের চেয়ে তোমার অনুভূতির মূল্য অনেক বেশি। শান্তভাবে শোনা, তোমার পরিস্থিতিকে মর্যাদা দেওয়া এবং নিজের আচরণকে সংযত রাখা কতটা জরুরি, তা আমি গভীরভাবে উপলব্ধি করেছি।',
};

export const initialGalleryPhotos: GalleryPhoto[] = [
  {
    id: 'photo-1',
    imageUrl: envelopeImg,
    caption: 'এই ছোট্ট স্মৃতিটাও আমার কাছে অনেক মূল্যবান।',
    altText: 'স্মৃতি ও গোলাপের পাপড়ির চিত্র',
  },
  {
    id: 'photo-2',
    imageUrl: coffeeImg,
    caption: 'কিছু মুহূর্তের কথা মনে পড়লে মনটা আপনাআপনি ভালো হয়ে যায়।',
    altText: 'একসঙ্গে কাটানো মিষ্টি সময়ের চিত্র',
  },
  {
    id: 'photo-3',
    imageUrl: sunsetWalkImg,
    caption: 'আমাদের গল্পের এই পাতাটা আমি যত্ন করে রাখতে চাই।',
    altText: 'সূর্যাস্তে একসঙ্গে হাঁটার স্নিগ্ধ মুহূর্ত',
  },
  {
    id: 'photo-4',
    imageUrl: rosesLetterImg,
    caption: 'যে সময়টুকু তোমার সাথে কাটে, তা সবসময়ের জন্য আমার পরম উপহার।',
    altText: 'গোলাপ ও চিঠির সুন্দর অনুভূতি',
  },
];

export const specialQualities: SpecialQuality[] = [
  {
    id: 'quality-1',
    orderNumber: '১',
    title: 'তোমার হাসি',
    defaultDescription: 'তোমার এক চিলতে হাসি যেকোনো কঠিন দিনকেও এক মুহূর্তে শান্ত ও সুন্দর করে তুলতে পারে। তোমার এই সরল ও অমূল্য হাসিটা আমি কখনোই হারাতে দিতে চাই না।',
    iconType: 'smile',
  },
  {
    id: 'quality-2',
    orderNumber: '২',
    title: 'তোমার ব্যক্তিত্ব',
    defaultDescription: 'তোমার নিজস্ব চিন্তাভাবনা, আত্মসম্মান এবং সততা সবসময় আমাকে অনুপ্রাণিত করে। তুমি নিজের অবস্থানে যেমন দৃঢ়, ঠিক তেমনই কোমল মনের অধিকারী।',
    iconType: 'sparkles',
  },
  {
    id: 'quality-3',
    orderNumber: '৩',
    title: 'তোমার যত্ন',
    defaultDescription: 'অন্যের ভালো চাওয়ার যে সহজাত গুণ তোমার মধ্যে আছে, তা সত্যিই বিরল। তোমার ছোট ছোট যত্নের ছোঁয়া মানুষকে কতটা স্বস্তি দেয়, তা হয়তো তুমি নিজেও জানো না।',
    iconType: 'heart',
  },
  {
    id: 'quality-4',
    orderNumber: '৪',
    title: 'তোমার সঙ্গে কথা বলা',
    defaultDescription: 'পৃথিবীর হাজারো ভিড়ের মাঝেও তোমার সঙ্গে কথা বলার সময় এক অদ্ভুত নির্ভরতা আর প্রশান্তি খুঁজে পাই। তোমার কথা শোনার প্রতিটি মুহূর্ত আমার কাছে অত্যন্ত প্রিয়।',
    iconType: 'message',
  },
  {
    id: 'quality-5',
    orderNumber: '৫',
    title: 'তুমি যেমন, ঠিক তেমন',
    defaultDescription: 'তোমাকে কোনো কিছুর বিনিময়ে পরিবর্তন করার কথা আমি ভাবিও না। তুমি যেভাবে হাসো, যেভাবে ভাবো, যেভাবে ভালোবাসা প্রকাশ করো—তুমি যেমন, ঠিক তেমনই অনন্য ও বিশেষ।',
    iconType: 'star',
  },
];

export const commitments: CommitmentItem[] = [
  {
    id: 'commit-1',
    orderNumber: '১',
    title: 'মন দিয়ে শুনব',
    description: 'তোমার কথা এবং অনুভূতিগুলো মন দিয়ে বোঝার চেষ্টা করব। কোনো কথা মাঝপথে থামিয়ে না দিয়ে, তোমার দৃষ্টিকোণ থেকে পরিস্থিতি দেখার চেষ্টা করব।',
  },
  {
    id: 'commit-2',
    orderNumber: '২',
    title: 'ভুল হলে স্বীকার করব',
    description: 'নিজের ভুলের জন্য অজুহাত না খুঁজে তা থেকে শেখার চেষ্টা করব। অহংকার নয়, বরং সম্পর্কের সম্মানকে সবকিছুর ঊর্ধ্বে স্থান দেব।',
  },
  {
    id: 'commit-3',
    orderNumber: '৩',
    title: 'সম্মান বজায় রাখব',
    description: 'মতভেদ হলেও তোমার মতামত ও ব্যক্তিগত সীমাকে সম্মান করব। কোনো সিদ্ধান্ত বা ভাবনায় তোমার ইচ্ছা-অনিচ্ছাকে কখনো অবহেলা করব না।',
  },
  {
    id: 'commit-4',
    orderNumber: '৪',
    title: 'শান্তভাবে কথা বলব',
    description: 'ভুল বোঝাবুঝি হলে রাগ বাড়ানোর বদলে শান্তভাবে কথা বলার চেষ্টা করব। উত্তেজনার মুহূর্তে কোনো কটু কথা বলে তোমাকে কষ্ট দেব না।',
  },
  {
    id: 'commit-5',
    orderNumber: '৫',
    title: 'কথার সঙ্গে কাজ মেলাব',
    description: 'শুধু প্রতিশ্রুতি নয়, নিজের আচরণের মাধ্যমেও পরিবর্তন দেখানোর চেষ্টা করব। যেন তুমি বিশ্বাস করতে পারো যে আমার অনুশোচনা আন্তরিক।',
  },
];
