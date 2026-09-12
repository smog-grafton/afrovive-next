import { Container, PageHero, SectionHeading } from '@/components/ui';
import { FaqList } from '@/components/faq-list';
import { faqs } from '@/lib/content';
export const metadata = { title: 'FAQ' };
export default function FaqPage() { return <><PageHero eyebrow="Questions, answered" title="Frequently asked questions" intro="A few things people often ask about AfroVive, our programs and how to get involved." /><section className="section"><Container className="faq-layout"><SectionHeading eyebrow="Need to know" title="How can we help?" /><FaqList items={faqs} /></Container></section></>; }
