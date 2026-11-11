import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { Pop, Reveal } from "@/components/motion";
import { focus, SiteFooter, SiteHeader } from "@/components/site-chrome";
import avatar from "../../../public/viincnt-avatar.jpg";
import { getDictionary, getLocale } from "./dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: `${dict.notFound.title.replace(/\.$/, "")} — viincnt` };
}

export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[640px] flex-col px-4 pt-6 pb-8 sm:pt-8">
      <SiteHeader locale={locale} dict={dict} contactHref={`/${locale}#contact`} />

      <main className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <Pop>
          <Image
            src={avatar}
            alt=""
            priority
            placeholder="blur"
            sizes="80px"
            className="size-20 rounded-[12px] object-cover grayscale"
          />
        </Pop>
        <Reveal delay={0.15} className="mt-8 flex flex-col items-center">
          <p className="text-clay-deep font-mono text-[11px] tracking-[0.14em] uppercase">
            {dict.notFound.label}
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.25rem,7vw,3rem)] leading-[1.05] tracking-[-0.02em] text-balance">
            {dict.notFound.title}
          </h1>
          <p className="text-ink/65 mt-4 max-w-[36ch] text-[15px] leading-relaxed text-pretty">
            {dict.notFound.body}
          </p>
          <Link
            href={`/${locale}`}
            className={`${focus} group bg-ink text-paper hover:bg-clay-deep mt-8 inline-flex h-11 items-center gap-2 rounded-[8px] px-5 text-[13px] font-medium transition-colors duration-300 active:scale-[0.97]`}
          >
            {dict.notFound.back}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </Reveal>
      </main>

      <SiteFooter locale={locale} dict={dict} />
    </div>
  );
}
