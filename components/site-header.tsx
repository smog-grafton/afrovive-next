'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const nav = [{ label: 'About us', href: '/about-us' }, { label: 'Programs', href: '/programs', children: [{ label: 'Health & well-being', href: '/programs/health-well-being' }, { label: 'Skill development', href: '/programs/skill-development' }, { label: 'SRH advocacy', href: '/programs/srh-advocacy' }, { label: 'Climate justice', href: '/programs/climate-justice' }] }, { label: 'Projects', href: '/projects' }, { label: 'Insights', href: '/blog' }, { label: 'Internship', href: '/internship' }, { label: 'Contact', href: '/contact-us' }];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="topbar"><div className="container topbar-inner"><span>Advancing health equity across Africa</span><div><a href="mailto:info@afrovivehealth.org">info@afrovivehealth.org</a><span className="topbar-divider">|</span><a href="tel:+256782274722">+256 782 274 722</a></div></div></div><div className="container nav-wrap"><Link href="/" className="brand" aria-label="AfroVive Health Foundation home"><Image src="/images/afrovive/branding/afrovive-header-logo.png" alt="AfroVive Health Foundation" width={300} height={67} priority /></Link><button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation"><ul>{nav.map((item) => <li key={item.label} className={item.children ? 'has-children' : ''}><Link href={item.href} onClick={() => setOpen(false)}>{item.label}{item.children && <ChevronDown size={14} />}</Link>{item.children && <ul className="submenu">{item.children.map(child => <li key={child.href}><Link href={child.href} onClick={() => setOpen(false)}>{child.label}</Link></li>)}</ul>}</li>)}</ul><Link href="/support-us" className="header-cta" onClick={() => setOpen(false)}>Support us</Link></nav></div></header>;
}
