import type { Metadata } from 'next';
import Link from 'next/link';
import { featuredLocations } from '@/lib/data';

export function generateStaticParams() {
  return featuredLocations.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = featuredLocations.find((item) => item.slug === slug);
  return {
    title: `${listing?.title || 'Vendor Location'} | Jacksonville Food Truck Network`,
    description: listing ? `${listing.title} in ${listing.area}, Jacksonville with ${listing.accessType} access and ${listing.price} pricing.` : 'Jacksonville vendor location details.'
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = featuredLocations.find((item) => item.slug === slug) || featuredLocations[0];
  return (
    <main className="container-page space-y-6">
      <Link href="/locations" className="text-sm font-bold text-brand">← Back to locations</Link>
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card overflow-hidden p-0">
          <div className="h-72" style={{ background: listing.image }} />
          <div className="space-y-4 p-6">
            <span className="badge">{listing.status} listing</span>
            <h1 className="text-4xl font-black">{listing.title}</h1>
            <p className="text-lg text-slate-700">{listing.location} • {listing.address}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4"><p className="font-black">{listing.price}</p><p className="text-sm text-slate-600">Price</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="font-black">{listing.accessType}</p><p className="text-sm text-slate-600">Access type</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="font-black">{listing.trafficLevel}</p><p className="text-sm text-slate-600">Traffic estimate</p></div>
            </div>
          </div>
        </div>
        <aside className="card h-fit space-y-4 lg:sticky lg:top-28">
          <h2 className="text-2xl font-black">Book this location</h2>
          <p className="text-slate-600">{listing.availability}. Admin approval may be required before final confirmation.</p>
          <Link href={`/book?location=${listing.slug}`} className="btn w-full">Book Now</Link>
          <button className="btn-secondary w-full">♡ Save/Favorite</button>
        </aside>
      </section>
      <section className="grid gap-5 md:grid-cols-2">
        <div className="card"><h2 className="text-xl font-black">Amenities</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">{listing.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}</ul></div>
        <div className="card"><h2 className="text-xl font-black">Rules & compatibility</h2><p className="mt-3 text-slate-700">{listing.rules}</p><p className="mt-3 text-slate-700">Truck: {listing.foodTruckAllowed ? 'Allowed' : 'Not allowed'} • Tent/table: {listing.tentAllowed ? 'Allowed' : 'Not allowed'} • Water: {listing.water ? 'Available' : 'Not available'}</p></div>
      </section>
    </main>
  );
}
