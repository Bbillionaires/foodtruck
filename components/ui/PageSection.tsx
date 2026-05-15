export default function PageSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card space-y-3">
      <span className="badge">Jacksonville support</span>
      <h2 className="section-title">{title}</h2>
      <div className="leading-7 text-slate-700">{children}</div>
    </section>
  );
}

