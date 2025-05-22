"use client";

import { useEffect, useRef } from "react";

interface Props {
  videoId: string;
  onReady: (player: YT.Player) => void;
  onTimeUpdate: (time: number) => void;
}

export default function YouTubePlayer({ videoId, onReady, onTimeUpdate }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    if (!videoId || !containerRef.current) return;

    let rafId: number;

    const initPlayer = () => {
      const player = new YT.Player(containerRef.current!, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          modestbranding: 1,
          rel: 0,
          fs: 0,
          controls: 1,
          disablekb: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event) => {
            const ytPlayer = event.target;
            playerRef.current = ytPlayer;
            onReady(ytPlayer);

            const tick = () => {
              if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                onTimeUpdate(ytPlayer.getCurrentTime());
              }
              rafId = requestAnimationFrame(tick);
            };
            tick();
          },
        },
      });
    };

    if (!window.YT || !window.YT.Player) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.id = "youtube-iframe-api";
      document.body.appendChild(script);
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      cancelAnimationFrame(rafId);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  return (
    <div
      ref={containerRef}
      id="yt-player"
      aria-label="YouTube video player"
      style={{ width: "100%", height: "100%" }}
    />
  );
}