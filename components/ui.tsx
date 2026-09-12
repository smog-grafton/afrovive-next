import Link from 'next/link';
import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) { return <div className={`container ${className}`}>{children}</div>; }
export function ButtonLink({ href, children, variant = 'green' }: { href: string; children: ReactNode; variant?: 'green' | 'yellow' | 'dark' | 'outline' }) { return <Link href={href} className={`button button-${variant}`}>{children}</Link>; }
export function SectionHeading({ eyebrow, title, intro, align = 'left' }: { eyebrow: string; title: string; intro?: string; align?: 'left' | 'center' }) { return <div className={`section-heading align-${align}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>; }
export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) { return <section className="page-hero"><Container><p className="eyebrow eyebrow-light">{eyebrow}</p><h1>{title}</h1>{intro && <p>{intro}</p>}</Container></section>; }
export function Breadcrumbs({ current }: { current: string }) { return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">{current}</span></nav>; }
