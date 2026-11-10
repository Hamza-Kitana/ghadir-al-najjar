import { useEffect, useRef, useState } from "react";
import gold from "@/assets/bg-gold.jpg";
import { useLocale } from "@/lib/i18n";

type CinemaBgProps = {
  image?: string;
  video?: string;
};

/** Cinematic background with optional video, sound, mute and volume controls. */
export function CinemaBg({ image = gold, video }: CinemaBgProps) {
  const { t } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [ready, setReady] = useState(false);
  const dots = Array.from({ length: 18 });

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video) return;

    el.volume = volume;
    el.muted = muted;

    const tryPlay = async () => {
      try {
        await el.play();
        setReady(true);
      } catch {
        // Browsers often block autoplay with sound; fall back to muted then play.
        el.muted = true;
        setMuted(true);
        try {
          await el.play();
          setReady(true);
        } catch {
          setReady(false);
        }
      }
    };

    void tryPlay();
  }, [video]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = muted;
    el.volume = volume;
  }, [muted, volume]);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !muted;
    setMuted(next);
    el.muted = next;
    if (!next && el.volume === 0) {
      setVolume(0.7);
      el.volume = 0.7;
    }
    void el.play().catch(() => undefined);
  };

  const onVolume = (value: number) => {
    const el = videoRef.current;
    setVolume(value);
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

      {video && (
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
