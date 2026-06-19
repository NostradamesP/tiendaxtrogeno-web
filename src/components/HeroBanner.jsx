import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <section className="relative h-[70vh] min-h-[500px] bg-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight max-w-4xl">
          MARCAS A PRECIO DE OPORTUNIDAD{' '}
          <span className="inline-block">🔥</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-2xl">
          Las mejores marcas, los mejores precios. Envíos a todo República Dominicana.
        </p>
        <Link
          to="/tienda"
          className="mt-8 inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold text-sm uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-all duration-300"
        >
          Ver Colección
        </Link>
      </div>
    </section>
  );
}
