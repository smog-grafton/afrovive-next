import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container, PageHero, SectionHeading } from '@/components/ui';
import { getProjects } from '@/lib/api';
export const metadata = { title: 'Projects' };
export const dynamic = 'force-dynamic';
export default async function ProjectsPage() { const response = await getProjects(); const projects = response.data; return <><PageHero eyebrow="Our work" title="Projects that move knowledge into action" intro="From health research to global learning, our projects create space for young people and communities to lead." /><section className="section"><Container><SectionHeading eyebrow="Recently completed projects" title="Evidence, exchange and impact" />{projects.length > 0 ? <div className="project-grid project-grid-large">{projects.map(p => <Link className="project-card" href={`/projects/${p.slug}`} key={p.slug}><div className="project-image">{p.image && <Image src={p.image} alt={p.image_alt || p.title} fill sizes="(max-width: 700px) 100vw, 33vw" />}</div><div className="project-body"><p className="card-kicker">{p.category}</p><h3>{p.title}</h3><p>{p.summary}</p><span className="circle-arrow"><ArrowUpRight size={19} /></span></div></Link>)}</div> : <div className="empty-state">No projects have been published yet.</div>}</Container></section></>; }
