import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, Search } from 'lucide-react';
import { getProducts, saveProducts } from '../utils/storage';

export default function Products() {
  const [products, setProducts] = useState(getProducts);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const perPage = 10;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
        <Link
          to="/admin/productos/nuevo"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar Producto
        </Link>
      </div>

      <div className="relative mb-4 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Imagen</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Nombre</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Categoría</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Precio</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Género</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Oferta</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Nuevo</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img
                      src={p.image}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {p.category}
                  </td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">
                    RD${p.price.toLocaleString()}
                    {p.originalPrice > 0 && (
                      <span className="text-xs text-gray-400 line-through ml-1">
                        RD${p.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 capitalize whitespace-nowrap">
                    {p.gender}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {p.isSale && p.originalPrice > 0 ? (
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                    ) : (
                      <span className="inline-block w-2 h-2 rounded-full bg-gray-200" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {p.isNew ? (
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                    ) : (
                      <span className="inline-block w-2 h-2 rounded-full bg-gray-200" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/admin/productos/${p.id}`}
                        className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    {search ? 'No se encontraron productos' : 'No hay productos aún'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Página {page} de {totalPages}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Anterior
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Eliminar Producto
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              ¿Estás seguro de eliminar <strong>{deleteTarget.name}</strong>? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteTarget.id)}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
