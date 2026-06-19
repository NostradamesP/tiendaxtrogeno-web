import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Categorías
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/tienda?categoria=${encodeURIComponent(cat.name)}`}
            className="group relative h-48 sm:h-64 overflow-hidden bg-gray-100"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-lg sm:text-xl font-bold tracking-wide uppercase bg-black/40 px-4 py-2">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
