/**
 * Types for Seven Letters for Priya (প্রিয়ার কাছে বাপ্পার সাতটি চিঠি)
 */

export interface TimelineMilestone {
  id: string;
  orderNumber: string; // Bengali numeral e.g. "১"
  title: string;
  defaultDescription: string;
  userDescription?: string;
  image?: string;
  datePlaceholder?: string;
}

export interface GalleryPhoto {
  id: string;
  imageUrl: string;
  caption: string;
  altText: string;
  isUserUploaded?: boolean;
}

export interface SpecialQuality {
  id: string;
  orderNumber: string;
  title: string;
  defaultDescription: string;
  userNote?: string;
  iconType: 'smile' | 'sparkles' | 'heart' | 'message' | 'star';
}

export interface CommitmentItem {
  id: string;
  orderNumber: string;
  title: string;
  description: string;
}

export interface ApologyData {
  mistakeText: string;
  lessonLearnedText: string;
}

export interface PriyaResponse {
  choice: 'talk' | 'need_time' | null;
  message: string;
  timestamp?: string;
}

export interface CouponItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  isRedeemed?: boolean;
}
