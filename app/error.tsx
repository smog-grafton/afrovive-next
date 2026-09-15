'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <section className="section error-state"><div className="container"><p className="eyebrow">Something went wrong</p><h1>We couldn&apos;t load this page.</h1><p>There was a problem reaching the AfroVive content service. Please try again.</p><button className="button button-green" onClick={() => reset()}>Try again</button></div></section>; }
