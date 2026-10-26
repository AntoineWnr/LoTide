import { reviews } from '@/data/packages';
import { copy } from '@/i18n';
import { Seo } from '@/components/Seo';
import { allHostelsSchema, faqSchema } from '@/lib/schema';
import { HomeHero } from '@/components/home/HomeHero';
import { IncludedBar } from '@/components/home/IncludedBar';
import { CampCards } from '@/components/home/CampCards';
import { GalleryCarousel } from '@/components/home/GalleryCarousel';
import { SurfSteps } from '@/components/home/SurfSteps';
import { CampLife } from '@/components/home/CampLife';
import { FaqPreview, InstagramGrid } from '@/components/home/FaqAndInstagram';
import { ReviewsCarousel } from '@/components/sections/ReviewsCarousel';
import { QuizTeaser } from '@/components/sections/QuizTeaser';

export function HomePage() {
  const t = copy.pages.home;
  return (
    <>
      <Seo title={t.seo.title} description={t.seo.description} jsonLd={[...allHostelsSchema(), faqSchema(copy.faq.home)]} />
      <HomeHero />
      <IncludedBar />
      <CampCards />
      <GalleryCarousel />
      <SurfSteps />
      <CampLife />
      <ReviewsCarousel items={reviews} eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
      <FaqPreview />
      <QuizTeaser source="home_teaser" />
      <InstagramGrid />
    </>
  );
}
