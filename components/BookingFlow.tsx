'use client';

import { useState } from 'react';
import LeadForm from '@/components/ui/LeadForm';

const bookingFields = [
  { name: 'business_name', label: 'Business name' },
  { name: 'owner_name', label: 'Owner name' },
  { name: 'phone', label: 'Phone' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'preferred_location', label: 'Preferred location or listing' },
  { name: 'preferred_date', label: 'Preferred date' },
  { name: 'access_type', label: 'Access type', options: ['daily', 'weekly', 'monthly', 'event', 'recurring'] },
  { name: 'vendor_type', label: 'Vendor type' },
  { name: 'promo_code', label: 'Promo code' },
  { name: 'insurance_file', label: 'Insurance upload if available', type: 'file' },
  { name: 'permit_file', label: 'Permit/license upload if available', type: 'file' },
  { name: 'notes', label: 'Notes', type: 'textarea' }
];

const rentalFields = [
  { name: 'name', label: 'Name' },
  { name: 'phone', label: 'Phone' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'truck_needed', label: 'Truck/trailer needed' },
  { name: 'rental_dates', label: 'Rental dates' },
  { name: 'event_or_route', label: 'Event/route details' },
  { name: 'budget', label: 'Budget' },
  { name: 'insurance_file', label: 'Insurance upload if available', type: 'file' },
  { name: 'notes', label: 'Notes', type: 'textarea' }
];

const purchaseFields = [
  { name: 'name', label: 'Name' },
  { name: 'phone', label: 'Phone' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'truck_interest', label: 'Truck for sale interest' },
  { name: 'budget', label: 'Purchase budget' },
  { name: 'financing_needed', label: 'Financing needed?', options: ['yes', 'no', 'not sure'] },
  { name: 'timeline', label: 'Buying timeline' },
  { name: 'notes', label: 'Notes', type: 'textarea' }
];

const options = [
  {
    key: 'location',
    label: 'A. Book a vendor location',
    description: 'Reserve daily, weekly, monthly, recurring, or event access at an approved location.',
    table: 'booking_submissions',
    fields: bookingFields,
    submitLabel: 'Request location booking',
    accent: 'bg-brand text-white'
  },
  {
    key: 'rental',
    label: 'B. Rent a food truck',
    description: 'Request a truck or trailer rental for your dates, route, catering use, or event.',
    table: 'truck_rental_submissions',
    fields: rentalFields,
    submitLabel: 'Request truck rental',
    accent: 'bg-slate-950 text-white'
  },
  {
    key: 'purchase',
    label: 'C. Buy a food truck',
    description: 'Ask about trucks for sale, budget, financing needs, and buyer timeline.',
    table: 'truck_sale_submissions',
    fields: purchaseFields,
    submitLabel: 'Request truck purchase info',
    accent: 'bg-amber-400 text-slate-950'
  }
];

export default function BookingFlow() {
  const [selectedKey, setSelectedKey] = useState(options[0].key);
  const selected = options.find((option) => option.key === selectedKey) || options[0];

  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {options.map((option) => (
          <button key={option.key} type="button" onClick={() => setSelectedKey(option.key)} className={`card min-h-48 text-left transition hover:-translate-y-1 ${selectedKey === option.key ? `${option.accent} ring-4 ring-brand/15` : 'hover:border-brand/40'}`}>
            <span className="text-xs font-black uppercase tracking-wide opacity-80">Choose flow</span>
            <h2 className="mt-2 text-2xl font-black">{option.label}</h2>
            <p className="mt-2 text-sm leading-6 opacity-85">{option.description}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="card h-fit space-y-3">
          <span className="badge">Selected flow</span>
          <h2 className="text-2xl font-black">{selected.label}</h2>
          <p className="text-slate-700">Submit the details for this request type first. Admin verifies availability, uploaded documents, pricing, and approval status before sending a Stripe-ready payment or invoice link.</p>
          <ol className="space-y-2 text-sm font-semibold text-slate-600">
            <li>1. Choose request type.</li>
            <li>2. Submit intake details and uploads.</li>
            <li>3. Admin reviews availability, notes, and price.</li>
            <li>4. Stripe payment is collected after approval.</li>
          </ol>
        </aside>
        <LeadForm table={selected.table} fields={selected.fields} submitLabel={selected.submitLabel} />
      </div>
    </section>
  );
}
