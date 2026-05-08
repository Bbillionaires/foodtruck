import { submitInterest } from '@/lib/actions';

type Field = {name:string;label:string;type?:string;options?:string[]};
export default function LeadForm({table,fields,submitLabel='Submit'}:{table:string;fields:Field[];submitLabel?:string}){
  return <form action={submitInterest} className="card grid gap-2 md:grid-cols-2"><input type="hidden" name="table" value={table}/>{fields.map(f=><label key={f.name} className={f.type==='textarea'?'md:col-span-2':''}>{f.label}{f.options?<select name={f.name} className="mt-1 w-full rounded border p-2">{f.options.map(o=><option key={o}>{o}</option>)}</select>:f.type==='textarea'?<textarea name={f.name} className="mt-1 w-full rounded border p-2"/>:<input name={f.name} type={f.type||'text'} className="mt-1 w-full rounded border p-2"/>}</label>)}<button className="btn md:col-span-2">{submitLabel}</button></form>
}
