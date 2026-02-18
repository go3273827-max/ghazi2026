"use client";

import { Home, Megaphone, History, User, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

type NavItem = {
  icon: typeof Home | null;
  labelKey: string;
  isCenter?: boolean;
  id: string;
};

const navItems: NavItem[] = [
  { icon: Home, labelKey: "home", id: "home" },
  { icon: Megaphone, labelKey: "promo", id: "promo" },
  { icon: null, labelKey: "subscriptions", isCenter: true, id: "subscriptions" },
  { icon: History, labelKey: "history", id: "history" },
  { icon: User, labelKey: "account", id: "account" },
];

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-background/95 backdrop-blur-md border-t border-violet-500/20 pb-safe z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          item.isCenter ? (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative -mt-6 flex flex-col items-center gap-1"
            >
              <div className={`p-5 rounded-full bg-gradient-to-br from-violet-400 via-purple-500 to-violet-600 shadow-lg shadow-violet-500/40 transition-all duration-200 hover:scale-110 ${
                activeTab === item.id ? 'scale-105' : ''
              }`}>
                <Crown className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs font-medium text-violet-400">{t(item.labelKey)}</span>
            </button>
          ) : (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-all duration-200 ${
                activeTab === item.id 
                  ? "text-violet-400 scale-105" 
                  : "text-muted-foreground hover:text-violet-500/70"
              }`}
            >
              {item.icon && <item.icon className={`w-5 h-5 transition-all ${activeTab === item.id ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]' : ''}`} />}
              <span className="text-xs font-medium">{t(item.labelKey)}</span>
              {activeTab === item.id && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-violet-400" />
              )}
            </button>
          )
        ))}
      </div>
    </nav>
  );
}