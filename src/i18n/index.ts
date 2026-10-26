import { common } from './en/common';
import { quiz } from './en/quiz';
import { pages } from './en/pages';
import { faqThemes, homeFaq } from './en/faq';

const en = { common, quiz, pages, faq: { themes: faqThemes, home: homeFaq } };

export type Copy = typeof en;

// Add more locales here later and pick one based on the URL or browser language.
export const copy: Copy = en;
