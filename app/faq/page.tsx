import { Container, PageHero, SectionHeading } from '@/components/ui';
import { FaqList } from '@/components/faq-list';
import { getFaqs } from '@/lib/api';
export const metadata = { title: 'FAQ' };
export const dynamic = 'force-dynamic';
export default async function FaqPage() { const faqs = await getFaqs(); return <><PageHero eyebrow="Questions, answered" title="Frequently asked questions" intro="A few things people often ask about AfroVive, our programmes and how to get involved." /><section className="section"><Container className="faq-layout"><SectionHeading eyebrow="Need to know" title="How can we help?" />{faqs.length > 0 ? <FaqList items={faqs} /> : <div className="empty-state">No FAQs have been published yet.</div>}</Container></section></>; }
