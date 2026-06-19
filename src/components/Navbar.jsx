import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/store';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/tienda', label: 'Tienda' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar({ onCartClick }) {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-900">
            XTRÓGENO
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors"
            >
              Admin
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={`tel:${STORE_CONFIG.phone}`}
              className="hidden sm:flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{STORE_CONFIG.phone}</span>
            </a>
            <button
              onClick={onCartClick}
              className="relative text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block text-sm font-medium ${
                  location.pathname === link.to
                    ? 'text-primary-600'
                    : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium ${
                location.pathname === '/admin'
                  ? 'text-primary-600'
                  : 'text-gray-600'
              }`}
            >
              Admin
            </Link>
            <hr className="border-gray-100" />
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <Instagram className="w-4 h-4" />
              {STORE_CONFIG.instagram}
            </a>
            <a
              href={`tel:${STORE_CONFIG.phone}`}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <Phone className="w-4 h-4" />
              {STORE_CONFIG.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
