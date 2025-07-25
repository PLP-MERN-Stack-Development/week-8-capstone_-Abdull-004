import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import Checkout from './Checkout';
import Account from './Account';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import About from './About';
import AllInOneAgrovet from './features/AllInOneAgrovet';
import FastDelivery from './features/FastDelivery';
import ExpertSupport from './features/ExpertSupport';
import Services from './Services';
import Contact from './Contact';
import { useAuth } from './AuthContext';

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || !user.isAdmin) {
    return <div className="p-8 text-red-600 font-semibold">Access denied: Admins only</div>;
  }
  return children;
}

export default function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            onClick={() => navigate('/')}
            className="text-xl font-bold text-green-600 cursor-pointer"
          >
            Farmcare Agrovet
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="text-gray-700 hover:text-green-700">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-green-700">Services</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-700">Contact</Link>
            <div className="relative group">
              <span className="text-gray-700 hover:text-green-700 cursor-pointer">Features</span>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-20">
                <Link to="/features/all-in-one" className="block px-4 py-2 hover:bg-green-50">All-in-One Agrovet</Link>
                <Link to="/features/delivery" className="block px-4 py-2 hover:bg-green-50">Fast Delivery</Link>
                <Link to="/features/expert-support" className="block px-4 py-2 hover:bg-green-50">Expert Support</Link>
              </div>
            </div>
            <Link to="/products" className="text-gray-700 hover:text-green-700">Products</Link>
            <Link to="/cart" className="text-gray-700 hover:text-green-700">Cart</Link>

            {!user && <Link to="/account" className="text-gray-700 hover:text-green-700 font-semibold">Login</Link>}
            <Link to="/admin-login" className="text-gray-700 hover:text-green-700 font-semibold">Admin Login</Link>

            {user?.isAdmin && <Link to="/admin" className="text-gray-700 hover:text-green-700">Admin Dashboard</Link>}
            {user && !user.isAdmin && <Link to="/account" className="text-gray-700 hover:text-green-700">Account</Link>}
            {user && (
              <>
                <span className="text-gray-700 font-medium">{user.email}</span>
                <button onClick={logout} className="ml-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Logout</button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 px-4 pb-4">
            <Link to="/" className="block text-gray-700 hover:text-green-700">About</Link>
            <Link to="/services" className="block text-gray-700 hover:text-green-700">Services</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-green-700">Contact</Link>
            <Link to="/features/all-in-one" className="block text-gray-700 hover:text-green-700">All-in-One Agrovet</Link>
            <Link to="/features/delivery" className="block text-gray-700 hover:text-green-700">Fast Delivery</Link>
            <Link to="/features/expert-support" className="block text-gray-700 hover:text-green-700">Expert Support</Link>
            <Link to="/products" className="block text-gray-700 hover:text-green-700">Products</Link>
            <Link to="/cart" className="block text-gray-700 hover:text-green-700">Cart</Link>
            {!user && <Link to="/account" className="block text-gray-700 hover:text-green-700">Login</Link>}
            <Link to="/admin-login" className="block text-gray-700 hover:text-green-700">Admin Login</Link>
            {user?.isAdmin && <Link to="/admin" className="block text-gray-700 hover:text-green-700">Admin Dashboard</Link>}
            {user && !user.isAdmin && <Link to="/account" className="block text-gray-700 hover:text-green-700">Account</Link>}
            {user && (
              <>
                <span className="block text-gray-700">{user.email}</span>
                <button onClick={logout} className="w-full bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 mt-1">Logout</button>
              </>
            )}
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features/all-in-one" element={<AllInOneAgrovet />} />
        <Route path="/features/delivery" element={<FastDelivery />} />
        <Route path="/features/expert-support" element={<ExpertSupport />} />
        <Route path="/products" element={<ProductGallery />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
    </>
  );
}
