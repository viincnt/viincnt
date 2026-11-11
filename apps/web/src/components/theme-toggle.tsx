"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Moon, Monitor, Sun } from "@/components/icons";

type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "theme";

const options: {
  value: Theme;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

function applyTheme(theme: Theme) {
  if (theme === "system") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === "dark" || stored === "light") {
        setTheme(stored);
        applyTheme(stored);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function select(value: Theme) {
    setTheme(value);
    applyTheme(value);
    try {
      if (value === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setOpen(false);
  }

  const current = options.find((o) => o.value === theme)!;

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-label={`Theme: ${current.label}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="border-ink/10 text-ink hover:border-ink/30 focus-visible:ring-clay flex h-11 items-center gap-2 rounded-[8px] border px-3 font-mono text-[11px] tracking-[0.08em] transition-colors duration-300 outline-none focus-visible:ring-2"
      >
        <current.Icon className="size-[15px]" />
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          className={`text-ink/50 size-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M3 4.5 6 7.5l3-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={menuId}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 1, originY: 0 }}
            className="border-ink/10 bg-paper absolute top-full right-0 z-30 mt-2 w-36 rounded-[10px] border p-1 shadow-[0_12px_32px_-12px_rgb(20_20_19/0.25)]"
          >
            {options.map(({ value, label, Icon }) => {
              const active = value === theme;
              return (
                <li key={value}>
                  <button
                    type="button"
                    onClick={() => select(value)}
                    className={`focus-visible:bg-ink/5 flex w-full items-center gap-3 rounded-[8px] px-2.5 py-2 text-[13px] transition-colors duration-200 outline-none ${
                      active ? "text-ink" : "text-ink/65 hover:bg-ink/5 hover:text-ink"
                    }`}
                  >
                    <Icon className="size-[15px]" />
                    <span className="flex-1 text-left">{label}</span>
                    {active && <span aria-hidden className="bg-clay size-1.5 rounded-full" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
