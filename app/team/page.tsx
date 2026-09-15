import { Container, PageHero, SectionHeading } from '@/components/ui';
import { getTeam } from '@/lib/api';
import { TeamModalCard } from '@/components/team-modal-card';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Our team' };

export default async function TeamPage() {
  const team = await getTeam();
  const executive = team.filter((person) => ['Executive Leadership', 'Board of Directors'].includes(person.organizational_level || '')).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  const executiveIds = new Set(executive.map((person) => person.id));
  const directors = team.filter((person) => person.organizational_level === 'Directors' && !executiveIds.has(person.id));
  const technical = team.filter((person) => person.organizational_level === 'Research & Technical Team');
  const others = team.filter((person) => !executive.includes(person) && !directors.includes(person) && !technical.includes(person));

  return <><PageHero eyebrow="People and leadership" title="Meet the people behind the work" intro="AfroVive brings together public health practitioners, researchers, community advocates and young leaders committed to practical, locally owned change." /><section className="section"><Container>{team.length === 0 ? <div className="empty-state">No team profiles have been published yet.</div> : <><SectionHeading eyebrow="Executive leadership" title="Accountability with a human face" intro="Our leadership sets direction while staying close to the communities, partners and evidence that shape the work." />{executive.length > 0 && <div className="team-executive">{executive.map((person, index) => <TeamModalCard key={person.id} person={person} featured={index === 0} />)}</div>}{directors.length > 0 && <section className="team-tier"><SectionHeading eyebrow="Directors" title="Leading the work forward" /><div className="team-directors">{directors.map((person) => <TeamModalCard key={person.id} person={person} />)}</div></section>}{technical.length > 0 && <section className="team-tier"><SectionHeading eyebrow="Research and technical team" title="Evidence, care and curiosity" /><div className="team-compact">{technical.map((person) => <TeamModalCard key={person.id} person={person} />)}</div></section>}{others.length > 0 && <section className="team-tier"><SectionHeading eyebrow="Programme team and associates" title="Making ideas useful" /><div className="team-compact">{others.map((person) => <TeamModalCard key={person.id} person={person} />)}</div></section>}</>}</Container></section></>;
}
