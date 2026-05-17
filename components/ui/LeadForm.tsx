import { submitInterest } from '@/lib/actions';

type Field = { name: string; label: string; type?: string; options?: string[] };

export default function LeadForm({ table, fields, submitLabel = 'Submit' }: { table: string; fields: Field[]; submitLabel?: string }) {
  return (
    <form action={submitInterest} className="card grid gap-4 md:grid-cols-2">
      <input type="hidden" name="table" value={table} />
      {fields.map((field) => (
        <label key={field.name} className={`text-sm font-bold text-slate-700 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
          {field.label}
          {field.options ? (
            <select name={field.name} className="mt-2 w-full rounded-2xl border p-3 font-medium">
              {field.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea name={field.name} className="mt-2 min-h-28 w-full rounded-2xl border p-3 font-medium" />
          ) : (
            <input name={field.name} type={field.type || 'text'} className="mt-2 w-full rounded-2xl border p-3 font-medium" />
          )}
        </label>
      ))}
      <button className="btn md:col-span-2">{submitLabel}</button>
    </form>
  );
}
