import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink, Container, SectionHeading } from '@/components/ui';
import { ContactForm } from '@/components/contact-form';
import { projects, programs } from '@/lib/content';
import { HeroSlider } from '@/components/hero-slider';

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <section className="section section-about">
        <Container className="split split-about">
          <div className="about-visual"><div className="image-frame"><Image src="/images/afrovive/projects/about.webp" alt="AfroVive youth and partners gathered in a learning session" fill sizes="(max-width: 800px) 100vw, 48vw" /></div><div className="about-badge">Nothing for us<br /><b>without us</b></div></div>
          <div className="about-copy"><p className="eyebrow">About us</p><h2>Advocacy for youth empowerment &amp; rights</h2><p>Headquartered in Kampala, Uganda, and operating across multiple African countries, AfroVive Health Foundation is a dynamic organization dedicated to advancing health equity, youth empowerment, and climate justice.</p><p>We prioritize youth-led solutions and inclusive participation to address Africa&apos;s most pressing challenges.</p><div className="principles"><div><span>01</span><p><b>Skill development</b><br />Training, digital literacy and life skills for quality, accessible opportunity.</p></div><div><span>02</span><p><b>Voice and agency</b><br />Building confidence and leadership so young people shape decisions affecting their lives.</p></div></div><ButtonLink href="/about-us">More about us <ArrowUpRight size={17} /></ButtonLink></div>
        </Container>
      </section>

      <section className="section section-tint">
        <Container><SectionHeading eyebrow="Our services" title="Our best services" intro="We are a critical and impactful movement ensuring young people have the voice, resources, and opportunities they need to thrive and shape their own futures." align="center" /><div className="card-grid services-grid">{programs.slice(0, 3).map((program, i) => <article className="service-card" key={program.slug}><div className="service-image"><Image src={program.image} alt={program.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="service-body"><span className="card-index">0{i + 1}</span><h3>{program.title}</h3><p>{program.summary}</p><Link href={`/programs/${program.slug}`} className="text-link">Explore program <ArrowUpRight size={15} /></Link></div></article>)}</div><div className="center-action"><ButtonLink href="/programs" variant="outline">View all programs <ArrowUpRight size={17} /></ButtonLink></div></Container>
      </section>

      <section className="section projects-section"><Container><SectionHeading eyebrow="Recent projects" title="Knowledge that moves communities forward" intro="Our projects connect learning, evidence and action to create healthier futures shaped by the people they serve." /><div className="project-grid">{projects.map((project) => <Link className="project-card" href={`/projects/${project.slug}`} key={project.slug}><div className="project-image"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="project-body"><p className="card-kicker">{project.category}</p><h3>{project.title}</h3><span className="circle-arrow"><ArrowUpRight size={19} /></span></div></Link>)}</div><div className="center-action"><ButtonLink href="/projects" variant="outline">View all projects <ArrowUpRight size={17} /></ButtonLink></div></Container></section>

      <section className="section director-section"><Container className="split split-director"><div><p className="eyebrow eyebrow-light">Meet our team</p><h2>People who turn conviction into action.</h2><p>Our team brings together public health practitioners, researchers, community advocates and young leaders committed to practical, locally owned change.</p><ButtonLink href="/management" variant="yellow">Meet our team <ArrowUpRight size={17} /></ButtonLink></div><div className="director-card"><Image src="/images/afrovive/team/dr-ben-director.webp" alt="Dr Ben Kibirige, Founder and Executive Director" width={651} height={642} /><div><h3>Dr Ben Kibirige</h3><p>Founder &amp; Executive Director</p></div></div></Container></section>

      <section className="section cta-band"><Container className="cta-inner"><div><p className="eyebrow">Let&apos;s work together</p><h2>Healthier futures are built together.</h2></div><ButtonLink href="/contact-us" variant="dark">Contact us now <ArrowUpRight size={17} /></ButtonLink></Container></section>

      <section className="section contact-preview"><Container className="split"><div><SectionHeading eyebrow="Have a question?" title="Start a conversation with AfroVive." intro="Whether you are a partner, funder, student, researcher or community member, we would love to hear from you." /><div className="contact-detail"><span>Write to us</span><a href="mailto:info@afrovivehealth.org">info@afrovivehealth.org</a></div></div><ContactForm compact /></Container></section>
    </>
  );
}
