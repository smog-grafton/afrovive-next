import type { MetadataRoute } from 'next';
import { getCareers, getGalleries, getInternships, getPosts, getPrograms, getProjects, getVideos } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://afrovivehealth.org').replace(/\/$/, '');
  const routes: MetadataRoute.Sitemap = [
    '', '/about-us', '/programs', '/projects', '/blog', '/videos', '/gallery', '/management', '/partners',
    '/faq', '/internship', '/careers', '/support-us', '/contact-us', '/appointment',
    '/privacy-policy', '/terms-and-conditions',
  ].map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: 'weekly', priority: path === '' ? 1 : 0.7 }));

  const [programs, projects, posts, internships, careers, videos, galleries] = await Promise.all([
    getPrograms(), getProjects(), getPosts(), getInternships(), getCareers(), getVideos('?per_page=48'), getGalleries('?per_page=48'),
  ]);

  return routes.concat(
    programs.data.map((item) => ({ url: `${siteUrl}/programs/${item.slug}`, changeFrequency: 'monthly', priority: 0.8 })),
    projects.data.map((item) => ({ url: `${siteUrl}/projects/${item.slug}`, changeFrequency: 'monthly', priority: 0.8 })),
    posts.data.map((item) => ({ url: `${siteUrl}/blog/${item.slug}`, changeFrequency: 'monthly', priority: 0.6 })),
    internships.data.map((item) => ({ url: `${siteUrl}/internship/${item.slug}`, changeFrequency: 'weekly', priority: 0.6 })),
    careers.data.map((item) => ({ url: `${siteUrl}/careers/${item.slug}`, changeFrequency: 'weekly', priority: 0.6 })),
    videos.data.map((item) => ({ url: `${siteUrl}/videos/${item.slug}`, changeFrequency: 'monthly', priority: 0.7 })),
    galleries.data.map((item) => ({ url: `${siteUrl}/gallery/${item.slug}`, changeFrequency: 'monthly', priority: 0.7 })),
  );
}
