// Small confetti burst for a passed test. Pure CSS, plays once, hidden for
// reduced-motion users (see motion.css).
const COLORS = ["#cf4c41", "#f6d1c5", "#e9a23b", "#4c8bcf", "#5ab26b"];

export default function Celebrate() {
  const bits = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const dist = 60 + (i % 4) * 22;
    return {
      "--cx": `${Math.round(Math.cos(angle) * dist)}px`,
      "--cy": `${Math.round(Math.sin(angle) * dist + 40)}px`,
      "--cr": `${(i % 2 ? 1 : -1) * (180 + i * 20)}deg`,
      "--cd": `${(i % 5) * 40}ms`,
      backgroundColor: COLORS[i % COLORS.length],
    } as React.CSSProperties;
  });
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-1/2"
    >
      {bits.map((style, i) => (
        <span key={i} className="confetti-bit" style={style} />
      ))}
    </span>
  );
}
