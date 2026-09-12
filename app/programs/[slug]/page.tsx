import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check } from 'lucide-react';
import { ButtonLink, Container, PageHero } from '@/components/ui';
import { programs } from '@/lib/content';
export function generateStaticParams() { return programs.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: { slug: string } }) { const p = programs.find(x => x.slug === params.slug); return { title: p?.title ?? 'Program' }; }
export default function ProgramPage({ params }: { params: { slug: string } }) { const p = programs.find(x => x.slug === params.slug); if (!p) notFound(); return <><PageHero eyebrow="Our program" title={p.title} intro={p.summary} /><section className="section"><Container className="split program-detail"><div className="program-detail-image"><Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div><p className="eyebrow">Why this matters</p><h2>Practical action shaped by the people it serves.</h2><p>{p.body}</p><ul className="check-list">{p.points.map(point => <li key={point}><Check size={18} />{point}</li>)}</ul><ButtonLink href="/contact-us">Work with us <ArrowUpRight size={17} /></ButtonLink></div></Container></section></>; }
