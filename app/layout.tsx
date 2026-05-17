import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsappFloat';
import { defaultKeywords } from '@/lib/seo';

export const metadata: Metadata = { title: 'Jacksonville Food Truck & Vendor Access Network', description:'Directory and booking platform for temporary food truck and vendor access opportunities in Jacksonville, Florida.', keywords: defaultKeywords };

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header />{children}<WhatsAppFloat /><Footer /></body></html>}
