import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';

export function CartPage() {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
          <div className="bg-white rounded-xl shadow-soft p-8">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-6">Your cart is currently empty</p>
            <Link
              to="/tools"
              className="btn btn-primary inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-8 lg:mb-0">
            <ul className="divide-y divide-gray-100">
              {cart.map((item) => (
                <li key={item.product.id} className="p-6">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden mb-4 sm:mb-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 sm:ml-6">
                      <div className="flex flex-wrap justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900 mb-1 sm:mb-0">
                          {item.product.name}
                        </h3>
                        <span className="text-lg font-medium text-brand-600">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      
                      <p className="text-gray-500 text-sm mb-4">
                        {item.product.description.length > 100 
                          ? `${item.product.description.substring(0, 100)}...` 
                          : item.product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => 
                              item.quantity > 1 
                                ? updateQuantity(item.product.id, item.quantity - 1)
                                : removeFromCart(item.product.id)
                            }
                            className="p-2 text-gray-500 hover:text-brand-600 hover:bg-gray-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-gray-700 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => 
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-2 text-gray-500 hover:text-brand-600 hover:bg-gray-50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="bg-gray-50 p-6 flex items-center justify-between">
              <Link to="/tools" className="text-gray-600 hover:text-brand-600 flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Continue Shopping</span>
              </Link>
              <span className="text-sm text-gray-500">
                {cart.reduce((total, item) => total + item.quantity, 0)} items in cart
              </span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl shadow-soft p-6 sticky top-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900 font-medium">Calculated at checkout</span>
              </div>
              
              {subtotal > 100 && (
                <div className="flex justify-between text-accent-600">
                  <span>Free shipping</span>
                  <span>-$0.00</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-medium">
                  <span className="text-lg">Total</span>
                  <span className="text-lg text-brand-600">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Link
              to="/checkout"
              className="btn btn-primary w-full justify-center"
            >
              Proceed to Checkout
            </Link>
            
            <p className="mt-4 text-sm text-gray-500 text-center">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 