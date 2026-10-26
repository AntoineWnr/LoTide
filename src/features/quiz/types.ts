import type { CampId, Level, RoomType } from '@/data/packages';

export type LocationChoice = CampId | 'unsure';
export type StayLength = 'short' | 'week' | 'two-weeks' | 'long';
export type TravelStyle = 'solo' | 'friends' | 'couple';

export interface TripDates {
  checkIn: string;
  checkOut: string;
  flexible: boolean;
}

export interface QuizAnswers {
  location?: LocationChoice;
  level?: Level;
  stay?: StayLength;
  dates?: TripDates;
  travel?: TravelStyle;
  room?: RoomType;
}

export type CompleteAnswers = Required<QuizAnswers>;

export const QUIZ_STEPS = ['location', 'level', 'stay', 'dates', 'travel', 'room'] as const;
export type QuizStepKey = (typeof QUIZ_STEPS)[number];
