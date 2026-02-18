"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
}

export function PinModal({ isOpen, onClose, onSubmit }: PinModalProps) {
  const { t } = useLanguage();
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setPin(["", "", "", "", "", ""]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const fullPin = pin.join("");
    if (fullPin.length === 6) {
      onSubmit(fullPin);
    }
  };

  const isComplete = pin.every((digit) => digit !== "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-card border border-violet-500/30 rounded-2xl w-[90%] max-w-sm overflow-hidden shadow-xl shadow-violet-500/20">
        <div className="flex items-center justify-between p-4 border-b border-violet-500/20">
          <h2 className="text-lg font-bold text-violet-400">{t("enterSecretCode")}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-violet-500/20 transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-center text-muted-foreground mb-6">{t("secretCodeDescription")}</p>
          
          <div className="flex justify-center gap-2 mb-6">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-bold bg-secondary/50 border-2 border-violet-500/30 rounded-xl text-foreground focus:border-violet-500 focus:outline-none transition-colors"
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-full border-2 border-violet-500/30 text-foreground font-medium hover:bg-violet-500/10 transition-colors"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              className={`flex-1 py-3 rounded-full font-medium transition-all ${
                isComplete
                  ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-500/30"
                  : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
              }`}
            >
              {t("confirm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}