import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-primary-300" />
        </div>
        <h1 className="font-display font-extrabold text-2xl text-gray-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          Looks like you haven't added any juices yet. Let's fix that!
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3.5 rounded-full transition-all active:scale-95"
        >
          Browse Shop
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  const shipping = totalPrice > 25 ? 0 : 4.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-extrabold text-3xl lg:text-4xl text-gray-900 mb-8">
          Your Cart ({totalItems})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-display font-semibold text-gray-900 hover:text-primary-500 transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-400 capitalize">{item.product.category}</p>
                      <p className="font-bold text-primary-600 mt-1">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-200 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 rounded-l-full transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-10 text-center font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 rounded-r-full transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-500 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-display font-bold text-lg text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-primary-500 bg-primary-50 rounded-lg px-3 py-2">
                    Add ${(25 - totalPrice).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-bold text-lg text-gray-900">Total</span>
                  <span className="font-display font-extrabold text-2xl text-gray-900">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3.5 rounded-full transition-all active:scale-95"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
