'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Linkedin, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { TeamMember } from '@/lib/types';

export function TeamModalCard({ person, featured = false, compact = false }: { person: TeamMember; featured?: boolean; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => dialogRef.current?.focus(), 0);
    const closeOnKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); return; }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) { event.preventDefault(); dialogRef.current.focus(); return; }
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnKey);
    return () => { window.clearTimeout(timer); document.body.style.overflow = ''; document.removeEventListener('keydown', closeOnKey); triggerRef.current?.focus(); };
  }, [open]);

  return <>
    <article className={`${featured ? 'team-portrait-card is-featured' : 'team-portrait-card'} ${compact ? 'is-compact' : ''}`}>
      <button ref={triggerRef} type="button" className="team-portrait-trigger" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={`Open ${person.name}'s profile`}>
        <span className="team-portrait-image">{person.image ? <Image src={person.image} alt={person.image_alt} fill sizes="(max-width: 600px) 46vw, (max-width: 960px) 30vw, 20vw" /> : <span className="team-initials">{person.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>}</span>
        <span className="team-portrait-copy"><small>{person.organizational_level || person.department || 'AfroVive team'}</small><strong>{person.name}</strong><span>{person.position}</span><i aria-hidden="true"><ArrowUpRight size={16} /></i></span>
      </button>
    </article>
    {open && <div className="team-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setOpen(false); }}>
      <section className="team-modal" role="dialog" aria-modal="true" aria-labelledby={`team-modal-title-${person.id}`} tabIndex={-1} ref={dialogRef}>
        <button type="button" className="team-modal-close" aria-label={`Close ${person.name}'s profile`} onClick={() => setOpen(false)}><X size={20} /></button>
        <div className="team-modal-image">{person.image ? <Image src={person.image} alt={person.image_alt} fill sizes="(max-width: 700px) 100vw, 340px" /> : <span className="team-initials">{person.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>}</div>
        <div className="team-modal-content"><p className="eyebrow">{person.organizational_level || person.department || 'AfroVive team'}</p><h2 id={`team-modal-title-${person.id}`}>{person.name}</h2><p className="person-role">{person.position}</p>{person.short_bio && <p className="team-modal-intro">{person.short_bio}</p>}{person.bio ? person.bio.split(/\n+/).filter(Boolean).map((paragraph, index) => <p key={`${person.id}-${index}`}>{paragraph}</p>) : null}{person.expertise && person.expertise.length > 0 && <div className="profile-expertise"><p className="eyebrow">Areas of practice</p><div>{person.expertise.map((item) => <span key={item}>{item}</span>)}</div></div>}<div className="profile-actions"><Link href={`/team/${person.slug}`} className="button button-green" onClick={() => setOpen(false)}>Open profile <ArrowUpRight size={17} /></Link>{person.linkedin_url && <a className="button button-outline" href={person.linkedin_url} target="_blank" rel="noreferrer">Professional profile <Linkedin size={16} /></a>}</div></div>
      </section>
    </div>}
  </>;
}
