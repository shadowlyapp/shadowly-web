'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

interface VideoItem {
  videoId: string;
  title: string;
  thumbnail: string;
  language: string;
  level?: string;
}

export default function RecommendedVideos({ onSelectVideo }: { onSelectVideo: (id: string) => void }) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRandomVideos = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/recommend/random`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data.videos)) {
          console.log("✅ Recommended videos:", data.videos);
          setVideos(
            [...data.videos, ...data.videos, ...data.videos].map((v) => ({
              videoId: v.videoId || v.id, // 👈 fallback to id if videoId is missing
              title: v.title,
              thumbnail: v.thumbnail,
              language: v.language,
              level: v.level,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load recommended videos:", err);
      }
    };

    fetchRandomVideos();
  }, []);

  return (
    <div className="overflow-hidden w-full py-8 bg-transparent relative">
      <h2 className="text-center text-lg font-semibold mb-4">Try one of these to get started:</h2>
      <div className="relative w-full">
        {videos.length === 0 ? (
          <div className="text-center text-gray-400 w-full py-8">
            ⚠️ No recommended videos found.
          </div>
        ) : (
          <div className="flex gap-4 animate-loop-scroll px-4 w-max">
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
                className="cursor-pointer w-[200px] min-w-[200px] bg-white shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2">
                  <div className="text-xs text-gray-500">{video.language}</div>
                  <div className="text-sm font-medium truncate">{video.title}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-loop-scroll {
          animation: loop-scroll 60s linear infinite;
        }

        @keyframes loop-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
      `}</style>
    </div>
  );
}