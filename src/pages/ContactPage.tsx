import { useState, type FormEvent } from 'react';
import { CheckCircle2, MapPin, MessageCircle, Send } from 'lucide-react';
import { campList } from '@/data/packages';
import { copy } from '@/i18n';
import { Seo } from '@/components/Seo';
import { Img } from '@/components/ui/Img';
import { SimpleHeader } from '@/components/sections/PageHero';
import { WhatsAppLink } from '@/components/cta/CtaLinks';
import { supabase } from '@/lib/supabase';
import { track } from '@/lib/analytics';

type CampChoice = 'lombok' | 'bali' | 'either';
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function ContactPage() {
  const t = copy.pages.contact;
  const f = t.form;
  const [form, setForm] = useState({ name: '', email: '', camp: 'either' as CampChoice, message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'invalid'>('idle');

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((s) => ({ ...s, [key]: value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !message || !EMAIL_RE.test(email)) {
      setStatus('invalid');
      return;
    }
    setStatus('sending');
    const { error } = await supabase
      .from('contact_messages')
      .insert({ name: name.slice(0, 120), email: email.slice(0, 254), camp: form.camp, message: message.slice(0, 4000) });
    if (error) {
      setStatus('error');
      return;
    }
    track('contact_submitted', { camp: form.camp });
    setStatus('sent');
  };

  const campOptions: { value: CampChoice; label: string }[] = [
    ...campList.map((c) => ({ value: c.id as CampChoice, label: c.region })),
    { value: 'either', label: f.either },
  ];

  return (
    <>
      <Seo title={t.seo.title} description={t.seo.description} />
      <SimpleHeader eyebrow={t.eyebrow} title={t.title} text={t.text} />
      <div className="container-x grid gap-10 py-16 lg:grid-cols-[1.3fr_1fr] lg:py-24">
        <section className="card p-6 sm:p-10">
          {status === 'sent' ? (
            <div className="flex flex-col items-center py-12 text-center" role="status">
              <CheckCircle2 className="h-14 w-14 text-success-500" aria-hidden="true" />
              <p className="mt-4 max-w-sm text-lg font-medium text-navy-800">{f.success}</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-navy-800">{f.name}</span>
                  <input className="input" autoComplete="name" maxLength={120} value={form.name} onChange={(e) => update('name', e.target.value)} required />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-navy-800">{f.email}</span>
                  <input className="input" type="email" autoComplete="email" maxLength={254} value={form.email} onChange={(e) => update('email', e.target.value)} required />
                </label>
              </div>
              <fieldset>
                <legend className="mb-1.5 block text-sm font-bold text-navy-800">{f.camp}</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {campOptions.map((o) => (
                    <label
                      key={o.value}
                      className={`flex cursor-pointer items-center justify-center rounded-2xl border-2 px-4 py-3 text-center text-sm font-bold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-coral-500 ${
                        form.camp === o.value ? 'border-ocean-600 bg-ocean-50 text-ocean-800' : 'border-navy-100 text-navy-700 hover:border-ocean-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="camp"
                        value={o.value}
                        checked={form.camp === o.value}
                        onChange={() => update('camp', o.value)}
                        className="sr-only"
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-navy-800">{f.message}</span>
                <textarea
                  className="input min-h-40 resize-y"
                  placeholder={f.placeholder}
                  maxLength={4000}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  required
                />
              </label>
              {(status === 'error' || status === 'invalid') && (
                <p className="text-sm text-error-700" role="alert">
                  {status === 'invalid' ? f.invalid : f.error}
                </p>
              )}
              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full py-4 text-base disabled:opacity-70 sm:w-auto">
                <Send className="h-4 w-4" aria-hidden="true" />
                {status === 'sending' ? f.sending : f.send}
              </button>
            </form>
          )}
        </section>

        <aside className="space-y-4">
          {campList.map((camp) => (
            <article key={camp.id} className="card overflow-hidden">
              <Img photo={camp.card} className="h-36 w-full" />
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold uppercase text-navy-900">{camp.name}</h2>
                <p className="mt-3 flex gap-2 text-sm text-navy-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" aria-hidden="true" />
                  <span>
                    <span className="sr-only">{t.address}: </span>
                    {camp.address}
                  </span>
                </p>
                <WhatsAppLink
                  camp={camp.id}
                  source="contact_page"
                  className="btn mt-5 w-full bg-[#25D366] text-white hover:-translate-y-0.5 hover:bg-[#1ebe5a]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t.whatsapp} {camp.phoneDisplay}
                </WhatsAppLink>
              </div>
            </article>
          ))}
        </aside>
      </div>
    </>
  );
}
