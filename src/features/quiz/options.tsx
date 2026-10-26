import {
  Baby,
  Flame,
  Footprints,
  Heart,
  HelpCircle,
  Moon,
  Palmtree,
  Sunrise,
  TrendingUp,
  User,
  Users,
  CalendarRange,
  CalendarDays,
  BedDouble,
  DoorClosed,
} from 'lucide-react';
import { camps, type Level, type RoomType } from '@/data/packages';
import { copy } from '@/i18n';
import type { ChoiceOption } from './ChoiceStep';
import type { LocationChoice, QuizAnswers, StayLength, TravelStyle } from './types';

const t = copy.quiz;
const ic = 'h-7 w-7';

export const locationOptions: ChoiceOption<LocationChoice>[] = [
  { value: 'lombok', ...t.location.options.lombok, photo: camps.lombok.card },
  { value: 'bali', ...t.location.options.bali, photo: camps.bali.card },
  { value: 'unsure', ...t.location.options.unsure, icon: <HelpCircle className={ic} /> },
];

export const levelOptions: ChoiceOption<Level>[] = [
  { value: 'never', ...t.level.options.never, icon: <Baby className={ic} /> },
  { value: 'beginner', ...t.level.options.beginner, icon: <Footprints className={ic} /> },
  { value: 'intermediate', ...t.level.options.intermediate, icon: <TrendingUp className={ic} /> },
  { value: 'advanced', ...t.level.options.advanced, icon: <Flame className={ic} /> },
];

export const stayOptions: ChoiceOption<StayLength>[] = [
  { value: 'short', ...t.stay.options.short, icon: <Moon className={ic} /> },
  { value: 'week', ...t.stay.options.week, icon: <Sunrise className={ic} /> },
  { value: 'two-weeks', ...t.stay.options['two-weeks'], icon: <CalendarDays className={ic} /> },
  { value: 'long', ...t.stay.options.long, icon: <CalendarRange className={ic} /> },
];

export const travelOptions: ChoiceOption<TravelStyle>[] = [
  { value: 'solo', ...t.travel.options.solo, icon: <User className={ic} /> },
  { value: 'friends', ...t.travel.options.friends, icon: <Users className={ic} /> },
  { value: 'couple', ...t.travel.options.couple, icon: <Heart className={ic} /> },
];

export function roomOptions(answers: QuizAnswers): ChoiceOption<RoomType>[] {
  return [
    { value: 'mixed', ...t.room.options.mixed, icon: <BedDouble className={ic} /> },
    { value: 'female', ...t.room.options.female, icon: <Palmtree className={ic} />, disabled: answers.location === 'lombok' },
    { value: 'private', ...t.room.options.private, icon: <DoorClosed className={ic} /> },
  ];
}
