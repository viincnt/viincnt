import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons";
import { focus, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StickyHeader } from "@/components/sticky-header";
import { getDictionary, getLocale } from "../dictionaries";

export const metadata: Metadata = {
  title: "Terms of Use — viincnt",
  description: "Terms of use and photo credits for viincnt.com.",
  robots: { index: false },
  alternates: { canonical: "/en/terms" },
};

export default async function TermsPage() {
  const locale = await getLocale();
  if (locale !== "en") redirect("/en/terms");
  const dict = await getDictionary();

  return (
    <div className="mx-auto w-full max-w-[640px] px-4 pb-8">
      <StickyHeader>
        <SiteHeader locale={locale} dict={dict} contactHref={`/${locale}#contact`} />
      </StickyHeader>

      <main className="mt-10">
        <Link
          href={`/${locale}`}
          className={`${focus} text-ink/50 hover:text-ink inline-flex items-center gap-1.5 rounded text-[13px] transition-colors`}
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>

        <article className="mt-6">
          <h1 className="font-serif text-[2.5rem] leading-tight tracking-[-0.02em]">
            Terms of Use
          </h1>
          <p className="text-ink/45 mt-2 text-[13px]">Last updated: November 2026</p>

          <div className="text-ink/80 mt-8 space-y-7 text-[15px] leading-relaxed">
            <section>
              <h2 className="text-ink font-serif text-[1.4rem] leading-snug tracking-[-0.01em]">
                Use of this site
              </h2>
              <p className="mt-2">
                This site is provided for informational purposes only. By accessing viincnt.com, you
                agree not to reproduce, duplicate, copy, or redistribute the content without prior
                written permission.
              </p>
            </section>

            <section>
              <h2 className="text-ink font-serif text-[1.4rem] leading-snug tracking-[-0.01em]">
                Intellectual property
              </h2>
              <p className="mt-2">
                All text, design, and code on this site are the property of Vicente Matheus unless
                otherwise credited. The projects listed under "Selected Work" remain the property of
                their respective owners.
              </p>
            </section>

            <section>
              <h2 className="text-ink font-serif text-[1.4rem] leading-snug tracking-[-0.01em]">
                Disclaimer
              </h2>
              <p className="mt-2">
                The information on this site is provided "as is." No warranties of any kind, express
                or implied, are made regarding accuracy, reliability, or fitness for a particular
                purpose. We reserve the right to modify or discontinue the site at any time without
                notice.
              </p>
            </section>

            <section>
              <h2 className="text-ink font-serif text-[1.4rem] leading-snug tracking-[-0.01em]">
                External links
              </h2>
              <p className="mt-2">
                This site contains links to external websites. We have no control over those sites
                and accept no responsibility for their content, privacy practices, or availability.
              </p>
            </section>

            <section>
              <h2 className="text-ink font-serif text-[1.4rem] leading-snug tracking-[-0.01em]">
                Photography credits
              </h2>
              <p className="mt-2">
                The banner photograph used on this site is{" "}
                <em>Red and green trees near river during daytime</em> by{" "}
                <a
                  href="https://unsplash.com/@dillonaustin"
                  target="_blank"
                  rel="noreferrer"
                  className={`${focus} decoration-ink/30 hover:decoration-ink rounded underline underline-offset-2 transition-colors`}
                >
                  Dillon Austin
                </a>{" "}
                via{" "}
                <a
                  href="https://unsplash.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`${focus} decoration-ink/30 hover:decoration-ink rounded underline underline-offset-2 transition-colors`}
                >
                  Unsplash
                </a>
                , used under the{" "}
                <a
                  href="https://unsplash.com/license"
                  target="_blank"
                  rel="noreferrer"
                  className={`${focus} decoration-ink/30 hover:decoration-ink rounded underline underline-offset-2 transition-colors`}
                >
                  Unsplash License
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-ink font-serif text-[1.4rem] leading-snug tracking-[-0.01em]">
                Contact
              </h2>
              <p className="mt-2">
                Questions?{" "}
                <a
                  href="mailto:contact@viincnt.com"
                  className={`${focus} decoration-ink/30 hover:decoration-ink rounded underline underline-offset-2 transition-colors`}
                >
                  contact@viincnt.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter locale={locale} dict={dict} />
    </div>
  );
}
