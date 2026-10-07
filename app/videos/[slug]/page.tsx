import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink, Container, PageHero, SectionHeading } from '@/components/ui';
import { ApiError, getVideo, getVideos } from '@/lib/api';
import { VideoWall } from '@/components/video-wall';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try { const video = await getVideo(params.slug); return { title: video.meta?.title || video.title, description: video.meta?.description || video.excerpt, alternates: video.meta?.canonical ? { canonical: video.meta.canonical } : undefined, openGraph: video.meta?.og_image ? { images: [video.meta.og_image] } : undefined, robots: video.meta?.noindex ? { index: false, follow: false } : undefined }; } catch { return { title: 'Video' }; }
}

export default async function VideoPage({ params }: { params: { slug: string } }) {
  let video: Awaited<ReturnType<typeof getVideo>>;
  try { video = await getVideo(params.slug); } catch (error) { if (error instanceof ApiError && error.status === 404) notFound(); throw error; }
  const all = (await getVideos('?per_page=12')).data;
  const related = all.filter((item) => item.id !== video.id && (!video.category || item.category?.slug === video.category.slug)).slice(0, 4);
  const description = video.description || video.excerpt;
  const videoSchema = { '@context': 'https://schema.org', '@type': 'VideoObject', name: video.title, description: description || undefined, thumbnailUrl: video.poster || undefined, uploadDate: video.published_at || undefined, contentUrl: video.video_url || video.source_url || undefined };
  return <><PageHero eyebrow={video.category?.name || 'Video story'} title={video.title} intro={video.excerpt || undefined} /><section className="section video-detail"><Container><VideoWall videos={[video]} /><div className="video-detail-layout"><article><p className="eyebrow">About this story</p>{description && <div className="rich-text">{description.split(/\n+/).filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}</article><aside className="video-detail-meta">{video.program && <div><span>Programme</span><b>{video.program.title}</b></div>}{video.project && <div><span>Project</span><b>{video.project.title}</b></div>}{video.location && <div><span>Location</span><b>{video.location}</b></div>}{video.recorded_at && <div><span>Recorded</span><b>{video.recorded_at}</b></div>}<ButtonLink href="/videos" variant="outline">All videos <ArrowUpRight size={17} /></ButtonLink></aside></div>{related.length > 0 && <section className="related-media"><SectionHeading eyebrow="Continue watching" title="More from AfroVive" /><VideoWall videos={related} mode="archive" /></section>}</Container></section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} /></>;
}
