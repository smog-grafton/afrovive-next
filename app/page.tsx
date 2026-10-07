import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink, Container, SectionHeading } from '@/components/ui';
import { ContactForm } from '@/components/contact-form';
import { HeroSlider } from '@/components/hero-slider';
import { HomeGalleryStories } from '@/components/gallery-story';
import { VideoWall } from '@/components/video-wall';
import { TeamModalCard } from '@/components/team-modal-card';
import { getHome, getSite } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [home, site] = await Promise.all([getHome(), getSite()]);
  const showVideoWall = site.settings.home_video_wall_visible === '1' && !!site.settings.home_video_wall_eyebrow && !!site.settings.home_video_wall_title && !!site.settings.home_video_wall_cta_label && !!site.settings.home_video_wall_cta_url;
  const showGalleryStories = site.settings.home_gallery_visible === '1' && !!site.settings.home_gallery_eyebrow && !!site.settings.home_gallery_title && !!site.settings.home_gallery_cta_label && !!site.settings.home_gallery_cta_url;
  return (
    <>
      {home.hero_slides.length > 0 ? <HeroSlider slides={home.hero_slides} /> : <section className="hero hero-empty"><Container className="hero-content"><p className="eyebrow eyebrow-light">AfroVive Health Foundation</p><h1>Healthier futures built together.</h1><p className="hero-copy">Our next story is being prepared. Explore our programmes and projects while we update the home page.</p><ButtonLink href="/programs" variant="yellow">Explore programmes <ArrowUpRight size={17} /></ButtonLink></Container></section>}

      <section className="section section-about">
        <Container className="split split-about">
          <div className="about-visual"><div className="image-frame"><Image src="/images/afrovive/projects/about.webp" alt="AfroVive youth and partners gathered in a learning session" fill sizes="(max-width: 800px) 100vw, 48vw" /></div><div className="about-badge">Nothing for us<br /><b>without us</b></div></div>
          <div className="about-copy"><p className="eyebrow">About us</p><h2>Advocacy for youth empowerment &amp; rights</h2><p>Headquartered in Kampala, Uganda, and operating across multiple African countries, AfroVive Health Foundation is a dynamic organization dedicated to advancing health equity, youth empowerment, and climate justice.</p><p>We prioritize youth-led solutions and inclusive participation to address Africa&apos;s most pressing challenges.</p><div className="principles"><div><span>01</span><p><b>Skill development</b><br />Training, digital literacy and life skills for quality, accessible opportunity.</p></div><div><span>02</span><p><b>Voice and agency</b><br />Building confidence and leadership so young people shape decisions affecting their lives.</p></div></div><ButtonLink href="/about-us">More about us <ArrowUpRight size={17} /></ButtonLink></div>
        </Container>
      </section>

      <section className="section mission-vision-section"><Container><div className="mission-vision-intro"><p className="eyebrow">What guides us</p><h2>Clear purpose. Shared responsibility.</h2></div><div className="mission-vision-grid"><article className="mission-vision-card reveal"><span>01</span><h3>Mission</h3><p>{site.settings.mission || 'To advance health equity, youth empowerment and climate justice through community-centred programmes, evidence, advocacy and partnerships.'}</p></article><article className="mission-vision-card mission-vision-card-dark reveal"><span>02</span><h3>Vision</h3><p>{site.settings.vision || 'A healthier, more equitable and climate-resilient Africa where young people have the voice, resources and opportunities to shape their futures.'}</p></article></div></Container></section>

      <section className="section section-tint">
        <Container><SectionHeading eyebrow="Our services" title="Our best services" intro="We are a critical and impactful movement ensuring young people have the voice, resources, and opportunities they need to thrive and shape their own futures." align="center" />{home.programs.length > 0 ? <div className="card-grid services-grid">{home.programs.slice(0, 3).map((program, i) => <article className="service-card" key={program.slug}><div className="service-image">{program.image && <Image src={program.image} alt={program.image_alt || program.title} fill sizes="(max-width: 700px) 100vw, 33vw" />}</div><div className="service-body"><span className="card-index">0{i + 1}</span><h3>{program.title}</h3><p>{program.short_description}</p><Link href={`/programs/${program.slug}`} className="text-link">Explore programme <ArrowUpRight size={15} /></Link></div></article>)}</div> : <div className="empty-state">No programmes have been published yet.</div>}<div className="center-action"><ButtonLink href="/programs" variant="outline">View all programmes <ArrowUpRight size={17} /></ButtonLink></div></Container>
      </section>

      <section className="section projects-section"><Container><SectionHeading eyebrow="Recent projects" title="Knowledge that moves communities forward" intro="Our projects connect learning, evidence and action to create healthier futures shaped by the people they serve." />{home.projects.length > 0 ? <div className="project-grid">{home.projects.map((project) => <Link className="project-card" href={`/projects/${project.slug}`} key={project.slug}><div className="project-image">{project.image && <Image src={project.image} alt={project.image_alt || project.title} fill sizes="(max-width: 700px) 100vw, 33vw" />}</div><div className="project-body"><p className="card-kicker">{project.category}</p><h3>{project.title}</h3><span className="circle-arrow"><ArrowUpRight size={19} /></span></div></Link>)}</div> : <div className="empty-state">No projects have been published yet.</div>}<div className="center-action"><ButtonLink href="/projects" variant="outline">View all projects <ArrowUpRight size={17} /></ButtonLink></div></Container></section>

      {showVideoWall && home.videos.length > 0 && <section className="section video-wall-section"><Container><div className="media-section-heading"><SectionHeading eyebrow={site.settings.home_video_wall_eyebrow!} title={site.settings.home_video_wall_title!} intro={site.settings.home_video_wall_intro || undefined} /><ButtonLink href={site.settings.home_video_wall_cta_url!} variant="outline">{site.settings.home_video_wall_cta_label!} <ArrowUpRight size={17} /></ButtonLink></div><VideoWall videos={home.videos} /></Container></section>}

      {showGalleryStories && home.galleries.length > 0 && <section className="section home-gallery-section"><Container><div className="media-section-heading"><SectionHeading eyebrow={site.settings.home_gallery_eyebrow!} title={site.settings.home_gallery_title!} intro={site.settings.home_gallery_intro || undefined} /><ButtonLink href={site.settings.home_gallery_cta_url!} variant="outline">{site.settings.home_gallery_cta_label!} <ArrowUpRight size={17} /></ButtonLink></div><HomeGalleryStories galleries={home.galleries} /></Container></section>}

      <section className="section director-section"><Container><div className="team-home-heading"><div><p className="eyebrow eyebrow-light">Meet our team</p><h2>Leadership that stays close to the work.</h2></div><ButtonLink href="/team" variant="yellow">Meet our team <ArrowUpRight size={17} /></ButtonLink></div>{home.team.length > 0 ? <div className="home-team-grid">{home.team.slice(0, 4).map((person, index) => <TeamModalCard key={person.id} person={person} featured={index === 0} />)}</div> : <div className="empty-state">Team profiles are being prepared.</div>}</Container></section>

      <section className="section cta-band"><Container className="cta-inner"><div><p className="eyebrow">Let&apos;s work together</p><h2>Healthier futures are built together.</h2></div><ButtonLink href="/contact-us" variant="dark">Contact us now <ArrowUpRight size={17} /></ButtonLink></Container></section>

      <section className="section contact-preview"><Container className="split"><div><SectionHeading eyebrow="Have a question?" title="Start a conversation with AfroVive." intro="Whether you are a partner, funder, student, researcher or community member, we would love to hear from you." /><div className="contact-detail"><span>Write to us</span><a href="mailto:info@afrovivehealth.org">info@afrovivehealth.org</a></div></div><ContactForm compact /></Container></section>
    </>
  );
}
