import type { ComponentType } from 'react';
import {
  Waves,
  GraduationCap,
  Droplets,
  Snowflake,
  Lock,
  PartyPopper,
  Bus,
  BedDouble,
  Sailboat,
  Camera,
  Coffee,
  UtensilsCrossed,
  Wifi,
  ShowerHead,
  Sun,
  Car,
  Leaf,
  Beer,
  Users,
  type LucideProps,
} from 'lucide-react';
import type { IconName } from '@/data/packages';

function Surfboard({ size = 24, strokeWidth = 2, className }: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 3c2 2 1.5 7-3 11.5S6 21 4 19 4.5 12 9 7.5 17 1 19 3Z" />
      <path d="M7.5 16.5 16.5 7.5" />
    </svg>
  );
}

const ICONS: Record<IconName, ComponentType<LucideProps>> = {
  waves: Waves,
  graduation: GraduationCap,
  pool: Droplets,
  snowflake: Snowflake,
  lock: Lock,
  party: PartyPopper,
  van: Bus,
  bed: BedDouble,
  board: Surfboard,
  camera: Camera,
  boat: Sailboat,
  coffee: Coffee,
  utensils: UtensilsCrossed,
  wifi: Wifi,
  shower: ShowerHead,
  sun: Sun,
  car: Car,
  leaf: Leaf,
  beer: Beer,
  users: Users,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = ICONS[name];
  return <Cmp aria-hidden="true" {...props} />;
}
