import { ApologyData, GalleryPhoto, PriyaResponse, TimelineMilestone, SpecialQuality } from '../types';
import { defaultApologyData, initialGalleryPhotos, initialTimelineMilestones, specialQualities } from '../data/content';

const STORAGE_KEYS = {
  APOLOGY: 'seven_letters_apology_v1',
  TIMELINE: 'seven_letters_timeline_v1',
  GALLERY: 'seven_letters_gallery_v1',
  QUALITIES: 'seven_letters_qualities_v1',
  RESPONSE: 'seven_letters_priya_response_v1',
  REDUCED_MOTION: 'seven_letters_reduced_motion_v1',
  MUSIC_MUTED: 'seven_letters_music_muted_v1',
  COUPONS: 'seven_letters_coupons_v1',
};

export const getStoredApology = (): ApologyData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APOLOGY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Local storage read error', e);
  }
  return defaultApologyData;
};

export const saveStoredApology = (data: ApologyData): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.APOLOGY, JSON.stringify(data));
  } catch (e) {
    console.error('Local storage save error', e);
  }
};

export const getStoredTimeline = (): TimelineMilestone[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TIMELINE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Local storage read error', e);
  }
  return initialTimelineMilestones;
};

export const saveStoredTimeline = (data: TimelineMilestone[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(data));
  } catch (e) {
    console.error('Local storage save error', e);
  }
};

export const getStoredGallery = (): GalleryPhoto[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Local storage read error', e);
  }
  return initialGalleryPhotos;
};

export const saveStoredGallery = (data: GalleryPhoto[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(data));
  } catch (e) {
    console.error('Local storage save error', e);
  }
};

export const getStoredQualities = (): SpecialQuality[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUALITIES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Local storage read error', e);
  }
  return specialQualities;
};

export const saveStoredQualities = (data: SpecialQuality[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.QUALITIES, JSON.stringify(data));
  } catch (e) {
    console.error('Local storage save error', e);
  }
};

export const getStoredResponse = (): PriyaResponse | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESPONSE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Local storage read error', e);
  }
  return null;
};

export const saveStoredResponse = (data: PriyaResponse): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.RESPONSE, JSON.stringify(data));
  } catch (e) {
    console.error('Local storage save error', e);
  }
};

export const getStoredCoupons = (): Record<string, boolean> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COUPONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Local storage read error', e);
  }
  return {};
};

export const saveStoredCoupons = (data: Record<string, boolean>): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(data));
  } catch (e) {
    console.error('Local storage save error', e);
  }
};

export const getReducedMotionSetting = (): boolean => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REDUCED_MOTION);
    if (raw !== null) return JSON.parse(raw);
  } catch (e) {
    console.error('Storage error', e);
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

export const saveReducedMotionSetting = (enabled: boolean): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.REDUCED_MOTION, JSON.stringify(enabled));
  } catch (e) {
    console.error('Storage error', e);
  }
};

export const resetAllPersonalData = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  } catch (e) {
    console.error('Storage reset error', e);
  }
};
