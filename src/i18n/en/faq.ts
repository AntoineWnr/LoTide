export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqTheme {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faqThemes: FaqTheme[] = [
  {
    id: 'booking',
    title: 'Booking',
    items: [
      { q: 'How do I book?', a: 'Hit "Book now" on any camp page to see live availability and book instantly. Prefer to chat first? Message the camp on WhatsApp.' },
      { q: 'Do I need to pay a deposit?', a: 'Payment terms are shown during online booking. Most stays can be booked with a small deposit, with the rest paid at the camp.' },
      { q: 'What is the cancellation policy?', a: 'Cancellation terms depend on the rate you choose and are displayed clearly before you confirm. Contact us if your plans change, we are flexible whenever we can be.' },
      { q: 'Can I extend my stay at the camp?', a: 'Absolutely, and most guests do. Just ask at reception and we will extend your booking if beds are available.' },
    ],
  },
  {
    id: 'getting-there',
    title: 'Getting there',
    items: [
      { q: 'How do I get to the Lombok camp?', a: 'Fly into Lombok International Airport (LOP), about 20 minutes from Kuta. We can arrange an airport pickup on request.' },
      { q: 'How do I get to the Uluwatu camp?', a: 'Fly into Bali (DPS). The camp is around 45 minutes away depending on traffic. Airport transfers are available on request.' },
      { q: 'Can I travel between the two camps?', a: 'Yes. Fast boats run between Bali and Lombok daily. Many guests split their trip and we can help organise the transfer.' },
    ],
  },
  {
    id: 'visa',
    title: 'Visa',
    items: [
      { q: 'Do I need a visa for Indonesia?', a: 'Many nationalities can get a Visa on Arrival or e-VOA for 30 days, extendable once. Always check the latest official rules for your passport before travelling.' },
      { q: 'How long must my passport be valid?', a: 'Your passport usually needs at least 6 months validity from your arrival date. Check the official requirements for your nationality.' },
    ],
  },
  {
    id: 'money',
    title: 'Money',
    items: [
      { q: 'What currency is used?', a: 'Indonesian Rupiah (IDR). Prices on our site are shown in euros for convenience, the final price is confirmed when booking.' },
      { q: 'Can I pay by card at the camp?', a: 'Cards are accepted at the camp. ATMs are close by in both Kuta Lombok and Uluwatu, but bring some cash for warungs and scooters.' },
    ],
  },
  {
    id: 'surf',
    title: 'Surf',
    items: [
      { q: 'I have never surfed. Is that okay?', a: 'Totally. Most of our guests are beginners. Lessons start on the sand and in gentle whitewash with certified instructors.' },
      { q: 'Do I need my own board?', a: 'No. Boards and rash vests are included in lesson packages and available for rent at both camps.' },
      { q: 'What is the difference between lessons and guiding?', a: 'Lessons include coaching in the water. Guiding is for independent surfers: we pick the best spot for the day, take you there and surf with you.' },
      { q: 'When is the best season?', a: 'Surf runs year-round. The dry season (April to October) brings the most consistent swell. Wet season means fewer crowds and glassy mornings.' },
    ],
  },
  {
    id: 'camp-life',
    title: 'Camp life',
    items: [
      { q: 'Is it good for solo travelers?', a: 'It is made for them. Shared dinners, sunset sessions and social nights make it easy to meet people from day one.' },
      { q: 'Is there a female-only dorm?', a: 'Yes, in our Uluwatu (Bali) camp. In Lombok we have a smaller 4-bed dorm for a quieter stay.' },
      { q: 'Is food included?', a: 'Breakfast and dinners depend on your package. We host shared family dinners several times a week and there are great warungs nearby.' },
    ],
  },
];

export const homeFaq: FaqItem[] = [
  faqThemes[4].items[0],
  faqThemes[5].items[0],
  faqThemes[4].items[1],
  faqThemes[1].items[2],
  faqThemes[0].items[0],
];
