import type { Metadata } from 'next';
import BookingFlow from '@/components/BookingFlow';

export const metadata: Metadata = {
  title: 'Book, Rent, or Buy | Jacksonville Food Truck Network',
  description: 'Choose the right booking path to reserve vendor locations, rent food trucks, or buy food trucks in Jacksonville FL.'
};

export default function Page() {
  return (
    <main className="container-page space-y-8">
      <section className="space-y-4">
        <span className="badge">Booking flow</span>
        <h1 className="text-4xl font-black tracking-tight">Book a location, rent a truck, or buy a truck</h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-700">Choose the correct path first. Stripe-ready payment and final confirmation happen after the request type, dates, availability, and admin approval requirements are reviewed.</p>
      </section>
      <BookingFlow />
    </main>
  );
}
