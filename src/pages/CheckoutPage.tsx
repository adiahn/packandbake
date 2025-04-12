import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CheckoutFormData, DeliveryOption } from '../types';
import { ArrowLeft, CreditCard, Clock, CheckCircle, Truck, Store } from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const addOrder = useStore((state) => state.addOrder);
  const clearCart = useStore((state) => state.clearCart);
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    phoneNumber: '',
    deliveryOption: 'pickup',
    address: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate total
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (formData.deliveryOption === 'delivery' && !formData.address?.trim()) {
      newErrors.address = 'Address is required for delivery';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order submission delay
    setTimeout(() => {
      // Create and add the order
      addOrder({
        items: cart,
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        deliveryOption: formData.deliveryOption as DeliveryOption,
        address: formData.address,
      });
      
      // Clear the cart
      clearCart();
      
      // Show success state
      setOrderPlaced(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 mb-6">
            <CheckCircle className="h-8 w-8 text-accent-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order! We'll contact you shortly with the next steps.
          </p>
          <Link to="/" className="btn btn-primary">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center">
        <Link to="/cart" className="text-gray-600 hover:text-brand-600 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to cart</span>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-12">Checkout</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Contact Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.customerName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-brand-500 focus:border-brand-500'
                  }`}
                />
                {errors.customerName && (
                  <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phoneNumber ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-brand-500 focus:border-brand-500'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-base font-medium text-gray-900 mb-6">Delivery Options</h3>
                
                <div className="space-y-4">
                  <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.deliveryOption === 'pickup' 
                      ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500' 
                      : 'border-gray-200 hover:border-brand-200'
                  }`}>
                    <div className="flex items-start">
                      <input
                        type="radio"
                        id="pickup"
                        name="deliveryOption"
                        value="pickup"
                        checked={formData.deliveryOption === 'pickup'}
                        onChange={handleInputChange}
                        className="mt-1 text-brand-600 focus:ring-brand-500"
                      />
                      <div className="ml-3">
                        <span className="flex items-center text-gray-900 font-medium">
                          <Store className="w-4 h-4 mr-2 text-brand-600" />
                          Store Pickup
                        </span>
                        <span className="block text-sm text-gray-500 mt-1">
                          Pickup at our store location. Available within 1-2 business days.
                        </span>
                      </div>
                    </div>
                  </label>
                  
                  <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.deliveryOption === 'delivery' 
                      ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500' 
                      : 'border-gray-200 hover:border-brand-200'
                  }`}>
                    <div className="flex items-start">
                      <input
                        type="radio"
                        id="delivery"
                        name="deliveryOption"
                        value="delivery"
                        checked={formData.deliveryOption === 'delivery'}
                        onChange={handleInputChange}
                        className="mt-1 text-brand-600 focus:ring-brand-500"
                      />
                      <div className="ml-3">
                        <span className="flex items-center text-gray-900 font-medium">
                          <Truck className="w-4 h-4 mr-2 text-brand-600" />
                          Local Delivery
                        </span>
                        <span className="block text-sm text-gray-500 mt-1">
                          Delivery to your address. Available for local addresses only.
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              
              {formData.deliveryOption === 'delivery' && (
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address, city, state, zip code"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.address ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-brand-500 focus:border-brand-500'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl shadow-soft overflow-hidden sticky top-6">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="max-h-80 overflow-y-auto mb-4 pr-2 -mr-2">
                <ul className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <li key={item.product.id} className="py-4 flex">
                      <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-gray-500">Qty {item.quantity}</span>
                          <span className="text-sm font-medium text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900 font-medium">
                    {formData.deliveryOption === 'pickup' ? 'Free' : '$5.00'}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-brand-600">
                    ${(subtotal + (formData.deliveryOption === 'pickup' ? 0 : 5)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50">
              <div className="flex items-center mb-6">
                <CreditCard className="w-8 h-8 text-gray-400 mr-4" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Payment Upon Delivery/Pickup</h3>
                  <p className="text-xs text-gray-500">We accept cash, credit card, or mobile payment</p>
                </div>
              </div>
              
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn btn-primary w-full justify-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Clock className="animate-spin h-4 w-4 mr-2" />
                    Processing...
                  </span>
                ) : 'Place Order'}
              </button>
              
              <p className="mt-4 text-xs text-gray-500 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 