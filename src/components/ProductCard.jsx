import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/store';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(product, product.sizes[0], product.colors[0]);
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <Link to={`/producto/${product.id}`} className="group">
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
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
        <button
          onClick={handleAdd}
          disabled={adding}
          className="absolute bottom-3 right-3 bg-white text-gray-900 p-2.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-900 hover:text-white disabled:opacity-50"
        >
          <ShoppingBag className={`w-4 h-4 ${adding ? 'animate-bounce' : ''}`} />
        </button>
      </div>
      <h3 className="text-sm font-medium text-gray-900 truncate">
        {product.name}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-semibold text-gray-900">
          {STORE_CONFIG.currency}
          {product.price.toLocaleString()}
        </span>
        {product.originalPrice > 0 && (
          <span className="text-xs text-gray-400 line-through">
            {STORE_CONFIG.currency}
            {product.originalPrice.toLocaleString()}
          </span>
        )}
      </div>
    </Link>
  );
}
