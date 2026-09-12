'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from './ui';

const slides = [
  { image: '/images/afrovive/hero/hero1.jpg', alt: 'Young African people taking part in a health learning session', eyebrow: 'Welcome to the home page of', title: 'AfroVive Health Foundation', suffix: '(AHF-UG)', copy: 'A dynamic organization dedicated to advancing health equity, youth empowerment, and climate justice.', position: 'center' },
  { image: '/images/afrovive/hero/hero2.jpg', alt: 'Young people collaborating during a workshop', eyebrow: 'Youth-led change in action', title: 'Learning that travels', suffix: 'across borders.', copy: 'We connect young people, communities and partners to practical health knowledge and opportunity.', position: 'center' },
  { image: '/images/afrovive/hero/hero3.jpg', alt: 'A group of young people learning together', eyebrow: 'Nothing for us without us', title: 'Healthier futures', suffix: 'built together.', copy: 'Co-designed solutions put lived experience, evidence and youth leadership at the heart of change.', position: 'center' },
  { image: '/images/afrovive/hero/hero4.webp', alt: 'A bold illustration representing African youth leadership', eyebrow: 'Our vision for Africa', title: 'Young people shaping', suffix: 'their own futures.', copy: 'Advancing health equity, innovation and climate justice across Africa—by Africa, for Africa.', position: 'center' }
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = slides[active];
  return <section className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel" aria-label="AfroVive highlights">
    {slides.map((item, index) => <Image key={item.image} className={`hero-image ${index === active ? 'is-active' : ''}`} src={item.image} alt={item.alt} fill priority={index === 0} sizes="100vw" style={{ objectPosition: item.position }} />)}
    <div className="hero-scrim" />
    <Container className="hero-content" aria-live="polite">
      <p className="eyebrow eyebrow-light">{slide.eyebrow}</p>
      <h1>{slide.title} <span>{slide.suffix}</span></h1>
      <p className="hero-copy">{slide.copy} Guided by the principle <strong>“Nothing for Us Without Us.”</strong></p>
      <Link href="/about-us" className="button button-yellow">Get started now <ArrowUpRight size={17} /></Link>
    </Container>
    <div className="hero-stamp"><strong>12</strong><span>Years of<br />experience</span></div>
    <div className="hero-controls"><button type="button" aria-label="Previous slide" onClick={() => setActive((active - 1 + slides.length) % slides.length)}><ArrowLeft size={18} /></button><div className="hero-dots">{slides.map((item, index) => <button key={item.image} type="button" className={index === active ? 'is-active' : ''} aria-label={`Go to slide ${index + 1}`} aria-current={index === active} onClick={() => setActive(index)} />)}</div><button type="button" aria-label="Next slide" onClick={() => setActive((active + 1) % slides.length)}><ArrowRight size={18} /></button></div>
  </section>;
}
