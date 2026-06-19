import { useState } from 'react';
import { Package } from 'lucide-react';
import { getOrders, saveOrders } from '../utils/storage';

const STATUSES = ['Pendiente', 'En Proceso', 'Enviado', 'Entregado'];

const statusColors = {
  'Pendiente': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'En Proceso': 'bg-blue-50 text-blue-700 border-blue-200',
  'Enviado': 'bg-purple-50 text-purple-700 border-purple-200',
  'Entregado': 'bg-green-50 text-green-700 border-green-200',
};

export default function Orders() {
  const [orders, setOrders] = useState(getOrders);

  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    saveOrders(updated);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-DO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-400 mb-1">No hay pedidos aún</h2>
        <p className="text-sm text-gray-300">Los pedidos de los clientes aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pedidos</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Cliente</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Teléfono</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Productos</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {order.phone}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {order.items?.length || 0} producto(s)
                  </td>
                  <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">
                    RD${(order.total || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <select
                      value={order.status || 'Pendiente'}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border cursor-pointer outline-none transition-colors ${
                        statusColors[order.status || 'Pendiente']
                      }`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
