import { ArrowUpRight, BedDouble, Check, Clock, MapPin, MessageCircle, Navigation, Waves } from 'lucide-react';
import { packagesForCamp, reviews, site, type Camp, type Level } from '@/data/packages';
import { copy } from '@/i18n';
import { Icon } from '@/components/ui/Icon';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BookLink, WhatsAppLink } from '@/components/cta/CtaLinks';

const LEVEL_LABEL: Record<Level, string> = {
  never: copy.quiz.level.options.never.label,
  beginner: copy.quiz.level.options.beginner.label,
  intermediate: copy.quiz.level.options.intermediate.label,
  advanced: copy.quiz.level.options.advanced.label,
};

export function CampIntro({ camp }: { camp: Camp }) {
  const t = copy.pages.camp.amenities;
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow={camp.region} title={camp.tagline} text={camp.intro} />
          <ul className="mt-8 space-y-3">
            {camp.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-navy-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-ocean-600" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[2rem] bg-sand-50 p-6 sm:p-8">
            <p className="eyebrow">{t.eyebrow}</p>
            <h3 className="mt-2 font-display text-3xl font-bold uppercase text-navy-900">{t.title}</h3>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {camp.amenities.map((a) => (
                <li key={a.label} className="flex items-center gap-3 rounded-2xl bg-white p-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ocean-50 text-ocean-700">
                    <Icon name={a.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-navy-800">{a.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CampRooms({ camp }: { camp: Camp }) {
  const t = copy.pages.camp.rooms;
  return (
    <section className="bg-sand-50 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        </Reveal>
        <div className={`mt-12 grid gap-6 md:grid-cols-2 ${camp.rooms.length > 2 ? 'lg:grid-cols-3' : ''}`}>
          {camp.rooms.map((room, i) => (
            <Reveal key={room.id} delay={i * 0.08}>
              <article className="card card-hover group flex h-full flex-col overflow-hidden">
                <div className="relative h-60 overflow-hidden">
                  <Img photo={room.photo} className="h-full w-full transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-900">
                    <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
                    {copy.common.bedsN(room.beds)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-bold uppercase text-navy-900">{room.name}</h3>
                  <p className="mt-2 text-navy-600">{room.description}</p>
                  <ul className="mt-4 flex-1 space-y-1.5 text-sm text-navy-700">
                    {room.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-ocean-600" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-navy-50 pt-5">
                    <p className="text-sm text-navy-500">
                      {t.from}{' '}
                      <span className="font-display text-3xl font-bold text-navy-900">
                        {room.priceFrom} {site.currency}
                      </span>{' '}
                      {t.perNight}
                    </p>
                    <BookLink camp={camp.id} source={`room_${room.id}`} className="btn-primary !px-5 !py-2.5 text-xs">
                      {t.bookRoom}
                    </BookLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {!camp.privateRooms.available && (
          <p className="mt-6 text-sm text-navy-500">
            {camp.privateRooms.note}{' '}
            <WhatsAppLink camp={camp.id} source="private_room_note" className="font-bold text-ocean-700 underline underline-offset-4">
              WhatsApp
            </WhatsAppLink>
          </p>
        )}
      </div>
    </section>
  );
}

export function CampPackages({ camp }: { camp: Camp }) {
  const t = copy.pages.camp.packages;
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packagesForCamp(camp.id).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <article className="card card-hover flex h-full flex-col p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  {p.levels.map((l) => (
                    <span key={l} className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ocean-700">
                      {LEVEL_LABEL[l]}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 font-display text-3xl font-bold uppercase text-navy-900">{p.name}</h3>
                <p className="mt-1 text-navy-600">{p.tagline}</p>
                <dl className="mt-5 space-y-2 text-sm text-navy-700">
                  <div className="flex items-start gap-2">
                    <dt className="sr-only">Sessions</dt>
                    <Waves className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" aria-hidden="true" />
                    <dd>{p.sessions}</dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <dt className="sr-only">Duration</dt>
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" aria-hidden="true" />
                    <dd>{t.minNights(p.minNights)}</dd>
                  </div>
                </dl>
                <ul className="mt-5 flex-1 space-y-2 border-t border-navy-50 pt-5 text-sm text-navy-700">
                  {p.inclusions.map((inc) => (
                    <li key={inc.label} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-ocean-600" aria-hidden="true" />
                      {inc.label}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-navy-500">
                  {copy.pages.camp.rooms.from}{' '}
                  <span className="font-display text-4xl font-bold text-navy-900">
                    {p.pricePerNight} {site.currency}
                  </span>{' '}
                  {t.perNight}
                </p>
                <BookLink camp={camp.id} source={`package_${p.id}`} className="btn-primary mt-5 w-full">
                  {copy.common.bookCamp}
                </BookLink>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CampSpots({ camp }: { camp: Camp }) {
  const t = copy.pages.camp.spots;
  return (
    <section className="bg-ocean-800 py-20 text-white sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} light />
          <div className="mt-8 grid grid-cols-2 gap-3">
            {camp.gallery.slice(0, 2).map((p) => (
              <Img key={p.src} photo={p} className="aspect-[3/4] w-full rounded-3xl" />
            ))}
          </div>
        </Reveal>
        <ol className="divide-y divide-white/10 border-y border-white/10">
          {camp.surfSpots.map((s, i) => (
            <li key={s.name}>
              <Reveal delay={i * 0.05} className="group flex gap-6 py-6">
                <span className="font-display text-4xl font-bold text-ocean-300 transition group-hover:text-coral-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-3xl font-bold uppercase">{s.name}</h3>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ocean-100">
                      {s.level}
                    </span>
                  </div>
                  <p className="mt-2 text-white/80">{s.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CampMap({ camp }: { camp: Camp }) {
  const t = copy.pages.camp.map;
  const query = encodeURIComponent(`${camp.name}, ${camp.address}`);
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
          <p className="mt-6 flex gap-3 text-navy-700">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-coral-500" aria-hidden="true" />
            {camp.address}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${query}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              {t.open}
            </a>
            <WhatsAppLink camp={camp.id} source="camp_map" className="btn bg-[#25D366] text-white hover:bg-[#1ebe5a]">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {camp.phoneDisplay}
            </WhatsAppLink>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-[2rem] ring-1 ring-navy-900/5">
          <iframe
            title={`Map showing ${camp.name}`}
            src={`https://www.google.com/maps?q=${query}&output=embed`}
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function CampBookCta({ camp }: { camp: Camp }) {
  return (
    <BookLink camp={camp.id} source="camp_quiz_cta" className="btn-ghost-light px-8 py-4 text-base">
      {copy.pages.camp.cta.book}
      <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
    </BookLink>
  );
}

export const campReviews = (camp: Camp) => reviews.filter((r) => r.camp === camp.id);
