import Link from 'next/link';

const nav = [
  ['Locations', '/locations'],
  ['Match Me', '/match-location'],
  ['Book', '/book'],
  ['Training', '/training'],
  ['Financing', '/financing'],
  ['Management', '/management'],
  ['Advertise', '/advertising'],
  ['Promoters', '/promoter-signup'],
  ['Contact', '/contact']
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-brand text-lg font-black text-white shadow-lg shadow-brand/20">J</span>
          <span className="leading-tight">
            <span className="block text-sm font-black text-slate-950 sm:text-base">Jax Food Truck Network</span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">Vendor access • bookings • training</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-full px-3 py-2 text-slate-600 transition hover:bg-emerald-50 hover:text-brand">
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/book" className="btn hidden sm:inline-flex">Book a spot</Link>
      </div>
      <nav className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2 text-sm font-semibold lg:hidden">
        {nav.map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 rounded-full bg-slate-100 px-3 py-2 text-slate-700">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
