"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { htmlLang, localeCookie, localeMeta, locales, type Locale } from "@/i18n-config";

// Lets the proxy honour an explicit choice over Accept-Language on later visits to /
function remember(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

function Flag({ locale, className }: { locale: Locale; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- tiny local SVGs, no optimisation needed
  return <img src={localeMeta[locale].flag} alt="" width={20} height={20} className={className} />;
}

export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-label={`${label}: ${localeMeta[current].name}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="border-ink/10 text-ink hover:border-ink/30 focus-visible:ring-clay flex h-11 items-center gap-2 rounded-[8px] border pr-2.5 pl-3 font-mono text-[11px] tracking-[0.08em] transition-colors duration-300 outline-none focus-visible:ring-2"
      >
        <Flag locale={current} className="size-5" />
        {current.toUpperCase()}
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
            className="border-ink/10 bg-paper absolute top-full right-0 z-30 mt-2 w-44 rounded-[10px] border p-1 shadow-[0_12px_32px_-12px_rgb(20_20_19/0.25)]"
          >
            {locales.map((locale) => {
              const active = locale === current;
              return (
                <li key={locale}>
                  <Link
                    href={`/${locale}`}
                    hrefLang={htmlLang[locale]}
                    lang={htmlLang[locale]}
                    aria-current={active ? "page" : undefined}
                    onClick={() => {
                      remember(locale);
                      setOpen(false);
                    }}
                    className={`focus-visible:bg-ink/5 flex items-center gap-3 rounded-[8px] px-2.5 py-2 text-[13px] transition-colors duration-200 outline-none ${
                      active ? "text-ink" : "text-ink/65 hover:bg-ink/5 hover:text-ink"
                    }`}
                  >
                    <Flag locale={locale} className="size-5" />
                    <span className="flex-1">{localeMeta[locale].name}</span>
                    {active && <span aria-hidden className="bg-clay size-1.5 rounded-full" />}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
