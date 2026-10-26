import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  title: string;
  text?: ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, text, align = 'left', light }: Props) {
  const center = align === 'center';
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className={`eyebrow ${light ? '!text-ocean-200' : ''}`}>{eyebrow}</p>
      <h2 className={`section-title mt-3 ${light ? '!text-white' : ''}`}>{title}</h2>
      {text && <p className={`mt-4 text-lg ${light ? 'text-white/80' : 'text-navy-600'}`}>{text}</p>}
    </div>
  );
}
