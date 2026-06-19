import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactBar from './components/ContactBar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './admin/pages/Login';
import AdminDashboard from './admin/pages/Dashboard';
import AdminProducts from './admin/pages/Products';
import AdminProductForm from './admin/pages/ProductForm';
import AdminCategories from './admin/pages/Categories';
import AdminOrders from './admin/pages/Orders';
import AdminSettings from './admin/pages/Settings';
import './App.css';

function PublicLayout({ onCartClick }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ContactBar />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="productos" element={<AdminProducts />} />
            <Route path="productos/nuevo" element={<AdminProductForm />} />
            <Route path="productos/:id" element={<AdminProductForm />} />
            <Route path="categorias" element={<AdminCategories />} />
            <Route path="pedidos" element={<AdminOrders />} />
            <Route path="configuracion" element={<AdminSettings />} />
          </Route>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
