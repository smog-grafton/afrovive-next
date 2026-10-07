import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container, PageHero, SectionHeading } from '@/components/ui';
import { GalleryArchive } from '@/components/gallery-story';
import { getGalleries, getGalleryCategories, getSite } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const [response, categories, site] = await Promise.all([getGalleries('?per_page=48'), getGalleryCategories(), getSite()]);
  const galleries = response.data;
  const featured = galleries.find((gallery) => gallery.featured) || galleries[0];
  const remaining = galleries.filter((gallery) => gallery.id !== featured?.id);
  return <><PageHero eyebrow={site.settings.gallery_page_eyebrow || ''} title={site.settings.gallery_page_title || ''} intro={site.settings.gallery_page_intro || undefined} /><section className="section gallery-page"><Container>{featured ? <Link href={`/gallery/${featured.slug}`} className="gallery-feature"><div>{featured.cover_image && <Image src={featured.cover_image} alt={featured.cover_image_alt || featured.title} fill sizes="(max-width: 900px) 100vw, 60vw" />}</div><article><p className="eyebrow">Featured photo story</p><h2>{featured.title}</h2><p>{featured.excerpt}</p><span className="text-link">Explore this story <ArrowUpRight size={16} /></span></article></Link> : <div className="empty-state">No photo stories have been published yet.</div>}{remaining.length > 0 && <section className="gallery-latest"><SectionHeading eyebrow="Photo stories" title="A closer record of the work." /><GalleryArchive galleries={remaining} categories={categories} /></section>}</Container></section></>;
}
