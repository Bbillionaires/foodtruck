import Link from 'next/link';

export default function WhatsAppFloat() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '19045551212';
  const text = encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hi! I need vendor access help in Jacksonville.');
  return (
    <Link href={`https://wa.me/${phone}?text=${text}`} className="fixed bottom-5 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-black text-white shadow-2xl shadow-green-700/30 transition hover:-translate-y-1 hover:bg-green-700">
      <span className="size-2 rounded-full bg-white" />
      WhatsApp
    </Link>
  );
}
