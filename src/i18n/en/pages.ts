export const pages = {
  home: {
    seo: {
      title: 'LoTide Surf Camps | Surf camps in Kuta Lombok & Uluwatu Bali',
      description: 'Social surf camps in Kuta, Lombok and Uluwatu, Bali. Daily surf guiding, lessons for all levels, pool, AC dorms and social events. Find your surf trip in 6 questions.',
    },
    hero: {
      eyebrow: 'Social surf camps · Indonesia',
      title: 'Surf camps in Kuta Lombok & Uluwatu Bali',
      text: 'Daily surf, a pool to cool off, and a crew to share it with. Find the trip that fits you in under a minute.',
      cta: 'Find my surf trip',
      secondary: 'Book now',
      scroll: 'Scroll to explore',
    },
    included: { eyebrow: 'Included in every stay', title: 'Everything you need to surf' },
    camps: { eyebrow: 'Two islands, one crew', title: 'Choose your camp' },
    gallery: { eyebrow: 'Life at LoTide', title: 'Salt, sun & good people', prev: 'Previous photos', next: 'Next photos' },
    surf: {
      eyebrow: 'The surf',
      title: 'How it works',
      text: 'Whether you have never touched a board or chase reef barrels, every day follows the same easy rhythm.',
      steps: [
        { title: 'Check the forecast', text: 'Every evening our team reads the swell, wind and tides and picks the best spot for each level.' },
        { title: 'Theory on the sand', text: 'Short briefing on safety, etiquette and the one thing to focus on today.' },
        { title: 'Surf with a coach', text: 'Small groups in the water. Instructors push you into waves, guides show you the take-off spot.' },
        { title: 'Review & relax', text: 'Photo and video feedback back at camp, then a swim in the pool and a cold drink.' },
      ],
      cta: 'More about surfing',
    },
    life: {
      eyebrow: 'Camp life',
      title: 'Out of the water',
      text: 'The surf brings you here, the people make you stay. Every day ends with good food and a sunset.',
      items: [
        { key: 'pool', title: 'Pool days', text: 'Cool off between sessions and nap under the palms.' },
        { key: 'bar', title: 'The bar', text: 'Fresh juices, cold Bintangs and happy hour after surf.' },
        { key: 'dinner', title: 'Shared dinners', text: 'Family-style dinners where strangers become friends.' },
        { key: 'sunset', title: 'Sunset sessions', text: 'Golden-hour surf and beach hangs with the whole crew.' },
      ] as const,
    },
    reviews: { eyebrow: 'Reviews', title: 'Guests say it best', prev: 'Previous review', next: 'Next review' },
    faq: { eyebrow: 'Good to know', title: 'Questions', more: 'See all FAQs' },
    instagram: { eyebrow: 'Follow the crew', title: 'On Instagram' },
  },
  camp: {
    seo: {
      lombok: {
        title: 'Surf Camp Kuta Lombok | LoTide Surfcamp Lombok',
        description: 'Surf camp in Kuta, Lombok with pool, AC dorms, daily surf lessons and guiding to Gerupuk, Selong Belanak and Mawi. Book your bed from 12 € / night.',
      },
      bali: {
        title: 'Surf Camp Uluwatu Bali | LoTide Surfcamp Uluwatu',
        description: 'Surf camp in Uluwatu, Bali with capsule dorms, female-only dorm, pool, surf lessons and reef guiding at Uluwatu, Padang Padang and Bingin.',
      },
    },
    rooms: { eyebrow: 'Sleep', title: 'Rooms', from: 'from', perNight: '/ bed / night', bookRoom: 'Book' },
    amenities: { eyebrow: 'At the camp', title: 'Amenities' },
    packages: { eyebrow: 'Surf', title: 'Surf packages', minNights: (n: number) => `Min. ${n} nights`, perNight: '/ person / night', levels: 'Levels' },
    spots: { eyebrow: 'Nearby', title: 'Surf spots' },
    map: { eyebrow: 'Find us', title: 'Location', open: 'Open in Google Maps' },
    reviews: { eyebrow: 'Reviews', title: 'What guests say' },
    cta: { title: 'Ready for your trip?', text: 'Answer 6 quick questions and we will build the perfect package for you.', quiz: 'Find my surf trip', book: 'Book this camp' },
  },
  surf: {
    seo: {
      title: 'Surf Lessons & Guiding in Lombok and Bali | LoTide Surf Camps',
      description: 'Surf lessons for beginners and surf guiding for intermediate and advanced surfers in Kuta Lombok and Uluwatu Bali. Find out which level and package fits you.',
    },
    hero: { eyebrow: 'Lessons & guiding', title: 'Surf every day', text: 'Certified instructors, local guides and small groups. Wherever you are on your surf journey, we take you to the right wave.' },
    lessons: {
      eyebrow: 'For beginners',
      title: 'Surf lessons',
      text: 'Lessons run in small groups on soft, sandy-bottom waves. You start with theory and safety on the beach, then catch your first waves with an instructor by your side.',
      points: ['Max. 4 students per instructor', 'Soft-top boards and rash vests included', 'Photo & video feedback', 'Transport to the beach'],
    },
    guiding: {
      eyebrow: 'For independent surfers',
      title: 'Surf guiding',
      text: 'Already comfortable on green waves? Our guides check the conditions, choose the best spot of the day and paddle out with you, sharing local knowledge on take-off zones and currents.',
      points: ['Best spot chosen daily', 'Boat trips in Lombok', 'Reef etiquette & safety', 'Small groups by level'],
    },
    levels: {
      eyebrow: 'Find your level',
      title: 'Surf levels',
      items: [
        { title: 'Never surfed', text: 'You have never stood on a board. We start with the basics: paddling, pop-up and safety.' },
        { title: 'Beginner', text: 'You can stand up in whitewash. Next: angle your take-off and ride your first green waves.' },
        { title: 'Intermediate', text: 'You catch unbroken waves and turn. Time to work on speed, lines and reading the line-up.' },
        { title: 'Advanced', text: 'You surf reefs and steeper waves confidently. Guiding gets you on the best waves of the day.' },
      ],
    },
  },
  faq: {
    seo: {
      title: 'FAQ | LoTide Surf Camps Lombok & Bali',
      description: 'Answers about booking, getting to Lombok and Bali, visas, money, surfing and camp life at LoTide Surf Camps.',
    },
    eyebrow: 'Help',
    title: 'FAQ',
    text: 'Everything you need to know before you pack your boardshorts.',
    stillQuestions: 'Still have a question?',
    contact: 'Contact us',
  },
  contact: {
    seo: {
      title: 'Contact | LoTide Surf Camps',
      description: 'Contact LoTide Surf Camps in Kuta, Lombok and Uluwatu, Bali. Send us a message or chat with the camp on WhatsApp.',
    },
    eyebrow: 'Say hi',
    title: 'Contact',
    text: 'Questions about waves, rooms or getting here? Send us a message or chat with the camp directly on WhatsApp.',
    form: {
      name: 'Name',
      email: 'Email',
      camp: 'Which camp?',
      either: 'Not sure yet',
      message: 'Message',
      placeholder: 'Tell us about your trip…',
      send: 'Send message',
      sending: 'Sending…',
      success: 'Thanks! Your message is on its way. We usually reply within 24 hours.',
      error: 'Your message could not be sent. Please try again or use WhatsApp.',
      invalid: 'Please fill in all fields with a valid email.',
    },
    whatsapp: 'WhatsApp',
    address: 'Address',
  },
  legal: {
    privacy: {
      seo: { title: 'Privacy Policy | LoTide Surf Camps', description: 'How LoTide Surf Camps collects and uses your personal data.' },
      title: 'Privacy policy',
      sections: [
        { h: 'Placeholder', p: 'TODO: Replace this text with your privacy policy. It should explain what data you collect (for example contact form messages and quiz results), why, how long you keep it, and how visitors can request deletion.' },
        { h: 'Data we collect', p: 'When you submit the contact form or "Send me this trip", we store your name, email and trip preferences to reply to you.' },
        { h: 'Analytics', p: 'We may use analytics tools to understand how visitors use the site. TODO: list the tools and cookie details.' },
      ],
    },
    terms: {
      seo: { title: 'Terms & Conditions | LoTide Surf Camps', description: 'Terms and conditions for bookings at LoTide Surf Camps.' },
      title: 'Terms & conditions',
      sections: [
        { h: 'Placeholder', p: 'TODO: Replace this text with your booking terms, cancellation policy, liability and house rules.' },
        { h: 'Prices', p: 'Prices shown on this website are estimates. The final price is confirmed in the booking system.' },
      ],
    },
  },
  quiz: {
    seo: {
      title: 'Find your surf trip | LoTide Surf Camps',
      description: 'Answer 6 quick questions and get your personal surf camp package in Lombok or Bali.',
    },
  },
};
