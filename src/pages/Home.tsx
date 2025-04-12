import { Link } from 'react-router-dom';
import { ChefHat, Utensils, ShoppingBag, ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1556910096-5cdca14c3e10?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)',
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Premium Baking Tools For Professional Results
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Discover our collection of high-quality baking tools and delicious homemade snacks, crafted for both professionals and baking enthusiasts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/tools" className="btn btn-primary">
                Shop Baking Tools
              </Link>
              <Link to="/snacks" className="btn btn-outline bg-white/10 text-white border-white/20 hover:bg-white/20">
                Explore Snacks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Packnbaketools?
            </h2>
            <p className="text-xl text-gray-600">
              We are passionate about providing premium quality baking supplies and 
              occasionally sharing our delicious homemade snacks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white p-8 rounded-xl shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-600 mb-6">
                <ChefHat className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Quality</h3>
              <p className="text-gray-600">
                Our tools are designed to meet the standards of professional bakers, ensuring durability and precision.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 text-accent-600 mb-6">
                <Utensils className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Carefully Selected</h3>
              <p className="text-gray-600">
                Each item in our inventory is carefully selected for its quality, performance, and value.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-soft text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fresh Baked Goods</h3>
              <p className="text-gray-600">
                We regularly offer homemade snacks prepared with our very own baking tools and premium ingredients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Explore Our Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From essential baking tools to delicious homemade snacks, find everything you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link
              to="/tools"
              className="group relative h-96 rounded-2xl overflow-hidden flex items-end"
            >
              <img
                src="https://images.unsplash.com/photo-1563897539633-7374c276c212?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Baking Tools"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="relative p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">Baking Tools</h3>
                <p className="text-white/80 mb-4">Professional-grade tools for every baker</p>
                <div className="flex items-center text-brand-300 font-medium">
                  <span>Browse Collection</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            <Link
              to="/snacks"
              className="group relative h-96 rounded-2xl overflow-hidden flex items-end"
            >
              <img
                src="https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Homemade Snacks"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="relative p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">Homemade Snacks</h3>
                <p className="text-white/80 mb-4">Delicious treats baked with love</p>
                <div className="flex items-center text-accent-300 font-medium">
                  <span>View Availability</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-brand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Sign up to receive notifications about fresh snack availability and new baking tools.
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg border-gray-300 focus:ring-brand-500 focus:border-brand-500"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}