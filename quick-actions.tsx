"use client";

import { Megaphone } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function AnnouncementBar() {
  const { t } = useLanguage();
  
  return (
    <div className="mx-4 mt-4 rounded-xl bg-gradient-to-l from-violet-950/40 via-secondary/80 to-violet-950/40 border border-violet-500/30 overflow-hidden">
      <div className="flex items-center gap-3 py-3 px-4">
        <Megaphone className="w-5 h-5 text-violet-400 flex-shrink-0" />
        <div className="overflow-hidden flex-1">
          <p className="animate-marquee whitespace-nowrap text-sm text-white">
            {t("announcement")}
          </p>
        </div>
      </div>
    </div>
  );
}