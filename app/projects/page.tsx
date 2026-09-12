import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container, PageHero, SectionHeading } from '@/components/ui';
import { projects } from '@/lib/content';
export const metadata = { title: 'Projects' };
export default function ProjectsPage() { return <><PageHero eyebrow="Our work" title="Projects that move knowledge into action" intro="From health research to global learning, our projects create space for young people and communities to lead." /><section className="section"><Container><SectionHeading eyebrow="Recently completed projects" title="Evidence, exchange and impact" /><div className="project-grid project-grid-large">{projects.map(p => <Link className="project-card" href={`/projects/${p.slug}`} key={p.slug}><div className="project-image"><Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="project-body"><p className="card-kicker">{p.category}</p><h3>{p.title}</h3><p>{p.summary}</p><span className="circle-arrow"><ArrowUpRight size={19} /></span></div></Link>)}</div></Container></section></>; }
