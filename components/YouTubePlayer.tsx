"use client";

import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface Props {
  videoId: string;
  onReady: (player: YT.Player) => void;
  onTimeUpdate: (time: number) => void;
}

export default function YouTubePlayer({ videoId, onReady, onTimeUpdate }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const initialVideoIdRef = useRef(videoId);
  const onReadyRef = useRef(onReady);
  const onTimeUpdateRef = useRef(onTimeUpdate);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  // Load YouTube IFrame API script once
  useEffect(() => {
    if (window.YT && window.YT.Player) return;

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.id = "youtube-iframe-api";
    document.body.appendChild(script);
  }, []);

  // Create player when API is ready
  const startTimeTracking = useCallback((player: YT.Player) => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    const tick = () => {
      if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        onTimeUpdateRef.current?.(player.getCurrentTime());
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    tick();
  }, []);

  const initPlayer = useCallback(() => {
    if (playerRef.current || !containerRef.current) return;

    playerRef.current = new YT.Player(containerRef.current, {
      videoId: initialVideoIdRef.current,
      width: "100%",
      height: "100%",
      playerVars: {
        modestbranding: 1,
        rel: 0,
        fs: 0,
        controls: 1,
        disablekb: 1,
        iv_load_policy: 3,
        origin: typeof window !== "undefined" ? window.location.origin : undefined,
      },
      events: {
        onReady: (event) => {
          const ytPlayer = event.target;
          onReadyRef.current?.(ytPlayer);
          startTimeTracking(ytPlayer);
        },
      },
    });
  }, [startTimeTracking]);

  useEffect(() => {
    if (!containerRef.current) return;

    window.onYouTubeIframeAPIReady = initPlayer;

    if (window.YT && window.YT.Player) {
      initPlayer();
    }

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      playerRef.current?.destroy();
      playerRef.current = null;
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, [initPlayer]);

  // Handle changing videoId (load new video without destroying player)
  useEffect(() => {
    if (!videoId) return;

    const player = playerRef.current;
    if (!player) {
      initialVideoIdRef.current = videoId;
      return;
    }

    const currentId = (player as { getVideoData?: () => { video_id?: string } }).getVideoData?.()
      ?.video_id;
    if (currentId === videoId) {
      return;
    }

    if (typeof player.loadVideoById === "function") {
      player.loadVideoById(videoId);
      return;
    }

    if (typeof player.cueVideoById === "function") {
      player.cueVideoById(videoId);
      return;
    }

    console.warn("YouTube player instance cannot change video id", player);
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
