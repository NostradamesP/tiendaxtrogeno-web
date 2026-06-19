import { Clock, MapPin, Shield, Heart } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Nosotros
          </h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            En <strong>XTRÓGENO</strong> nos apasiona la moda y creemos que
            vestir bien no debería costar una fortuna. Somos una tienda
            dominicana dedicada a ofrecer marcas reconocidas a precios
            accesibles.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Desde nuestros inicios, nos hemos comprometido a seleccionar
            cuidadosamente cada prenda y accesorio para brindarte calidad,
            estilo y las mejores ofertas. Trabajamos directamente con
            proveedores para eliminar intermediarios y ofrecerte precios
            justos.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nuestro equipo está dedicado a brindarte la mejor experiencia de
            compra, con atención personalizada y envíos a todo el país.
          </p>
        </div>
        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
            alt="Tienda Xtrógeno"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="border border-gray-100 p-6 text-center">
          <Shield className="w-8 h-8 text-gray-900 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Calidad Garantizada
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Productos 100% originales
          </p>
        </div>
        <div className="border border-gray-100 p-6 text-center">
          <Heart className="w-8 h-8 text-gray-900 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Atención Personalizada
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Te ayudamos a encontrar tu estilo
          </p>
        </div>
        <div className="border border-gray-100 p-6 text-center">
          <Clock className="w-8 h-8 text-gray-900 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Horarios Flexibles
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Lun-Sáb 10AM-8PM · Dom 10AM-4PM
          </p>
        </div>
        <div className="border border-gray-100 p-6 text-center">
          <MapPin className="w-8 h-8 text-gray-900 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Envíos a Todo RD
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Recibe tu pedido donde quieras
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-8 sm:p-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {STORE_CONFIG.tagline}
        </h2>
        <p className="text-gray-500 mb-6">
          República Dominicana 🇩🇴
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            Escríbenos por WhatsApp
          </a>
          <a
            href={`tel:${STORE_CONFIG.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors"
          >
            {STORE_CONFIG.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
