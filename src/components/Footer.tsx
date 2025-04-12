import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ChefHat } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <ChefHat className="h-8 w-8 text-amber-300" />
              <span className="ml-3 text-2xl font-display text-white">Packnbaketools</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Offering premium quality packaging tools and fresh homemade snacks for both professional 
              packagers and packaging enthusiasts. Quality products to elevate your packaging experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-400 hover:text-amber-300 transition-colors">
                  Packaging Tools
                </Link>
              </li>
              <li>
                <Link to="/snacks" className="text-gray-400 hover:text-amber-300 transition-colors">
                  Fresh Snacks
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-amber-300 transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-amber-300 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">123 Bakers Street, Kaduna 101<br />Nigeria, CA 90210</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-amber-300 mr-3 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-amber-300 transition-colors">
                  +234-8027127594
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-amber-300 mr-3 flex-shrink-0" />
                <a href="mailto:hello@packnbaketools.com" className="text-gray-400 hover:text-amber-300 transition-colors">
                  hello@packnbaketools.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p className="text-sm">&copy; {new Date().getFullYear()} Packnbaketools. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-xs">
            <a href="#" className="text-gray-500 hover:text-amber-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-amber-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 