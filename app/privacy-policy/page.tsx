import { Container, PageHero } from '@/components/ui';
import { getPage } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function PrivacyPage() {
  const page = await getPage('privacy-policy');
  return <><PageHero eyebrow={page.hero.eyebrow || 'Legal'} title={page.hero.title} intro={page.hero.intro || page.excerpt || ''} /><section className="section"><Container className="legal-body"><p className="eyebrow">Last updated September 2026</p>{(page.body || page.excerpt || '').split(/\n+/).filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</Container></section></>;
}
