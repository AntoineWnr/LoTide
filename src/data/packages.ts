/**
 * LoTide Surf Camps - business configuration.
 * Edit prices, packages, photos, links and phone numbers here. No component changes needed.
 * Lines marked TODO contain placeholder values that must be confirmed by the owner.
 */

export type CampId = 'lombok' | 'bali';
export type Level = 'never' | 'beginner' | 'intermediate' | 'advanced';
export type RoomType = 'mixed' | 'female' | 'private';

export type IconName =
  | 'waves'
  | 'graduation'
  | 'pool'
  | 'snowflake'
  | 'lock'
  | 'party'
  | 'van'
  | 'bed'
  | 'board'
  | 'camera'
  | 'boat'
  | 'coffee'
  | 'utensils'
  | 'wifi'
  | 'shower'
  | 'sun'
  | 'car'
  | 'leaf'
  | 'beer'
  | 'users';

export interface Photo {
  src: string;
  alt: string;
}

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  beds: number;
  description: string;
  features: string[];
  /** TODO: confirm price per bed per night in EUR */
  priceFrom: number;
  photo: Photo;
}

export interface SurfSpot {
  name: string;
  level: string;
  description: string;
}

export interface Camp {
  id: CampId;
  name: string;
  shortName: string;
  region: string;
  tagline: string;
  intro: string;
  address: string;
  whatsapp: string;
  phoneDisplay: string;
  bookingUrl: string;
  /** TODO: confirm lowest bed price per night in EUR */
  priceFrom: number;
  highlights: string[];
  amenities: { icon: IconName; label: string }[];
  rooms: Room[];
  privateRooms: { available: boolean; note: string };
  surfSpots: SurfSpot[];
  hero: Photo;
  card: Photo;
  gallery: Photo[];
  coordinates: { lat: number; lng: number };
}

export interface SurfPackage {
  id: string;
  camp: CampId;
  name: string;
  tagline: string;
  levels: Level[];
  sessions: string;
  minNights: number;
  /** TODO: confirm price per person per night in EUR (bed in mixed dorm + surf) */
  pricePerNight: number;
  inclusions: { icon: IconName; label: string }[];
  fitReasons: string[];
  photo: Photo;
}

export interface Review {
  name: string;
  country: string;
  rating: number;
  camp: CampId;
  text: string;
}

