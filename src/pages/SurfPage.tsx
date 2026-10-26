import { Check, Compass } from 'lucide-react';
import { surfPhotos, type Photo } from '@/data/packages';
import { copy } from '@/i18n';
import { Seo } from '@/components/Seo';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/sections/PageHero';
import { QuizTeaser } from '@/components/sections/QuizTeaser';
import { QuizLink } from '@/components/cta/CtaLinks';

function Feature({ eyebrow, title, text, points, photo, flip }: {
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  photo: Photo;
  flip?: boolean;
}) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal className={flip ? 'lg:order-2' : ''}>
          <Img photo={photo} className="aspect-[4/3] w-full rounded-[2rem]" />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow={eyebrow} title={title} text={text} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-navy-900/5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ocean-600 text-white">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-navy-800">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function SurfPage() {
  const t = copy.pages.surf;
  return (
    <>
      <Seo title={t.seo.title} description={t.seo.description} image={surfPhotos.hero.src} />
      <PageHero photo={surfPhotos.hero} eyebrow={t.hero.eyebrow} title={t.hero.title} text={t.hero.text}>
        <QuizLink source="surf_hero" className="btn-primary px-8 py-4 text-base">
          <Compass className="h-5 w-5" aria-hidden="true" />
          {copy.common.nav.findTrip}
        </QuizLink>
      </PageHero>
      <Feature {...t.lessons} photo={surfPhotos.lesson} />
      <div className="bg-sand-50">
        <Feature {...t.guiding} photo={surfPhotos.guiding} flip />
      </div>
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow={t.levels.eyebrow} title={t.levels.title} />
          </Reveal>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.levels.items.map((l, i) => (
              <li key={l.title}>
                <Reveal delay={i * 0.08} className="card card-hover h-full p-6">
                  <div className="flex items-center gap-1" aria-hidden="true">
                    {Array.from({ length: 4 }, (_, j) => (
                      <span key={j} className={`h-2 flex-1 rounded-full ${j <= i ? 'bg-coral-500' : 'bg-navy-100'}`} />
                    ))}
                  </div>
                  <h3 className="mt-5 font-display text-3xl font-bold uppercase text-navy-900">{l.title}</h3>
                  <p className="mt-2 text-navy-600">{l.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <QuizTeaser source="surf_end" />
    </>
  );
}
