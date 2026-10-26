import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryPhotos } from '@/data/packages';
import { copy } from '@/i18n';
import { Img } from '@/components/ui/Img';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function GalleryCarousel() {
  const t = copy.pages.home.gallery;
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const arrow = 'grid h-12 w-12 place-items-center rounded-full border-2 border-navy-900 text-navy-900 transition hover:bg-navy-900 hover:text-white';

  return (
    <section className="overflow-hidden bg-sand-50 py-20 sm:py-28">
      <div className="container-x flex items-end justify-between gap-6">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        </Reveal>
        <div className="hidden gap-2 sm:flex">
          <button type="button" className={arrow} onClick={() => scroll(-1)} aria-label={t.prev}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" className={arrow} onClick={() => scroll(1)} aria-label={t.next}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        tabIndex={0}
        aria-label={t.title}
      >
        {galleryPhotos.map((p, i) => (
          <li
            key={p.src}
            className={`group shrink-0 snap-start overflow-hidden rounded-3xl ${
              i % 3 === 0 ? 'w-[80vw] sm:w-[28rem]' : 'w-[65vw] sm:w-[20rem]'
            }`}
          >
            <Img photo={p} className="h-80 w-full transition duration-700 group-hover:scale-105 sm:h-[26rem]" />
          </li>
        ))}
      </ul>
    </section>
  );
}
