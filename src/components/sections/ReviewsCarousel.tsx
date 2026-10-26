import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { camps, site, type Review } from '@/data/packages';
import { copy } from '@/i18n';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Stars } from '@/components/ui/Stars';

interface Props {
  items: Review[];
  eyebrow: string;
  title: string;
}

export function ReviewsCarousel({ items, eyebrow, title }: Props) {
  const t = copy.pages.home.reviews;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (d: number) => setIndex((i) => (i + d + items.length) % items.length);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  if (items.length === 0) return null;
  const r = items[index];
  const arrow = 'grid h-12 w-12 place-items-center rounded-full bg-white text-navy-900 ring-1 ring-navy-900/10 transition hover:bg-navy-900 hover:text-white';

  return (
    <section className="bg-sand-100 py-20 sm:py-28" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} align="center" />
          <p className="mt-4 flex items-center justify-center gap-2 text-navy-600">
            <Stars rating={site.rating.value} />
            {copy.quiz.result.ratingLabel(site.rating.value, site.rating.count)}
          </p>
        </Reveal>
        <div className="relative mx-auto mt-12 max-w-3xl" aria-roledescription="carousel" aria-live="polite">
          <Quote className="absolute -top-6 left-0 h-16 w-16 text-sand-300" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="relative text-center"
            >
              <blockquote className="font-display text-3xl font-semibold leading-[1.2] text-navy-900 sm:text-4xl">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-8 flex flex-col items-center gap-2">
                <Stars rating={r.rating} />
                <span className="font-bold text-navy-900">
                  {r.name}, {r.country}
                </span>
                <span className="text-sm text-navy-500">{camps[r.camp].name}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          {items.length > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button type="button" className={arrow} onClick={() => go(-1)} aria-label={t.prev}>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="flex gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`${item.name}, ${item.country}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-coral-500' : 'w-2 bg-navy-200 hover:bg-navy-300'}`}
                  />
                ))}
              </div>
              <button type="button" className={arrow} onClick={() => go(1)} aria-label={t.next}>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
