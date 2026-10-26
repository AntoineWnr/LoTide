import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Photo } from '@/data/packages';
import { Img } from '@/components/ui/Img';

interface Props {
  label: string;
  hint: string;
  selected: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  photo?: Photo;
  shortcut: number;
  onSelect: () => void;
}

export function OptionCard({ label, hint, selected, disabled, icon, photo, shortcut, onSelect }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-3xl border-2 bg-white p-3 text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45 sm:p-4 ${
        selected
          ? 'border-ocean-600 bg-ocean-50 ring-4 ring-ocean-100'
          : 'border-navy-100 hover:-translate-y-0.5 hover:border-ocean-300 enabled:hover:shadow-[0_10px_24px_-14px_rgba(15,27,45,0.3)]'
      }`}
    >
      {photo ? (
        <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-32">
          <Img photo={photo} eager className="h-full w-full transition duration-500 group-hover:scale-110" />
        </span>
      ) : (
        <span
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-colors sm:h-16 sm:w-16 ${
            selected ? 'bg-ocean-600 text-white' : 'bg-sand-100 text-ocean-700 group-hover:bg-ocean-100'
          }`}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-display text-2xl font-bold uppercase leading-tight text-navy-900 sm:text-[1.7rem]">
          {label}
        </span>
        <span className="mt-0.5 block text-sm text-navy-500 sm:text-base">{hint}</span>
      </span>
      <span
        className={`mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold transition-all ${
          selected ? 'border-ocean-600 bg-ocean-600 text-white' : 'border-navy-100 text-navy-300'
        }`}
        aria-hidden="true"
      >
        {selected ? <Check className="h-4 w-4" strokeWidth={3} /> : shortcut}
      </span>
    </motion.button>
  );
}
