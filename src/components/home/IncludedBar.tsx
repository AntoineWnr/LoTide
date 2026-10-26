import { includedEverywhere } from '@/data/packages';
import { copy } from '@/i18n';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

export function IncludedBar() {
  const t = copy.pages.home.included;
  return (
    <section id="included" className="scroll-mt-20 border-b border-navy-50 bg-white py-14 sm:py-16">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow text-center">{t.eyebrow}</p>
          <h2 className="mt-2 text-center font-display text-3xl font-bold uppercase text-navy-900 sm:text-4xl">{t.title}</h2>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
          {includedEverywhere.map((item, i) => (
            <li key={item.label}>
              <Reveal delay={i * 0.05} className="group flex flex-col items-center gap-3 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ocean-50 text-ocean-700 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-ocean-600 group-hover:text-white">
                  <Icon name={item.icon} className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-medium text-navy-800">{item.label}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
