import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="card group">
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-opacity" />
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.category === 'tool' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-emerald-100 text-emerald-800'
          }`}>
            {product.category === 'tool' ? 'Tool' : 'Snack'}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-medium text-gray-900 text-lg mb-2">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-amber-600 font-semibold">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="btn btn-sm btn-primary"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}