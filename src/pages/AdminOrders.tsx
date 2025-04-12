import { useState } from 'react';
import { CheckCircle, Clock, Package } from 'lucide-react';
import { useStore } from '../store/useStore';
import { OrderStatus } from '../types';

export function AdminOrders() {
  const orders = useStore((state) => state.orders);
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);
  
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);
  
  // Sort orders by date, most recent first
  const sortedOrders = [...filteredOrders].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
  };
  
  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'confirmed':
        return <Package className="w-4 h-4 mr-1" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Orders</h1>
      
      {/* Filter Controls */}
      <div className="bg-white shadow rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all'
                ? 'bg-rose-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md ${
              filter === 'pending'
                ? 'bg-rose-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-md ${
              filter === 'confirmed'
                ? 'bg-rose-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md ${
              filter === 'completed'
                ? 'bg-rose-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
        </div>
      </div>
      
      {/* Orders List */}
      <div className="space-y-6">
        {sortedOrders.length > 0 ? (
          sortedOrders.map((order) => (
            <div key={order.id} className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Order #{order.id}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()} at{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Customer Information</h4>
                    <p className="mt-1 text-sm text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-900">{order.phoneNumber}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {order.deliveryOption === 'pickup' ? 'Pickup' : 'Delivery'}
                      </span>
                    </div>
                    {order.deliveryOption === 'delivery' && order.address && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Delivery Address:</p>
                        <p className="text-sm text-gray-900">{order.address}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Order Items</h4>
                    <ul className="mt-2 divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item.product.id} className="py-2 flex justify-between">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{item.product.name}</span>
                            <span className="ml-2 text-sm text-gray-500">x{item.quantity}</span>
                          </div>
                          <span className="text-sm text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
                      <span className="text-base font-medium text-gray-900">Total</span>
                      <span className="text-base font-medium text-gray-900">
                        ${order.items
                          .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="flex space-x-3">
                  {order.status !== 'pending' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'pending')}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Mark as Pending
                    </button>
                  )}
                  
                  {order.status !== 'confirmed' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'confirmed')}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Mark as Confirmed
                    </button>
                  )}
                  
                  {order.status !== 'completed' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'completed')}
                      className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-500">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
} 