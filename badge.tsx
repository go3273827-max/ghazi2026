"use client";

import { UserPlus, Crown, BookOpen, Users } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";

const actions = [
  { icon: Users, labelKey: "partner", id: "partner" },
  { icon: BookOpen, labelKey: "intro", id: "intro" },
  { icon: Crown, labelKey: "membership", id: "membership" },
  { icon: UserPlus, labelKey: "invite", id: "invite" },
];

export function QuickActions() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleActionClick = (id: string) => {
    setActiveAction(id);
    setTimeout(() => setActiveAction(null), 400);
  };

  return (
    <div className="flex justify-around px-4 mt-6">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => handleActionClick(action.id)}
          className="flex flex-col items-center gap-2 group"
        >
          <div className={`p-4 rounded-full bg-gradient-to-br from-violet-400 via-purple-500 to-violet-600 shadow-lg shadow-violet-500/30 transition-all duration-200 border border-white/20 ${
            activeAction === action.id 
              ? 'scale-90 shadow-violet-500/60' 
              : 'group-hover:scale-110 group-hover:shadow-violet-500/50'
          }`}>
            <action.icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-white font-medium">{t(action.labelKey)}</span>
        </button>
      ))}
    </div>
  );
}