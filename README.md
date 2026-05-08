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

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Create Supabase project and run `db/schema.sql` then `db/seed.sql`
4. `npm run dev`

## Vercel deployment (GitHub -> Vercel)
1. Push repository to GitHub.
2. Import repository in Vercel.
3. Add all env vars from `.env.example`.
4. Deploy with build command `npm run build`.
5. Add Supabase URL + auth settings and Stripe webhook endpoint.

## Notes
- Forms are wired through a low-code server action (`lib/actions.ts`) that inserts JSON submissions to the designated Supabase table.
- For production, add row-level security, authenticated admin route protection, and storage uploads via Supabase buckets.
