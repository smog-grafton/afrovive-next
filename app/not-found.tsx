import Link from 'next/link';
import { Container } from '@/components/ui';
export default function NotFound() { return <section className="section error-state"><Container><p className="eyebrow">404</p><h1>Page not found.</h1><p>The page you are looking for may have moved or is not currently published.</p><Link href="/" className="button button-green">Return home</Link></Container></section>; }
