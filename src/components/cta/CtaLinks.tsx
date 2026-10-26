import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { camps, type CampId } from '@/data/packages';
import { track } from '@/lib/analytics';
import { campWhatsappUrl } from '@/lib/whatsapp';

interface QuizLinkProps {
  source: string;
  className?: string;
  children: ReactNode;
}

export function QuizLink({ source, className, children }: QuizLinkProps) {
  return (
    <Link to="/quiz" state={{ source }} className={className}>
      {children}
    </Link>
  );
}

interface ExternalCtaProps {
  camp: CampId;
  source: string;
  className?: string;
  children: ReactNode;
  extra?: Record<string, string | number>;
  ariaLabel?: string;
}

export function BookLink({ camp, source, className, children, extra, ariaLabel }: ExternalCtaProps) {
  return (
    <a
      href={camps[camp].bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => track('book_clicked', { camp, source, ...extra })}
    >
      {children}
    </a>
  );
}

export function WhatsAppLink({
  camp,
  source,
  className,
  children,
  message,
  extra,
  ariaLabel,
}: ExternalCtaProps & { message?: string }) {
  return (
    <a
      href={campWhatsappUrl(camp, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => track('whatsapp_clicked', { camp, source, ...extra })}
    >
      {children}
    </a>
  );
}
