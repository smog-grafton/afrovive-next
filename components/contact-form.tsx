'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function ContactForm({ compact = false, appointment = false }: { compact?: boolean; appointment?: boolean }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <form className={`contact-form ${compact ? 'contact-form-compact' : ''}`} onSubmit={submit}>{sent ? <div className="form-success"><strong>Thank you for reaching out.</strong><p>Your message has been recorded for the AfroVive team. We&apos;ll be in touch soon.</p><button type="button" className="text-link" onClick={() => setSent(false)}>Send another message</button></div> : <><div className="form-row"><label>Full name<input name="name" placeholder="Your name" required /></label><label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label></div><div className="form-row"><label>Phone number<input name="phone" type="tel" placeholder="+256 ..." /></label><label>{appointment ? 'Preferred focus area' : 'What can we help with?'}<select name="service" defaultValue=""><option value="" disabled>Select an option</option><option>Partnerships</option><option>Programs and research</option><option>Internship</option><option>Media and speaking</option><option>General enquiry</option></select></label></div>{appointment && <div className="form-row"><label>Preferred date<input name="date" type="date" /></label><label>Preferred time<input name="time" type="time" /></label></div>}<label>Message<textarea name="message" placeholder="Tell us a little more..." rows={compact ? 4 : 6} required /></label><button className="button button-green" type="submit">Send message <ArrowUpRight size={17} /></button><p className="form-note">This form is ready to connect to the Laravel API endpoint when the backend is introduced.</p></>}</form>;
}
