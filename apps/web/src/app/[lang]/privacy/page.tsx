import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons";
import { focus, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StickyHeader } from "@/components/sticky-header";
import { getDictionary, getLocale } from "../dictionaries";

export const metadata: Metadata = {
  title: "Privacy Policy — viincnt",
  description: "Privacy policy for viincnt.com. No tracking, no data collection.",
  robots: { index: false },
  alternates: { canonical: "/en/privacy" },
};

export default async function PrivacyPage() {
  const locale = await getLocale();
  if (locale !== "en") redirect("/en/privacy");
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

        <article className="prose-custom mt-6">
          <h1 className="font-serif text-[2.5rem] leading-tight tracking-[-0.02em]">
            Privacy Policy
          </h1>
          <p className="text-ink/45 mt-2 text-[13px]">Last updated: November 2026</p>

          <div className="text-ink/80 mt-8 space-y-7 text-[15px] leading-relaxed">
            <section>
              <h2 className="text-ink font-serif text-[1.4rem] leading-snug tracking-[-0.01em]">
                Overview
              </h2>
              <p className="mt-2">
                This site — <strong className="text-ink font-medium">viincnt.com</strong> — is a
                personal portfolio and contact page. It uses privacy-friendly, cookieless analytics
                and does not collect or store any personally identifiable information.
              </p>
            </section>

            <section>
              <h2 className="text-ink font-serif text-[1.4rem] leading-snug tracking-[-0.01em]">
                Analytics
              </h2>
              <p className="mt-2">
                This site uses{" "}
                <a
                  href="https://vercel.com/analytics"
                  target="_blank"
                  rel="noreferrer"
                  className={`${focus} decoration-ink/30 hover:decoration-ink rounded underline underline-offset-2 transition-colors`}
                >
                  Vercel Analytics
                </a>
                , a privacy-friendly analytics tool. It collects aggregated, anonymised data — page
                views, referrer, country, and device type. No cookies are set, no personal data is
                stored, and no cross-site tracking occurs. For more details, see{" "}
                <a
                  href="https://vercel.com/docs/analytics/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  className={`${focus} decoration-ink/30 hover:decoration-ink rounded underline underline-offset-2 transition-colors`}
                >
                  Vercel's Analytics Privacy Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-ink font-serif text-[1.4rem] leading-snug tracking-[-0.01em]">
                External links
              </h2>
              <p className="mt-2">
                This site links to external platforms (GitHub, LinkedIn, etc.). Once you leave
                viincnt.com, their own privacy policies apply. We have no control over and assume no
                responsibility for the content or practices of those sites.
              </p>
            </section>

            <section>
              <h2 className="text-ink font-serif text-[1.4rem] leading-snug tracking-[-0.01em]">
                Email contact
              </h2>
              <p className="mt-2">
                If you reach out via the email address listed on this site, your message is handled
                in full confidentiality and will not be shared with any third party.
              </p>
            </section>

            <section>
              <h2 className="text-ink font-serif text-[1.4rem] leading-snug tracking-[-0.01em]">
                Hosting
              </h2>
              <p className="mt-2">
                This site is hosted on <strong className="text-ink font-medium">Vercel</strong>.
                Vercel may collect standard server logs (IP address, browser type, referrer) for
                infrastructure and security purposes, as described in their{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  className={`${focus} decoration-ink/30 hover:decoration-ink rounded underline underline-offset-2 transition-colors`}
                >
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-ink font-serif text-[1.4rem] leading-snug tracking-[-0.01em]">
                Contact
              </h2>
              <p className="mt-2">
                Questions? Email{" "}
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
