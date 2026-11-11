import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ArrowUpRight, Logo } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CurrentYear } from "@/components/current-year";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/i18n-config";

export const focus =
  "outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

export function SiteHeader({
  locale,
  dict,
  contactHref,
}: {
  locale: Locale;
  dict: Dictionary;
  contactHref: string;
}) {
  return (
    <header className="flex items-center justify-between gap-3">
      <Link
        href={`/${locale}`}
        aria-label={dict.a11y.home}
        className={`${focus} group flex items-center gap-3 rounded-md`}
      >
        <Logo className="size-9 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6" />
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LanguageSwitcher current={locale} label={dict.a11y.language} />
        <a
          href={contactHref}
          aria-label={dict.header.contact}
          className={`${focus} group bg-ink text-paper hover:bg-clay-deep inline-flex h-11 items-center gap-2 rounded-[8px] px-4 text-[13px] font-medium transition-colors duration-300 active:scale-[0.97]`}
        >
          <span className="hidden sm:inline">{dict.header.contact}</span>
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
        </a>
      </div>
    </header>
  );
}

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-ink/10 text-ink/50 mt-8 flex items-center justify-between gap-4 border-t px-1 pt-6 text-[13px]">
      <Link href={`/${locale}`} className={`${focus} hover:text-ink rounded transition-colors`}>
        © <CurrentYear /> viincnt &middot; {dict.footer.rights}
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/en/terms" className={`${focus} hover:text-ink rounded transition-colors`}>
          Terms
        </Link>
        <Link href="/en/privacy" className={`${focus} hover:text-ink rounded transition-colors`}>
          Privacy
        </Link>
      </div>
    </footer>
  );
}
