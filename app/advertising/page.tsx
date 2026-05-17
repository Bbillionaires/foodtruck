import type { Metadata } from 'next';
import LeadForm from '@/components/ui/LeadForm';
import PageSection from '@/components/ui/PageSection';

export const metadata: Metadata = {
  title: 'Advertising Slots Jacksonville FL | Jacksonville Food Truck Network',
  description: 'Submit advertising, sponsorship, coupon, newsletter, push notification, and directory placement requests for Jacksonville vendors.'
};

const fields = [
  { name: 'business_name', label: 'Business name' },
  { name: 'contact_name', label: 'Contact name' },
  { name: 'phone', label: 'Phone' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'advertise_goal', label: 'What do you want to advertise?' },
  { name: 'target_audience', label: 'Target audience' },
  { name: 'preferred_page', label: 'Preferred advertising location/page' },
  { name: 'ad_type', label: 'Ad type', options: ['homepage', 'sponsor', 'coupon', 'newsletter', 'push notification', 'training page', 'vendor directory'] },
  { name: 'campaign_budget', label: 'Campaign budget' },
  { name: 'campaign_duration', label: 'Campaign duration' },
  { name: 'ad_image_logo', label: 'Upload ad image/logo', type: 'file' },
  { name: 'notes', label: 'Notes', type: 'textarea' }
];

export default function Page() {
  return (
    <main className="container-page space-y-6">
      <section className="space-y-4">
        <span className="badge">Advertiser intake</span>
        <h1 className="text-4xl font-black tracking-tight">Advertising slots for Jacksonville businesses</h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-700">Submit campaign details for homepage ads, featured sponsorships, coupon placement, email/newsletter sponsorship, push notifications, training page sponsors, and vendor directory placements.</p>
      </section>
      <PageSection title="What happens after submission"><p>Admin reviews your goals, placement request, budget, creative files, and campaign duration. Approved campaigns can be invoiced or connected to Stripe-ready payment status before publishing.</p></PageSection>
      <LeadForm table="advertising_submissions" fields={fields} submitLabel="Submit advertising request" />
    </main>
  );
}
