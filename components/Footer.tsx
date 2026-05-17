import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-slate-950 text-white">
      <div className="container-page grid gap-6 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-black">Jacksonville Food Truck & Vendor Access Network</p>
          <p className="mt-2 max-w-xl text-sm text-slate-300">Temporary access opportunities, vendor support, training, advertising, and lead intake for Jacksonville food truck and market operators.</p>
        </div>
        <div className="space-y-2 text-sm text-slate-300">
          <p className="font-bold text-white">Explore</p>
          <Link className="block hover:text-amber-300" href="/locations">Vendor locations</Link>
          <Link className="block hover:text-amber-300" href="/training">Training</Link>
          <Link className="block hover:text-amber-300" href="/advertising">Advertising</Link>
        </div>
        <div className="space-y-2 text-sm text-slate-300">
          <p className="font-bold text-white">Legal</p>
          <Link className="block hover:text-amber-300" href="/terms">Terms / Disclaimer</Link>
          <Link className="block hover:text-amber-300" href="/sitemap">Sitemap</Link>
          <p>© 2026 Jax Food Truck Network</p>
        </div>
      </div>
    </footer>
  );
}
