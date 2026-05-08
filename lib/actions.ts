'use server';
import { revalidatePath } from 'next/cache';
import { supabase } from './supabase';

export async function submitInterest(formData: FormData) {
  const table = String(formData.get('table') || 'generic_submissions');
  const payload = Object.fromEntries(formData.entries());
  delete payload.table;
  const { error } = await supabase.from(table).insert({ data: payload, status: 'new' });
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin');
  return { ok: true };
}
