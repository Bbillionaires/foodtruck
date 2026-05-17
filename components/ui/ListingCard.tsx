export default function ListingCard({ title, meta, cta }: { title: string; meta: string; cta?: React.ReactNode }) {
  return (
    <article className="card group">
      <div className="mb-4 h-2 w-20 rounded-full bg-gradient-to-r from-brand to-amber-400" />
      <h3 className="text-xl font-black group-hover:text-brand">{title}</h3>
      <p className="mt-2 leading-7 text-slate-600">{meta}</p>
      {cta ? <div className="mt-4">{cta}</div> : null}
    </article>
  );
}
