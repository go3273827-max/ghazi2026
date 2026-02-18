"use client";

import { useState } from "react";
import { Header } from "@/components/flex-app/header";
import { AnnouncementBar } from "@/components/flex-app/announcement-bar";
import { HeroBanner } from "@/components/flex-app/hero-banner";
import { QuickActions } from "@/components/flex-app/quick-actions";
import { MovieSection } from "@/components/flex-app/movie-section";
import { BottomNavigation } from "@/components/flex-app/bottom-navigation";
import { SubscriptionsPage } from "@/components/flex-app/subscriptions-page";
import { useLanguage } from "@/contexts/language-context";

const popularMovies = [
  { id: 1, title: "Avatar", image: "/images/movie1.jpg" },
  { id: 2, title: "The Great Flood", image: "/images/movie2.jpg" },
  { id: 3, title: "Five Nights at Freddy's", image: "/images/movie3.jpg" },
  { id: 4, title: "Zootopia 2", image: "/images/movie4.jpg" },
  { id: 5, title: "Now You See Me", image: "/images/movie5.jpg" },
  { id: 6, title: "SISU", image: "/images/movie6.jpg" },
];

const newMovies = [
  { id: 7, title: "The Matrix", image: "/images/movie7.jpg" },
  { id: 8, title: "Interstellar", image: "/images/movie8.jpg" },
  { id: 9, title: "Inception", image: "/images/movie9.jpg" },
  { id: 10, title: "Dune", image: "/images/movie10.jpg" },
  { id: 11, title: "Oppenheimer", image: "/images/movie11.jpg" },
  { id: 12, title: "Barbie", image: "/images/movie12.jpg" },
];

const upcomingMovies = [
  { id: 13, title: "Avatar 3", image: "/images/movie13.jpg" },
  { id: 14, title: "Deadpool 4", image: "/images/movie14.jpg" },
  { id: 15, title: "Spider-Man 4", image: "/images/movie15.jpg" },
  { id: 16, title: "Joker 2", image: "/images/movie16.jpg" },
  { id: 17, title: "Gladiator 2", image: "/images/movie17.jpg" },
  { id: 18, title: "Mission Impossible 8", image: "/images/movie18.jpg" },
];

export default function FlexApp() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("home");
  const [userPin, setUserPin] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSetPin = (pin: string) => {
    setUserPin(pin);
  };

  if (activeTab === "subscriptions") {
    return (
      <>
        <SubscriptionsPage 
          onBack={() => setActiveTab("home")} 
          userPin={userPin}
          onSetPin={handleSetPin}
        />
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    );
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-violet-950/10 pb-24">
      <Header />
      <AnnouncementBar />
      <HeroBanner />
      <QuickActions />
      
      <MovieSection title={t("popularMovies")} movies={popularMovies} />
      <MovieSection title={t("newMovies")} movies={newMovies} />
      <MovieSection title={t("upcomingMovies")} movies={upcomingMovies} />
      
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </main>
  );
}