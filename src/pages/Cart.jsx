import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/store';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    const lines = items.map(
      (item) =>
        `• ${item.product.name} (${item.size}/${item.color}) x${item.quantity} = ${STORE_CONFIG.currency}${(item.product.price * item.quantity).toLocaleString()}`
    );

    const message = [
      `🛒 *Nuevo Pedido - ${STORE_CONFIG.name}*`,
      '',
      `👤 *Nombre:* ${form.name}`,
      `📞 *Teléfono:* ${form.phone}`,
      form.address ? `📍 *Dirección:* ${form.address}` : '',
      '',
      '--- *PRODUCTOS* ---',
      ...lines,
      '',
      `--- *TOTAL: ${STORE_CONFIG.currency}${totalPrice.toLocaleString()}* ---`,
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h1>
        <p className="text-gray-400 mb-6">Agrega productos para comenzar tu pedido</p>
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex gap-4 pb-4 border-b border-gray-100"
            >
              <div className="w-24 h-24 shrink-0 bg-gray-100 overflow-hidden">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">
                  {item.product.name}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.size} / {item.color}
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {STORE_CONFIG.currency}
                  {item.product.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-gray-200">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="p-1.5 text-gray-400 hover:text-gray-600"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium px-3">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="p-1.5 text-gray-400 hover:text-gray-600"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.key)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-900 shrink-0">
                {STORE_CONFIG.currency}
                {(item.product.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors mt-4"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-50 p-6 sticky top-20">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Resumen del pedido
            </h2>
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-600">Total</span>
              <span className="text-xl font-bold text-gray-900">
                {STORE_CONFIG.currency}
                {totalPrice.toLocaleString()}
              </span>
            </div>

            {submitted ? (
              <div className="text-center py-4">
                <p className="text-sm text-green-600 font-medium">
                  ¡Pedido enviado por WhatsApp!
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Te contactaremos pronto para confirmar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-gray-400"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-gray-400"
                    placeholder="809-000-0000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-gray-400"
                    placeholder="Tu dirección (opcional)"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 text-sm font-semibold uppercase tracking-wider hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enviar pedido por WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
