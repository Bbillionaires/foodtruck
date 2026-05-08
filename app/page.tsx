import Link from 'next/link';
import { featuredLocations, trucksForSale, coOps, coupons } from '@/lib/data';

export default function Home(){
  return <main className="container-page space-y-8">
    <section className="card space-y-4"><h1 className="text-3xl font-bold">Find Food Truck & Vendor Locations in Jacksonville, FL</h1><p>Mobile-first directory for temporary vendor access, food truck rentals/sales, training, and promoter opportunities.</p><div className="grid grid-cols-2 gap-2 md:grid-cols-4">{[['Book a Vendor Spot','/book'],['List Your Food Truck','/trucks'],['Find Training','/training'],['Advertise With Us','/advertising']].map(([t,h])=><Link key={t} href={h} className="btn text-center">{t}</Link>)}</div></section>
    <section className="card"><h2 className="mb-3 text-xl font-semibold">Search Opportunities</h2><div className="grid gap-2 md:grid-cols-5"><input className="rounded border p-2" placeholder="Location"/><input className="rounded border p-2" placeholder="Vendor type"/><input className="rounded border p-2" placeholder="Date"/><input className="rounded border p-2" placeholder="Price"/><input className="rounded border p-2" placeholder="Availability"/></div></section>
    <section className="grid gap-4 md:grid-cols-2">{featuredLocations.map((l)=><article key={l.title} className="card"><h3 className="font-semibold">{l.title}</h3><p>{l.area} • {l.price} • {l.accessType}</p><Link className="btn-secondary mt-2 inline-block" href="/book">Book now</Link></article>)}</section>
    <section className="grid gap-4 md:grid-cols-3">{trucksForSale.map(t=><div className="card" key={t.name}><h3 className="font-semibold">{t.name}</h3><p>{t.status} • {t.price}</p></div>)}{coOps.map(c=><div key={c.title} className="card"><h3 className="font-semibold">{c.title}</h3><p>{c.terms}</p></div>)}{coupons.map(c=><div key={c.code} className="card"><h3 className="font-semibold">Coupon: {c.code}</h3><p>{c.detail}</p></div>)}</section>
    <section className="card"><h2 className="text-xl font-semibold">Get Alerts</h2><p>Email/SMS/Push-ready notification signup structure.</p><div className="mt-2 flex gap-2"><input className="w-full rounded border p-2" placeholder="Email"/><button className="btn">Subscribe</button></div></section>
  </main>
}
