"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ar" | "en";

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export const translations: Translations = {
  flex: { ar: "FLEX", en: "FLEX" },
  home: { ar: "الرئيسية", en: "Home" },
  promo: { ar: "الترويج", en: "Promo" },
  history: { ar: "السجل", en: "History" },
  account: { ar: "حسابي", en: "Account" },
  popularMovies: { ar: "أفلام شعبية", en: "Popular Movies" },
  newMovies: { ar: "فيلم جديد", en: "New Movies" },
  upcomingMovies: { ar: "قادم / إصدار حديث", en: "Coming Soon" },
  viewMore: { ar: "مشاهدة المزيد", en: "View More" },
  partner: { ar: "شريك المدينة", en: "City Partner" },
  intro: { ar: "مقدمة النظام", en: "System Intro" },
  membership: { ar: "العضوية", en: "Membership" },
  invite: { ar: "دعوة صديق", en: "Invite Friend" },
  announcement: { ar: "باقات VIP جديدة متاحة! افتح محتوى ومكافآت حصرية - انضم الآن واحصل على مزايا رائعة", en: "New VIP packages available! Unlock exclusive content and rewards - Join now and get amazing benefits" },
  selectLanguage: { ar: "اختر اللغة", en: "Select Language" },
  arabic: { ar: "العربية", en: "Arabic" },
  english: { ar: "الإنجليزية", en: "English" },
  notifications: { ar: "الإشعارات", en: "Notifications" },
  withdrawal: { ar: "انسحاب", en: "Withdrawal" },
  deposit: { ar: "إيداع", en: "Deposit" },
  noNotifications: { ar: "لا توجد إشعارات", en: "No notifications" },
  close: { ar: "إغلاق", en: "Close" },
  bannerTitle1: { ar: "انضم لشركاء مدينة FLEX", en: "Join FLEX City Partners" },
  bannerSubtitle1: { ar: "فرص ريادية، أرباح عالمية ومكافآت حصرية", en: "Entrepreneurial opportunities, global profits & exclusive rewards" },
  bannerTitle2: { ar: "أفلام حصرية جديدة", en: "New Exclusive Movies" },
  bannerSubtitle2: { ar: "شاهد أحدث الأفلام العالمية بجودة عالية", en: "Watch the latest global movies in high quality" },
  bannerTitle3: { ar: "محتوى متنوع ومميز", en: "Diverse Premium Content" },
  bannerSubtitle3: { ar: "آلاف الأفلام والمسلسلات في مكان واحد", en: "Thousands of movies and series in one place" },
  subscriptions: { ar: "الاشتراكات", en: "Subscriptions" },
  membersCenter: { ar: "مركز الأعضاء", en: "Members Center" },
  currentLevel: { ar: "المستوى الحالي", en: "Current Level" },
  todayProfits: { ar: "أرباح اليوم", en: "Today's Profits" },
  cumulativeIncome: { ar: "الدخل التراكمي", en: "Cumulative Income" },
  specialGiftPackage: { ar: "حزمة الهدايا الخاصة", en: "Special Gift Package" },
  movieViewingIncome: { ar: "دخل مشاهدة الأفلام", en: "Movie Viewing Income" },
  expirationTime: { ar: "وقت انتهاء الصلاحية", en: "Expiration Time" },
  dailyRevenueCount: { ar: "حساب الإيرادات اليومية", en: "Daily Revenue Count" },
  earnProfits: { ar: "حقق أرباحا", en: "Earn Profits" },
  back: { ar: "رجوع", en: "Back" },
  day: { ar: "اليوم", en: "Day" },
  times: { ar: "مرات", en: "Times" },
  openNow: { ar: "افتح الان", en: "Open Now" },
  comingSoon: { ar: "Coming Soon", en: "Coming Soon" },
  noLevel: { ar: "-", en: "-" },
  enterSecretCode: { ar: "أدخل الرمز السري", en: "Enter Secret Code" },
  secretCodeDescription: { ar: "أدخل رمز مكون من 6 أرقام", en: "Enter a 6-digit code" },
  confirm: { ar: "تأكيد", en: "Confirm" },
  cancel: { ar: "إلغاء", en: "Cancel" },
  dailyTasks: { ar: "المهام اليومية", en: "Daily Tasks" },
  tasksRemaining: { ar: "المهام المتبقية", en: "Tasks Remaining" },
  likeToComplete: { ar: "اضغط على القلب لإكمال المهمة", en: "Tap the heart to complete task" },
  taskCompleted: { ar: "تم إكمال المهمة!", en: "Task Completed!" },
  allTasksCompleted: { ar: "تم إكمال جميع المهام اليوم!", en: "All tasks completed today!" },
  team: { ar: "الفريق", en: "Team" },
  totalUserIncome: { ar: "إجمالي دخل المستخدم", en: "Total User Income" },
  todayIncome: { ar: "دخل اليوم", en: "Today's Income" },
  benefitsAnalysis: { ar: "تحليل الفوائد", en: "Benefits Analysis" },
  totalReturn: { ar: "إجمالي العائد", en: "Total Return" },
  ratingIncome: { ar: "دخل التقييم", en: "Rating Income" },
  teamIncome: { ar: "دخل الفريق", en: "Team Income" },
  investmentIncome: { ar: "دخل الاستثمار", en: "Investment Income" },
  teamMembersList: { ar: "قائمة أعضاء الفريق", en: "Team Members List" },
  totalTeamMembers: { ar: "إجمالي أعضاء الفريق", en: "Total Team Members" },
  addedToday: { ar: "أضيف اليوم", en: "Added Today" },
  addedLastWeek: { ar: "أضيف الأسبوع الماضي", en: "Added Last Week" },
  addedThisWeek: { ar: "أضيف هذا الأسبوع", en: "Added This Week" },
  generation1: { ar: "الجيل الأول", en: "Generation 1" },
  generation2: { ar: "الجيل الثاني", en: "Generation 2" },
  generation3: { ar: "الجيل الثالث", en: "Generation 3" },
  subscribe: { ar: "اشتراك", en: "Subscribe" },
  like: { ar: "إعجاب", en: "Like" },
  dislike: { ar: "لم يعجبني", en: "Dislike" },
  comments: { ar: "تعليقات", en: "Comments" },
  share: { ar: "مشاركة", en: "Share" },
  remix: { ar: "ريمكس", en: "Remix" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}