import { useState } from 'react';
import { ArrowRight, CalendarHeart, Check } from 'lucide-react';
import { copy } from '@/i18n';
import { DEFAULT_NIGHTS, nightsBetween } from './recommend';
import type { StayLength, TripDates } from './types';

const toISO = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (iso: string, n: number) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return toISO(d);
};

interface Props {
  value?: TripDates;
  stay?: StayLength;
  onDone: (dates: TripDates) => void;
}

export function DatesStep({ value, stay, onDone }: Props) {
  const t = copy.quiz.dates;
  const today = toISO(new Date());
  const [checkIn, setCheckIn] = useState(value?.checkIn ?? '');
  const [checkOut, setCheckOut] = useState(value?.checkOut ?? '');
  const [flexible, setFlexible] = useState(value?.flexible ?? false);

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const invalid = Boolean(checkIn && checkOut && nights <= 0);
  const canContinue = flexible || (nights > 0 && checkIn >= today);

  const onCheckIn = (v: string) => {
    setCheckIn(v);
    setFlexible(false);
    if (v && (!checkOut || checkOut <= v)) setCheckOut(addDays(v, DEFAULT_NIGHTS[stay ?? 'week']));
  };

  return (
    <div>
      <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] text-navy-900 sm:text-5xl">{t.question}</h2>

      <div className={`mt-8 grid gap-3 transition-opacity sm:grid-cols-2 ${flexible ? 'opacity-50' : ''}`}>
        <label className="block rounded-3xl border-2 border-navy-100 bg-white p-4 transition focus-within:border-ocean-500">
          <span className="eyebrow">{t.checkIn}</span>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => onCheckIn(e.target.value)}
            className="mt-2 block w-full bg-transparent font-display text-2xl font-bold text-navy-900 focus:outline-none"
          />
        </label>
        <label className="block rounded-3xl border-2 border-navy-100 bg-white p-4 transition focus-within:border-ocean-500">
          <span className="eyebrow">{t.checkOut}</span>
          <input
            type="date"
            min={checkIn ? addDays(checkIn, 1) : today}
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setFlexible(false);
            }}
            className="mt-2 block w-full bg-transparent font-display text-2xl font-bold text-navy-900 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-3 min-h-6 text-sm" aria-live="polite">
        {invalid ? (
          <p className="text-error-700">{t.invalid}</p>
        ) : nights > 0 && !flexible ? (
          <p className="font-medium text-ocean-700">{t.nights(nights)}</p>
        ) : null}
      </div>

      <button
        type="button"
        aria-pressed={flexible}
        onClick={() => setFlexible((f) => !f)}
        className={`mt-2 flex w-full items-center gap-4 rounded-3xl border-2 p-4 text-left transition ${
          flexible ? 'border-ocean-600 bg-ocean-50 ring-4 ring-ocean-100' : 'border-navy-100 bg-white hover:border-ocean-300'
        }`}
      >
        <span
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${
            flexible ? 'bg-ocean-600 text-white' : 'bg-sand-100 text-ocean-700'
          }`}
        >
          <CalendarHeart className="h-7 w-7" aria-hidden="true" />
        </span>
        <span className="flex-1">
          <span className="block font-display text-2xl font-bold uppercase text-navy-900">{t.flexible}</span>
          <span className="block text-sm text-navy-500">{t.flexibleHint}</span>
        </span>
        <span
          className={`grid h-8 w-8 place-items-center rounded-full border-2 ${
            flexible ? 'border-ocean-600 bg-ocean-600 text-white' : 'border-navy-100'
          }`}
          aria-hidden="true"
        >
          {flexible && <Check className="h-4 w-4" strokeWidth={3} />}
        </span>
      </button>

      <button
        type="button"
        disabled={!canContinue}
        onClick={() => onDone({ checkIn: flexible ? '' : checkIn, checkOut: flexible ? '' : checkOut, flexible })}
        className="btn-primary mt-8 w-full py-4 text-base disabled:cursor-not-allowed disabled:bg-navy-200 disabled:hover:translate-y-0"
      >
        {copy.quiz.next}
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
