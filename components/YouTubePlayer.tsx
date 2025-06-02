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
  const rafIdRef = useRef<number | null>(null);

  // Load YouTube IFrame API script once
  useEffect(() => {
    if (window.YT && window.YT.Player) return;

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.id = "youtube-iframe-api";
    document.body.appendChild(script);
  }, []);

  // Create player when API is ready
  useEffect(() => {
    if (!containerRef.current) return;

    const initPlayer = () => {
      if (playerRef.current) return;

      console.log("🎬 Initializing YT player with:", videoId);

      playerRef.current = new YT.Player(containerRef.current!, {
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
            onReady(ytPlayer);
            startTimeTracking(ytPlayer);
          },
        },
      });
    };

    (window as any).onYouTubeIframeAPIReady = initPlayer;

    if (window.YT && window.YT.Player) {
      initPlayer();
    }

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [containerRef]);

  // Handle changing videoId (load new video without destroying player)
  useEffect(() => {
    if (playerRef.current && videoId) {
      console.log("🔁 Loading video ID into player:", videoId);
      playerRef.current.loadVideoById(videoId);
    }
  }, [videoId]);

  const startTimeTracking = (player: YT.Player) => {
    const tick = () => {
      if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        onTimeUpdate(player.getCurrentTime());
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };
    tick();
  };

  return (
    <div
      ref={containerRef}
      id="yt-player"
      aria-label="YouTube video player"
      style={{ width: "100%", height: "100%" }}
    />
  );
}