const photo = (id: number, alt: string, width = 1600): Photo => ({
  src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`,
  alt,
});

export const site = {
  brand: 'LoTide Surf Camps',
  url: 'https://lotide-surfcamps.com', // TODO: replace with the live domain
  email: 'hello@lotide-surfcamps.com', // TODO: confirm contact email
  currency: '€',
  rating: { value: 4.8, count: 1200 }, // TODO: confirm average rating and review count
  urgency: {
    enabled: false,
    text: 'Only a few beds left for these dates',
  },
  socials: {
    instagram: 'https://instagram.com/lotide.surfcamps',
    facebook: 'https://facebook.com/lotide.surfcamps',
    tiktok: 'https://tiktok.com/@lotide.surfcamps',
    instagramHandle: '@lotide.surfcamps',
  },
  heroVideo: {
    // TODO: add your own clips to /public/videos and set the paths, e.g. '/videos/hero-desktop.mp4'
    desktop: '',
    mobile: '',
    poster: photo(5007247, 'Group of surfers paddling out into clear turquoise waves', 2000),
    posterMobile: photo(5007450, 'Aerial view of a surfer riding a turquoise wave', 1000),
  },
};

export const camps: Record<CampId, Camp> = {
  lombok: {
    id: 'lombok',
    name: 'LoTide Surfcamp Lombok',
    shortName: 'Lombok',
    region: 'Kuta, Lombok',
    tagline: 'Uncrowded waves, island vibe',
    intro:
      'Our original camp in Kuta, Lombok. Wake up next to the pool, jump in the van and surf empty bays like Gerupuk and Selong Belanak with a crew that becomes family by day three.',
    address: 'Jl. Sawe-Batu Riti No.2, Kuta, Lombok Tengah, NTB 83573, Indonesia',
    whatsapp: '6287830036109',
    phoneDisplay: '+62 878-3003-6109',
    bookingUrl: 'https://hotels.cloudbeds.com/reservation/CInlHv',
    priceFrom: 12, // TODO
    highlights: [
      'Uncrowded, beginner-friendly bays',
      'Boat trips to Gerupuk inside & outside',
      'Pool, garden and bar on site',
      'AC dorms with lockers and hot water',
      'Free parking for scooters',
    ],
    amenities: [
      { icon: 'pool', label: 'Swimming pool' },
      { icon: 'leaf', label: 'Tropical garden' },
      { icon: 'beer', label: 'Bar' },
      { icon: 'snowflake', label: 'AC in all dorms' },
      { icon: 'lock', label: 'Personal lockers' },
      { icon: 'shower', label: 'Hot water showers' },
      { icon: 'car', label: 'Free parking' },
      { icon: 'wifi', label: 'Free Wi-Fi' },
    ],
    rooms: [
      {
        id: 'lombok-4bed',
        name: '4-Bed Dorm',
        type: 'mixed',
        beds: 4,
        description: 'Our smallest dorm for a quieter night, perfect for friends travelling together.',
        features: ['Air conditioning', 'Personal lockers', 'Shared bathroom with hot water'],
        priceFrom: 15, // TODO
        photo: photo(4907183, 'Two travellers high-fiving in a bright dorm room', 1200),
      },
      {
        id: 'lombok-8bed',
        name: '8-Bed Mixed Dorm',
        type: 'mixed',
        beds: 8,
        description: 'The social heart of the camp. Easy to meet your next surf buddy.',
        features: ['Air conditioning', 'Personal lockers', 'Shared bathroom with hot water'],
        priceFrom: 12, // TODO
        photo: photo(35165103, 'Warmly lit dorm room with wooden bunk beds', 1200),
      },
      {
        id: 'lombok-8bed-superior',
        name: '8-Bed Superior Mixed Dorm',
        type: 'mixed',
        beds: 8,
        description: 'More space, upgraded beds and extra storage for longer stays.',
        features: ['Air conditioning', 'Large lockers', 'Shared bathroom with hot water'],
        priceFrom: 14, // TODO
        photo: photo(5158945, 'Friends relaxing together in a shared dorm with bunk beds', 1200),
      },
    ],
    privateRooms: {
      available: false, // TODO: set to true if private rooms are offered
      note: 'Private rooms are on request in Lombok. Message us and we will check availability.',
    },
    surfSpots: [
      { name: 'Gerupuk', level: 'All levels', description: 'A bay with five breaks reached by boat, from soft inside rollers to punchy outside reefs.' },
      { name: 'Selong Belanak', level: 'Never surfed / Beginner', description: 'Long sandy beach with gentle, forgiving whitewash. Ideal for your first waves.' },
      { name: 'Mawi', level: 'Intermediate / Advanced', description: 'A powerful left and right reef in a stunning bay. Best on bigger swells.' },
      { name: 'Seger & Tanjung Aan', level: 'Beginner / Intermediate', description: 'Close to camp, fun peaks and stunning hills for sunset sessions.' },
      { name: 'Are Guling', level: 'Intermediate', description: 'Playful, long left-hander. A local favourite with few crowds.' },
    ],
    hero: photo(38675673, 'Aerial view of turquoise water and coastline in Lombok, Indonesia', 2000),
    card: photo(30013786, 'Aerial view of Mandalika beach and coastline in Lombok', 1200),
    gallery: [
      photo(3290667, 'Calm beach with mountains and turquoise water near Kuta, Lombok', 1200),
      photo(36364361, 'Sunny poolside area with loungers and a palm tree', 1200),
      photo(19756565, 'Surf instructor helping a student on a sunny beach', 1200),
    ],
    coordinates: { lat: -8.8955, lng: 116.2797 },
  },
  bali: {
    id: 'bali',
    name: 'LoTide Surfcamp Uluwatu',
    shortName: 'Bali',
    region: 'Uluwatu, Bali',
    tagline: 'World-class reefs, lively scene',
    intro:
      'Perched on the Bukit peninsula, our Uluwatu camp puts you minutes from legendary reefs, cliff-top sunsets and the best nightlife on the south coast.',
    address: 'Pecatu, Kuta Selatan, Badung, Bali 80361, Indonesia',
    whatsapp: '6287784071091',
    phoneDisplay: '+62 877-8407-1091',
    bookingUrl: 'https://hotels.cloudbeds.com/en/reservation/kEyFQH?currency=idr',
    priceFrom: 14, // TODO
    highlights: [
      'Minutes from Uluwatu, Padang Padang & Bingin',
      'Capsule beds with privacy curtains',
      'Female-only dorm available',
      'Pool to cool off between sessions',
      'Lively cliff-top sunset scene',
    ],
    amenities: [
      { icon: 'pool', label: 'Swimming pool' },
      { icon: 'bed', label: 'Capsule beds' },
      { icon: 'snowflake', label: 'AC in all dorms' },
      { icon: 'lock', label: 'Personal lockers' },
      { icon: 'users', label: 'Female-only dorm' },
      { icon: 'wifi', label: 'Free Wi-Fi' },
    ],
    rooms: [
      {
        id: 'bali-6bed-mixed',
        name: '6-Bed Capsule Dorm (Mixed)',
        type: 'mixed',
        beds: 6,
        description: 'Capsule beds with curtains, reading light and power socket. Privacy in a social space.',
        features: ['Air conditioning', 'Personal lockers', 'Shared bathroom'],
        priceFrom: 14, // TODO
        photo: photo(5137986, 'Modern dorm with capsule bunk beds and privacy curtains', 1200),
      },
      {
        id: 'bali-6bed-female',
        name: '6-Bed Capsule Dorm (Female)',
        type: 'female',
        beds: 6,
        description: 'The same comfy capsules in a female-only room.',
        features: ['Air conditioning', 'Personal lockers', 'Shared bathroom'],
        priceFrom: 15, // TODO
        photo: photo(5158948, 'Cheerful travellers socialising in a cosy dorm room', 1200),
      },
    ],
    privateRooms: {
      available: false, // TODO: set to true if private rooms are offered
      note: 'Private rooms are on request in Uluwatu. Message us and we will check availability.',
    },
    surfSpots: [
      { name: 'Uluwatu', level: 'Advanced', description: 'The iconic left reef with multiple sections below the cliffs. A bucket-list wave.' },
      { name: 'Padang Padang', level: 'Beginner (inside) / Advanced', description: '"Baby Padang" is a soft inside wave; the main barrel is for experts only.' },
      { name: 'Bingin', level: 'Intermediate / Advanced', description: 'A short, perfect left that peels over shallow reef. Best at mid tide.' },
      { name: 'Dreamland', level: 'Beginner / Intermediate', description: 'A sandy-bottom beach break with peaks for progressing surfers.' },
      { name: 'Balangan', level: 'Intermediate', description: 'A long, fun left in a picture-perfect bay with warungs on the sand.' },
    ],
    hero: photo(34729523, 'Uluwatu coastline with cliffs and ocean waves in Bali', 2000),
    card: photo(30286799, 'Aerial view of Uluwatu cliffs at sunset in Bali', 1200),
    gallery: [
      photo(35383157, 'Surfer catching a wave at sunset in Bali', 1200),
      photo(12739115, 'Uluwatu cliffs meeting the blue ocean under a bright sky', 1200),
      photo(2531184, 'Colourful cocktails at a sunset beach bar', 1200),
    ],
    coordinates: { lat: -8.8148, lng: 115.1167 },
  },
};

export const campList: Camp[] = [camps.lombok, camps.bali];

export const packages: SurfPackage[] = [
  {
    id: 'lombok-learn',
    camp: 'lombok',
    name: 'Learn to Surf',
    tagline: 'From first wave to standing up with confidence',
    levels: ['never', 'beginner'],
    sessions: '1 lesson per day (2 h) with certified instructors',
    minNights: 3,
    pricePerNight: 45, // TODO
    inclusions: [
      { icon: 'bed', label: 'Bed in an AC dorm' },
      { icon: 'graduation', label: 'Daily surf lesson (2 h)' },
      { icon: 'board', label: 'Soft-top board & rash vest' },
      { icon: 'van', label: 'Transport to the beach' },
      { icon: 'camera', label: 'Surf photos once a week' },
      { icon: 'party', label: 'Social events & shared dinners' },
    ],
    fitReasons: ['Beginner-friendly waves at Selong Belanak and Gerupuk inside', 'Lessons every morning in small groups'],
    photo: photo(19756565, 'Surf instructor coaching a beginner on a sunny beach', 1600),
  },
  {
    id: 'lombok-progress',
    camp: 'lombok',
    name: 'Surf Progression',
    tagline: 'Leave the whitewash behind and ride green waves',
    levels: ['beginner', 'intermediate'],
    sessions: '1 coached session + 1 guided session per day',
    minNights: 5,
    pricePerNight: 55, // TODO
    inclusions: [
      { icon: 'bed', label: 'Bed in an AC dorm' },
      { icon: 'graduation', label: 'Daily coached session' },
      { icon: 'boat', label: 'Boat trips to Gerupuk' },
      { icon: 'camera', label: 'Video analysis' },
      { icon: 'board', label: 'Board rental' },
      { icon: 'party', label: 'Social events & shared dinners' },
    ],
    fitReasons: ['Boat trips to the uncrowded peaks of Gerupuk', 'Video analysis to fix your pop-up and turns'],
    photo: photo(4601394, 'Drone shot of a surfer riding a clear blue wave', 1600),
  },
  {
    id: 'lombok-guiding',
    camp: 'lombok',
    name: 'Surf Guiding',
    tagline: 'Our guides take you to the best wave of the day',
    levels: ['intermediate', 'advanced'],
    sessions: 'Daily guided sessions chasing the best conditions',
    minNights: 3,
    pricePerNight: 40, // TODO
    inclusions: [
      { icon: 'bed', label: 'Bed in an AC dorm' },
      { icon: 'waves', label: 'Daily surf guiding' },
      { icon: 'boat', label: 'Boat trips to Gerupuk & Mawi' },
      { icon: 'van', label: 'Transport to the spots' },
      { icon: 'camera', label: 'Surf photos once a week' },
      { icon: 'party', label: 'Social events & shared dinners' },
    ],
    fitReasons: ['Uncrowded reefs like Mawi and Gerupuk outside', 'Local guides who read the swell and tides'],
    photo: photo(8907961, 'Aerial photo of a surfer carving across a wave', 1600),
  },
  {
    id: 'bali-learn',
    camp: 'bali',
    name: 'Learn to Surf',
    tagline: 'Your first waves on the Bukit, safely and with a smile',
    levels: ['never', 'beginner'],
    sessions: '1 lesson per day (2 h) with certified instructors',
    minNights: 3,
    pricePerNight: 50, // TODO
    inclusions: [
      { icon: 'bed', label: 'Capsule bed in an AC dorm' },
      { icon: 'graduation', label: 'Daily surf lesson (2 h)' },
      { icon: 'board', label: 'Soft-top board & rash vest' },
      { icon: 'van', label: 'Transport to the beach' },
      { icon: 'camera', label: 'Surf photos once a week' },
      { icon: 'party', label: 'Social events' },
    ],
    fitReasons: ['Soft sandy-bottom waves at Dreamland and Baby Padang', 'Lessons every morning in small groups'],
    photo: photo(19560824, 'Group of surfers having fun together on a beach with waves', 1600),
  },
  {
    id: 'bali-progress',
    camp: 'bali',
    name: 'Surf Progression',
    tagline: 'Step up from beach breaks to your first reef waves',
    levels: ['beginner', 'intermediate'],
    sessions: '1 coached session + 1 guided session per day',
    minNights: 5,
    pricePerNight: 60, // TODO
    inclusions: [
      { icon: 'bed', label: 'Capsule bed in an AC dorm' },
      { icon: 'graduation', label: 'Daily coached session' },
      { icon: 'camera', label: 'Video analysis' },
      { icon: 'board', label: 'Board rental' },
      { icon: 'van', label: 'Transport to the spots' },
      { icon: 'party', label: 'Social events' },
    ],
    fitReasons: ['Coaching at Balangan and Dreamland to step up to reef waves', 'Video analysis to fix your pop-up and turns'],
    photo: photo(4603407, 'Surfer riding a powerful ocean wave', 1600),
  },
  {
    id: 'bali-guiding',
    camp: 'bali',
    name: 'Reef Guiding',
    tagline: 'Surf the legendary reefs of Uluwatu with a local',
    levels: ['intermediate', 'advanced'],
    sessions: 'Daily guided sessions at the best reef of the day',
    minNights: 3,
    pricePerNight: 45, // TODO
    inclusions: [
      { icon: 'bed', label: 'Capsule bed in an AC dorm' },
      { icon: 'waves', label: 'Daily reef guiding' },
      { icon: 'van', label: 'Transport to the spots' },
      { icon: 'camera', label: 'Surf photos once a week' },
      { icon: 'sun', label: 'Sunset sessions' },
      { icon: 'party', label: 'Social events' },
    ],
    fitReasons: ['World-class reefs: Uluwatu, Bingin and Padang Padang', 'Local guides who know every tide and channel'],
    photo: photo(35383157, 'Surfer catching a wave at sunset in Bali', 1600),
  },
];

export const includedEverywhere: { icon: IconName; label: string }[] = [
  { icon: 'waves', label: 'Daily surf guiding' },
  { icon: 'graduation', label: 'Lessons for all levels' },
  { icon: 'pool', label: 'Pool' },
  { icon: 'snowflake', label: 'AC dorms' },
  { icon: 'lock', label: 'Lockers' },
  { icon: 'party', label: 'Social events' },
  { icon: 'van', label: 'Transfers on request' },
];

// TODO: replace with real guest reviews
export const reviews: Review[] = [
  { name: 'Sophie', country: 'Germany', rating: 5, camp: 'lombok', text: 'Came alone, left with ten new friends. The instructors got me standing on day one and the boat trips to Gerupuk were unreal.' },
  { name: 'Liam', country: 'Ireland', rating: 5, camp: 'bali', text: 'Perfect base for Uluwatu. The guides knew exactly where to go every morning and the capsule beds are super comfy.' },
  { name: 'Camille', country: 'France', rating: 5, camp: 'lombok', text: 'The family dinners and sunset sessions made this trip. Staff are the kindest people. Already planning my return.' },
  { name: 'Noah', country: 'Australia', rating: 4, camp: 'bali', text: 'Great vibe, clean dorms and a pool to recover after long reef sessions. Video analysis really helped my turns.' },
  { name: 'Emma', country: 'Netherlands', rating: 5, camp: 'lombok', text: 'Lombok is so much calmer than Bali, and the camp is the best place to meet people. Highly recommend the progression package.' },
  { name: 'Mateo', country: 'Spain', rating: 5, camp: 'bali', text: 'Booked 4 nights, stayed 12. Female and mixed dorms, great people, and Padang Padang is five minutes away.' },
];

export const galleryPhotos: Photo[] = [
  photo(5007247, 'Surfers paddling into clear blue waves on a sunny day', 1200),
  photo(30013786, 'Aerial view of Mandalika beach in Lombok', 1200),
  photo(19560824, 'Group of surfers laughing together on the beach', 1200),
  photo(30286799, 'Uluwatu cliffs glowing at sunset', 1200),
  photo(36364361, 'Poolside loungers under a palm tree at camp', 1200),
  photo(5638815, 'Guests sharing dinner under warm string lights', 1200),
  photo(9574073, 'Silhouette of a surfer and boards at sunset', 1200),
  photo(3348392, 'Two surfers giving a shaka in the water at sunset', 1200),
];

export const campLifePhotos = {
  pool: photo(10672001, 'Tropical pool with a gazebo surrounded by plants', 1200),
  bar: photo(2531184, 'Colourful cocktails at a sunset bar', 1200),
  dinner: photo(5638815, 'Guests sharing a family dinner under string lights', 1200),
  sunset: photo(37150200, 'Friends watching the sunset on the beach with a surfboard', 1200),
};

export const surfPhotos = {
  hero: photo(4603407, 'Surfer riding a powerful turquoise wave', 2000),
  lesson: photo(19756565, 'Instructor coaching a student in the whitewash', 1200),
  guiding: photo(8907961, 'Aerial view of a surfer riding a long wave', 1200),
  boards: photo(2570908, 'Surfboards lined up on the sand ready for a session', 1200),
  sunset: photo(3348392, 'Two surfers in the water at sunset', 1200),
};

export const instagramPhotos: Photo[] = [
  photo(5007450, 'Surfer riding a turquoise wave from above', 600),
  photo(27028340, 'Friends celebrating a surfer on the beach at sunset', 600),
  photo(35165103, 'Cosy dorm with wooden bunk beds', 600),
  photo(38675673, 'Turquoise coastline of Lombok from above', 600),
  photo(11583821, 'Candlelit dinner under palm trees', 600),
  photo(3348399, 'Two surfers at sunrise with their boards', 600),
];

export const getCamp = (id: CampId) => camps[id];
export const getPackage = (id: string) => packages.find((p) => p.id === id);
export const packagesForCamp = (id: CampId) => packages.filter((p) => p.camp === id);
