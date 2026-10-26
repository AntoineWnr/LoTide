import { camps, packagesForCamp, packages, type Camp, type CampId, type Level, type SurfPackage } from '@/data/packages';
import { copy } from '@/i18n';
import type { CompleteAnswers, StayLength, TripDates } from './types';

export interface Recommendation {
  camp: Camp;
  pkg: SurfPackage;
  title: string;
  nights: number;
  pricePerNight: number;
  totalPerPerson: number;
  reasons: string[];
  locationNote?: string;
  roomNote?: string;
  alternatives: SurfPackage[];
}

export const DEFAULT_NIGHTS: Record<StayLength, number> = {
  short: 3,
  week: 7,
  'two-weeks': 10,
  long: 14,
};

export function nightsBetween(checkIn: string, checkOut: string): number {
  const start = Date.parse(checkIn);
  const end = Date.parse(checkOut);
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;
  return Math.round((end - start) / 86_400_000);
}

export function resolveNights(stay: StayLength, dates: TripDates): number {
  if (!dates.flexible) {
    const n = nightsBetween(dates.checkIn, dates.checkOut);
    if (n > 0) return n;
  }
  return DEFAULT_NIGHTS[stay];
}

/** "Not sure" rules: female dorm -> Bali; never/beginner -> Lombok; intermediate/advanced -> Bali. */
function chooseCamp(answers: CompleteAnswers): { camp: CampId; note?: string } {
  if (answers.location !== 'unsure') return { camp: answers.location };
  if (answers.room === 'female') return { camp: 'bali', note: copy.quiz.locationNotes.femaleDorm };
  if (answers.level === 'never' || answers.level === 'beginner') {
    return { camp: 'lombok', note: copy.quiz.locationNotes.lombok };
  }
  return { camp: 'bali', note: copy.quiz.locationNotes.bali };
}

/** Package tier by level: learn for first-timers, progression for improvers with time, guiding for confident surfers. */
function chooseTier(level: Level, nights: number): 'learn' | 'progress' | 'guiding' {
  if (level === 'never') return 'learn';
  if (level === 'beginner') return nights >= 5 ? 'progress' : 'learn';
  if (level === 'intermediate') return nights >= 7 ? 'progress' : 'guiding';
  return 'guiding';
}

function findPackage(camp: CampId, tier: string): SurfPackage {
  return packagesForCamp(camp).find((p) => p.id === `${camp}-${tier}`) ?? packagesForCamp(camp)[0];
}

function buildResult(answers: CompleteAnswers, pkg: SurfPackage, nights: number, alternatives: SurfPackage[], note?: string): Recommendation {
  const camp = camps[pkg.camp];
  return {
    camp,
    pkg,
    title: `${pkg.name} – ${nights} nights, ${camp.shortName}`,
    nights,
    pricePerNight: pkg.pricePerNight,
    totalPerPerson: pkg.pricePerNight * nights,
    reasons: [...pkg.fitReasons.slice(0, 2), copy.quiz.reasons.travel[answers.travel]],
    locationNote: note,
    roomNote: camp.id === 'lombok' && answers.room === 'female' ? copy.quiz.roomNotes.femaleLombok : undefined,
    alternatives,
  };
}

/** Returns the best package for the answers. Pass `chosenPackageId` when the visitor picked one of the alternatives. */
export function recommend(answers: CompleteAnswers, chosenPackageId?: string): Recommendation {
  const { camp: campId, note } = chooseCamp(answers);
  const nights = resolveNights(answers.stay, answers.dates);
  const tier = chooseTier(answers.level, nights);
  const best = findPackage(campId, tier);

  const otherCampId: CampId = campId === 'lombok' ? 'bali' : 'lombok';
  const options = [
    best,
    findPackage(otherCampId, tier),
    packages.find((p) => p.camp === campId && p.id !== best.id && p.levels.includes(answers.level)) ??
      packagesForCamp(campId).find((p) => p.id !== best.id)!,
  ];

  const chosen = options.find((p) => p.id === chosenPackageId) ?? best;
  const alternatives = options.filter((p) => p.id !== chosen.id);
  return buildResult(answers, chosen, nights, alternatives, chosen === best ? note : undefined);
}

