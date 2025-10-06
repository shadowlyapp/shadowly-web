'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

interface VideoItem {
  videoId: string;
  title: string;
  thumbnail?: string;
  language: string;
  level?: string;
}

export default function RecommendedVideos({ onSelectVideo }: { onSelectVideo: (id: string) => void }) {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    const fetchRandomVideos = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/recommend/random`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data.videos)) {
          const sourceVideos = data.videos as Array<Partial<VideoItem> & { id?: string }>;
          const normalized = sourceVideos.reduce<VideoItem[]>((acc, v) => {
            const thumbnail = typeof v.thumbnail === "string" ? v.thumbnail.trim() : "";
            const videoId =
              typeof v.videoId === "string" && v.videoId.trim()
                ? v.videoId.trim()
                : typeof v.id === "string" && v.id.trim()
                  ? v.id.trim()
                  : "";
            if (!videoId) {
              return acc;
            }

            acc.push({
              videoId,
              title: v.title || "Untitled",
              thumbnail: thumbnail || undefined,
              language: v.language || "Unknown",
              level: v.level,
            });
            return acc;
          }, []);

          setVideos([...normalized, ...normalized, ...normalized]);
        }
      } catch (err) {
        console.error("Failed to load recommended videos:", err);
      }
    };

    fetchRandomVideos();
  }, []);

  return (
    <div className="relative overflow-hidden w-full py-10">
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block rounded-3xl border border-slate-200 bg-white"
        aria-hidden="true"
      />
      <h2 className="relative text-center text-lg font-semibold text-slate-800 mb-6">
        Jump into a ready-made shadowing session
      </h2>
      <div className="relative w-full">
        {videos.length === 0 ? (
          <div className="text-center text-slate-500 w-full py-8">
            ⚠️ No recommended videos found.
          </div>
        ) : (
          <div className="flex gap-6 animate-loop-scroll px-4 w-max">
            {videos.map((video, idx) => (
              <div
                key={`${video.videoId}-${idx}`}
                onClick={() => {
                  if (video.videoId) {
                    onSelectVideo(video.videoId);
                  } else {
                    console.warn("❌ No videoId found for clicked video:", video);
                  }
                }}
                className="group cursor-pointer w-[220px] min-w-[220px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-video">
                  {video.thumbnail ? (
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="220px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-200 text-xs text-slate-500">
                      No thumbnail
                    </div>
                  )}
                  <div className="absolute inset-x-0 top-2 flex justify-between px-3 text-[11px] font-semibold text-slate-800">
                    <span className="rounded-full bg-white/85 px-2 py-1 shadow-sm">
                      {video.language}
                    </span>
                    {video.level && (
                      <span className="rounded-full bg-slate-900/80 px-2 py-1 text-white shadow-sm">
                        {video.level}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-sm font-semibold text-slate-900 leading-snug h-[44px] overflow-hidden">
                    {video.title}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      Quick start
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>Tap to load</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-loop-scroll {
          animation: loop-scroll 70s linear infinite;
        }

        @keyframes loop-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-35%);
          }
        }
      `}</style>
    </div>
  );
}
