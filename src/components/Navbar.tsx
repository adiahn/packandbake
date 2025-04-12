import { ShoppingBag, Menu, X, ChefHat, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useStore((state) => state.cart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <ChefHat className="h-10 w-10 text-amber-600" />
            <div className="ml-3">
              <span className="block font-display text-2xl font-semibold text-gray-900">
                Packnbaketools
              </span>
              <span className="text-xs text-gray-500 mt-0">Premium Baking Essentials</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/tools"
              className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-500 after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Baking Tools
            </Link>
            <Link
              to="/snacks"
              className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-500 after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Snacks
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium relative group"
            >
              <div className="relative inline-flex items-center">
                <ShoppingBag className="w-5 h-5" />
                <span className="ml-2">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-500 after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>Admin</span>
              </div>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 container mx-auto">
            <Link
              to="/tools"
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Baking Tools
            </Link>
            <Link
              to="/snacks"
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Snacks
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                <span>Cart ({totalItems})</span>
              </div>
            </Link>
            <Link
              to="/admin"
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>Admin</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}