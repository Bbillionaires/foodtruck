import Link from 'next/link';
import { coOps, coupons, featuredLocations, trucksForSale } from '@/lib/data';

const ctas = [
  ['Book a Vendor Spot', '/book'],
  ['List Your Food Truck', '/trucks'],
  ['Find Training', '/training'],
  ['Advertise With Us', '/advertising']
];

const stats = [
  ['15%', 'standard platform commission'],
  ['Daily', 'weekly & event access'],
  ['JAX', 'local vendor network']
];

export default function Home() {
  return (
    <main>
      <section className="container-page grid items-center gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div className="space-y-6">
          <span className="badge">Jacksonville, Florida vendor access</span>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Find food truck & vendor locations in Jacksonville, FL.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700">
              A polished local marketplace for temporary access spots, food truck rentals, cook co-op opportunities, vendor training, coupons, and promotional support.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            {ctas.map(([text, href], index) => (
              <Link key={href} href={href} className={index === 0 ? 'btn' : 'btn-secondary'}>
                {text}
              </Link>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map(([value, label]) => (
              <div key={value} className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm">
                <p className="text-2xl font-black text-brand">{value}</p>
                <p className="text-sm font-medium text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card relative overflow-hidden bg-slate-950 p-0 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.36),transparent_26rem),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.30),transparent_20rem)]" />
          <div className="relative space-y-5 p-6 sm:p-8">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-200">Quick search</span>
            <h2 className="text-2xl font-black">Match your business with the right access opportunity.</h2>
            <div className="grid gap-3">
              <input className="rounded-2xl border-white/10 bg-white/95 p-3" placeholder="Location or neighborhood" />
              <input className="rounded-2xl border-white/10 bg-white/95 p-3" placeholder="Vendor type" />
              <div className="grid grid-cols-2 gap-3">
                <input className="rounded-2xl border-white/10 bg-white/95 p-3" placeholder="Date" />
                <input className="rounded-2xl border-white/10 bg-white/95 p-3" placeholder="Budget" />
              </div>
            </div>
            <Link href="/locations" className="btn w-full bg-amber-500 text-slate-950 shadow-amber-500/20 hover:bg-amber-400">Browse Jacksonville spots</Link>
          </div>
        </div>
      </section>

      <section className="container-page space-y-5 py-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="badge">Featured access</span>
            <h2 className="section-title mt-3">Vendor locations ready to promote</h2>
          </div>
          <Link href="/locations" className="btn-secondary">View all locations</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredLocations.map((listing) => (
            <article key={listing.title} className="card group overflow-hidden p-0">
              <div className="h-3 bg-gradient-to-r from-brand via-emerald-400 to-amber-400" />
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-brand">{listing.accessType}</p>
                    <h3 className="text-xl font-black group-hover:text-brand">{listing.title}</h3>
                    <p className="text-slate-600">{listing.area}</p>
                  </div>
                  <span className="rounded-2xl bg-amber-100 px-3 py-2 text-sm font-black text-amber-900">{listing.price}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 sm:grid-cols-4">
                  <span>Power: {listing.power ? 'Yes' : 'No'}</span>
                  <span>Water: {listing.water ? 'Yes' : 'No'}</span>
                  <span>Restroom: {listing.restroom ? 'Yes' : 'No'}</span>
                  <span>{listing.availableDates}</span>
                </div>
                <Link className="btn w-full" href="/book">Book now</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-5 py-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <span className="badge">Rent / sale</span>
          <h2 className="section-title mt-3">Food trucks and trailers</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {trucksForSale.map((truck) => (
              <div key={truck.name} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm font-bold text-brand">{truck.status}</p>
                <h3 className="text-lg font-black">{truck.name}</h3>
                <p className="text-slate-600">{truck.price}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card bg-brand text-white">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">Promoter CTA</span>
          <h2 className="mt-4 text-2xl font-black">Promote assigned dates and earn.</h2>
          <p className="mt-2 text-emerald-50">Apply for Jacksonville event dates, promo code tracking, and flat-fee or commission notes.</p>
          <Link href="/promoter-signup" className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-brand">Apply now</Link>
        </div>
      </section>

      <section className="container-page grid gap-5 py-6 md:grid-cols-3">
        {coOps.map((coop) => (
          <div key={coop.title} className="card">
            <span className="badge">Cook co-op</span>
            <h3 className="mt-3 text-xl font-black">{coop.title}</h3>
            <p className="mt-2 text-slate-600">{coop.terms} • {coop.dates}</p>
          </div>
        ))}
        {coupons.map((coupon) => (
          <div key={coupon.code} className="card">
            <span className="badge">Deal</span>
            <h3 className="mt-3 text-xl font-black">{coupon.code}</h3>
            <p className="mt-2 text-slate-600">{coupon.detail}</p>
          </div>
        ))}
      </section>

      <section className="container-page pb-14">
        <div className="card flex flex-col gap-5 bg-slate-950 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-950">Stay ready</span>
            <h2 className="mt-3 text-2xl font-black">Get Jacksonville vendor alerts.</h2>
            <p className="mt-1 text-slate-300">Email/SMS/push-ready signup for new locations, training drops, and coupon opportunities.</p>
          </div>
          <div className="flex w-full gap-2 md:max-w-md">
            <input className="w-full rounded-full border-white/10 bg-white p-3" placeholder="Email address" />
            <button className="btn bg-amber-500 text-slate-950 hover:bg-amber-400">Subscribe</button>
          </div>
        </div>
      </section>
    </main>
  );
}

