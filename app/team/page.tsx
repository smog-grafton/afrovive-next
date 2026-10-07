import { Container, PageHero, SectionHeading } from '@/components/ui';
import { getTeam } from '@/lib/api';
import { TeamModalCard } from '@/components/team-modal-card';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Our team' };

export default async function TeamPage() {
  const team = await getTeam();
  return <><PageHero eyebrow="People and leadership" title="Meet the people behind the work" intro="AfroVive brings together public health practitioners, researchers, community advocates and young leaders committed to practical, locally owned change." /><section className="section team-directory-section"><Container>{team.length === 0 ? <div className="empty-state">No team profiles have been published yet.</div> : <><SectionHeading eyebrow="Our people" title="One team, many ways of making change practical." intro="Explore the people shaping AfroVive’s work. Profiles appear in the order managed by the organization, with role and area of work kept close at hand." /><div className="team-portrait-grid">{team.map((person, index) => <TeamModalCard key={person.id} person={person} featured={index === 0} compact={index > 5} />)}</div></>}</Container></section></>;
}
