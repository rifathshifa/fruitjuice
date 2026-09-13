import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { supabase, type Product } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          const p = data as Product;
          setProduct(p);
          supabase
            .from('products')
            .select('*')
            .eq('category', p.category)
            .neq('id', p.id)
            .limit(3)
            .then(({ data: rel }) => {
              if (rel) setRelated(rel as Product[]);
            });
        }
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-lg">Product not found.</p>
        <Link to="/shop" className="text-primary-500 font-semibold hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-primary-500 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square shadow-xl">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.featured && (
                <div className="absolute top-4 right-4 bg-accent-400 text-gray-900 rounded-full px-4 py-1.5 text-sm font-bold">
                  Featured
                </div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <span className="text-sm font-semibold text-primary-500 capitalize mb-2">
              {product.category}
            </span>
            <h1 className="font-display font-extrabold text-3xl lg:text-4xl text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(product.rating)
                        ? 'fill-accent-400 text-accent-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500 text-sm">{product.stock} in stock</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display font-extrabold text-4xl text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-gray-400 line-through text-lg">
                ${(product.price * 1.25).toFixed(2)}
              </span>
              <span className="bg-secondary-100 text-secondary-700 text-sm font-semibold px-2 py-1 rounded">
                Save 20%
              </span>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50 rounded-l-full transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50 rounded-r-full transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-full transition-all active:scale-95 ${
                  added
                    ? 'bg-secondary-500 text-white'
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <Link
                to="/cart"
                className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-primary-400 text-gray-700 font-semibold px-6 py-3.5 rounded-full transition-all"
              >
                View Cart
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16 lg:mt-24">
            <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
