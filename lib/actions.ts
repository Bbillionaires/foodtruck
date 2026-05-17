'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseClient } from './supabase';

const allowedSubmissionTables = new Set([
  'generic_submissions',
  'grease_submissions',
  'financing_submissions',
  'management_submissions',
  'licensing_submissions',
  'advertising_submissions',
  'location_match_submissions',
  'booking_submissions',
  'truck_rental_submissions',
  'truck_sale_submissions'
]);

function serializeFormData(formData: FormData) {
  const payload: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (key === 'table') continue;
    payload[key] = typeof value === 'string' ? value : value.name;
  }

  return payload;
}

export async function submitInterest(formData: FormData): Promise<void> {
  const requestedTable = String(formData.get('table') || 'generic_submissions');
  const table = allowedSubmissionTables.has(requestedTable) ? requestedTable : 'generic_submissions';
  const payload = serializeFormData(formData);
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.warn('Supabase environment variables are missing; submission was not persisted.');
    revalidatePath('/admin');
    return;
  }

  const { error } = await supabase.from(table).insert({ data: payload, status: 'new' });

  if (error) {
    console.error(`Failed to save ${table} submission`, error.message);
    return;
  }

  await supabase.from('notifications_queue').insert({
    channel: 'email',
    recipient: process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@localhost',
    payload: { type: table, data: payload },
    status: 'queued'
  });

  revalidatePath('/admin');
}
