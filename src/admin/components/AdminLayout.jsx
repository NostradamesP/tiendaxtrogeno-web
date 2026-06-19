import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Shirt, FolderOpen, Package, Settings, ArrowLeft, LogOut, Menu, X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const sidebarLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/productos', label: 'Productos', icon: Shirt },
  { to: '/admin/categorias', label: 'Categorías', icon: FolderOpen },
  { to: '/admin/pedidos', label: 'Pedidos', icon: Package },
  { to: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-60 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:z-auto`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
          <Link to="/admin" className="text-lg font-extrabold tracking-tight text-gray-900">
            XTRÓGENO
            <span className="block text-[10px] font-medium text-gray-400 tracking-widest uppercase">
              Admin
            </span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {sidebarLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive(to)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-4 space-y-1 border-t border-gray-100 pt-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Tienda
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-900"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block" />
          <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">
            Panel Administrativo
          </span>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
