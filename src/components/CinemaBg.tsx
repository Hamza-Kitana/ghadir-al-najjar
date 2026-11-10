import { useEffect, useRef, useState } from "react";
import gold from "@/assets/bg-gold.jpg";
import { useLocale } from "@/lib/i18n";

type CinemaBgProps = {
  image?: string;
  video?: string;
  /** YouTube video id for soft background music */
  musicId?: string;
};

type YtPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (n: number) => void;
  getVolume: () => number;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: Record<string, unknown>,
      ) => YtPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<void> | null = null;

function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.querySelector("script[data-yt-api]")) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      s.dataset.ytApi = "1";
      document.head.appendChild(s);
    }
  });

  return ytApiPromise;
}

/** Soft elegant lounge/spa instrumental — no vocals */
export const SPA_MUSIC_ID = "AnpS0Ob2mHw";

/** Cinematic background with optional video + YouTube background music. */
export function CinemaBg({ image = gold, video, musicId }: CinemaBgProps) {
  const { t } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytHostRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<YtPlayer | null>(null);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.55);
  const [ready, setReady] = useState(false);
  const dots = Array.from({ length: 18 });
  const hasAudio = Boolean(musicId || video);

  // Visual video only (muted) when separate music is used
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video) return;
    el.muted = true;
    el.volume = 0;
    const tryPlay = async () => {
      try {
        await el.play();
        if (!musicId) setReady(true);
      } catch {
        try {
          await el.play();
          if (!musicId) setReady(true);
        } catch {
          /* ignore */
        }
      }
    };
    void tryPlay();
  }, [video, musicId]);

  // YouTube background music
  useEffect(() => {
    if (!musicId || !ytHostRef.current) return;
    let cancelled = false;

    const boot = async () => {
      await loadYouTubeApi();
      if (cancelled || !ytHostRef.current || !window.YT?.Player) return;

      ytPlayerRef.current?.destroy();
      ytPlayerRef.current = new window.YT.Player(ytHostRef.current, {
        height: "0",
        width: "0",
        videoId: musicId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: musicId,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: { target: YtPlayer }) => {
            if (cancelled) return;
            e.target.setVolume(Math.round(volume * 100));
            e.target.mute();
            e.target.playVideo();
            setReady(true);
            setMuted(true);
          },
          onStateChange: (e: { data: number; target: YtPlayer }) => {
            // 0 = ended — keep looping
            if (e.data === 0) e.target.playVideo();
          },
          onError: () => {
            setReady(false);
          },
        },
      });
    };

    void boot();

    return () => {
      cancelled = true;
      try {
        ytPlayerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      ytPlayerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicId]);

  // Sync volume/mute to YouTube (or video if no music)
  useEffect(() => {
    const yt = ytPlayerRef.current;
    if (musicId && yt) {
      yt.setVolume(Math.round(volume * 100));
      if (muted || volume === 0) yt.mute();
      else yt.unMute();
      return;
    }

    const el = videoRef.current;
    if (!el || musicId) return;
    el.muted = muted;
    el.volume = volume;
  }, [muted, volume, musicId]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);

    const yt = ytPlayerRef.current;
    if (musicId && yt) {
      if (next) {
        yt.mute();
      } else {
        if (volume === 0) setVolume(0.55);
        yt.setVolume(Math.round((volume || 0.55) * 100));
        yt.unMute();
        yt.playVideo();
      }
      return;
    }

    const el = videoRef.current;
    if (!el) return;
    el.muted = next;
    if (!next && el.volume === 0) {
      setVolume(0.7);
      el.volume = 0.7;
    }
    void el.play().catch(() => undefined);
  };

  const onVolume = (value: number) => {
    setVolume(value);
    const yt = ytPlayerRef.current;
    if (musicId && yt) {
      yt.setVolume(Math.round(value * 100));
      if (value === 0) {
        setMuted(true);
        yt.mute();
      } else {
        setMuted(false);
        yt.unMute();
        yt.playVideo();
      }
      return;
    }

    const el = videoRef.current;
    if (el) {
      el.volume = value;
      if (value === 0) {
        setMuted(true);
        el.muted = true;
      } else if (muted) {
        setMuted(false);
        el.muted = false;
      }
      void el.play().catch(() => undefined);
    }
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {video ? (
          <video
            ref={videoRef}
            className="cinema-video absolute inset-0 h-full w-full object-cover"
            src={video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={image}
          />
        ) : (
          <img
            src={image}
            alt=""
            className="kenburns absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-veil" />
        <div className="absolute inset-0 bg-cinema-tint" />
        <div className="light-sweep absolute inset-0" />
        {dots.map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i * 0.7) % 9}s`,
              animationDuration: `${9 + (i % 6)}s`,
              width: `${2 + (i % 4)}px`,
              height: `${2 + (i % 4)}px`,
            }}
          />
        ))}
      </div>

      {musicId && (
        <div className="yt-bg-music" aria-hidden>
          <div ref={ytHostRef} />
        </div>
      )}

      {hasAudio && (
        <div className={`bg-audio-controls ${ready ? "is-ready" : ""}`}>
          <button
            type="button"
            className="bg-audio-btn"
            onClick={toggleMute}
            aria-label={muted ? t("audio.unmute") : t("audio.mute")}
            title={muted ? t("audio.unmute") : t("audio.mute")}
          >
            {muted || volume === 0 ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5"
              >
                <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                <path d="m16 9 5 5M21 9l-5 5" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5"
              >
                <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
              </svg>
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => onVolume(Number(e.target.value))}
            className="bg-audio-slider"
            aria-label={t("audio.volume")}
          />
        </div>
      )}
    </>
  );
}
