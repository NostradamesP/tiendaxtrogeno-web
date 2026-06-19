import { Phone, MessageCircle, Instagram, Facebook, Clock, MapPin, Mail } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
        Contacto
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Estamos para servirte
          </h2>
          <p className="text-gray-600 text-sm">
            ¿Tienes preguntas sobre nuestros productos, tu pedido o necesitas
            asesoría? Contáctanos por cualquiera de estos medios:
          </p>

          <div className="space-y-4">
            <a
              href={`tel:${STORE_CONFIG.phone}`}
              className="flex items-center gap-4 p-4 border border-gray-100 hover:border-gray-200 transition-colors group"
            >
              <div className="w-10 h-10 bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
                <Phone className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Teléfono
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {STORE_CONFIG.phone}
                </p>
              </div>
            </a>

            <a
              href={`https://wa.me/${STORE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-gray-100 hover:border-gray-200 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  WhatsApp
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {STORE_CONFIG.phone}
                </p>
              </div>
            </a>

            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-gray-100 hover:border-gray-200 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-50 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
                <Instagram className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Instagram
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {STORE_CONFIG.instagram}
                </p>
              </div>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-gray-100 hover:border-gray-200 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                <Facebook className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Facebook
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {STORE_CONFIG.facebook}
                </p>
              </div>
            </a>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50">
            <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                Horario de Atención
              </p>
              <p className="text-sm text-gray-900">
                Lunes a Sábado: {STORE_CONFIG.hours.weekdays}
              </p>
              <p className="text-sm text-gray-900">
                Domingo: {STORE_CONFIG.hours.sunday}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50">
            <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                Ubicación
              </p>
              <p className="text-sm text-gray-900">{STORE_CONFIG.location}</p>
            </div>
          </div>
        </div>

        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80"
            alt="Ubicación Tienda Xtrógeno"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
