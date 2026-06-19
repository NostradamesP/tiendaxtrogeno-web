import { Package, Shirt, Percent, Star, ShoppingBag } from 'lucide-react';
import { getProducts, getCategories, getOrders } from '../utils/storage';

export default function Dashboard() {
  const products = getProducts();
  const categories = getCategories();
  const orders = getOrders();

  const onSale = products.filter((p) => p.isSale && p.originalPrice > 0).length;
  const isNew = products.filter((p) => p.isNew).length;
  const totalOrders = orders.length;
  const recentProducts = [...products].reverse().slice(0, 5);

  const stats = [
    { label: 'Total Productos', value: products.length, icon: Shirt, color: 'bg-blue-50 text-blue-600' },
    { label: 'En Oferta', value: onSale, icon: Percent, color: 'bg-red-50 text-red-600' },
    { label: 'Nuevos', value: isNew, icon: Star, color: 'bg-green-50 text-green-600' },
    { label: 'Categorías', value: categories.length, icon: Package, color: 'bg-purple-50 text-purple-600' },
    { label: 'Pedidos', value: totalOrders, icon: ShoppingBag, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {label}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
              </div>
              <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Últimos Productos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Producto</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Categoría</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Precio</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Género</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{p.name}</td>
                  <td className="px-5 py-3 text-gray-500">{p.category}</td>
                  <td className="px-5 py-3 text-gray-900">
                    RD${p.price.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-gray-500 capitalize">{p.gender}</td>
                </tr>
              ))}
              {recentProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-gray-400">
                    No hay productos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
