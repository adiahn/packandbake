import { Link } from 'react-router-dom';
import { Package, ShoppingBag, ClipboardList, PieChart, Settings, ToggleLeft, ToggleRight, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export function AdminDashboard() {
  const products = useStore((state) => state.products);
  const orders = useStore((state) => state.orders);
  const snacksAvailable = useStore((state) => state.snacksAvailable);
  const toggleSnacksAvailability = useStore((state) => state.toggleSnacksAvailability);

  const toolsCount = products.filter((p) => p.category === 'tool').length;
  const snacksCount = products.filter((p) => p.category === 'snack').length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const totalOrdersCount = orders.length;
  const revenue = orders.reduce((total, order) => {
    return total + order.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }, 0);

  const handleToggleSnacks = () => {
    toggleSnacksAvailability();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your products, orders, and business settings</p>
        </div>
        <button
          onClick={handleToggleSnacks}
          className={`mt-4 md:mt-0 flex items-center px-5 py-2.5 rounded-lg border transition-colors ${
            snacksAvailable
              ? 'bg-accent-50 border-accent-200 text-accent-700 hover:bg-accent-100'
              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {snacksAvailable ? (
            <>
              <ToggleRight className="w-5 h-5 mr-2 text-accent-600" />
              Snacks Available
            </>
          ) : (
            <>
              <ToggleLeft className="w-5 h-5 mr-2 text-gray-400" />
              Snacks Unavailable
            </>
          )}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-accent-100 text-accent-600 mr-4">
              <PieChart className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${revenue.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="flex text-sm">
              <span className="text-gray-500">All time</span>
              <span className="ml-auto text-accent-600">{totalOrdersCount} orders</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-brand-100 text-brand-600 mr-4">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Baking Tools</p>
              <p className="text-2xl font-bold text-gray-900">{toolsCount}</p>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-100 pt-4">
            <Link to="/admin/products?filter=tool" className="flex text-sm items-center text-brand-600">
              <span>Manage tools</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600 mr-4">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Snacks</p>
              <p className="text-2xl font-bold text-gray-900">{snacksCount}</p>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-100 pt-4">
            <Link to="/admin/products?filter=snack" className="flex text-sm items-center text-yellow-600">
              <span>Manage snacks</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
              <ClipboardList className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">{pendingOrdersCount}</p>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-100 pt-4">
            <Link to="/admin/orders?filter=pending" className="flex text-sm items-center text-blue-600">
              <span>View pending orders</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link
          to="/admin/products"
          className="bg-white rounded-xl shadow-soft p-6 hover:shadow-hover transition-shadow"
        >
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-brand-100 text-brand-600 mr-3">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Manage Products</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Add, edit, and remove products. Update inventory and product details.
          </p>
          <span className="inline-flex items-center text-brand-600 text-sm font-medium">
            Go to Products 
            <ChevronRight className="w-4 h-4 ml-1" />
          </span>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white rounded-xl shadow-soft p-6 hover:shadow-hover transition-shadow"
        >
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-3">
              <ClipboardList className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Manage Orders</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            View and manage customer orders. Update order status and process deliveries.
          </p>
          <span className="inline-flex items-center text-blue-600 text-sm font-medium">
            Go to Orders 
            <ChevronRight className="w-4 h-4 ml-1" />
          </span>
        </Link>

        <div className="bg-white rounded-xl shadow-soft p-6 hover:shadow-hover transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-gray-100 text-gray-600 mr-3">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Configure your store settings, delivery options, and notification preferences.
          </p>
          <button 
            onClick={handleToggleSnacks}
            className={`inline-flex items-center text-sm font-medium ${snacksAvailable ? 'text-accent-600' : 'text-gray-600'}`}
          >
            {snacksAvailable ? 'Disable Snacks' : 'Enable Snacks'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Recent Orders Preview */}
      {orders.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link to="/admin/orders" className="text-brand-600 text-sm font-medium flex items-center">
              View all orders
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.slice(0, 5).map((order) => {
                    const orderTotal = order.items.reduce(
                      (sum, item) => sum + item.product.price * item.quantity, 
                      0
                    );
                    
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id.substring(0, 6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${order.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : order.status === 'confirmed' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${orderTotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 