'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Listing } from '@/lib/data';

const accessFilters = ['daily', 'weekly', 'monthly', 'event', 'recurring'];
const compatibilityFilters = ['food trucks', 'tent vendors', 'power', 'water'];
const sortOptions = [
  { value: 'availability', label: 'Availability' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'newest', label: 'Newest' },
  { value: 'area', label: 'Area' }
];

function matchesFilter(listing: Listing, filter: string) {
  if (accessFilters.includes(filter)) return listing.accessType === filter;
  if (filter === 'food trucks') return listing.foodTruckAllowed;
  if (filter === 'tent vendors') return listing.tentAllowed;
  if (filter === 'power') return listing.power;
  if (filter === 'water') return listing.water;
  return true;
}

function sortListings(listings: Listing[], sort: string) {
  return [...listings].sort((a, b) => {
    if (sort === 'price-low') return a.priceValue - b.priceValue;
    if (sort === 'price-high') return b.priceValue - a.priceValue;
    if (sort === 'popularity') return b.popularity - a.popularity;
    if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sort === 'area') return a.area.localeCompare(b.area) || a.priceValue - b.priceValue;
    return Number(a.availabilityRank) - Number(b.availabilityRank) || b.popularity - a.popularity;
  });
}

export default function LocationsMarketplace({ listings }: { listings: Listing[] }) {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('all');
  const [sort, setSort] = useState('availability');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem('jftn_saved_locations');
    if (stored) setSaved(JSON.parse(stored));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('jftn_saved_locations', JSON.stringify(saved));
  }, [saved]);

  const areas = useMemo(() => Array.from(new Set(listings.map((listing) => listing.area))).sort(), [listings]);
  const filters = [...accessFilters, ...compatibilityFilters];

  const visibleListings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = listings.filter((listing) => {
      const searchable = [
        listing.title,
        listing.location,
        listing.area,
        listing.address,
        listing.accessType,
        listing.availability,
        listing.vendorTypes,
        listing.amenities.join(' '),
        listing.rules,
        listing.trafficLevel
      ].join(' ').toLowerCase();

      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesArea = area === 'all' || listing.area === area;
      const matchesActiveFilters = activeFilters.every((filter) => matchesFilter(listing, filter));
      return listing.status === 'approved' && matchesQuery && matchesArea && matchesActiveFilters;
    });

    return sortListings(filtered, sort);
  }, [activeFilters, area, listings, query, sort]);

  const featured = visibleListings.slice(0, 2);

  const toggleFilter = (filter: string) => {
    setActiveFilters((current) => current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]);
  };

  const toggleSaved = (slug: string) => {
    setSaved((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  };

  return (
    <div className="space-y-8">
      <section className="card space-y-4">
        <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr]">
          <label className="sr-only" htmlFor="location-search">Search locations</label>
          <input id="location-search" value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-2xl border p-3" placeholder="Search by area, location name, amenity..." />
          <label className="sr-only" htmlFor="location-area">Filter by area</label>
          <select id="location-area" value={area} onChange={(event) => setArea(event.target.value)} className="rounded-2xl border p-3">
            <option value="all">All Jacksonville areas</option>
            {areas.map((areaOption) => <option key={areaOption} value={areaOption}>{areaOption}</option>)}
          </select>
          <label className="sr-only" htmlFor="location-sort">Sort locations</label>
          <select id="location-sort" value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-2xl border p-3">
            {sortOptions.map((option) => <option key={option.value} value={option.value}>Sort by {option.label}</option>)}
          </select>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button key={filter} type="button" onClick={() => toggleFilter(filter)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold capitalize transition ${activeFilters.includes(filter) ? 'border-brand bg-emerald-50 text-brand' : 'border-slate-200 bg-white text-slate-700 hover:border-brand hover:text-brand'}`}>
              {filter}
            </button>
          ))}
          {(query || area !== 'all' || activeFilters.length > 0) && (
            <button type="button" onClick={() => { setQuery(''); setArea('all'); setActiveFilters([]); }} className="shrink-0 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">Clear</button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600">
          <span>{visibleListings.length} approved listings found</span>
          <span>•</span>
          <span>{saved.length} saved favorites</span>
          <span>•</span>
          <span>Admin-only listing creation, uploads, approvals, edits, and removals</span>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="grid gap-4 lg:grid-cols-2">
          {featured.map((listing) => (
            <Link key={listing.slug} href={`/locations/${listing.slug}`} className="card group grid overflow-hidden p-0 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="min-h-48" style={{ background: listing.image }} />
              <div className="space-y-3 p-5">
                <span className="badge">Featured • {listing.status}</span>
                <h2 className="text-2xl font-black group-hover:text-brand">{listing.title}</h2>
                <p className="text-sm font-semibold text-slate-600">{listing.area} • {listing.accessType} • {listing.availability}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-2xl bg-amber-100 px-3 py-2 text-sm font-black text-amber-900">{listing.price}</span>
                  <span className="text-sm font-bold text-brand">Quick view →</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="card h-fit lg:sticky lg:top-28">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black">Map-style view</h2>
            <span className="badge">JAX</span>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-slate-900 p-4 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(245,158,11,0.45),transparent_9rem),radial-gradient(circle_at_70%_50%,rgba(10,125,83,0.55),transparent_10rem),radial-gradient(circle_at_40%_80%,rgba(14,165,233,0.35),transparent_9rem)]" />
            {visibleListings.map((listing, index) => (
              <Link key={listing.slug} href={`/locations/${listing.slug}`} className="absolute rounded-full bg-white px-3 py-2 text-xs font-black text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-100" style={{ left: `${16 + (index % 4) * 18}%`, top: `${22 + (index % 3) * 20}%` }}>
                {listing.price}
              </Link>
            ))}
            <p className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/10 p-3 text-sm backdrop-blur">Map-ready browsing panel for future Google Maps, Mapbox, or Supabase coordinate integration.</p>
          </div>
        </aside>

        <div className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="section-title">Approved marketplace listings</h2>
            <p className="text-sm font-semibold text-slate-500">Sorted by {sortOptions.find((option) => option.value === sort)?.label.toLowerCase()}</p>
          </div>
          {visibleListings.length === 0 ? (
            <div className="card text-center">
              <h3 className="text-xl font-black">No matching locations yet</h3>
              <p className="mt-2 text-slate-600">Try removing a filter or request a location match so admin can recommend an approved setup.</p>
              <Link href="/match-location" className="btn mt-4">Get matched</Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {visibleListings.map((listing) => {
                const isSaved = saved.includes(listing.slug);
                return (
                  <article key={listing.slug} className="card group overflow-hidden p-0">
                    <Link href={`/locations/${listing.slug}`} className="block h-44" style={{ background: listing.image }}>
                      <div className="flex h-full items-start justify-between p-4">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-900">{listing.trafficLevel} traffic</span>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-brand">{listing.status}</span>
                      </div>
                    </Link>
                    <div className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wide text-brand">{listing.area} • {listing.accessType}</p>
                          <Link href={`/locations/${listing.slug}`} className="text-xl font-black group-hover:text-brand">{listing.title}</Link>
                          <p className="text-sm text-slate-600">{listing.address}</p>
                        </div>
                        <span className="rounded-2xl bg-amber-100 px-3 py-2 text-sm font-black text-amber-900">{listing.price}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                        <span className="rounded-full bg-slate-100 px-3 py-1">{listing.availability}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1">{listing.foodTruckAllowed ? 'Truck OK' : 'No trucks'}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1">{listing.tentAllowed ? 'Tent OK' : 'No tents'}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1">{listing.power ? 'Power' : 'No power'}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1">{listing.water ? 'Water' : 'No water'}</span>
                      </div>
                      <p className="text-sm leading-6 text-slate-600">{listing.amenities.slice(0, 3).join(' • ')}</p>
                      <div className="flex gap-2">
                        <Link href={`/book?location=${listing.slug}`} className="btn flex-1">Book Now</Link>
                        <button type="button" onClick={() => toggleSaved(listing.slug)} className="btn-secondary" aria-pressed={isSaved} aria-label={`${isSaved ? 'Unsave' : 'Save'} ${listing.title}`}>
                          {isSaved ? '♥ Saved' : '♡ Save'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
