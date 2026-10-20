"use client";
import { useEffect, useState, type ReactNode } from "react";

// Fixed top bar. Transparent over the hero, then frosted white once the page has scrolled.
export default function ScrolledBar({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-scrolled={scrolled}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/85 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {children}
    </div>
  );
}
