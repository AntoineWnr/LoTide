import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { FaqItem } from '@/i18n/en/faq';

export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="divide-y divide-navy-100 border-y border-navy-100">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li key={item.q}>
            <h3>
              <button
                type="button"
                className="group flex w-full items-center justify-between gap-6 py-5 text-left font-sans text-lg font-medium text-navy-900 transition-colors hover:text-ocean-700"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                    isOpen ? 'rotate-45 bg-coral-500 text-white' : 'bg-sand-100 text-navy-800 group-hover:bg-sand-200'
                  }`}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 pr-12 text-navy-600">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
