export function GET() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://afrovivehealth.org').replace(/\/$/, '');
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
