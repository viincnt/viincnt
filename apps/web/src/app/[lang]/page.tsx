import type { WithContext, Person, WebSite } from "schema-dts";
import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { LiveDot, Pop, Reveal, Unveil } from "@/components/motion";
import { Rich } from "@/components/rich";
import { focus, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StickyHeader } from "@/components/sticky-header";
import { email, projects, socials } from "@/content";
import avatar from "../../../public/viincnt-avatar.jpg";
import landscape from "../../../public/hero-landscape.jpg";
import { getDictionary, getLocale } from "./dictionaries";

const eyebrow = "font-mono text-[11px] uppercase tracking-[0.14em]";

const person: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vicente Matheus",
  url: "https://viincnt.com/en",
  jobTitle: "Product Engineer",
  email: "contact@viincnt.com",
  image: "https://viincnt.com/viincnt-avatar.jpg",
  sameAs: [
    "https://github.com/viincnt",
    "https://www.linkedin.com/in/viincnt",
    "https://www.instagram.com/https_viincent",
  ],
};

const website: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "viincnt",
  url: "https://viincnt.com",
};

export default async function Page() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <div className="mx-auto w-full max-w-[640px] px-4 pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <a
        href="#work"
        className={`${focus} bg-ink text-paper fixed top-3 left-3 z-50 -translate-y-20 rounded-md px-4 py-2.5 text-sm transition-transform focus-visible:translate-y-0`}
      >
        {dict.a11y.skip}
      </a>

      <StickyHeader>
        <SiteHeader locale={locale} dict={dict} contactHref="#contact" />
      </StickyHeader>

      <main>
        {/* Profile */}
        <section aria-labelledby="name" className="mt-6">
          <Unveil className="bg-ink/5 relative aspect-[2/1] overflow-hidden rounded-[12px] sm:aspect-[640/224]">
            <Image
              src={landscape}
              alt=""
              priority
              placeholder="blur"
              quality={65}
              sizes="(min-width: 672px) 640px, 100vw"
              className="size-full object-cover grayscale-[0.2] sepia-[0.12]"
            />
          </Unveil>

          <div className="px-1 sm:px-0">
            <div className="flex items-end justify-between gap-4">
              <Pop delay={0.5} className="relative z-10 -mt-12 ml-3 sm:-mt-14 sm:ml-4">
                <Image
                  src={avatar}
                  alt="viincnt"
                  priority
                  placeholder="blur"
                  sizes="96px"
                  className="ring-paper size-24 rounded-[12px] object-cover ring-4 sm:size-28"
                />
              </Pop>
              <Reveal delay={0.8} eager>
                <nav aria-label={dict.elsewhere.label}>
                  <ul className="flex gap-2">
                    {socials.map(({ label, href, Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          aria-label={label}
                          title={label}
                          target={href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noreferrer"
                          className={`${focus} border-ink/10 text-ink hover:border-ink hover:bg-ink hover:text-paper grid size-11 place-items-center rounded-[8px] border transition-[background-color,color,border-color,translate] duration-300 hover:-translate-y-0.5 active:translate-y-0`}
                        >
                          <Icon className="size-[18px]" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Reveal>
            </div>

            <Reveal delay={0.65} eager className="mt-4">
              <h1 id="name" className="font-serif text-5xl leading-none tracking-[-0.02em]">
                {dict.hero.name}
                <span className="text-clay">.</span>
              </h1>
              <p className="text-ink/60 mt-2 text-sm">{dict.hero.role}</p>
            </Reveal>

            <Reveal delay={0.9} eager className="mt-5">
              <p className="text-ink/80 font-serif text-[1.5rem] leading-[1.2] tracking-[-0.01em] text-pretty">
                <Rich text={dict.hero.lede} em="text-clay" />
              </p>
              <p className="text-ink/70 mt-4 inline-flex items-center gap-2.5 text-[13px]">
                <LiveDot />
                {dict.hero.status}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Selected work */}
        <section id="work" aria-labelledby="work-title" className="mt-20 scroll-mt-6">
          <Reveal>
            <div className="border-ink flex items-baseline justify-between gap-4 border-b pb-4">
              <h2
                id="work-title"
                className="font-serif text-[2.25rem] leading-none tracking-[-0.015em]"
              >
                {dict.work.label}
              </h2>
              <span className={`${eyebrow} text-ink/45`}>
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
            <p className="text-ink/60 mt-4 text-[15px]">{dict.work.intro}</p>
          </Reveal>

          <ol className="mt-6 grid grid-cols-1 gap-3">
            {projects.map((project, index) => {
              const item = dict.work.items[project.id];
              return (
                <li key={project.id}>
                  <Reveal delay={index * 0.06}>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`${focus} group border-ink/10 bg-ink/[0.025] hover:border-ink/20 hover:bg-ink/[0.055] flex flex-col gap-4 rounded-[12px] border p-5 transition-[background-color,border-color] duration-300`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-baseline gap-2.5">
                          <span className={`${eyebrow} text-clay-deep`}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-serif text-[1.5rem] leading-tight tracking-[-0.01em]">
                            {project.name}
                          </h3>
                        </div>
                        <span className="bg-ink text-paper group-hover:bg-clay-deep grid size-8 shrink-0 place-items-center rounded-[8px] transition-[background-color,rotate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
                          <ArrowUpRight className="size-3.5" />
                        </span>
                      </div>
                      <p className="text-ink/65 text-[14px] leading-relaxed text-pretty">
                        {item.description}
                      </p>
                      <p
                        className={`${eyebrow} border-ink/10 text-ink/60 inline-flex w-fit items-center gap-2 rounded-[6px] border px-2.5 py-1 text-[10px]`}
                      >
                        <span
                          aria-hidden
                          className={`size-1.5 rounded-full ${project.id === "deepslate" ? "bg-ink" : "bg-clay"}`}
                        />
                        {item.category} / {item.status}
                      </p>
                      <span className="sr-only">({dict.a11y.newTab})</span>
                    </a>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="mt-16 scroll-mt-6">
          <Reveal>
            <div className="bg-ink text-paper relative overflow-hidden rounded-[16px] px-6 py-9 sm:px-10 sm:py-12">
              <span
                aria-hidden
                className="bg-clay/20 pointer-events-none absolute -top-24 -right-24 size-64 rounded-full blur-3xl"
              />
              <p className={`${eyebrow} text-clay`}>{dict.contact.label}</p>
              <h2
                id="contact-title"
                className="mt-5 font-serif text-[clamp(2.75rem,9vw,4rem)] leading-[0.95] tracking-[-0.02em]"
              >
                {dict.contact.titleStart}
                <br />
                <em className="text-clay">{dict.contact.titleEnd}</em>
              </h2>
              <p className="text-paper/65 mt-5 max-w-[42ch] text-[15px] leading-relaxed text-pretty">
                {dict.contact.body}
              </p>

              <a
                href={`mailto:${email}`}
                className="group border-paper/20 hover:border-clay focus-visible:border-clay mt-8 flex items-center justify-between gap-4 border-b pb-3 font-serif text-[clamp(1.4rem,5vw,1.9rem)] leading-none transition-colors duration-300 outline-none"
              >
                <span className="break-all">{email}</span>
                <ArrowUpRight className="text-clay size-5 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
              </a>
              <a
                href={`mailto:${email}`}
                className="bg-clay text-paper hover:bg-clay-deep focus-visible:ring-paper focus-visible:ring-offset-ink mt-8 inline-flex h-11 items-center gap-2 rounded-[8px] px-5 text-[13px] font-medium transition-[background-color,scale] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97]"
              >
                {dict.contact.cta}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter locale={locale} dict={dict} />
    </div>
  );
}
