import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store/useStore';
import { Product } from '../types';
import { Filter, ShoppingBag, AlertTriangle } from 'lucide-react';

interface ProductsPageProps {
  category: 'tool' | 'snack';
}

export function ProductsPage({ category }: ProductsPageProps) {
  const products = useStore((state) => state.products);
  const snacksAvailable = useStore((state) => state.snacksAvailable);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');

  useEffect(() => {
    // Filter products by category and availability for snacks
    let filtered = products.filter(
      (product) => 
        product.category === category && 
        (product.category !== 'snack' || snacksAvailable)
    );

    // Apply sorting
    if (sortOrder === 'priceAsc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'priceDesc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, category, snacksAvailable, sortOrder]);

  const pageTitle = category === 'tool' ? 'Packaging Tools' : 'Homemade Snacks';
  const pageDescription = category === 'tool' 
    ? 'Professional-grade tools designed for packaging perfection' 
    : 'Delicious homemade treats prepared with love and premium ingredients';

  const heroImage = category === 'tool' 
    ? 'https://images.unsplash.com/photo-1563897539633-7374c276c212?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    : 'https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 mb-12">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{pageTitle}</h1>
            <p className="text-xl text-white/80 max-w-2xl">
              {pageDescription}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Availability Banner for Snacks */}
        {category === 'snack' && (
          <div className={`mb-8 p-5 rounded-xl ${
            snacksAvailable 
              ? 'bg-emerald-50 border border-emerald-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              {snacksAvailable ? (
                <ShoppingBag className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
              )}
              <div>
                <h3 className={`font-medium ${snacksAvailable ? 'text-emerald-800' : 'text-red-800'}`}>
                  {snacksAvailable ? 'Snacks Available Today!' : 'Snacks Unavailable'}
                </h3>
                <p className={`text-sm ${snacksAvailable ? 'text-emerald-700' : 'text-red-700'}`}>
                  {snacksAvailable 
                    ? 'Our freshly made snacks are available for order. Get them while supplies last!' 
                    : 'Our homemade snacks are not available today. Please check back later or subscribe to get notified.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sorting Controls */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available</p>
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'default' | 'priceAsc' | 'priceDesc')}
              className="border-0 font-medium text-gray-700 bg-transparent focus:ring-0"
            >
              <option value="default">Sort by: Featured</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products available</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {category === 'snack' && !snacksAvailable
                ? 'Our homemade snacks are currently unavailable. Please check back later or subscribe to get notified when they become available.'
                : 'No products found in this category. Please check back later.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 