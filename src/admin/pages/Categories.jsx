import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getCategories, saveCategories } from '../utils/storage';

export default function Categories() {
  const [categories, setCategories] = useState(getCategories);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const nextId = Math.max(0, ...categories.map(c => c.id || 0)) + 1;
    const updated = [...categories, { id: nextId, name: name.trim(), image: image.trim() || 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80' }];
    setCategories(updated);
    saveCategories(updated);
    setName('');
    setImage('');
  };

  const handleDelete = (catId) => {
    const updated = categories.filter((c) => c.id !== catId);
    setCategories(updated);
    saveCategories(updated);
    setDeleteTarget(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Categorías</h1>

      <form onSubmit={handleAdd} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la categoría"
          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="URL de imagen (opcional)"
          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group"
          >
            <div className="aspect-[3/2] bg-gray-100 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">{cat.name}</h3>
              <button
                onClick={() => setDeleteTarget(cat)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400 text-sm">
            No hay categorías. Agrega la primera.
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Eliminar Categoría
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              ¿Estás seguro de eliminar <strong>{deleteTarget.name}</strong>?
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
