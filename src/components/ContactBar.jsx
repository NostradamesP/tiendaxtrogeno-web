import { Phone, MessageCircle, Instagram } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export default function ContactBar() {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 md:hidden">
        <div className="flex items-center justify-around py-2">
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-0.5 text-green-600"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px] font-medium">WhatsApp</span>
          </a>
          <a
            href={`tel:${STORE_CONFIG.phone}`}
            className="flex flex-col items-center gap-0.5 text-primary-600"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[10px] font-medium">Llamar</span>
          </a>
          <a
            href={STORE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-0.5 text-gray-600"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-[10px] font-medium">Instagram</span>
          </a>
        </div>
      </div>

      <div className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        <a
          href={`https://wa.me/${STORE_CONFIG.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          title="WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <a
          href={`tel:${STORE_CONFIG.phone}`}
          className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          title="Llamar"
        >
          <Phone className="w-5 h-5" />
        </a>
        <a
          href={STORE_CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          title="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
      </div>
    </>
  );
}
