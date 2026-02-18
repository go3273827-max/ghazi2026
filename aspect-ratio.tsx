"use client";

import { X, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface Notification {
  id: number;
  type: "withdrawal" | "deposit";
  amount: string;
  date: string;
  status: "pending" | "completed" | "rejected";
}

const sampleNotifications: Notification[] = [
  { id: 1, type: "deposit", amount: "$500", date: "2026-02-04", status: "completed" },
  { id: 2, type: "withdrawal", amount: "$200", date: "2026-02-03", status: "pending" },
  { id: 3, type: "deposit", amount: "$1000", date: "2026-02-02", status: "completed" },
  { id: 4, type: "withdrawal", amount: "$150", date: "2026-02-01", status: "rejected" },
];

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const { t, dir } = useLanguage();

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-400";
      case "pending": return "text-yellow-400";
      case "rejected": return "text-red-400";
      default: return "text-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return dir === "rtl" ? "مكتمل" : "Completed";
      case "pending": return dir === "rtl" ? "قيد الانتظار" : "Pending";
      case "rejected": return dir === "rtl" ? "مرفوض" : "Rejected";
      default: return status;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-violet-500/30 rounded-2xl w-[90%] max-w-md max-h-[70vh] overflow-hidden shadow-xl shadow-violet-500/20">
        <div className="flex items-center justify-between p-4 border-b border-violet-500/20">
          <h2 className="text-lg font-bold text-violet-400">{t("notifications")}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-violet-500/20 transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[50vh] p-4">
          {sampleNotifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">{t("noNotifications")}</p>
          ) : (
            <div className="flex flex-col gap-3">
              {sampleNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-violet-500/10"
                >
                  <div className={`p-2 rounded-full ${notification.type === "deposit" ? "bg-green-500/20" : "bg-red-500/20"}`}>
                    {notification.type === "deposit" ? (
                      <ArrowDownCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <ArrowUpCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {notification.type === "deposit" ? t("deposit") : t("withdrawal")}
                    </p>
                    <p className="text-sm text-muted-foreground">{notification.date}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-foreground">{notification.amount}</p>
                    <p className={`text-xs ${getStatusColor(notification.status)}`}>
                      {getStatusText(notification.status)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}