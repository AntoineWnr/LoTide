import { useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, Send } from 'lucide-react';
import { copy } from '@/i18n';
import { supabase } from '@/lib/supabase';
import { track } from '@/lib/analytics';
import type { CompleteAnswers } from './types';
import type { Recommendation } from './recommend';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function EmailCapture({ answers, rec }: { answers: CompleteAnswers; rec: Recommendation }) {
  const t = copy.quiz.result;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'invalid'>('idle');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName || !EMAIL_RE.test(cleanEmail)) {
      setStatus('invalid');
      return;
    }
    setStatus('sending');
    const { error } = await supabase.from('trip_leads').insert({
      name: cleanName.slice(0, 120),
      email: cleanEmail.slice(0, 254),
      camp: rec.camp.id,
      package_id: rec.pkg.id,
      answers: { ...answers, nights: rec.nights, title: rec.title },
    });
    if (error) {
      setStatus('error');
      return;
    }
    track('lead_submitted', { camp: rec.camp.id, package: rec.pkg.id });
    setStatus('sent');
  };

  if (status === 'sent') {
    return (
      <div className="flex items-center gap-4 rounded-3xl bg-success-50 p-6 text-success-700">
        <CheckCircle2 className="h-8 w-8 shrink-0" aria-hidden="true" />
        <p className="font-medium" role="status">{t.sent}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl bg-sand-100 p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-ocean-700">
          <Mail className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-3xl font-bold uppercase text-navy-900">{t.sendTitle}</h3>
          <p className="text-navy-600">{t.sendText}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_1.4fr_auto]">
        <label className="sr-only" htmlFor="lead-name">{t.name}</label>
        <input
          id="lead-name"
          className="input"
          placeholder={t.name}
          autoComplete="given-name"
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="sr-only" htmlFor="lead-email">{t.email}</label>
        <input
          id="lead-email"
          className="input"
          type="email"
          placeholder={t.email}
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={status === 'sending'} className="btn-secondary disabled:opacity-70">
          <Send className="h-4 w-4" aria-hidden="true" />
          {status === 'sending' ? t.sending : t.send}
        </button>
      </div>
      {(status === 'error' || status === 'invalid') && (
        <p className="mt-3 text-sm text-error-700" role="alert">
          {status === 'invalid' ? t.invalidEmail : t.sendError}
        </p>
      )}
    </form>
  );
}
