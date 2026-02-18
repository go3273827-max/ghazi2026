"use client";

import { Globe, Headphones, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { LanguageModal } from "./language-modal";
import { NotificationsModal } from "./notifications-modal";
import { useLanguage } from "@/contexts/language-context";

export function Header() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.min(scrollY / 100, 0.9);

  return (
    <>
      <header 
        className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 backdrop-blur-md border-b border-violet-500/20 transition-colors duration-300"
        style={{ backgroundColor: `rgba(15, 10, 30, ${opacity})` }}
      >
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="p-2 rounded-full hover:bg-violet-500/20 transition-colors relative"
          >
            <Bell className="w-5 h-5 text-violet-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button 
            onClick={() => setIsLanguageOpen(true)}
            className="p-2 rounded-full hover:bg-violet-500/20 transition-colors"
          >
            <Globe className="w-5 h-5 text-violet-400" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-violet-500/20 transition-colors"
          >
            <Headphones className="w-5 h-5 text-violet-400" />
          </button>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-l from-violet-300 via-purple-400 to-violet-500 bg-clip-text text-transparent drop-shadow-lg">
          {t("flex")}
        </h1>
      </header>
      
      <LanguageModal isOpen={isLanguageOpen} onClose={() => setIsLanguageOpen(false)} />
      <NotificationsModal isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </>
  );
}