import { copy } from '@/i18n';
import { camps, type CampId } from '@/data/packages';
import type { CompleteAnswers } from '@/features/quiz/types';
import type { Recommendation } from '@/features/quiz/recommend';

export function whatsappUrl(number: string, message?: string) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function campWhatsappUrl(camp: CampId, message?: string) {
  return whatsappUrl(camps[camp].whatsapp, message);
}

export function quizSummaryMessage(answers: CompleteAnswers, rec: Recommendation) {
  const t = copy.quiz;
  const m = t.whatsappMessage;
  const dates = answers.dates.flexible
    ? m.flexible
    : `${answers.dates.checkIn} → ${answers.dates.checkOut}`;
  return [
    m.intro,
    '',
    `${m.location}: ${rec.camp.region}`,
    `${m.level}: ${t.level.options[answers.level].label}`,
    `${m.dates}: ${dates}`,
    `${m.nights}: ${rec.nights}`,
    `${m.travel}: ${t.travel.options[answers.travel].label}`,
    `${m.room}: ${t.room.options[answers.room].label}`,
    `${m.package}: ${rec.title}`,
    '',
    m.outro,
  ].join('\n');
}
