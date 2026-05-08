import Link from 'next/link';

const nav = ['locations','grease-wastewater','financing','management','trucks','coop','book','training','coupons','advertising','preferred-vendors','promoter-signup','contact'];

export default function Header(){
  return <header className="border-b bg-white"><div className="container-page flex items-center justify-between py-4"><Link href="/" className="font-bold">Jax Food Truck & Vendor Access Network</Link><nav className="hidden gap-3 text-sm md:flex">{nav.map(n=><Link key={n} href={`/${n}`} className="capitalize hover:text-brand">{n.replace('-',' ')}</Link>)}</nav></div></header>
}
