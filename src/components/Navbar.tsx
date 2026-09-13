import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Citrus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Citrus className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-extrabold text-xl lg:text-2xl text-gray-900 tracking-tight">
              JUICE<span className="text-primary-500">LY</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `font-medium text-sm tracking-wide transition-colors ${
                    isActive
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-primary-500'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-primary-50 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-6 h-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 rounded-full hover:bg-primary-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-gray-100 animate-fade-in">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `block py-3 px-2 font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-primary-500'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
