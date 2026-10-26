import { Link } from 'react-router-dom';
import { copy } from '@/i18n';
import { Seo } from '@/components/Seo';
import { SimpleHeader } from '@/components/sections/PageHero';

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const t = copy.pages.legal[kind];
  return (
    <>
      <Seo title={t.seo.title} description={t.seo.description} />
      <SimpleHeader eyebrow={copy.common.legal} title={t.title} />
      <article className="container-x max-w-3xl space-y-8 py-16 sm:py-24">
        {t.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-3xl font-bold uppercase text-navy-900">{s.h}</h2>
            <p className="mt-3 text-navy-700">{s.p}</p>
          </section>
        ))}
      </article>
    </>
  );
}

export function NotFoundPage() {
  const t = copy.common.notFound;
  return (
    <>
      <Seo title={`${t.title} | LoTide Surf Camps`} description={t.text} />
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
        <p className="font-display text-[8rem] font-bold leading-none text-ocean-100 sm:text-[12rem]">404</p>
        <h1 className="-mt-6 font-display text-5xl font-bold uppercase text-navy-900">{t.title}</h1>
        <p className="mt-3 text-lg text-navy-600">{t.text}</p>
        <Link to="/" className="btn-primary mt-8">
          {t.cta}
        </Link>
      </section>
    </>
  );
}
