import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetails from '@/pages/ProductDetails';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />
          <main className="flex-1 pt-16 lg:pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
