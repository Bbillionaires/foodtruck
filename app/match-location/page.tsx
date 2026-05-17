import type { Metadata } from 'next';
import LeadForm from '@/components/ui/LeadForm';
import PageSection from '@/components/ui/PageSection';

export const metadata: Metadata = {
  title: 'We Pick a Location for You | Jacksonville Food Truck Network',
  description: 'Vendor location matching intake for Jacksonville food trucks, trailers, tents, and carts.'
};

const fields = [
  { name: 'business_name', label: 'Business/vendor name' },
  { name: 'vendor_type', label: 'Food type/vendor type' },
  { name: 'setup_type', label: 'Truck, trailer, tent, or cart', options: ['truck', 'trailer', 'tent', 'cart'] },
  { name: 'dimensions', label: 'Dimensions' },
  { name: 'power_needs', label: 'Power needs' },
  { name: 'water_needs', label: 'Water needs' },
  { name: 'preferred_areas', label: 'Preferred Jacksonville areas' },
  { name: 'budget', label: 'Budget' },
  { name: 'preferred_days_times', label: 'Preferred days/times' },
  { name: 'setup_frequency', label: 'One-time event or recurring setup', options: ['one-time event', 'recurring setup', 'not sure'] },
  { name: 'expected_customer_type', label: 'Expected customer type' },
  { name: 'insurance_or_permit', label: 'Upload insurance/permit if available', type: 'file' },
  { name: 'notes', label: 'Notes', type: 'textarea' }
];

export default function Page() {
  return (
    <main className="container-page space-y-6">
      <section className="space-y-4">
        <span className="badge">Location matching</span>
        <h1 className="text-4xl font-black tracking-tight">We pick a Jacksonville location for you</h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-700">Not sure where to set up? Share your setup, power needs, area preferences, schedule, and budget. Admin reviews your request and recommends approved locations.</p>
      </section>
      <PageSection title="How matching works"><p>We compare your setup type, dimensions, customer goals, budget, and preferred days against approved locations. Admin can add notes, assign a recommendation, and follow up with booking options.</p></PageSection>
      <LeadForm table="location_match_submissions" fields={fields} submitLabel="Request location match" />
    </main>
  );
}
