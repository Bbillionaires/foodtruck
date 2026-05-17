# Jacksonville Food Truck & Vendor Access Network

Mobile-first Next.js marketplace and lead-intake/admin platform for temporary vendor and food truck access in Jacksonville, FL.

## Stack
- Next.js App Router + React + Tailwind CSS
- Supabase (Auth, Postgres, Storage-ready, admin content tables)
- Stripe-ready fields for checkout and commissions

## Features implemented
- Full tab/page structure including Locations, Booking, Training, Coupons, Advertising, Preferred Vendors, Promoter Signup, Contact, Terms, Sitemap.
- Added new pages: Grease/Wastewater, Financing, Management.
- Added licensing/legal protection intake subsection under Training.
- Reusable components: `PageSection`, `LeadForm`, `AdminTable`, `ListingCard`.
- Floating WhatsApp button (admin-editable values via settings table).
- Submission status model: `new`, `contacted`, `pending`, `approved`, `denied`, `completed`.
- Admin notification-ready queue table.
- CMS-ready tables for training/disclaimer/page content editing without code changes.

## Recommended production launch (no local setup required)
This project is intended to run online for vendors, promoters, advertisers, and admins. You do **not** need to run it locally if you only want a live website.

1. Push or merge this repository to GitHub.
2. In Vercel, choose **Add New Project** and import `Bbillionaires/foodtruck`.
3. Select the branch that contains this app, for example `Azoth-made-1st`.
4. Add all environment variables from `.env.example`, including `ADMIN_NOTIFICATION_EMAIL` for submission alerts.
5. Use the default Vercel build command: `npm run build`.
6. Deploy. Your users will access the Vercel URL or your connected custom domain.
7. Create a Supabase project, open the Supabase SQL editor, run `db/schema.sql`, then run `db/seed.sql`.
8. Add your Supabase URL and anon key to Vercel environment variables and redeploy.

## Optional local setup for Cursor + PowerShell
Local setup is only needed if you want to edit code in Cursor and preview changes before pushing them. The public users of the website will not use this local setup.

1. Open Cursor and a PowerShell terminal.
2. Clone the GitHub repo only if you do not already have it:
   ```powershell
   git clone https://github.com/Bbillionaires/foodtruck.git
   cd foodtruck
   git checkout Azoth-made-1st
   ```
3. Install and preview locally:
   ```powershell
   npm install
   npm run dev
   ```
4. If PowerShell blocks scripts, run this once, then reopen the Cursor terminal:
   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
   ```

## Notes
- Next.js is pinned to `15.2.9` to stay on the patched 15.2.x release line for the RSC security advisory.
- Forms are wired through a low-code server action (`lib/actions.ts`) that inserts JSON submissions to an allowlisted Supabase table and queues an admin notification payload.
- For production, add row-level security, authenticated admin route protection, and storage uploads via Supabase buckets.

## Vercel troubleshooting: old commit or old Next.js version
If Vercel logs show an old commit such as `56f54a9` or `Next.js 15.2.4`, Vercel is not building the latest branch contents. This repo now pins `next` and `eslint-config-next` to `15.2.9` in `package.json`.

To fix it in Vercel:
1. Open the Vercel project dashboard.
2. Go to **Settings → Git** and confirm the production branch is `Azoth-made-1st` or the branch you actually want live.
3. Go to **Deployments**.
4. Click **Redeploy** on the newest deployment from the latest GitHub commit, not the older `56f54a9` deployment.
5. Choose **Redeploy without build cache** if Vercel still shows stale dependency output.
6. Confirm the new build log shows `Next.js 15.2.9` instead of `15.2.4`.

If GitHub does not show the latest commit, push the branch first:
```powershell
git push origin Azoth-made-1st
```

## Cursor PowerShell emergency patch for old `56f54a9` branch
If your Cursor terminal shows `56f54a9` and `package.json` still contains `"next": "15.2.4"`, your local branch is the old code. Apply the build fix from Cursor PowerShell with these commands:

```powershell
(Get-Content package.json) `
  -replace '"next": "15.2.4"', '"next": "15.2.9"' `
  -replace '"eslint-config-next": "15.2.4"', '"eslint-config-next": "15.2.9"' |
  Set-Content package.json
```

Then replace `lib/actions.ts` so the form action returns `Promise<void>`:

```powershell
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
'@ | Set-Content lib/actions.ts
```

Finish from Cursor PowerShell:

```powershell
npm install
npm run build
git status
git add package.json lib/actions.ts lib/supabase.ts .env.example
git commit -m "Fix Vercel build from Cursor"
git push origin Azoth-made-1st
```

After pushing, redeploy the newest commit in Vercel without build cache.

## Vercel troubleshooting: `No Output Directory named "public"`
If the build log ends with `Error: No Output Directory named "public" found after the Build completed`, the project is being deployed with a static-site output setting instead of the Next.js preset.

This app is a Next.js app, so Vercel should not use `public` as the build output directory. The repo includes `vercel.json` to force the deployment framework to `nextjs`, use `npm run build`, and clear the output directory override.

In Vercel, also check the dashboard settings:
1. Go to **Project → Settings → Build and Deployment**.
2. Set **Framework Preset** to **Next.js**.
3. Find **Output Directory** and turn off the override, or leave it blank. Do not set it to `public`.
4. Make sure **Root Directory** is empty unless the app is inside a subfolder.
5. Redeploy the newest commit without build cache.

A successful build should show `Next.js 15.2.9`, generate the app routes, and finish without looking for `public` as the output directory.

## Marketplace upgrade notes
- `/locations` is a public browsing marketplace with search/filter/sort UI, featured listing cards, map-style panel, saved/favorite UI structure, and detail pages at `/locations/[slug]`.
- Public users browse and book locations; public users do not submit new location listings from `/locations`.
- `/book` separates the flow into location booking, truck rental, and truck purchase requests before payment.
- `/advertising` now has an advertising intake form for campaign review and approval.
- `/match-location` collects vendor setup details so admins can recommend approved locations.
- Admin scope includes locations, bookings, truck rentals, trucks for sale, advertising, location-match requests, uploads, approval statuses, pricing, and Stripe/payment status.

## Confirming the marketplace scaffold is the code being deployed
Use this checklist after merging or pushing this branch to GitHub, before redeploying Vercel:

1. GitHub should show a commit newer than `41e3620` on `Azoth-made-1st`.
2. The GitHub file browser should include `components/LocationsMarketplace.tsx` and `components/BookingFlow.tsx`.
3. `app/locations/page.tsx` should import `LocationsMarketplace` and render it with `featuredLocations`.
4. `app/book/page.tsx` should import `BookingFlow` instead of showing the older single “Book a Spot / Scheduler” form.
5. Vercel's deployment details should show the same newest GitHub commit, and the build log should show `Next.js 15.2.9`.

If any of those checks fail, Vercel is still building the older branch contents. Push or merge the PR that contains this scaffold into `Azoth-made-1st`, then redeploy without the build cache.
