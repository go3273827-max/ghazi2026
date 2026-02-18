"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface Movie {
  id: number;
  title: string;
  image: string;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

export function MovieSection({ title, movies }: MovieSectionProps) {
  const { t, dir } = useLanguage();
  const ChevronIcon = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <button className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors">
          <span>{t("viewMore")}</span>
          <ChevronIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 px-4">
        {movies.map((movie) => (
          <button
            key={movie.id}
            className="group cursor-pointer text-center transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-violet-500/30">
              <Image
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                width={128}
                height={180}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-violet-500/90 rounded-full p-2">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
            </div>
            <p className="mt-2 text-xs text-center text-white font-medium truncate">{movie.title}</p>
          </button>
        ))}
      </div>
    </section>
  );
}