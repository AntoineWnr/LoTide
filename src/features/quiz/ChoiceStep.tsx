import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Photo } from '@/data/packages';
import { OptionCard } from './OptionCard';

export interface ChoiceOption<V extends string> {
  value: V;
  label: string;
  hint: string;
  icon?: ReactNode;
  photo?: Photo;
  disabled?: boolean;
}

interface Props<V extends string> {
  question: string;
  options: ChoiceOption<V>[];
  value?: V;
  onChoose: (value: V) => void;
}

export function ChoiceStep<V extends string>({ question, options, value, onChoose }: Props<V>) {
  const [picked, setPicked] = useState<V | undefined>(value);
  const timer = useRef<number>();

  const choose = (v: V) => {
    if (timer.current) return;
    setPicked(v);
    timer.current = window.setTimeout(() => onChoose(v), 260);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const opt = options[Number(e.key) - 1];
      if (opt && !opt.disabled) choose(opt.value);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <fieldset>
      <legend className="font-display text-4xl font-bold uppercase leading-[1.05] text-navy-900 sm:text-5xl">
        {question}
      </legend>
      <div className="mt-8 grid gap-3">
        {options.map((o, i) => (
          <OptionCard
            key={o.value}
            label={o.label}
            hint={o.hint}
            icon={o.icon}
            photo={o.photo}
            disabled={o.disabled}
            selected={picked === o.value}
            shortcut={i + 1}
            onSelect={() => choose(o.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}
