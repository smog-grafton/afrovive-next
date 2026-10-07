import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink, Container, PageHero } from '@/components/ui';
import { GalleryStory } from '@/components/gallery-story';
import { ApiError, getGallery } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try { const gallery = await getGallery(params.slug); return { title: gallery.meta?.title || gallery.title, description: gallery.meta?.description || gallery.excerpt, alternates: gallery.meta?.canonical ? { canonical: gallery.meta.canonical } : undefined, openGraph: gallery.meta?.og_image ? { images: [gallery.meta.og_image] } : undefined, robots: gallery.meta?.noindex ? { index: false, follow: false } : undefined }; } catch { return { title: 'Gallery' }; }
}

export default async function GalleryDetailPage({ params }: { params: { slug: string } }) {
  let gallery: Awaited<ReturnType<typeof getGallery>>;
  try { gallery = await getGallery(params.slug); } catch (error) { if (error instanceof ApiError && error.status === 404) notFound(); throw error; }
  const metadata = [gallery.location, gallery.event_date, gallery.credit].filter(Boolean);
  const gallerySchema = { '@context': 'https://schema.org', '@type': 'ImageGallery', name: gallery.title, description: gallery.introduction || gallery.excerpt || undefined, image: gallery.items?.map((item) => item.image) || [] };
  return <><PageHero eyebrow={gallery.category?.name || 'Photo story'} title={gallery.title} intro={gallery.excerpt || undefined} /><section className="section gallery-detail"><Container>{gallery.cover_image && <div className="gallery-detail-cover"><Image src={gallery.cover_image} alt={gallery.cover_image_alt || gallery.title} fill sizes="(max-width: 900px) 100vw, 80vw" /></div>}<div className="gallery-intro"><article>{gallery.introduction && gallery.introduction.split(/\n+/).filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article><aside>{metadata.map((item) => <span key={item}>{item}</span>)}<ButtonLink href="/gallery" variant="outline">All photo stories <ArrowUpRight size={17} /></ButtonLink></aside></div><GalleryStory gallery={gallery} /></Container></section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} /></>;
}
