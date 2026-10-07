import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container, PageHero, SectionHeading } from '@/components/ui';
import { VideoArchive, VideoWall } from '@/components/video-wall';
import { getSite, getVideoCategories, getVideos } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function VideosPage() {
  const [response, categories, site] = await Promise.all([getVideos('?per_page=48'), getVideoCategories(), getSite()]);
  const videos = response.data;
  const featured = videos.find((video) => video.featured) || videos[0];
  const latest = videos.filter((video) => video.id !== featured?.id);
  return <><PageHero eyebrow={site.settings.videos_page_eyebrow || ''} title={site.settings.videos_page_title || ''} intro={site.settings.videos_page_intro || undefined} /><section className="section videos-page"><Container>{featured ? <><SectionHeading eyebrow="Featured film" title={featured.title} intro={featured.excerpt || undefined} /><VideoWall videos={[featured]} /><div className="editorial-rule" /></> : <div className="empty-state">No videos have been published yet.</div>}{latest.length > 0 && <section className="video-latest"><SectionHeading eyebrow="Latest stories" title="Watch, learn, and stay close to the work." /><VideoArchive videos={latest} categories={categories} /></section>}</Container></section></>;
}
