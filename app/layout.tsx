import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  metadataBase: new URL('https://afrovivehealth.org'),
  title: { default: 'AfroVive Health Foundation | Empowered Africa', template: '%s | AfroVive Health Foundation' },
  description: 'AfroVive Health Foundation advances health equity, youth empowerment, innovation and climate justice across Africa.',
  openGraph: { type: 'website', siteName: 'AfroVive Health Foundation', locale: 'en_UG' },
  icons: { icon: '/images/afrovive/branding/afrovive-footer.png' }
};

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
