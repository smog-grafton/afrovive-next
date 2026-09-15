'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from './ui';
import type { HeroSlide } from '@/lib/types';

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = slides[active];
  return <section className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel" aria-label="AfroVive highlights">
    {slides.map((item, index) => item.image && <Image key={item.id} className={`hero-image ${index === active ? 'is-active' : ''}`} src={item.image} alt={item.image_alt || item.title} fill priority={index === 0} sizes="100vw" style={{ objectPosition: item.text_alignment || 'center' }} />)}
    <div className="hero-scrim" />
    <Container className="hero-content" aria-live="polite">
      <p className="eyebrow eyebrow-light">{slide.eyebrow}</p>
      <h1>{slide.title} <span>{slide.highlight}</span></h1>
      <p className="hero-copy">{slide.description} Guided by the principle <strong>“Nothing for Us Without Us.”</strong></p>
      {slide.primary_cta && <Link href={slide.primary_cta.url} className="button button-yellow">{slide.primary_cta.label} <ArrowUpRight size={17} /></Link>}
    </Container>
    <div className="hero-stamp"><strong>12</strong><span>Years of<br />experience</span></div>
    <div className="hero-controls"><button type="button" aria-label="Previous slide" onClick={() => setActive((active - 1 + slides.length) % slides.length)}><ArrowLeft size={18} /></button><div className="hero-dots">{slides.map((item, index) => <button key={item.id} type="button" className={index === active ? 'is-active' : ''} aria-label={`Go to slide ${index + 1}`} aria-current={index === active} onClick={() => setActive(index)} />)}</div><button type="button" aria-label="Next slide" onClick={() => setActive((active + 1) % slides.length)}><ArrowRight size={18} /></button></div>
  </section>;
}
