"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Heart, ChevronLeft, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface TasksPageProps {
  onBack: () => void;
  vipLevel: number;
  dailyTasks: number;
}

const videos = [
  {
    id: 1,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Adventure Awaits",
    username: "@explorer_mike",
  },
  {
    id: 2,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    title: "Nature's Beauty",
    username: "@nature_lover",
  },
  {
    id: 3,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    title: "City Vibes",
    username: "@urban_explorer",
  },
  {
    id: 4,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    title: "Amazing Journey",
    username: "@traveler_jane",
  },
  {
    id: 5,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    title: "Creative Moments",
    username: "@creative_soul",
  },
  {
    id: 6,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    title: "Epic Story",
    username: "@story_teller",
  },
  {
    id: 7,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    title: "Cinematic View",
    username: "@cinema_pro",
  },
  {
    id: 8,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    title: "Action Packed",
    username: "@action_fan",
  },
  {
    id: 9,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    title: "Road Trip",
    username: "@road_warrior",
  },
  {
    id: 10,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    title: "Sci-Fi Dreams",
    username: "@scifi_lover",
  },
  {
    id: 11,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    title: "Speed Review",
    username: "@car_reviews",
  },
  {
    id: 12,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    title: "Racing Time",
    username: "@race_master",
  },
];

export function TasksPage({ onBack, vipLevel, dailyTasks }: TasksPageProps) {
  const { t } = useLanguage();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [remainingTasks, setRemainingTasks] = useState(dailyTasks);
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTaskComplete, setShowTaskComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = videos[currentVideoIndex % videos.length];

  const handleLike = () => {
    if (likedVideos.has(currentVideo.id) || remainingTasks <= 0) return;

    setLikedVideos(new Set([...likedVideos, currentVideo.id]));
    setRemainingTasks((prev) => prev - 1);
    setShowTaskComplete(true);
    
    setTimeout(() => {
      setShowTaskComplete(false);
      if (currentVideoIndex < videos.length - 1 && remainingTasks > 1) {
        setCurrentVideoIndex((prev) => prev + 1);
      }
    }, 1500);
  };

  const handleSwipe = (direction: "up" | "down") => {
    if (direction === "up" && currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex((prev) => prev + 1);
    } else if (direction === "down" && currentVideoIndex > 0) {
      setCurrentVideoIndex((prev) => prev - 1);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const allTasksCompleted = remainingTasks <= 0;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full">
          <span className="text-white font-bold">VIP{vipLevel}</span>
          <span className="text-violet-400">|</span>
          <span className="text-white">{t("tasksRemaining")}: <span className="text-violet-400 font-bold">{remainingTasks}</span></span>
        </div>
        <div className="w-9" />
      </header>

      {/* Video Container - Medium Size */}
      <div 
        className="relative flex-1 mx-4 my-2 rounded-2xl overflow-hidden max-h-[70vh]"
        onTouchStart={(e) => {
          const startY = e.touches[0].clientY;
          const handleTouchEnd = (endE: TouchEvent) => {
            const endY = endE.changedTouches[0].clientY;
            const diff = startY - endY;
            if (Math.abs(diff) > 50) {
              handleSwipe(diff > 0 ? "up" : "down");
            }
            document.removeEventListener("touchend", handleTouchEnd);
          };
          document.addEventListener("touchend", handleTouchEnd);
        }}
      >
        <video
          ref={videoRef}
          key={currentVideo.id}
          src={currentVideo.url}
          className="w-full h-full object-cover rounded-2xl"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onClick={togglePlay}
        />

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Play className="w-20 h-20 text-white/80" />
          </div>
        )}

        {/* Task Complete Overlay */}
        {showTaskComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center animate-bounce">
              <Heart className="w-24 h-24 text-red-500 fill-red-500 mx-auto mb-4" />
              <p className="text-white text-2xl font-bold">{t("taskCompleted")}</p>
            </div>
          </div>
        )}

        {/* All Tasks Complete Overlay */}
        {allTasksCompleted && !showTaskComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
              <p className="text-white text-xl font-bold mb-4">{t("allTasksCompleted")}</p>
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium"
              >
                {t("back")}
              </button>
            </div>
          </div>
        )}

        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6">
          {/* Like Button */}
          <button
            onClick={handleLike}
            disabled={likedVideos.has(currentVideo.id) || allTasksCompleted}
            className="flex flex-col items-center gap-1"
          >
            <div className={`p-3 rounded-full transition-all ${
              likedVideos.has(currentVideo.id)
                ? "bg-red-500/20"
                : "bg-black/30 hover:bg-black/50"
            }`}>
              <Heart className={`w-8 h-8 transition-all ${
                likedVideos.has(currentVideo.id)
                  ? "text-red-500 fill-red-500 scale-110"
                  : "text-white"
              }`} />
            </div>
            <span className="text-white text-xs">{likedVideos.has(currentVideo.id) ? "Liked" : "Like"}</span>
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="flex flex-col items-center gap-1"
          >
            <div className="p-3 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </div>
          </button>
        </div>

        {/* Bottom Info */}
        <div className="absolute left-4 right-20 bottom-32">
          <p className="text-white font-bold text-lg">{currentVideo.username}</p>
          <p className="text-white/80 text-sm">{currentVideo.title}</p>
          <p className="text-violet-400 text-xs mt-2">{t("likeToComplete")}</p>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          <button
            onClick={() => handleSwipe("down")}
            disabled={currentVideoIndex === 0}
            className={`p-2 rounded-full bg-black/30 transition-colors ${
              currentVideoIndex === 0 ? "opacity-30" : "hover:bg-black/50"
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-white rotate-90" />
          </button>
          <button
            onClick={() => handleSwipe("up")}
            disabled={currentVideoIndex === videos.length - 1}
            className={`p-2 rounded-full bg-black/30 transition-colors ${
              currentVideoIndex === videos.length - 1 ? "opacity-30" : "hover:bg-black/50"
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-white -rotate-90" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
          {videos.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-4 rounded-full transition-all ${
                index === currentVideoIndex
                  ? "bg-violet-500"
                  : index < currentVideoIndex
                  ? "bg-white/50"
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute bottom-6 left-4 flex items-center gap-1 px-4 py-2 rounded-lg bg-black border border-white/20 text-white hover:bg-white/10 transition-colors z-50"
      >
        <span>Back</span>
        <ChevronLeft className="w-4 h-4" />
      </button>
    </div>
  );
}