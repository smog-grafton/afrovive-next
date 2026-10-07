import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import type { Gallery, Video } from '@/lib/types';

export function RelatedMediaStrip({ videos = [], galleries = [] }: { videos?: Video[]; galleries?: Gallery[] }) {
  const items = [
    ...videos.slice(0, 2).map((video) => ({ key: `v-${video.id}`, href: `/videos/${video.slug}`, image: video.poster, alt: video.poster_alt, type: video.category?.name || 'Video', title: video.title, video: true })),
    ...galleries.slice(0, 2).map((gallery) => ({ key: `g-${gallery.id}`, href: `/gallery/${gallery.slug}`, image: gallery.cover_image, alt: gallery.cover_image_alt, type: gallery.category?.name || 'Photo story', title: gallery.title, video: false })),
  ];
  if (!items.length) return null;
  return <section className="related-media"><p className="eyebrow">From the field</p><h2>Stories connected to this work.</h2><div className="related-media-grid">{items.map((item) => <Link href={item.href} key={item.key} className="related-media-card"><div>{item.image && <Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 50vw, 25vw" />}{item.video && <span><Play size={15} fill="currentColor" /></span>}</div><small>{item.type}</small><h3>{item.title}</h3><i><ArrowUpRight size={16} /></i></Link>)}</div></section>;
}
