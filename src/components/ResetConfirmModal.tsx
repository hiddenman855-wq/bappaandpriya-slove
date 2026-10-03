import React from 'react';
import { RotateCcw, X, AlertTriangle } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-[#FFFDF9] border border-[#E8A3B5] p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#49343B]/60 hover:text-[#A61B3C] rounded-lg"
          aria-label="বন্ধ করুন"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCE7EF] text-[#A61B3C]">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#49343B] font-serif-bn">
              সকল তথ্য মূল অবস্থায় ফিরিয়ে নেবেন?
            </h3>
            <p className="text-xs text-[#49343B]/70 mt-0.5">
              আপনার সম্পাদিত ব্যক্তিগত লেখা এবং আপলোড করা ছবি মুছে গিয়ে প্রাথমিক অবস্থায় ফিরে যাবে।
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#E8A3B5]/60 text-xs font-medium text-[#49343B] hover:bg-[#FCE7EF]/50 transition-colors"
          >
            বাতিল
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#A61B3C] hover:bg-[#8B1430] text-white text-xs font-medium transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>হ্যাঁ, পুনর্স্থাপন করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
