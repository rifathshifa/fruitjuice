import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Search } from 'lucide-react';
import { supabase, type Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    let query = supabase.from('products').select('*');

    if (category !== 'all') {
      query = query.eq('category', category);
    }

    if (sortBy === 'price-low') query = query.order('price', { ascending: true });
    else if (sortBy === 'price-high') query = query.order('price', { ascending: false });
    else if (sortBy === 'rating') query = query.order('rating', { ascending: false });
    else query = query.order('featured', { ascending: false });

    query.then(({ data, error }) => {
      if (!error && data) setProducts(data as Product[]);
      setLoading(false);
    });
  }, [category, sortBy]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-50 to-berry-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 mb-4">
            Our Menu
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Freshly pressed juices and creamy milkshakes, made to order with real fruit.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {['all', 'juice', 'milkshake'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                    category === cat
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'All Products' : `${cat}s`}
                </button>
              ))}
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-primary-400 w-full sm:w-48"
                />
              </div>

              <div className="relative">
                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-9 pr-8 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-primary-400 appearance-none bg-white cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found. Try a different search.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
