'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Gallery, GalleryItem } from '@/lib/types';

function dateLabel(value?: string | null) {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? value : new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(parsed);
}

function GalleryCard({ gallery, onOpen }: { gallery: Gallery; onOpen?: () => void }) {
  return <article className="gallery-card"><div className="gallery-card-image">{gallery.cover_image ? <Image src={gallery.cover_image} alt={gallery.cover_image_alt || gallery.title} fill sizes="(max-width: 700px) 50vw, 33vw" /> : <span className="media-image-fallback" />}{onOpen && <button type="button" className="gallery-card-expand" onClick={onOpen} aria-label={`Preview ${gallery.title}`}><Expand size={16} /></button>}</div><div className="gallery-card-copy"><p className="card-kicker">{gallery.category?.name || 'Photo story'}</p><h3><Link href={`/gallery/${gallery.slug}`}>{gallery.title}</Link></h3><div><span>{dateLabel(gallery.event_date || gallery.published_at)}</span>{gallery.image_count ? <span>{gallery.image_count} photos</span> : null}</div></div></article>;
}

function GalleryLightbox({ items, initialIndex, onClose }: { items: GalleryItem[]; initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const touchStart = useRef<number | null>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const item = items[index];
  const go = (direction: -1 | 1) => setIndex((current) => (current + direction + items.length) % items.length);
  useEffect(() => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const timer = window.setTimeout(() => dialogRef.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } if (event.key === 'ArrowLeft') go(-1); if (event.key === 'ArrowRight') go(1); if (event.key === 'Tab' && dialogRef.current) { const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex]:not([tabindex="-1"])')); if (!focusable.length) { event.preventDefault(); dialogRef.current.focus(); return; } const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } };
    document.body.style.overflow = 'hidden'; document.addEventListener('keydown', onKeyDown);
    return () => { window.clearTimeout(timer); document.body.style.overflow = ''; document.removeEventListener('keydown', onKeyDown); previousFocus.current?.focus(); };
  }, [onClose]);
  return <div className="lightbox-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}><section className="gallery-lightbox" tabIndex={-1} ref={dialogRef} role="dialog" aria-modal="true" aria-label={`Image ${index + 1} of ${items.length}`} onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 42) go(distance > 0 ? -1 : 1); touchStart.current = null; }}><button className="media-modal-close" type="button" aria-label="Close image viewer" onClick={onClose}><X size={20} /></button><div className="lightbox-image"><Image src={item.image} alt={item.alt_text} fill sizes="100vw" priority /></div><div className="lightbox-caption"><span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span><div>{item.caption && <p>{item.caption}</p>}{item.credit && <small>Photo: {item.credit}</small>}</div></div>{items.length > 1 && <><button className="lightbox-nav lightbox-nav-prev" type="button" aria-label="Previous image" onClick={() => go(-1)}><ArrowLeft size={20} /></button><button className="lightbox-nav lightbox-nav-next" type="button" aria-label="Next image" onClick={() => go(1)}><ArrowRight size={20} /></button></>}</section></div>;
}

export function GalleryArchive({ galleries, categories }: { galleries: Gallery[]; categories: Array<{ id: number; name: string; slug: string }> }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? galleries : galleries.filter((gallery) => gallery.category?.slug === activeCategory);
  return <><div className="media-filters" aria-label="Filter photo stories"><button className={activeCategory === 'all' ? 'is-active' : ''} onClick={() => setActiveCategory('all')} type="button">All stories</button>{categories.map((category) => <button className={activeCategory === category.slug ? 'is-active' : ''} onClick={() => setActiveCategory(category.slug)} type="button" key={category.id}>{category.name}</button>)}</div>{filtered.length ? <div className="gallery-archive-grid">{filtered.map((gallery) => <GalleryCard gallery={gallery} key={gallery.id} />)}</div> : <div className="empty-state">No photo stories have been published in this category yet.</div>}</>;
}

export function GalleryStory({ gallery }: { gallery: Gallery }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const items = gallery.items || [];
  return <>{items.length > 0 && <div className="gallery-story-grid">{items.map((item, index) => <figure className={`gallery-story-item gallery-story-${item.display_style}`} key={item.id}><button type="button" onClick={() => setLightboxIndex(index)}><Image src={item.image} alt={item.alt_text} fill sizes="(max-width: 700px) 100vw, 60vw" /><span><Expand size={17} /></span></button>{item.caption && <figcaption>{item.caption}{item.credit && <small>Photo: {item.credit}</small>}</figcaption>}</figure>)}</div>}{lightboxIndex !== null && <GalleryLightbox items={items} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}</>;
}

export function HomeGalleryStories({ galleries }: { galleries: Gallery[] }) {
  if (!galleries.length) return null;
  return <div className="home-gallery-layout"><GalleryCard gallery={galleries[0]} />{galleries.slice(1, 3).length > 0 && <div className="home-gallery-list">{galleries.slice(1, 3).map((gallery) => <GalleryCard gallery={gallery} key={gallery.id} />)}</div>}</div>;
}
