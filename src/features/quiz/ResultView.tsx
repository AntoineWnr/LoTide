import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Check, Flame, Info, MessageCircle, RotateCcw, Sparkles } from 'lucide-react';
import { reviews, site } from '@/data/packages';
import { copy } from '@/i18n';
import { Icon } from '@/components/ui/Icon';
import { Img } from '@/components/ui/Img';
import { Stars } from '@/components/ui/Stars';
import { BookLink, WhatsAppLink } from '@/components/cta/CtaLinks';
import { track } from '@/lib/analytics';
import { quizSummaryMessage } from '@/lib/whatsapp';
import { recommend } from './recommend';
import { EmailCapture } from './EmailCapture';
import type { CompleteAnswers } from './types';

const fmt = (n: number) => `${n.toLocaleString('en-US')} ${site.currency}`;

export function ResultView({ answers, onRestart }: { answers: CompleteAnswers; onRestart: () => void }) {
  const t = copy.quiz.result;
  const [chosenId, setChosenId] = useState<string>();
  const rec = useMemo(() => recommend(answers, chosenId), [answers, chosenId]);
  const altRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const campReviews = reviews.filter((r) => r.camp === rec.camp.id).slice(0, 2);
  const privateNote = answers.room === 'private' && !rec.camp.privateRooms.available ? rec.camp.privateRooms.note : undefined;
  const trackingExtra = { package: rec.pkg.id, nights: rec.nights };

  useEffect(() => {
    track('quiz_completed', { camp: rec.camp.id, package: rec.pkg.id, nights: rec.nights, level: answers.level });
    // track once per completed quiz, not on alternative swaps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (id: string) => {
    setChosenId(id);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const notes = [rec.locationNote, rec.roomNote, privateNote].filter(Boolean) as string[];

  return (
    <div ref={topRef} className="scroll-mt-24 pb-16">
      <motion.div
        key={rec.pkg.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2rem]"
      >
        <Img photo={rec.pkg.photo} eager className="h-[22rem] w-full sm:h-[26rem]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t.eyebrow}
            </span>
            {site.urgency.enabled && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-coral-500 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                {site.urgency.text}
              </span>
            )}
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] sm:text-6xl">{rec.title}</h1>
          <p className="mt-2 max-w-xl text-white/85">{rec.pkg.tagline}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-white/90">
            <Stars rating={site.rating.value} />
            <span>{t.ratingLabel(site.rating.value, site.rating.count)}</span>
          </div>
        </div>
      </motion.div>

      {notes.length > 0 && (
        <div className="mt-4 space-y-2">
          {notes.map((n) => (
            <p key={n} className="flex items-start gap-3 rounded-2xl bg-ocean-50 p-4 text-ocean-800">
              <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              {n}
            </p>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-3xl font-bold uppercase text-navy-900">{t.whyFits}</h2>
            <ul className="mt-4 grid gap-3">
              {rec.reasons.map((r, i) => (
                <motion.li
                  key={r}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-navy-900/5"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-coral-500 text-white">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="font-medium text-navy-800">{r}</span>
                </motion.li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-bold uppercase text-navy-900">{t.included}</h2>
            <p className="mt-1 text-navy-500">{rec.pkg.sessions}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {rec.pkg.inclusions.map((inc) => (
                <li key={inc.label} className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-navy-900/5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ocean-50 text-ocean-700">
                    <Icon name={inc.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-navy-800">{inc.label}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-navy-900 p-6 text-white">
            <p className="text-sm text-white/70">
              {t.priceFrom}{' '}
              <span className="font-display text-5xl font-bold text-white">{fmt(rec.pricePerNight)}</span>{' '}
              {t.perPersonNight}
            </p>
            <div className="mt-5 rounded-2xl bg-white/10 p-4">
              <p className="flex items-center gap-2 text-sm text-white/80">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {t.totalEstimate(rec.nights)}
              </p>
              <p className="mt-1 font-display text-3xl font-bold">
                ≈ {fmt(rec.totalPerPerson)} <span className="font-sans text-sm font-normal text-white/70">{t.perPerson}</span>
              </p>
            </div>
            <p className="mt-3 text-xs text-white/60">{t.priceNote}</p>

            <BookLink camp={rec.camp.id} source="quiz_result" extra={trackingExtra} className="btn-primary mt-6 w-full py-4 text-base">
              {t.book}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </BookLink>
            <WhatsAppLink
              camp={rec.camp.id}
              source="quiz_result"
              extra={trackingExtra}
              message={quizSummaryMessage(answers, rec)}
              className="btn mt-3 w-full bg-[#25D366] py-4 text-base text-white hover:-translate-y-0.5 hover:bg-[#1ebe5a]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {t.whatsapp}
            </WhatsAppLink>
            <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <button
                type="button"
                onClick={() => altRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="rounded font-medium text-white/80 underline-offset-4 transition hover:text-white hover:underline"
              >
                {t.otherOptions}
              </button>
              <button
                type="button"
                onClick={onRestart}
                className="inline-flex items-center gap-1.5 rounded font-medium text-white/80 underline-offset-4 transition hover:text-white hover:underline"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                {t.restart}
              </button>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-3xl font-bold uppercase text-navy-900">{t.reviewsTitle}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {campReviews.map((r) => (
            <figure key={r.name} className="rounded-3xl bg-white p-6 ring-1 ring-navy-900/5">
              <Stars rating={r.rating} />
              <blockquote className="mt-3 text-navy-700">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-bold text-navy-900">
                {r.name} <span className="font-normal text-navy-500">· {r.country}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <EmailCapture answers={answers} rec={rec} />
      </div>

      <section ref={altRef} className="mt-12 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold uppercase text-navy-900">{t.alternativesTitle}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {rec.alternatives.map((p) => (
            <article key={p.id} className="card card-hover group overflow-hidden">
              <div className="relative h-44 overflow-hidden">
                <Img photo={p.photo} className="h-full w-full transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-navy-900">
                  {p.camp === 'lombok' ? 'Lombok' : 'Bali'}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl font-bold uppercase text-navy-900">{p.name}</h3>
                <p className="mt-1 text-sm text-navy-500">{p.tagline}</p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-sm text-navy-500">
                    {t.priceFrom} <span className="font-display text-2xl font-bold text-navy-900">{fmt(p.pricePerNight)}</span>
                  </p>
                  <button type="button" onClick={() => choose(p.id)} className="btn-outline !px-4 !py-2 text-xs">
                    {t.choose}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
