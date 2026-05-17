import type { Metadata } from 'next';
import Link from 'next/link';
import LocationsMarketplace from '@/components/LocationsMarketplace';
import { featuredLocations } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Food Truck & Vendor Locations Jacksonville FL | Jax Food Truck Network',
  description: 'Browse temporary food truck parking, vendor spaces, pop-up market locations, and event-based vending access in Jacksonville FL.'
};

export default function Page() {
  return (
    <main className="container-page space-y-8">
      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <span className="badge">Marketplace directory</span>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Food truck & vendor locations in Jacksonville</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700">Browse approved temporary access opportunities with pricing, amenities, compatibility, availability, and booking CTAs. Public users browse and book; admins add, edit, approve, or remove locations from the back office.</p>
        </div>
        <div className="card bg-slate-950 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-amber-300">Need help choosing?</p>
          <h2 className="mt-2 text-2xl font-black">We can match your vendor setup with the right area.</h2>
          <p className="mt-2 text-slate-300">Tell us your dimensions, power needs, budget, and preferred days.</p>
          <Link href="/match-location" className="mt-5 inline-flex rounded-full bg-amber-400 px-5 py-3 text-sm font-black text-slate-950">Get matched</Link>
        </div>
      </section>

      <LocationsMarketplace listings={featuredLocations} />
    </main>
  );
}
