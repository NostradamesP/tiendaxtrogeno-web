import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProducts, saveProducts } from '../utils/storage';

const CATEGORIES = ['Camisas', 'Pantalones', 'Jeans', 'Chaquetas/Blazers', 'Zapatos', 'Accesorios'];
const GENDERS = ['hombre', 'mujer', 'unisex'];
const ALL_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '39', '40', '41', '42', '43', 'Único'];

const emptyProduct = {
  name: '',
  category: CATEGORIES[0],
  price: '',
  originalPrice: '',
  description: '',
  gender: GENDERS[0],
  sizes: [],
  colors: [],
  image: '',
  isNew: false,
  isSale: false,
};

const colorPresets = ['Blanco', 'Negro', 'Gris', 'Azul', 'Rojo', 'Verde', 'Beige', 'Marrón', 'Café', 'Rosa', 'Oliva', 'Plateado', 'Dorado', 'Azul Marino', 'Azul Claro', 'Azul Oscuro'];

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(emptyProduct);
  const [colorInput, setColorInput] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const products = getProducts();
      const product = products.find((p) => p.id === Number(id));
      if (product) {
        setForm({
          ...product,
          price: String(product.price),
          originalPrice: product.originalPrice ? String(product.originalPrice) : '',
        });
      } else {
        navigate('/admin/productos');
      }
    }
  }, [id, isEdit, navigate]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const addColor = (color) => {
    const trimmed = color.trim();
    if (trimmed && !form.colors.includes(trimmed)) {
      setForm((prev) => ({ ...prev, colors: [...prev.colors, trimmed] }));
    }
    setColorInput('');
  };

  const removeColor = (color) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== color),
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'El nombre es requerido';
    if (!form.category) errs.category = 'La categoría es requerida';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      errs.price = 'Ingresa un precio válido';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);

    const products = getProducts();
    const productData = {
      ...form,
      id: isEdit ? Number(id) : Date.now(),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : 0,
    };

    let updated;
    if (isEdit) {
      updated = products.map((p) => (p.id === productData.id ? productData : p));
    } else {
      updated = [...products, productData];
    }

    saveProducts(updated);
    navigate('/admin/productos');
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/productos')}
          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                  errors.category ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
              <select
                value={form.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
              >
                {GENDERS.map((g) => (
                  <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio (RD$) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors ${
                  errors.price ? 'border-red-300' : 'border-gray-300'
                }`}
                min="0"
              />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio Original (0 = sin descuento)
              </label>
              <input
                type="number"
                value={form.originalPrice}
                onChange={(e) => handleChange('originalPrice', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tallas</label>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${
                    form.sizes.includes(size)
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Colores</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {colorPresets.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => addColor(c)}
                  className={`px-2 py-1 text-[11px] font-medium border rounded transition-colors ${
                    form.colors.includes(c)
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.colors.map((color) => (
                <span
                  key={color}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addColor(colorInput);
                  }
                }}
                placeholder="Escribe un color y presiona Enter"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => addColor(colorInput)}
                className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL de Imagen
            </label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
              placeholder="https://images.unsplash.com/..."
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-2 w-20 h-20 rounded-lg object-cover bg-gray-100"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isNew}
                onChange={(e) => handleChange('isNew', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm text-gray-700">Nuevo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isSale}
                onChange={(e) => handleChange('isSale', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm text-gray-700">En Oferta</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/productos')}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
