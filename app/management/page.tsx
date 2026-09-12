import Image from 'next/image';
import { Container, PageHero, SectionHeading } from '@/components/ui';
import { team } from '@/lib/content';
export const metadata = { title: 'Management' };
export default function ManagementPage() { return <><PageHero eyebrow="Meet the team" title="People who make the work possible" intro="Our management and secretariat bring knowledge, care and accountability to every partnership." /><section className="section"><Container><SectionHeading eyebrow="Management / contacts / operations / secretariat" title="A team rooted in service" /><div className="team-grid">{team.map(person => <article className="team-card" key={person.name}><div className="team-image"><Image src={person.image} alt={person.name} fill sizes="(max-width: 700px) 100vw, 45vw" /></div><div><h2>{person.name}</h2><p className="eyebrow">{person.role}</p><p>{person.bio}</p></div></article>)}</div></Container></section></>; }
