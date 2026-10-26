import { Star } from 'lucide-react';

export function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`${className} ${i < Math.round(rating) ? 'fill-warning-500 text-warning-500' : 'fill-navy-100 text-navy-100'}`}
        />
      ))}
    </span>
  );
}
