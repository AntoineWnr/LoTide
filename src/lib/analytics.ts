export type AnalyticsEvent =
  | 'quiz_started'
  | `quiz_step_${number}`
  | 'quiz_completed'
  | 'book_clicked'
  | 'whatsapp_clicked'
  | 'lead_submitted'
  | 'contact_submitted';

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const META_STANDARD: Partial<Record<string, string>> = {
  quiz_completed: 'Lead',
  book_clicked: 'InitiateCheckout',
  whatsapp_clicked: 'Contact',
  lead_submitted: 'Lead',
  contact_submitted: 'Contact',
};

export function track(event: AnalyticsEvent, params: Params = {}) {
  try {
    window.dataLayer?.push({ event, ...params });
    window.gtag?.('event', event, params);
    const metaEvent = META_STANDARD[event];
    if (metaEvent) window.fbq?.('track', metaEvent, params);
    else window.fbq?.('trackCustom', event, params);
    if (import.meta.env.DEV) console.info('[analytics]', event, params);
  } catch {
    // analytics must never break the page
  }
}
