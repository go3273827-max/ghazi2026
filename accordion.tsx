"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, dir } = useLanguage();

  const bannerSlides = [
    {
      image: "/images/banner.jpg",
      title: t("bannerTitle1"),
      subtitle: t("bannerSubtitle1")
    },
    {
      image: "/images/movie4.jpg",
      title: t("bannerTitle2"),
      subtitle: t("bannerSubtitle2")
    },
    {
      image: "/images/movie6.jpg",
      title: t("bannerTitle3"),
      subtitle: t("bannerSubtitle3")
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  return (
    <div className="mx-4 mt-4">
      <div className="relative rounded-2xl overflow-hidden border-2 border-violet-500/30 shadow-lg shadow-violet-500/20">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(${dir === "rtl" ? "" : "-"}${currentSlide * 100}%)` }}
        >
          {bannerSlides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                width={800}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute top-4 right-4 bg-gradient-to-l from-violet-400 to-purple-500 rounded-full px-3 py-1">
                <span className="text-xs font-bold text-white">FLEX</span>
              </div>
              <div className={`absolute bottom-4 right-4 left-4 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                <h2 className="text-lg font-bold text-white mb-1">{slide.title}</h2>
                <p className="text-xs text-white/80">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5 mt-3">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'w-8 bg-gradient-to-l from-violet-400 to-purple-500' 
                : 'w-1.5 bg-muted hover:bg-violet-500/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}