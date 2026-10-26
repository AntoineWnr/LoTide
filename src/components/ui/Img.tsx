import type { ImgHTMLAttributes } from 'react';
import type { Photo } from '@/data/packages';

type Props = { photo: Photo; eager?: boolean } & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

export function Img({ photo, eager, className = '', ...rest }: Props) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`bg-sand-100 object-cover ${className}`}
      {...rest}
    />
  );
}
