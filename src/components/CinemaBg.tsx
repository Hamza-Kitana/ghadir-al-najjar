import gold from "@/assets/bg-gold.jpg";

type CinemaBgProps = {
  image?: string;
  video?: string;
};

/** Cinematic animated background: video or slow drifting image, light sweep and floating gold particles. */
export function CinemaBg({ image = gold, video }: CinemaBgProps) {
  const dots = Array.from({ length: 26 });
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {video ? (
        <video
          className="kenburns absolute inset-0 h-full w-full object-cover"
          src={video}
          autoPlay
          muted
          loop
          playsInline
          poster={image}
        />
      ) : (
        <img src={image} alt="" className="kenburns absolute inset-0 h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 bg-veil" />
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
  );
}
