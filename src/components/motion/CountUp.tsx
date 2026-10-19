"use client";
import { useEffect, useRef, useState } from "react";

// Counts a number up from zero when it scrolls into view. Accepts text like
// "$1,200" or "8/10": the first number is animated, the rest is kept.
// The final text always stays in the DOM (invisible while counting), so the
// width never changes, screen readers read the real value, and reduced-motion
// users simply see the final value.
export default function CountUp({
  value,
  duration = 1200,
  className = "",
}: {
  value: string | number;
  duration?: number;
  className?: string;
}) {
  const text = String(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    const match = text.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const prefix = match[1];
    const numText = match[2];
    const suffix = match[3];
    const target = parseFloat(numText.replace(/,/g, ""));
    const decimals = numText.includes(".") ? numText.split(".")[1].length : 0;
    const grouped = numText.includes(",");
    const format = (n: number) =>
      prefix +
      n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouped,
      }) +
      suffix;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        if (p < 1) {
          setDisplay(format(target * eased));
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(null);
        }
      };
      setDisplay(format(0));
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text, duration]);

  return (
    <span ref={ref} className={`relative inline-block tabular-nums ${className}`}>
      <span className={display === null ? "" : "invisible"}>{text}</span>
      {display !== null && (
        <span className="absolute left-0 top-0" aria-hidden="true">
          {display}
        </span>
      )}
    </span>
  );
}
