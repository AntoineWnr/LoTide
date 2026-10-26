import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { campList, site } from '@/data/packages';
import { copy } from '@/i18n';
import { Img } from '@/components/ui/Img';
import { BookLink, WhatsAppLink } from './CtaLinks';

interface Props {
  mode: 'book' | 'whatsapp';
  source: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

export function CampChooser({ mode, source, className, children, ariaLabel }: Props) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button type="button" className={className} aria-label={ariaLabel} onClick={() => setOpen(true)}>
        {children}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-navy-900/60 p-4 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={copy.common.chooseCamp}
              className="w-full max-w-lg rounded-3xl bg-white p-6"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-3xl font-bold uppercase text-navy-900">{copy.common.chooseCamp}</h2>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label={copy.quiz.close}
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-sand-100 text-navy-800 transition hover:bg-sand-200"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {campList.map((camp) => {
                  const Link = mode === 'book' ? BookLink : WhatsAppLink;
                  return (
                    <Link
                      key={camp.id}
                      camp={camp.id}
                      source={source}
                      className="group relative block overflow-hidden rounded-2xl"
                    >
                      <Img photo={camp.card} className="h-36 w-full transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
                        <div>
                          <p className="font-display text-2xl font-bold uppercase leading-none">{camp.shortName}</p>
                          <p className="mt-1 text-xs text-white/80">
                            {mode === 'book' ? copy.common.priceFrom(`${camp.priceFrom} ${site.currency}`) : camp.region}
                          </p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
