'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Linkedin, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { TeamMember } from '@/lib/types';

export function TeamModalCard({ person, featured = false }: { person: TeamMember; featured?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = ''; };
  }, [open]);

  return <>
    <article className={featured ? 'person-card person-card-featured reveal' : 'person-card reveal'}>
      <div className="person-photo">{person.image ? <Image src={person.image} alt={person.image_alt} fill sizes={featured ? '(max-width: 800px) 100vw, 42vw' : '(max-width: 800px) 50vw, 25vw'} /> : <span>{person.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>}</div>
      <div className="person-copy"><p className="eyebrow">{person.organizational_level || person.department || 'Team'}</p><h3>{person.name}</h3><p className="person-role">{person.position}</p>{person.short_bio && <p>{person.short_bio}</p>}<div className="person-links"><button type="button" className="text-link person-modal-trigger" onClick={() => setOpen(true)}>View details <ArrowUpRight size={15} /></button>{person.linkedin_url && <a href={person.linkedin_url} aria-label={`${person.name} on LinkedIn`}><Linkedin size={16} /></a>}</div></div>
    </article>
    {open && <div className="team-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setOpen(false); }}><section className="team-modal" role="dialog" aria-modal="true" aria-labelledby={`team-modal-title-${person.id}`}><button type="button" className="team-modal-close" aria-label="Close profile" onClick={() => setOpen(false)}><X size={20} /></button><div className="team-modal-image">{person.image && <Image src={person.image} alt={person.image_alt} fill sizes="260px" />}</div><div className="team-modal-content"><p className="eyebrow">{person.organizational_level || person.department || 'AfroVive team'}</p><h2 id={`team-modal-title-${person.id}`}>{person.name}</h2><p className="person-role">{person.position}</p>{person.bio ? person.bio.split(/\n+/).filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>) : person.short_bio && <p>{person.short_bio}</p>}{person.expertise && person.expertise.length > 0 && <div className="profile-expertise"><p className="eyebrow">Areas of practice</p><div>{person.expertise.map((item) => <span key={item}>{item}</span>)}</div></div>}<div className="profile-actions"><Link href={`/team/${person.slug}`} className="button button-green" onClick={() => setOpen(false)}>Open profile <ArrowUpRight size={17} /></Link>{person.linkedin_url && <a className="button button-outline" href={person.linkedin_url}>Professional profile <Linkedin size={16} /></a>}</div></div></section></div>}
  </>;
}
