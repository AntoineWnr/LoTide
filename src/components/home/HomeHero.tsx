import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Compass, Star } from 'lucide-react';
import { site } from '@/data/packages';
import { copy } from '@/i18n';
import { QuizLink } from '@/components/cta/CtaLinks';
import { CampChooser } from '@/components/cta/CampChooser';

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = () => setMobile(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return mobile;
}

export function HomeHero() {
  const t = copy.pages.home.hero;
  const mobile = useIsMobile();
  const { desktop, mobile: mobileSrc, poster, posterMobile } = site.heroVideo;
  const videoSrc = mobile ? mobileSrc || desktop : desktop;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0">
        {videoSrc && !reduceMotion ? (
          <video
            key={videoSrc}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={mobile ? posterMobile.src : poster.src}
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <picture>
            <source media="(max-width: 767px)" srcSet={posterMobile.src} />
            <img
              src={poster.src}
              alt={poster.alt}
              fetchPriority="high"
              className="h-full w-full animate-kenburns object-cover"
            />
          </picture>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-navy-900/20 to-navy-900/80" />
      </div>

      <div className="container-x relative pb-24 pt-32 sm:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs font-bold uppercase tracking-[0.25em] text-white/90 sm:text-sm"
        >
          {t.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] sm:text-7xl lg:text-8xl"
        >
          {t.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-6 max-w-xl text-lg text-white/90"
        >
          {t.text}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <QuizLink source="hero" className="btn-primary px-8 py-4 text-base">
            <Compass className="h-5 w-5" aria-hidden="true" />
            {t.cta}
          </QuizLink>
          <CampChooser mode="book" source="hero" className="btn-ghost-light px-8 py-4 text-base">
            {t.secondary}
          </CampChooser>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-center gap-2 text-sm text-white/90"
        >
          <Star className="h-4 w-4 fill-warning-500 text-warning-500" aria-hidden="true" />
          <span>
            <strong>{site.rating.value}</strong> / 5 · {site.rating.count}+ happy surfers
          </span>
        </motion.div>
      </div>

      <a
        href="#included"
        aria-label={t.scroll}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bob rounded-full p-2 text-white/80 transition hover:text-white sm:block"
      >
        <ChevronDown className="h-7 w-7" aria-hidden="true" />
      </a>
    </section>
  );
}
