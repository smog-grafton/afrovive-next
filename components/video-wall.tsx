'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight, Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Video } from '@/lib/types';

function providerEmbedUrl(video: Video, autoplay: boolean) {
  const source = video.source_url || '';
  if (video.source_type === 'youtube') {
    let id = '';
    try {
      const url = new URL(source);
      id = url.hostname.includes('youtu.be') ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).pop() || '';
    } catch { id = source; }
    return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}` : null;
  }
  if (video.source_type === 'vimeo') {
    const id = source.match(/(?:vimeo\.com\/(?:video\/)?)(\d+)/)?.[1] || source;
    return id ? `https://player.vimeo.com/video/${id}${autoplay ? '?autoplay=1' : ''}` : null;
  }
  return null;
}

function VideoPlayer({ video, autoplay }: { video: Video; autoplay: boolean }) {
  const embed = providerEmbedUrl(video, autoplay);
  if (embed) return <iframe className="video-player-frame" src={embed} title={video.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />;
  const src = video.video_url || video.source_url;
  return src ? <video className="video-player-frame" src={src} controls autoPlay={autoplay} playsInline poster={video.poster || undefined} /> : <div className="video-player-unavailable">This video source is not currently available.</div>;
}

function useDialogFocus(open: boolean, close: () => void, dialogRef: React.RefObject<HTMLElement>) {
  const triggerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const timer = window.setTimeout(() => dialogRef.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); return; }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), iframe, video[controls], [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute('hidden'));
      if (!focusable.length) { event.preventDefault(); dialogRef.current.focus(); return; }
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => { window.clearTimeout(timer); document.body.style.overflow = ''; document.removeEventListener('keydown', onKeyDown); triggerRef.current?.focus(); };
  }, [open, close, dialogRef]);
}

export function VideoPlayerModal({ videos, activeIndex, onClose }: { videos: Video[]; activeIndex: number; onClose: () => void }) {
  const [selectedIndex, setSelectedIndex] = useState(activeIndex);
  const [autoplay, setAutoplay] = useState(true);
  const dialogRef = useRef<HTMLElement>(null);
  const close = () => onClose();
  useDialogFocus(true, close, dialogRef);
  useEffect(() => { setSelectedIndex(activeIndex); setAutoplay(true); }, [activeIndex]);
  const video = videos[selectedIndex];
  if (!video) return null;
  return <div className="media-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) close(); }}>
    <section className="video-modal" role="dialog" aria-modal="true" aria-label={`Watch ${video.title}`} tabIndex={-1} ref={dialogRef}>
      <button className="media-modal-close" type="button" aria-label="Close video player" onClick={close}><X size={20} /></button>
      <div className="video-modal-main">
        <div className="video-player"><VideoPlayer key={`${video.id}-${autoplay}`} video={video} autoplay={autoplay} /></div>
        <div className="video-modal-copy"><p className="eyebrow eyebrow-light">{video.category?.name || 'AfroVive video'}</p><h2>{video.title}</h2><div className="video-meta"><span>{video.duration || 'Video'}</span>{video.location && <span>{video.location}</span>}{video.program && <span>{video.program.title}</span>}</div>{video.description ? <p>{video.description}</p> : video.excerpt && <p>{video.excerpt}</p>}<Link href={`/videos/${video.slug}`} className="text-link text-link-light" onClick={close}>Open full story <ArrowUpRight size={15} /></Link></div>
      </div>
      <aside className="video-playlist" aria-label="Video playlist"><div className="video-playlist-heading"><span>Up next</span><b>{String(selectedIndex + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}</b></div><div>{videos.map((item, index) => <button className={index === selectedIndex ? 'video-playlist-item is-active' : 'video-playlist-item'} type="button" key={item.id} onClick={() => { setSelectedIndex(index); setAutoplay(true); }} aria-current={index === selectedIndex ? 'true' : undefined}><span className="video-playlist-thumb">{item.poster && <Image src={item.poster} alt="" fill sizes="120px" />}<Play size={13} /></span><span><small>{item.category?.name || 'Video'}{item.duration ? ` · ${item.duration}` : ''}</small><strong>{item.title}</strong></span><ChevronRight size={16} /></button>)}</div></aside>
    </section>
  </div>;
}

function VideoCard({ video, onPlay, featured = false }: { video: Video; onPlay: () => void; featured?: boolean }) {
  return <article className={featured ? 'video-card video-card-featured' : 'video-card'}><button type="button" className="video-card-media" onClick={onPlay} aria-label={`Play ${video.title}`}>{video.poster ? <Image src={video.poster} alt={video.poster_alt || ''} fill sizes={featured ? '(max-width: 900px) 100vw, 58vw' : '(max-width: 900px) 50vw, 26vw'} /> : <span className="media-image-fallback" /> }<span className="video-play"><Play size={featured ? 23 : 16} fill="currentColor" /></span>{video.duration && <span className="video-duration">{video.duration}</span>}</button><div className="video-card-copy"><p className="card-kicker">{video.category?.name || video.program?.title || 'Video story'}</p><h3><Link href={`/videos/${video.slug}`}>{video.title}</Link></h3>{featured && video.excerpt && <p>{video.excerpt}</p>}</div></article>;
}

export function VideoWall({ videos, mode = 'home' }: { videos: Video[]; mode?: 'home' | 'archive' }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!videos.length) return null;
  return <>{mode === 'home' ? <div className="video-wall"><VideoCard video={videos[0]} featured onPlay={() => setOpenIndex(0)} /><div className="video-wall-supporting">{videos.slice(1, 3).map((video, index) => <VideoCard video={video} key={video.id} onPlay={() => setOpenIndex(index + 1)} />)}</div></div> : <div className="video-archive-grid">{videos.map((video, index) => <VideoCard video={video} key={video.id} onPlay={() => setOpenIndex(index)} />)}</div>}{openIndex !== null && <VideoPlayerModal videos={videos} activeIndex={openIndex} onClose={() => setOpenIndex(null)} />}</>;
}

export function VideoArchive({ videos, categories }: { videos: Video[]; categories: Array<{ id: number; name: string; slug: string }> }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? videos : videos.filter((video) => video.category?.slug === activeCategory);
  return <><div className="media-filters" aria-label="Filter videos"><button className={activeCategory === 'all' ? 'is-active' : ''} onClick={() => setActiveCategory('all')} type="button">All stories</button>{categories.map((category) => <button className={activeCategory === category.slug ? 'is-active' : ''} onClick={() => setActiveCategory(category.slug)} type="button" key={category.id}>{category.name}</button>)}</div>{filtered.length ? <VideoWall videos={filtered} mode="archive" /> : <div className="empty-state">No videos have been published in this category yet.</div>}</>;
}
