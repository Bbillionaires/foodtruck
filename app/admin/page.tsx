import type { Metadata } from 'next';
import AdminTable from '@/components/ui/AdminTable';
import { featuredLocations, trucksForSale } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Jacksonville Food Truck Network',
  description: 'Admin backend to manage listings, bookings, trucks, advertising, location matching, uploads, approvals, pricing, and payment status.'
};

const reviewRows = [
  ['new', 'Booking', 'Downtown Lunch Corridor request', '$55/day', 'not sent'],
  ['pending', 'Location match', 'Trailer setup needs power + Westside budget', 'admin quote', 'needs review'],
  ['approved', 'Advertising', 'Homepage sponsor creative uploaded', '$500 campaign', 'stripe-ready'],
  ['pending', 'Truck rental', 'BBQ Trailer 18ft weekend rental', '$950/week', 'deposit due']
];

const uploadRows = [
  ['insurance.pdf', 'Booking', 'Downtown lunch vendor', 'pending review'],
  ['permit.jpg', 'Location match', 'Coffee cart', 'approved'],
  ['ad-logo.png', 'Advertising', 'Training page sponsor', 'needs resize']
];

const modules = [
  { title: 'Locations', detail: 'Add, upload, edit, approve, unpublish, or remove marketplace listings with images, amenities, rules, pricing, compatibility, and availability.' },
  { title: 'Bookings', detail: 'Review vendor location requests, dates, rules acceptance, insurance/permit files, approval status, admin notes, totals, and Stripe status.' },
  { title: 'Truck rentals', detail: 'Track rental leads, assigned truck, requested dates, uploaded insurance files, pricing, deposit, and payment status.' },
  { title: 'Trucks for sale', detail: 'Manage sale listings, buyer leads, financing notes, availability, price, approval, and closed/sold status.' },
  { title: 'Advertising submissions', detail: 'Review campaign goals, ad type, page placement, budget, duration, uploaded logo/creative, approval status, and invoice/payment.' },
  { title: 'Location matching', detail: 'Review vendor setup type, dimensions, power/water needs, areas, budget, schedule, expected customer type, and recommended locations.' },
  { title: 'Uploaded files', detail: 'Central review of insurance, permits, ad logos, truck documents, status, owner, and admin notes.' },
  { title: 'Reports & commissions', detail: 'Export location revenue, booking totals, 15% platform commission, gross/net, Stripe status, and CSV reports.' }
];

export default function Page() {
  const locationRows = featuredLocations.map((listing) => [listing.status, listing.title, listing.area, listing.price, listing.availability]);
  const truckRows = trucksForSale.map((truck) => [truck.status, truck.name, truck.price, truck.slug, 'admin review']);

  return (
    <main className="container-page space-y-8">
      <section className="space-y-3">
        <span className="badge">Back office</span>
        <h1 className="text-4xl font-black tracking-tight">Admin Dashboard</h1>
        <p className="max-w-3xl text-slate-700">Operational view for marketplace content, submissions, approval workflows, uploaded files, pricing, notes, reporting, and Stripe-ready payment status. Public users browse and submit requests; admin controls listing creation, approvals, edits, uploads, and removals here.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {modules.map((module) => (
          <div key={module.title} className="card">
            <h2 className="text-xl font-black">{module.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{module.detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="card h-fit space-y-3">
          <h2 className="text-2xl font-black">Add or edit location</h2>
          <p className="text-sm text-slate-600">Admin-only structure for adding approved marketplace inventory. This is intentionally not exposed on the public locations page.</p>
          <input className="w-full rounded-2xl border p-3" placeholder="Location name" />
          <input className="w-full rounded-2xl border p-3" placeholder="Address / area" />
          <input className="w-full rounded-2xl border p-3" placeholder="Price and access type" />
          <input className="w-full rounded-2xl border p-3" placeholder="Image upload / asset URL" />
          <textarea className="min-h-28 w-full rounded-2xl border p-3" placeholder="Amenities, rules, power/water, compatibility, admin notes" />
          <button className="btn">Save location draft</button>
        </div>
        <AdminTable title="Location inventory" headers={['Status', 'Location', 'Area', 'Price', 'Availability']} rows={locationRows} />
      </section>

      <AdminTable title="Admin review queue" headers={['Status', 'Type', 'Notes', 'Pricing', 'Stripe/payment']} rows={reviewRows} />

      <section className="grid gap-5 lg:grid-cols-2">
        <AdminTable title="Uploaded files" headers={['File', 'Flow', 'Owner/request', 'Status']} rows={uploadRows} />
        <AdminTable title="Truck rentals & sales" headers={['Status', 'Truck', 'Price', 'Listing slug', 'Notes']} rows={truckRows} />
      </section>

      <section className="card grid gap-3 md:grid-cols-2">
        <h2 className="text-xl font-black md:col-span-2">Editable site settings</h2>
        <input className="rounded-2xl border p-3" placeholder="WhatsApp number" />
        <input className="rounded-2xl border p-3" placeholder="Default WhatsApp message" />
        <input className="rounded-2xl border p-3" placeholder="Disclaimer language version" />
        <input className="rounded-2xl border p-3" placeholder="CSV report name" />
        <button className="btn w-fit md:col-span-2">Save admin settings</button>
      </section>
    </main>
  );
}
