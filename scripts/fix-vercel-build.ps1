# Patch the common Vercel build issues from the original scaffold branch.
# Run from the repo root in Cursor PowerShell:
#   powershell -ExecutionPolicy Bypass -File scripts/fix-vercel-build.ps1

$ErrorActionPreference = 'Stop'

if (-not (Test-Path 'package.json')) {
  throw 'package.json not found. Run this script from the foodtruck repo root.'
}

$packageJson = Get-Content 'package.json' -Raw
$packageJson = $packageJson -replace '"next": "15\.2\.4"', '"next": "15.2.9"'
$packageJson = $packageJson -replace '"eslint-config-next": "15\.2\.4"', '"eslint-config-next": "15.2.9"'
Set-Content -Path 'package.json' -Value $packageJson -NoNewline

@'
'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseClient } from './supabase';

const allowedSubmissionTables = new Set([
  'generic_submissions',
  'grease_submissions',
  'financing_submissions',
  'management_submissions',
  'licensing_submissions'
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
'@ | Set-Content -Path 'lib/actions.ts'

@'
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey);
}
'@ | Set-Content -Path 'lib/supabase.ts'

if ((Test-Path '.env.example') -and -not (Select-String -Path '.env.example' -Pattern '^ADMIN_NOTIFICATION_EMAIL=' -Quiet)) {
  Add-Content -Path '.env.example' -Value 'ADMIN_NOTIFICATION_EMAIL='
}

Write-Host 'Patched package.json, lib/actions.ts, lib/supabase.ts, and .env.example if needed.'
Write-Host 'Next: npm install; npm run build; git add .; git commit -m "Fix Vercel build"; git push origin Azoth-made-1st'
