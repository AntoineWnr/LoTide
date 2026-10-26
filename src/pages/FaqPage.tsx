import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { copy } from '@/i18n';
import { Seo } from '@/components/Seo';
import { faqSchema } from '@/lib/schema';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { SimpleHeader } from '@/components/sections/PageHero';
import { QuizTeaser } from '@/components/sections/QuizTeaser';

export function FaqPage() {
  const t = copy.pages.faq;
  const themes = copy.faq.themes;
  return (
    <>
      <Seo title={t.seo.title} description={t.seo.description} jsonLd={[faqSchema(themes.flatMap((th) => th.items))]} />
      <SimpleHeader eyebrow={t.eyebrow} title={t.title} text={t.text} />
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[14rem_1fr] lg:py-24">
        <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0">
            {themes.map((th) => (
              <li key={th.id}>
                <a
                  href={`#${th.id}`}
                  className="block whitespace-nowrap rounded-full bg-sand-100 px-4 py-2 text-sm font-bold uppercase tracking-wider text-navy-800 transition hover:bg-ocean-600 hover:text-white lg:rounded-xl lg:bg-transparent lg:px-3"
                >
                  {th.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-16">
          {themes.map((th) => (
            <Reveal key={th.id}>
              <section id={th.id} className="scroll-mt-28">
                <h2 className="mb-4 font-display text-4xl font-bold uppercase text-navy-900">{th.title}</h2>
                <Accordion items={th.items} />
              </section>
            </Reveal>
          ))}
          <div className="rounded-3xl bg-sand-50 p-8">
            <h2 className="font-display text-3xl font-bold uppercase text-navy-900">{t.stillQuestions}</h2>
            <Link to="/contact" className="btn-secondary mt-5">
              {t.contact}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
      <QuizTeaser source="faq_end" />
    </>
  );
}
