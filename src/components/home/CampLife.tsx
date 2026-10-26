import { campLifePhotos } from '@/data/packages';
import { copy } from '@/i18n';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function CampLife() {
  const t = copy.pages.home.life;
  return (
    <section className="bg-ocean-800 py-20 text-white sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} text={t.text} light />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, i) => (
            <li key={item.key} className={i % 2 === 1 ? 'lg:mt-12' : ''}>
              <Reveal delay={i * 0.08} className="group relative overflow-hidden rounded-3xl">
                <Img photo={campLifePhotos[item.key]} className="aspect-[3/4] w-full transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-3xl font-bold uppercase">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/85">{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
