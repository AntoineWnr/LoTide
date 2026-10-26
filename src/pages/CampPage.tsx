import { Compass } from 'lucide-react';
import { camps, type CampId } from '@/data/packages';
import { copy } from '@/i18n';
import { Seo } from '@/components/Seo';
import { hostelSchema } from '@/lib/schema';
import { PageHero } from '@/components/sections/PageHero';
import { ReviewsCarousel } from '@/components/sections/ReviewsCarousel';
import { QuizTeaser } from '@/components/sections/QuizTeaser';
import { BookLink, QuizLink } from '@/components/cta/CtaLinks';
import {
  CampBookCta,
  CampIntro,
  CampMap,
  CampPackages,
  CampRooms,
  CampSpots,
  campReviews,
} from '@/components/camp/CampSections';

export function CampPage({ campId }: { campId: CampId }) {
  const camp = camps[campId];
  const t = copy.pages.camp;
  const seo = t.seo[campId];

  return (
    <>
      <Seo title={seo.title} description={seo.description} image={camp.hero.src} jsonLd={[hostelSchema(camp)]} />
      <PageHero photo={camp.hero} eyebrow={camp.region} title={camp.name} text={camp.tagline}>
        <BookLink camp={camp.id} source="camp_hero" className="btn-primary px-8 py-4 text-base">
          {copy.common.bookCamp}
        </BookLink>
        <QuizLink source={`camp_hero_${camp.id}`} className="btn-ghost-light px-8 py-4 text-base">
          <Compass className="h-5 w-5" aria-hidden="true" />
          {copy.common.nav.findTrip}
        </QuizLink>
      </PageHero>
      <CampIntro camp={camp} />
      <CampRooms camp={camp} />
      <CampPackages camp={camp} />
      <CampSpots camp={camp} />
      <CampMap camp={camp} />
      <ReviewsCarousel items={campReviews(camp)} eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
      <QuizTeaser source={`camp_end_${camp.id}`} title={t.cta.title} text={t.cta.text} secondary={<CampBookCta camp={camp} />} />
    </>
  );
}
