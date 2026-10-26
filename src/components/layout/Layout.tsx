import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { copy } from '@/i18n';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingButtons } from './FloatingButtons';

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        {copy.common.skipToContent}
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
