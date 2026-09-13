import { Link } from 'react-router-dom';
import { Citrus, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <Citrus className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-extrabold text-xl text-white">
                JUICE<span className="text-primary-400">LY</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Freshly pressed juices and creamy milkshakes made from real fruit.
              No concentrates, no shortcuts — just pure flavor.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-primary-400 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>123 Orchard Lane, Fresh City</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>hello@juicely.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} JUICELY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
