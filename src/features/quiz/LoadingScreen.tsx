import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { copy } from '@/i18n';

const WAVE = 'M0 30 Q 50 0 100 30 T 200 30 T 300 30 T 400 30 V 60 H 0 Z';

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const t = copy.quiz.loading;
  const [line, setLine] = useState(0);

  useEffect(() => {
    const done = window.setTimeout(onDone, 1500);
    const tick = window.setInterval(() => setLine((l) => Math.min(l + 1, t.lines.length - 1)), 500);
    return () => {
      window.clearTimeout(done);
      window.clearInterval(tick);
    };
  }, [onDone, t.lines.length]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center" role="status" aria-live="polite">
      <div className="relative h-36 w-36 overflow-hidden rounded-full bg-ocean-50 ring-8 ring-ocean-100">
        <motion.div
          className="absolute right-6 top-6 h-8 w-8 rounded-full bg-coral-500"
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        />
        {[
          { color: '#78d2cf', bottom: 28, cls: 'animate-wave-slow' },
          { color: '#259a9b', bottom: 12, cls: 'animate-wave' },
          { color: '#196266', bottom: -4, cls: 'animate-wave-slow' },
        ].map((w, i) => (
          <svg
            key={i}
            viewBox="0 0 400 60"
            preserveAspectRatio="none"
            className={`absolute left-0 h-16 w-[200%] ${w.cls}`}
            style={{ bottom: w.bottom }}
            aria-hidden="true"
          >
            <path d={WAVE} fill={w.color} />
          </svg>
        ))}
      </div>
      <h2 className="mt-10 font-display text-4xl font-bold uppercase text-navy-900 sm:text-5xl">{t.title}</h2>
      <motion.p
        key={line}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 text-lg text-navy-500"
      >
        {t.lines[line]}
      </motion.p>
    </div>
  );
}
