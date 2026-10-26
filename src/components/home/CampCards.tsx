import { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import { campList, site } from '@/data/packages';
import { copy } from '@/i18n';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BookLink } from '@/components/cta/CtaLinks';

export function CampCards() {
  const t = copy.pages.home.camps;
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {campList.map((camp, i) => (
            <Reveal key={camp.id} delay={i * 0.1}>
              <article className="card card-hover group flex h-full flex-col overflow-hidden">
                <Link to={`/${camp.id}`} className="relative block h-72 overflow-hidden sm:h-80" tabIndex={-1} aria-hidden="true">
                  <Img photo={camp.card} className="h-full w-full transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent" />
                  <span className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-navy-900">
                    {copy.common.priceFrom(`${camp.priceFrom} ${site.currency}`)}
                  </span>
                  <div className="absolute bottom-5 left-6 text-white">
                    <p className="flex items-center gap-1.5 text-sm text-white/90">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {camp.region}
                    </p>
                    <p className="font-display text-5xl font-bold uppercase leading-none">{camp.shortName}</p>
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-bold uppercase text-navy-900">{camp.tagline}</h3>
                  <ul className="mt-4 flex-1 space-y-2.5">
                    {camp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-navy-700">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-ocean-600" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link to={`/${camp.id}`} className="btn-outline flex-1">
                      {copy.common.discover} {camp.shortName}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <BookLink camp={camp.id} source="home_camp_card" className="btn-primary flex-1">
                      {copy.common.bookCamp}
                    </BookLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
