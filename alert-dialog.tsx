"use client";

import { X, Check, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const { language, setLanguage, t } = useLanguage();

  if (!isOpen) return null;

  const handleLanguageSelect = (lang: "ar" | "en") => {
    setLanguage(lang);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-violet-500/30 rounded-2xl w-[85%] max-w-sm overflow-hidden shadow-xl shadow-violet-500/20">
        <div className="flex items-center justify-between p-4 border-b border-violet-500/20">
          <h2 className="text-lg font-bold text-violet-400">{t("selectLanguage")}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-violet-500/20 transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>
        
        <div className="p-4 flex flex-col gap-2">
          <button
            onClick={() => handleLanguageSelect("ar")}
            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
              language === "ar" 
                ? "bg-violet-500/20 border-2 border-violet-500" 
                : "bg-secondary/50 border-2 border-transparent hover:border-violet-500/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Languages className="w-4 h-4 text-violet-400" />
              </div>
              <span className="font-medium text-foreground">{t("arabic")}</span>
            </div>
            {language === "ar" && <Check className="w-5 h-5 text-violet-400" />}
          </button>
          
          <button
            onClick={() => handleLanguageSelect("en")}
            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
              language === "en" 
                ? "bg-violet-500/20 border-2 border-violet-500" 
                : "bg-secondary/50 border-2 border-transparent hover:border-violet-500/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Languages className="w-4 h-4 text-violet-400" />
              </div>
              <span className="font-medium text-foreground">{t("english")}</span>
            </div>
            {language === "en" && <Check className="w-5 h-5 text-violet-400" />}
          </button>
        </div>
      </div>
    </div>
  );
}