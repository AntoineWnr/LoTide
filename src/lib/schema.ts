import { camps, site, type Camp } from '@/data/packages';
import type { FaqItem } from '@/i18n/en/faq';

export function hostelSchema(camp: Camp) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hostel',
    name: camp.name,
    description: camp.intro,
    image: camp.hero.src,
    url: `${site.url}/${camp.id}`,
    telephone: `+${camp.whatsapp}`,
    address: { '@type': 'PostalAddress', streetAddress: camp.address, addressCountry: 'ID' },
    geo: { '@type': 'GeoCoordinates', latitude: camp.coordinates.lat, longitude: camp.coordinates.lng },
    priceRange: `${site.currency}${camp.priceFrom}+`,
    amenityFeature: camp.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a.label, value: true })),
    aggregateRating: { '@type': 'AggregateRating', ratingValue: site.rating.value, reviewCount: site.rating.count },
    sameAs: [site.socials.instagram, site.socials.facebook, site.socials.tiktok],
  };
}

export const allHostelsSchema = () => [hostelSchema(camps.lombok), hostelSchema(camps.bali)];

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}
