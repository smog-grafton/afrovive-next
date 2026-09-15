import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container, PageHero, SectionHeading } from '@/components/ui';
import { getPosts } from '@/lib/api';
export const metadata = { title: 'Insights' };
export const dynamic = 'force-dynamic';
export default async function BlogPage() { const response = await getPosts(); const posts = response.data; return <><PageHero eyebrow="Our insights" title="Ideas, stories and field notes" intro="Follow the conversations, lessons and people shaping AfroVive&apos;s work across Africa." /><section className="section"><Container><SectionHeading eyebrow="Keep updated with our insights" title="What we are learning" />{posts.length > 0 ? <div className="blog-grid">{posts.map(post => <article className="blog-card" key={post.slug}><div className="blog-image">{post.image && <Image src={post.image} alt={post.image_alt || post.title} fill sizes="(max-width: 700px) 100vw, 33vw" />}</div><div className="blog-body"><p className="card-kicker">{post.categories?.[0] || 'Insight'}</p><h2>{post.title}</h2><Link href={`/blog/${post.slug}`} className="text-link">Read story <ArrowUpRight size={15} /></Link></div></article>)}</div> : <div className="empty-state">No insights have been published yet. Please check back soon.</div>}</Container></section></>; }
