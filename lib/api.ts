import 'server-only';
import type { ApiList, Career, Faq, HomeData, Opportunity, PageData, Partner, Post, Program, Project, SiteData, SupportMethod, TeamMember } from './types';

export class ApiError extends Error { constructor(public readonly status: number, message: string) { super(message); this.name = 'ApiError'; } }

function apiUrl(path: string) {
  const base = process.env.AFROVIVE_API_URL;
  if (!base) throw new Error('AFROVIVE_API_URL is not configured. Copy .env.example to .env.local and set the Laravel API URL.');
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export async function apiGet<T>(path: string, options: { revalidate?: number; tags?: string[] } = {}): Promise<T> {
  const response = await fetch(apiUrl(path), { headers: { Accept: 'application/json' }, ...(options.revalidate ? { next: { revalidate: options.revalidate, tags: options.tags } } : { cache: 'no-store' }) });
  if (!response.ok) throw new ApiError(response.status, `AfroVive API request failed: ${response.status} ${response.statusText}`);
  const payload = await response.json() as { data: T };
  return payload.data;
}

export const getSite = () => apiGet<SiteData>('site', { revalidate: 300, tags: ['site'] });
export const getHome = () => apiGet<HomeData>('home', { revalidate: 60, tags: ['home'] });
export const getPrograms = () => apiGet<ApiList<Program>>('programs', { revalidate: 60, tags: ['programs'] });
export const getProgram = (slug: string) => apiGet<Program>(`programs/${slug}`, { revalidate: 60, tags: [`program-${slug}`] });
export const getProjects = () => apiGet<ApiList<Project>>('projects', { revalidate: 60, tags: ['projects'] });
export const getProject = (slug: string) => apiGet<Project>(`projects/${slug}`, { revalidate: 60, tags: [`project-${slug}`] });
export const getPosts = () => apiGet<ApiList<Post>>('posts', { revalidate: 60, tags: ['posts'] });
export const getPost = (slug: string) => apiGet<Post>(`posts/${slug}`, { revalidate: 60, tags: [`post-${slug}`] });
export const getTeam = () => apiGet<TeamMember[]>('team', { revalidate: 300, tags: ['team'] });
export const getTeamMember = (slug: string) => apiGet<TeamMember>(`team/${slug}`, { revalidate: 300, tags: [`team-${slug}`] });
export const getPartners = () => apiGet<Partner[]>('partners', { revalidate: 300, tags: ['partners'] });
export const getFaqs = () => apiGet<Faq[]>('faqs', { revalidate: 300, tags: ['faqs'] });
export const getSupportMethods = () => apiGet<SupportMethod[]>('support', { revalidate: 300, tags: ['support'] });
export const getInternships = () => apiGet<ApiList<Opportunity>>('internships', { revalidate: 60, tags: ['internships'] });
export const getCareers = () => apiGet<ApiList<Career>>('careers', { revalidate: 60, tags: ['careers'] });
export const getInternship = (slug: string) => apiGet<Opportunity>(`internships/${slug}`, { revalidate: 60, tags: [`internship-${slug}`] });
export const getCareer = (slug: string) => apiGet<Career>(`careers/${slug}`, { revalidate: 60, tags: [`career-${slug}`] });
export const getPage = (slug: string) => apiGet<PageData>(`pages/${slug}`, { revalidate: 300, tags: [`page-${slug}`] });
