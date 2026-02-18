"use client";

import { ArrowLeft, Gift, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useState } from "react";
import { PinModal } from "./pin-modal";
import { TasksPage } from "./tasks-page";

interface SubscriptionsPageProps {
  onBack: () => void;
  userPin: string | null;
  onSetPin: (pin: string) => void;
}

const vipTiers = [
  { level: 1, income: 0.5, days: 75, times: 4, price: 50, available: true },
  { level: 2, income: 0.8, days: 75, times: 10, price: 200, available: true },
  { level: 3, income: 1.0, days: 75, times: 20, price: 0, available: false },
  { level: 4, income: 1.5, days: 75, times: 30, price: 0, available: false },
  { level: 5, income: 2.0, days: 75, times: 40, price: 0, available: false },
  { level: 6, income: 2.5, days: 75, times: 50, price: 0, available: false },
  { level: 7, income: 3.0, days: 75, times: 60, price: 0, available: false },
  { level: 8, income: 3.5, days: 75, times: 70, price: 0, available: false },
];

export function SubscriptionsPage({ onBack, userPin, onSetPin }: SubscriptionsPageProps) {
  const { t } = useLanguage();
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pendingActivation, setPendingActivation] = useState<number | null>(null);
  const [showTasksPage, setShowTasksPage] = useState(false);
  const [activeVipLevel, setActiveVipLevel] = useState<number | null>(null);

  const handleActivate = (level: number) => {
    setPendingActivation(level);
    setShowPinModal(true);
  };

  const handlePinSubmit = (pin: string) => {
    if (!userPin) {
      // First time - set the PIN
      onSetPin(pin);
    }
    
    // Activate the VIP level
    if (pendingActivation) {
      setCurrentLevel(pendingActivation);
      setActiveVipLevel(pendingActivation);
      setShowPinModal(false);
      // Navigate to tasks page
      setShowTasksPage(true);
    }
  };

  const handleTasksBack = () => {
    setShowTasksPage(false);
  };

  if (showTasksPage && activeVipLevel) {
    const tier = vipTiers.find(t => t.level === activeVipLevel);
    return (
      <TasksPage 
        onBack={handleTasksBack} 
        vipLevel={activeVipLevel} 
        dailyTasks={tier?.times || 4} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-4 bg-background/95 backdrop-blur-md border-b border-violet-500/20">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-violet-500/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">{t("membersCenter")}</h1>
        <div className="w-9" />
      </header>

      <div className="px-4 py-4">
        {/* Current Level */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-muted-foreground">{t("currentLevel")}:</span>
          <div className="flex items-center gap-1">
            <Gift className="w-5 h-5 text-violet-400" />
            <span className="text-violet-400 font-bold">
              {currentLevel ? `VIP${currentLevel}` : t("noLevel")}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card border border-violet-500/20 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">0.00</p>
            <p className="text-xs text-muted-foreground mt-1">(USDT){t("todayProfits")}</p>
          </div>
          <div className="bg-card border border-violet-500/20 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">0.00</p>
            <p className="text-xs text-muted-foreground mt-1">(USDT){t("cumulativeIncome")}</p>
          </div>
        </div>

        {/* Special Gift Package Section */}
        <h2 className="text-lg font-bold text-foreground mb-4">{t("specialGiftPackage")}</h2>

        {/* VIP Tiers */}
        <div className="flex flex-col gap-4">
          {vipTiers.map((tier) => (
            <div
              key={tier.level}
              className={`bg-card border border-violet-500/20 rounded-xl p-4 ${!tier.available ? 'opacity-60' : ''}`}
            >
              {/* VIP Level Header */}
              <div className="flex items-center justify-end gap-2 mb-4">
                <span className="font-bold text-foreground">VIP{tier.level}</span>
                <div className="w-2 h-2 rounded-full bg-violet-500" />
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div>
                  <p className="text-lg font-bold text-sky-400">{tier.income} <span className="text-xs">USDT</span></p>
                  <p className="text-xs text-muted-foreground">{t("movieViewingIncome")}</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{t("day")} {tier.days}</p>
                  <p className="text-xs text-muted-foreground">{t("expirationTime")}</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{t("times")} {tier.times}</p>
                  <p className="text-xs text-muted-foreground">{t("dailyRevenueCount")}</p>
                </div>
              </div>

              {/* Action Button */}
              {tier.available ? (
                <button 
                  onClick={() => handleActivate(tier.level)}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg shadow-violet-500/30"
                >
                  {t("openNow")} {tier.price} USDT
                </button>
              ) : (
                <button 
                  disabled
                  className="w-full py-3 rounded-full bg-gray-700/50 text-gray-400 font-medium cursor-not-allowed border border-gray-600/30"
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Back Button - Fixed at bottom */}
      <button
        onClick={onBack}
        className="fixed bottom-20 left-4 flex items-center gap-1 px-4 py-2 rounded-lg bg-black border border-white/20 text-white hover:bg-white/10 transition-colors z-40"
      >
        <span>Back</span>
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* PIN Modal */}
      <PinModal
        isOpen={showPinModal}
        onClose={() => {
          setShowPinModal(false);
          setPendingActivation(null);
        }}
        onSubmit={handlePinSubmit}
      />
    </div>
  );
}