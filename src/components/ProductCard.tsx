import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import type { Product } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700 capitalize">
          {product.category}
        </div>
        {product.featured && (
          <div className="absolute top-3 right-3 bg-accent-400 text-gray-900 rounded-full px-3 py-1 text-xs font-bold">
            Featured
          </div>
        )}
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-gray-900 mb-1 line-clamp-1 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
          <span className="text-sm font-medium text-gray-600">{product.rating.toFixed(1)}</span>
          <span className="text-sm text-gray-400">({product.stock} in stock)</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-lg text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
