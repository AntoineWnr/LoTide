import type { ReactNode } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { surfPhotos } from '@/data/packages';
import { copy } from '@/i18n';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';
import { QuizLink } from '@/components/cta/CtaLinks';

interface Props {
  source: string;
  title?: string;
  text?: string;
  secondary?: ReactNode;
}

export function QuizTeaser({ source, title = copy.quiz.teaser.title, text = copy.quiz.teaser.text, secondary }: Props) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-navy-900 text-white">
          <Img photo={surfPhotos.sunset} className="absolute inset-0 h-full w-full opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-navy-900/20" />
          <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-ocean-200">
                <Compass className="h-3.5 w-3.5" aria-hidden="true" />{copy.common.quizBadge}
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] sm:text-6xl">{title}</h2>
              <p className="mt-4 max-w-xl text-lg text-white/85">{text}</p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <QuizLink source={source} className="btn-primary px-8 py-4 text-base">
                {copy.quiz.teaser.cta}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </QuizLink>
              {secondary}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
