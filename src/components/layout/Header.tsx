import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, Menu, X } from 'lucide-react';
import { copy } from '@/i18n';
import { Logo } from '@/components/ui/Logo';
import { QuizLink } from '@/components/cta/CtaLinks';

const NAV = [
  { to: '/lombok', label: copy.common.nav.lombok },
  { to: '/bali', label: copy.common.nav.bali },
  { to: '/surf', label: copy.common.nav.surf },
  { to: '/faq', label: copy.common.nav.faq },
  { to: '/contact', label: copy.common.nav.contact },
];

const HERO_ROUTES = ['/', '/lombok', '/bali', '/surf'];

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hasHero = HERO_ROUTES.includes(pathname);
  const solid = scrolled || !hasHero || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-white/95 shadow-[0_1px_0_rgba(15,27,45,0.06)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" aria-label={copy.common.nav.home} className="rounded-full">
          <Logo dark={solid} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                  solid ? 'text-navy-800 hover:text-ocean-600' : 'text-white hover:text-white/80'
                } ${isActive ? 'after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-coral-500' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <QuizLink source="header" className="btn-primary !px-4 !py-2.5 text-xs sm:!px-5 sm:text-sm">
            <Compass className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{copy.common.nav.findTrip}</span>
            <span className="sm:hidden">{copy.common.findTripShort}</span>
          </QuizLink>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full transition lg:hidden ${
              solid ? 'text-navy-900 hover:bg-sand-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label={menuOpen ? copy.common.nav.closeMenu : copy.common.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-white lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="container-x flex flex-col py-6">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block border-b border-navy-50 py-4 font-display text-4xl font-bold uppercase ${
                        isActive ? 'text-coral-500' : 'text-navy-900'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
