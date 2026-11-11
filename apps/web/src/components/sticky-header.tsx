"use client";
import { useEffect, useState } from "react";

export function StickyHeader({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`sticky top-0 z-40 py-4 transition-[background-color,backdrop-filter] duration-300 sm:py-5 ${
        scrolled ? "bg-paper/80 backdrop-blur-md" : ""
      }`}
    >
      {children}
    </div>
  );
}
