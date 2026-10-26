import { Link } from 'react-router-dom';
import { ArrowRight, Instagram } from 'lucide-react';
import { instagramPhotos, site } from '@/data/packages';
import { copy } from '@/i18n';
import { Accordion } from '@/components/ui/Accordion';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function FaqPreview() {
  const t = copy.pages.home.faq;
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
          <Link to="/faq" className="btn-outline mt-8">
            {t.more}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion items={copy.faq.home} />
        </Reveal>
      </div>
    </section>
  );
}

export function InstagramGrid() {
  const t = copy.pages.home.instagram;
  return (
    <section className="pb-20 sm:pb-28">
      <div className="container-x">
        <Reveal className="flex flex-col items-center text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-3 font-display text-4xl font-bold uppercase text-navy-900 transition hover:text-coral-500 sm:text-5xl"
          >
            <Instagram className="h-8 w-8" aria-hidden="true" />
            {site.socials.instagramHandle}
          </a>
        </Reveal>
        <ul className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
          {instagramPhotos.map((p) => (
            <li key={p.src}>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl"
                aria-label={`${p.alt} on Instagram`}
              >
                <Img photo={p} className="aspect-square w-full transition duration-500 group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center bg-navy-900/0 text-white opacity-0 transition group-hover:bg-navy-900/40 group-hover:opacity-100">
                  <Instagram className="h-7 w-7" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
