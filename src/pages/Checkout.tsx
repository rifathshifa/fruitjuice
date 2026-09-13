import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Loader2, ArrowLeft, CreditCard, MapPin, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const shipping = totalPrice > 25 ? 0 : 4.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
          shipping_address: `${form.address}, ${form.city} ${form.zip}`,
          total: grandTotal,
          status: 'confirmed',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image_url,
        quantity: item.quantity,
        unit_price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      setSuccess(order.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary-100 flex items-center justify-center">
            <Check className="w-12 h-12 text-secondary-600" />
          </div>
          <h1 className="font-display font-extrabold text-3xl text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-500 mb-2">
            Thank you for your order. We're getting your fresh juices ready!
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Order ID: <span className="font-mono font-medium text-gray-600">{success.slice(0, 8)}</span>
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3.5 rounded-full transition-all active:scale-95"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="font-display font-extrabold text-2xl text-gray-900 mb-4">
          Nothing to check out
        </h1>
        <p className="text-gray-500 mb-8">Your cart is empty.</p>
        <Link
          to="/shop"
          className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3.5 rounded-full transition-all"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-500 transition-colors text-sm font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <h1 className="font-display font-extrabold text-3xl lg:text-4xl text-gray-900 mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Form fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <User className="w-5 h-5 text-primary-500" />
                <h2 className="font-display font-bold text-lg text-gray-900">Contact Info</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-5 h-5 text-primary-500" />
                <h2 className="font-display font-bold text-lg text-gray-900">Shipping Address</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="123 Orchard Lane"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors"
                      placeholder="Fresh City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="w-5 h-5 text-primary-500" />
                <h2 className="font-display font-bold text-lg text-gray-900">Payment Details</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={form.cardNumber}
                    onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={form.cardExpiry}
                      onChange={(e) => setForm({ ...form, cardExpiry: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={form.cardCvc}
                      onChange={(e) => setForm({ ...form, cardCvc: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-display font-bold text-lg text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 max-h-48 overflow-y-auto scrollbar-hide">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline border-t border-gray-100 pt-4 mb-6">
                <span className="font-display font-bold text-lg text-gray-900">Total</span>
                <span className="font-display font-extrabold text-2xl text-gray-900">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-full transition-all active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                By placing your order, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
