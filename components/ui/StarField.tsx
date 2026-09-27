const STAR_COUNT = 110;

function rnd(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
  left: rnd(i, 1) * 100,
  top: rnd(i, 2) * 100,
  size: 1 + rnd(i, 3) * 2.2,
  delay: rnd(i, 4) * 5,
  duration: 2.4 + rnd(i, 5) * 4,
  opacity: 0.3 + rnd(i, 6) * 0.7,
}));

export function StarField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* étoiles filantes */}
      <span
        className="shooting-star"
        style={{ top: "14%", animationDelay: "3s" }}
      />
      <span
        className="shooting-star"
        style={{ top: "46%", animationDelay: "11s" }}
      />
      <span
        className="shooting-star"
        style={{ top: "72%", animationDelay: "19s" }}
      />
    </div>
  );
}
