import Link from 'next/link';

export default function WhatsAppFloat(){
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '19045551212';
  const text = encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hi! I need vendor access help in Jacksonville.');
  return <Link href={`https://wa.me/${phone}?text=${text}`} className="fixed bottom-5 right-4 rounded-full bg-green-600 px-4 py-3 text-white shadow-lg">WhatsApp</Link>
}
