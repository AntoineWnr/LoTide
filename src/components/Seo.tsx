import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '@/data/packages';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  jsonLd?: Record<string, unknown>[];
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function Seo({ title, description, image = site.heroVideo.poster.src, jsonLd = [] }: SeoProps) {
  const { pathname } = useLocation();
  const jsonLdString = JSON.stringify(jsonLd);

  useEffect(() => {
    const url = `${site.url}${pathname}`;
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:image', image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const scripts = (JSON.parse(jsonLdString) as unknown[]).map((data) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.remove());
  }, [title, description, image, pathname, jsonLdString]);

  return null;
}
