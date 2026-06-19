import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/store';
import SizeSelector from '../components/SizeSelector';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400">Producto no encontrado</p>
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 text-sm text-primary-600 mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0];
    addToCart(product, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/tienda"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a la tienda
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-start gap-2 mb-2">
            {product.isNew && (
              <span className="bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                Nuevo
              </span>
            )}
            {product.isSale && product.originalPrice > 0 && (
              <span className="bg-primary-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                Oferta
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {product.category}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-bold text-gray-900">
              {STORE_CONFIG.currency}
              {product.price.toLocaleString()}
            </span>
            {product.originalPrice > 0 && (
              <span className="text-lg text-gray-400 line-through">
                {STORE_CONFIG.currency}
                {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 space-y-4">
            <SizeSelector
              sizes={product.sizes}
              selected={selectedSize}
              onChange={setSelectedSize}
            />

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-sm font-medium border transition-all ${
                      selectedColor === color
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`mt-8 w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wider transition-all ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {added ? '¡Añadido!' : 'Añadir al carrito'}
          </button>

          <div className="mt-8 space-y-3 border-t border-gray-100 pt-6">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Envío</p>
                <p className="text-xs text-gray-500">
                  Envíos a todo República Dominicana. Consulta por delivery.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Garantía</p>
                <p className="text-xs text-gray-500">
                  Productos 100% originales. Cambios dentro de los primeros 7 días.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
