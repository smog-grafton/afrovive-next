import { Container, PageHero } from '@/components/ui';
import { ContactForm } from '@/components/contact-form';
export const metadata = { title: 'Appointment' };
export default function AppointmentPage() { return <><PageHero eyebrow="Make time for a conversation" title="Book an appointment" intro="Share a few details and our team will get back to you to confirm a suitable time." /><section className="section"><Container className="form-narrow"><ContactForm appointment /></Container></section></>; }
