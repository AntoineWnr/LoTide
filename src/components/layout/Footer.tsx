import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, MessageCircle, Music2 } from 'lucide-react';
import { campList, site } from '@/data/packages';
import { copy } from '@/i18n';
import { Logo } from '@/components/ui/Logo';
import { WhatsAppLink } from '@/components/cta/CtaLinks';

const socials = [
  { href: site.socials.instagram, label: 'Instagram', Icon: Instagram },
  { href: site.socials.facebook, label: 'Facebook', Icon: Facebook },
  { href: site.socials.tiktok, label: 'TikTok', Icon: Music2 },
];

export function Footer() {
  const t = copy.common;
  return (
    <footer className="bg-navy-900 pb-28 pt-16 text-white/80 lg:pb-10">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo dark={false} />
          <p className="mt-4 max-w-xs">{t.footer.tagline}</p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-coral-500"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {campList.map((camp) => (
          <div key={camp.id}>
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">{camp.name}</h2>
            <p className="mt-4 flex gap-2 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ocean-300" aria-hidden="true" />
              {camp.address}
            </p>
            <WhatsAppLink
              camp={camp.id}
              source="footer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-ocean-300"
            >
              <MessageCircle className="h-4 w-4 text-ocean-300" aria-hidden="true" />{camp.phoneDisplay}
            </WhatsAppLink>
          </div>
        ))}

        <div>
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">{t.footer.explore}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ['/lombok', t.nav.lombok],
              ['/bali', t.nav.bali],
              ['/surf', t.nav.surf],
              ['/faq', t.nav.faq],
              ['/contact', t.nav.contact],
              ['/quiz', t.nav.findTrip],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>{t.footer.rights(new Date().getFullYear())}</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="transition hover:text-white">
            {t.footer.privacy}
          </Link>
          <Link to="/terms" className="transition hover:text-white">
            {t.footer.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}
