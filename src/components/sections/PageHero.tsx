import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Photo } from '@/data/packages';

interface Props {
  photo: Photo;
  eyebrow: string;
  title: string;
  text?: string;
  children?: ReactNode;
}

export function PageHero({ photo, eyebrow, title, text, children }: Props) {
  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-navy-900 text-white">
      <img
        src={photo.src}
        alt={photo.alt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full animate-kenburns object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-navy-900/10 to-navy-900/85" />
      <div className="container-x relative pb-16 pt-32 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-[0.25em] text-white/90 sm:text-sm"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] sm:text-7xl lg:text-8xl"
        >
          {title}
        </motion.h1>
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-5 max-w-2xl text-lg text-white/90"
          >
            {text}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function SimpleHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="bg-sand-50 pb-12 pt-32 sm:pb-16 sm:pt-40">
      <div className="container-x">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 font-display text-6xl font-bold uppercase leading-[0.95] text-navy-900 sm:text-8xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg text-navy-600">{text}</p>}
      </div>
    </section>
  );
}
