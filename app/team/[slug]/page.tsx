import Image from 'next/image';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ButtonLink, Container, PageHero } from '@/components/ui';
import { ApiError, getTeamMember } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = await getTeamMember(params.slug).catch((error) => { if (error instanceof ApiError && error.status === 404) notFound(); throw error; });
  return <><PageHero eyebrow={member.organizational_level || 'AfroVive team'} title={member.name} intro={member.position} /><section className="section"><Container className="team-profile"><div className="team-profile-photo">{member.image && <Image src={member.image} alt={member.image_alt} fill sizes="(max-width: 800px) 100vw, 42vw" />}</div><div className="team-profile-copy"><p className="eyebrow">{member.department || member.organizational_level}</p><h2>{member.position}</h2>{member.bio ? member.bio.split(/\n+/).map((paragraph) => <p key={paragraph}>{paragraph}</p>) : member.short_bio && <p>{member.short_bio}</p>}{member.expertise && member.expertise.length > 0 && <div className="profile-expertise"><p className="eyebrow">Areas of practice</p><div>{member.expertise.map((item) => <span key={item}>{item}</span>)}</div></div>}<div className="profile-actions"><ButtonLink href="/team">Meet the full team <ArrowUpRight size={17} /></ButtonLink>{member.linkedin_url && <a className="button button-outline" href={member.linkedin_url}>Professional profile <Linkedin size={16} /></a>}</div></div></Container></section></>;
}
