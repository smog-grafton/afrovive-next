import Image from 'next/image';
import Link from 'next/link';
import { apiGet, getPosts, getPrograms, getSite } from '@/lib/api';
import type { NavigationItem, Post, Program } from '@/lib/types';
import { SiteHeaderNav } from './site-header-nav';

export async function SiteHeader() {
  const [site, navigation, programs, posts] = await Promise.all([getSite(), apiGet<Record<string, NavigationItem[]>>('navigation', { revalidate: 300, tags: ['navigation'] }), getPrograms(), getPosts()]);
  const items = navigation.header || [];
  return <header className="site-header"><div className="topbar"><div className="container topbar-inner"><span>{site.settings.tagline || 'Advancing health equity across Africa'}</span><div><a href={`mailto:${site.settings.primary_email || 'info@afrovivehealth.org'}`}>{site.settings.primary_email || 'info@afrovivehealth.org'}</a>{site.settings.primary_phone ? <><span className="topbar-divider">|</span><a href={`tel:${site.settings.primary_phone.replace(/\s/g, '')}`}>{site.settings.primary_phone}</a></> : null}</div></div></div><div className="container nav-wrap"><Link href="/" className="brand" aria-label={`${site.settings.organization_name || 'AfroVive Health Foundation'} home`}><Image src="/images/afrovive/branding/afrovive-header-logo.png" alt={site.settings.organization_name || 'AfroVive Health Foundation'} width={300} height={67} priority /></Link><SiteHeaderNav items={items} programs={programs.data.slice(0, 4)} posts={posts.data.slice(0, 4)} /></div></header>;
}
