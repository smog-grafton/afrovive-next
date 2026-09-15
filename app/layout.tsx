import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getSite } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> { const site = await getSite(); const settings = site.settings; return { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://afrovivehealth.org'), title: { default: settings.site_title || settings.default_meta_title || 'AfroVive Health Foundation', template: `%s | ${settings.organization_name || 'AfroVive Health Foundation'}` }, description: settings.default_meta_description || settings.tagline || undefined, openGraph: { type: 'website', siteName: settings.organization_name || 'AfroVive Health Foundation', locale: 'en_UG' }, icons: { icon: '/images/afrovive/branding/afrovive-footer.png' } }; }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#content">Skip to content</a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
