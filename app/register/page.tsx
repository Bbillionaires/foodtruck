import type { Metadata } from 'next';
import LeadForm from '@/components/ui/LeadForm';

export const metadata: Metadata = {
  title: 'Create Account | Jacksonville Food Truck Network',
  description: 'Register for a Jacksonville Food Truck Network vendor, location owner, prospect, or admin-review account.'
};

const fields = [
  { name: 'account_type', label: 'Account type', options: ['food truck/vendor', 'location owner', 'buyer/renter prospect', 'advertiser', 'promoter'] },
  { name: 'business_name', label: 'Business or organization name' },
  { name: 'contact_name', label: 'Primary contact name' },
  { name: 'phone', label: 'Phone' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'service_area', label: 'Jacksonville service area' },
  { name: 'setup_type', label: 'Truck, trailer, tent, cart, or property' },
  { name: 'profile_goal', label: 'What do you want to do?', options: ['book locations', 'list my location', 'rent/buy a truck', 'message prospects', 'advertise'] },
  { name: 'insurance_or_permit', label: 'Upload insurance/permit if available', type: 'file' },
  { name: 'notes', label: 'Notes for account review', type: 'textarea' }
];

export default function Page() {
  return (
    <main className="container-page space-y-8">
      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <span className="badge">Account registration</span>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Create your Jax Food Truck Network account</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700">Register as a vendor, location owner, prospect, advertiser, or promoter. Accounts are designed for a future mobile app experience where bookings, listings, documents, payments, and messages stay in one platform.</p>
        </div>
        <div className="card bg-slate-950 text-white">
          <p className="text-sm font-black uppercase tracking-wide text-amber-300">Platform-first communication</p>
          <h2 className="mt-2 text-2xl font-black">Keep prospects and vendors inside the marketplace.</h2>
          <p className="mt-2 text-slate-300">Phone and email can remain protected while users communicate through account inboxes, booking threads, and admin-reviewed listing conversations.</p>
        </div>
      </section>
      <LeadForm table="account_registration_submissions" fields={fields} submitLabel="Create account request" />
    </main>
  );
}
