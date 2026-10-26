import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Compass, MessageCircle } from 'lucide-react';
import type { CampId } from '@/data/packages';
import { copy } from '@/i18n';
import { QuizLink, WhatsAppLink } from '@/components/cta/CtaLinks';
import { CampChooser } from '@/components/cta/CampChooser';

const whatsappClass =
  'grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-navy-900/20 transition hover:scale-105';

export function FloatingButtons() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const camp = (['lombok', 'bali'] as const).find((c) => pathname === `/${c}`) as CampId | undefined;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 p-4 transition-all duration-300 lg:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <QuizLink source="floating_mobile" className="btn-primary h-14 flex-1 shadow-lg shadow-coral-500/30">
        <Compass className="h-5 w-5" aria-hidden="true" />
        {copy.common.nav.findTrip}
      </QuizLink>
      {camp ? (
        <WhatsAppLink camp={camp} source="floating_mobile" className={whatsappClass} ariaLabel={copy.common.whatsappFloat}>
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </WhatsAppLink>
      ) : (
        <CampChooser mode="whatsapp" source="floating_mobile" className={whatsappClass} ariaLabel={copy.common.whatsappFloat}>
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </CampChooser>
      )}
    </div>
  );
}
