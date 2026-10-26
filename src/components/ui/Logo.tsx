import { Waves } from 'lucide-react';

export function Logo({ dark = true, className = '' }: { dark?: boolean; className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span
        className={`relative grid h-9 w-9 place-items-center rounded-full transition-colors duration-300 ${
          dark ? 'bg-ocean-700 text-white' : 'bg-white text-ocean-700'
        }`}
      >
        <Waves className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-coral-500 ring-2 ring-current" />
      </span>
      <span
        className={`font-display text-2xl font-bold uppercase leading-none tracking-wide transition-colors duration-300 ${
          dark ? 'text-navy-900' : 'text-white'
        }`}
      >
        LoTide
      </span>
    </span>
  );
}
