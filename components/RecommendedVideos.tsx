import Image from "next/image";
import Link from "next/link";

const videos = [
  { id: "dQw4w9WgXcQ", title: "Never Gonna Give You Up", level: "Beginner English" },
  { id: "3JZ_D3ELwOQ", title: "TED Talk in Spanish", level: "Beginner Spanish" },
  { id: "L_jWHffIx5E", title: "Funny Comedy Skit", level: "English Listening" },
  { id: "hTWKbfoikeg", title: "Japanese News Clip", level: "Casual Japanese" },
];

export default function RecommendedVideos() {
  const loopedVideos = [...videos, ...videos, ...videos];

  return (
    <div className="overflow-hidden w-full py-8 bg-transparent relative">
      <h2 className="text-center text-lg font-semibold mb-4">Try one of these to get started:</h2>
      <div className="relative w-full">
        <div className="flex gap-4 animate-loop-scroll px-4 w-max">
          {loopedVideos.map((video, idx) => (
            <Link
              href={`/player?id=${video.id}`}
              key={idx}
              className="w-[200px] min-w-[200px] bg-white shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video">
                <Image
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2">
                <div className="text-xs text-gray-500">{video.level}</div>
                <div className="text-sm font-medium truncate">{video.title}</div>
              </div>
            </Link>
          ))}
        </div>
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
