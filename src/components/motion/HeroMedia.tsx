"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

// Hero photo: slow zoom on load (CSS) and a gentle parallax on scroll,
// desktop only and never for reduced-motion users.
export default function HeroMedia({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );
    if (!mq.matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, 700);
      el.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      <div ref={ref} className="h-full w-full will-change-transform">
        <Image
          src={src}
          alt={alt}
          width={500}
          height={500}
          priority
          className="hero-zoom h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
