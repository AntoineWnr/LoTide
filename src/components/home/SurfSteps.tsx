import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CloudSun, Waves, Video } from 'lucide-react';
import { surfPhotos } from '@/data/packages';
import { copy } from '@/i18n';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STEP_ICONS = [CloudSun, BookOpen, Waves, Video];

export function SurfSteps() {
  const t = copy.pages.home.surf;
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <Img photo={surfPhotos.lesson} className="aspect-[4/5] w-full rounded-[2rem]" />
          <div className="absolute -bottom-6 -right-2 hidden w-48 overflow-hidden rounded-3xl ring-8 ring-shell sm:block lg:-right-8">
            <Img photo={surfPhotos.boards} className="aspect-square w-full" />
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionHeading eyebrow={t.eyebrow} title={t.title} text={t.text} />
          </Reveal>
          <ol className="mt-10 space-y-6">
            {t.steps.map((s, i) => {
              const StepIcon = STEP_ICONS[i];
              return (
                <li key={s.title}>
                  <Reveal delay={i * 0.08} className="group flex gap-5">
                    <div className="relative flex flex-col items-center">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ocean-600 text-white transition group-hover:rotate-6 group-hover:bg-coral-500">
                        <StepIcon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      {i < t.steps.length - 1 && <span className="mt-2 w-px flex-1 bg-ocean-200" aria-hidden="true" />}
                    </div>
                    <div className="pb-2">
                      <p className="text-xs font-bold uppercase tracking-widest text-ocean-600">{copy.common.stepN(i + 1)}</p>
                      <h3 className="font-display text-2xl font-bold uppercase text-navy-900">{s.title}</h3>
                      <p className="mt-1 text-navy-600">{s.text}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
          <Reveal>
            <Link to="/surf" className="btn-outline mt-6">
              {t.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
