import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Leaf,
  Award,
  Truck,
  Heart,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import { supabase, type Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(4)
      .then(({ data }) => {
        if (data) setProducts(data as Product[]);
      });
  }, []);

  const runAnimation = useCallback(() => {
    setAnimationStarted(true);
    const t = setTimeout(() => setAnimationComplete(true), 6200);
    return () => clearTimeout(t);
  }, []);

  const replay = () => {
    setAnimationStarted(false);
    setAnimationComplete(false);
  };

  return (
    <div>
      {/* Hero Section with Fruit Bowl Animation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-white to-secondary-50">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-100/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              >
                <Sparkles className="w-4 h-4" />
                100% Real Fruit. Zero Concentrate.
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-gray-900 leading-tight mb-6"
              >
                Fresh Fruit,
                <br />
                <span className="bg-gradient-to-r from-primary-500 to-berry-500 bg-clip-text text-transparent">
                  Perfectly Blended
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-gray-600 mb-8 max-w-md mx-auto lg:mx-0"
              >
                Watch the magic unfold. Click the fruit bowl to see your juice
                being made from scratch.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-primary-300 active:scale-95"
                >
                  Browse Shop
                  <ArrowRight className="w-5 h-5" />
                </Link>
                {!animationStarted && (
                  <button
                    onClick={runAnimation}
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary-200 hover:border-primary-400 text-primary-600 font-semibold px-8 py-3.5 rounded-full transition-all active:scale-95"
                  >
                    <ChevronDown className="w-5 h-5 animate-bounce" />
                    Click the Bowl
                  </button>
                )}
                {animationComplete && (
                  <button
                    onClick={replay}
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-secondary-200 hover:border-secondary-400 text-secondary-600 font-semibold px-8 py-3.5 rounded-full transition-all active:scale-95"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Replay
                  </button>
                )}
              </motion.div>
            </div>

            {/* Right: Animation Stage */}
            <div className="order-1 lg:order-2 relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
              <FruitBowlAnimation
                animationStarted={animationStarted}
                animationComplete={animationComplete}
                onBowlClick={runAnimation}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: Leaf, title: 'All Natural', desc: 'No added sugar or preservatives' },
              { icon: Award, title: 'Premium Quality', desc: 'Hand-picked ingredients daily' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Fresh to your door in 30 min' },
              { icon: Heart, title: 'Made with Love', desc: 'Crafted by expert mixologists' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-primary-50 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-extrabold text-3xl lg:text-4xl text-gray-900 mb-4"
            >
              Customer Favorites
            </motion.h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our most-loved juices and milkshakes, crafted to perfection.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3.5 rounded-full transition-all active:scale-95"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-500 to-berry-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl lg:text-5xl text-white mb-6"
          >
            Ready for a Fresh Start?
          </motion.h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of happy customers who start their day with JUICELY.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-primary-50 font-bold px-10 py-4 rounded-full transition-all hover:shadow-xl active:scale-95"
          >
            Order Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// ===== Cinematic Fruit Bowl Animation =====

type FruitData = {
  id: string;
  emoji: string;
  glow: string;
  restX: number;
  restY: number;
  bounceX: number;
  bounceY: number;
  flyDelay: number;
  spinDir: number;
};

const FRUITS: FruitData[] = [
  { id: 'mango',      emoji: '🥭', glow: '#fbbf24', restX: -38, restY: -8,  bounceX: -110, bounceY: -130, flyDelay: 0.15, spinDir: 1 },
  { id: 'strawberry', emoji: '🍓', glow: '#fca5a5', restX: -16, restY: -14, bounceX: -55,  bounceY: -165, flyDelay: 0.05, spinDir: -1 },
  { id: 'orange',     emoji: '🍊', glow: '#fdba74', restX: 14,  restY: -12, bounceX: 55,   bounceY: -165, flyDelay: 0.10, spinDir: 1 },
  { id: 'pineapple',  emoji: '🍍', glow: '#fde047', restX: 38,  restY: -6,  bounceX: 110,  bounceY: -130, flyDelay: 0.20, spinDir: -1 },
  { id: 'watermelon', emoji: '🍉', glow: '#f9a8d4', restX: 0,   restY: -18, bounceX: 0,    bounceY: -185, flyDelay: 0.00, spinDir: 1 },
];

const SPLASH_PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  angle: (i / 14) * Math.PI * 2,
  distance: 40 + Math.random() * 50,
  size: 4 + Math.random() * 6,
  delay: Math.random() * 0.15,
}));

const CHUNK_PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  emoji: ['🥭', '🍓', '🍊', '🍉'][i % 4],
  orbitRadius: 18 + Math.random() * 22,
  startAngle: (i / 8) * Math.PI * 2,
  size: 0.6 + Math.random() * 0.4,
  delay: (i / 8) * 0.1,
}));

const AMBIENT_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 3 + Math.random() * 8,
  duration: 4 + Math.random() * 6,
  delay: Math.random() * 3,
}));

function FruitBowlAnimation({
  animationStarted,
  animationComplete,
  onBowlClick,
}: {
  animationStarted: boolean;
  animationComplete: boolean;
  onBowlClick: () => void;
}) {
  const [phase, setPhase] = useState(0);

  // Phase timeline (ms):
  // 0     - idle bowl with fruits
  // 100   - bowl shakes, fruits bounce out with arc
  // 1200  - fruits fly toward blender
  // 2100  - fruits drop into blender, splash particles
  // 2600  - milk/liquid pours from top
  // 3400  - blender spins, vortex swirl, chunks orbit
  // 4500  - juice pours from blender spout into glass
  // 5800  - glass is full, zoom on glass
  // 6200  - order now appears
  useEffect(() => {
    if (!animationStarted) {
      setPhase(0);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 100));
    timers.push(setTimeout(() => setPhase(2), 1200));
    timers.push(setTimeout(() => setPhase(3), 2100));
    timers.push(setTimeout(() => setPhase(4), 2600));
    timers.push(setTimeout(() => setPhase(5), 3400));
    timers.push(setTimeout(() => setPhase(6), 4500));
    timers.push(setTimeout(() => setPhase(7), 5800));
    return () => timers.forEach(clearTimeout);
  }, [animationStarted]);

  // Camera zoom: subtly pushes in during mix and pour, then zooms on glass
  const stageScale = phase >= 5 && phase <= 6 ? 1.08 : phase >= 1 ? 1.02 : 1;
  const stageY = phase >= 5 && phase <= 6 ? -10 : 0;

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none"
      onClick={!animationStarted ? onBowlClick : undefined}
    >
      {/* ===== Ambient background particles ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {AMBIENT_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: phase >= 4 ? 'rgba(251,191,36,0.15)' : 'rgba(249,115,22,0.1)',
            }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.5, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ===== Stage zoom wrapper ===== */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{ scale: stageScale, y: stageY }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ===== Glow halo ===== */}
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 320,
            height: 320,
            background: animationStarted
              ? 'radial-gradient(circle, rgba(251,191,36,0.25), rgba(236,72,153,0.15))'
              : 'radial-gradient(circle, rgba(249,115,22,0.15), rgba(34,197,94,0.1))',
          }}
          animate={{
            scale: animationStarted ? [1, 1.3, 1.1] : [1, 1.08, 1],
            opacity: animationStarted ? [0.5, 0.8, 0.6] : [0.3, 0.5, 0.3],
          }}
          transition={{ duration: animationStarted ? 2 : 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ===== Cinematic light rays (during mix) ===== */}
        {phase >= 4 && phase <= 6 && (
          <motion.div
            className="absolute"
            style={{ top: '0%', left: '50%', transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: [0, 0.4, 0.3], height: '100%' }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-40 h-full mx-auto"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
                clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0% 100%)',
              }}
            />
          </motion.div>
        )}

        {/* ===== BOWL ===== */}
        <motion.div
          className="absolute z-20"
          style={{ bottom: '12%' }}
          animate={
            phase === 1
              ? { x: [0, -6, 6, -4, 0], y: [0, -3, 0, -2, 0], rotate: [0, -2, 2, -1, 0] }
              : phase >= 2
              ? { y: [0, 10, 0], opacity: [1, 0.4, 0.15], scale: [1, 0.92, 0.85] }
              : { y: [0, -6, 0] }
          }
          transition={
            phase === 1
              ? { duration: 0.6, ease: 'easeOut' }
              : phase >= 2
              ? { duration: 0.8, times: [0, 0.5, 1] }
              : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <svg width="220" height="130" viewBox="0 0 220 130" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="bowlBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="40%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <radialGradient id="bowlInner" cx="0.5" cy="0.2" r="0.6">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="60%" stopColor="#fcd34d" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
              <linearGradient id="bowlRim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <path d="M 20 22 Q 110 130 200 22 Z" fill="url(#bowlBody)" stroke="#78350f" strokeWidth="2.5" />
            <path d="M 30 22 Q 110 110 190 22 Z" fill="url(#bowlInner)" opacity="0.4" />
            <ellipse cx="110" cy="22" rx="90" ry="14" fill="url(#bowlRim)" stroke="#78350f" strokeWidth="2.5" />
            <ellipse cx="110" cy="22" rx="82" ry="10" fill="#92400e" opacity="0.3" />
            <ellipse cx="90" cy="19" rx="30" ry="4" fill="rgba(255,255,255,0.5)" />
          </svg>
        </motion.div>

        {/* ===== FRUITS ===== */}
        {FRUITS.map((fruit, idx) => (
          <motion.div
            key={fruit.id}
            className="absolute z-30"
            style={{ bottom: '22%', left: '50%', transformOrigin: 'center' }}
            initial={{ x: fruit.restX, y: fruit.restY, scale: 0, opacity: 0, rotate: 0 }}
            animate={
              !animationStarted
                ? { x: fruit.restX, y: fruit.restY, scale: 1, opacity: 1, rotate: 0 }
                : phase === 1
                ? {
                    x: [fruit.restX, fruit.bounceX, fruit.restX * 0.3],
                    y: [fruit.restY, fruit.bounceY, fruit.restY - 30],
                    scale: [1, 1.4, 1.1],
                    rotate: [0, 180 * fruit.spinDir, 360 * fruit.spinDir],
                    opacity: [1, 1, 1],
                  }
                : phase === 2
                ? {
                    x: [fruit.restX * 0.3, 0],
                    y: [fruit.restY - 30, -60],
                    scale: [1.1, 0.5],
                    rotate: [360 * fruit.spinDir, 540 * fruit.spinDir],
                    opacity: [1, 0.8],
                  }
                : phase === 3
                ? {
                    x: 0,
                    y: [-60, 0],
                    scale: [0.5, 0.2],
                    rotate: [540 * fruit.spinDir, 720 * fruit.spinDir],
                    opacity: [0.8, 0],
                  }
                : { scale: 0, opacity: 0 }
            }
            transition={
              !animationStarted
                ? { delay: idx * 0.12, duration: 0.5, ease: 'backOut' }
                : phase === 1
                ? { duration: 1.1, times: [0, 0.45, 1], delay: fruit.flyDelay, ease: 'easeOut' }
                : phase === 2
                ? { duration: 0.9, delay: fruit.flyDelay * 0.5, ease: 'easeIn' }
                : phase === 3
                ? { duration: 0.5, delay: fruit.flyDelay * 0.3, ease: 'easeIn' }
                : { duration: 0.2 }
            }
          >
            <div
              className="absolute inset-0 rounded-full blur-md"
              style={{ background: fruit.glow, opacity: 0.3, transform: 'scale(1.5)' }}
            />
            <div className="relative text-5xl sm:text-6xl" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>
              {fruit.emoji}
            </div>
          </motion.div>
        ))}

        {/* ===== SPLASH PARTICLES (fruits hit blender) ===== */}
        {phase === 3 && (
          <div className="absolute z-25" style={{ bottom: '30%', left: '50%' }}>
            {SPLASH_PARTICLES.map((p) => {
              const dx = Math.cos(p.angle) * p.distance;
              const dy = Math.sin(p.angle) * p.distance * 0.6;
              return (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: `radial-gradient(circle, ${FRUITS[p.id % 5].glow}, transparent)`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
                  animate={{ x: dx, y: [0, dy, dy + 40], opacity: [0.9, 0.6, 0], scale: [1, 0.5, 0] }}
                  transition={{ duration: 0.7, delay: p.delay, ease: 'easeOut' }}
                />
              );
            })}
          </div>
        )}

        {/* ===== BLENDER ===== */}
        <motion.div
          className="absolute z-10"
          style={{ bottom: '10%' }}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
        >
          <motion.div
            animate={phase === 5 ? { x: [-2, 2, -2], y: [-1, 1, -1] } : { x: 0, y: 0 }}
            transition={phase === 5 ? { duration: 0.08, repeat: Infinity } : { duration: 0.2 }}
          >
            <svg width="160" height="230" viewBox="0 0 160 230" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="jarGlass" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                </linearGradient>
                <linearGradient id="liquidFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="30%" stopColor="#fb923c" />
                  <stop offset="60%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="milkPour" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fafaf9" />
                  <stop offset="50%" stopColor="#f5f5f4" />
                  <stop offset="100%" stopColor="#e7e5e4" />
                </linearGradient>
                <radialGradient id="vortex" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                  <stop offset="50%" stopColor="rgba(251,146,60,0.4)" />
                  <stop offset="100%" stopColor="rgba(236,72,153,0.2)" />
                </radialGradient>
                <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>

              {/* Spout */}
              <path d="M 112 22 L 132 8 L 132 28 Z" fill="rgba(255,255,255,0.25)" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M 112 22 L 132 8" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

              {/* Jar */}
              <rect x="32" y="22" width="96" height="150" rx="10" fill="url(#jarGlass)" stroke="#94a3b8" strokeWidth="2.5" />
              <rect x="38" y="28" width="8" height="140" rx="4" fill="rgba(255,255,255,0.3)" />
              <rect x="116" y="28" width="4" height="140" rx="2" fill="rgba(255,255,255,0.15)" />

              {/* Liquid fill */}
              {phase >= 4 && phase < 6 && (
                <motion.rect
                  x="34"
                  y={phase >= 5 ? 55 : 80}
                  width="92"
                  height={phase >= 5 ? 116 : 91}
                  rx="6"
                  fill="url(#liquidFill)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase >= 5 ? [0.8, 1, 0.85] : 0.9 }}
                  transition={phase >= 5 ? { duration: 0.4, repeat: Infinity } : { duration: 0.5 }}
                />
              )}

              {/* Milk pour into blender */}
              {phase === 4 && (
                <motion.rect
                  x="76" y="22" width="8" height="58" rx="4"
                  fill="url(#milkPour)"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: [0, 0.9, 0.9, 0], scaleY: [0, 1, 1, 0.3] }}
                  transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
                  style={{ transformOrigin: 'top' }}
                />
              )}

              {/* Vortex swirl */}
              {phase === 5 && (
                <motion.ellipse
                  cx="80" cy="110" rx="42" ry="42"
                  fill="url(#vortex)"
                  animate={{ rotate: 360, scale: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '80px 110px' }}
                />
              )}

              {/* Swirl lines */}
              {phase === 5 && (
                <>
                  <motion.path
                    d="M 50 100 Q 80 80 110 100 Q 80 120 50 100"
                    fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '80px 100px' }}
                  />
                  <motion.path
                    d="M 55 120 Q 80 105 105 120 Q 80 135 55 120"
                    fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '80px 120px' }}
                  />
                </>
              )}

              {/* Fruit chunk particles orbiting inside blender */}
              {phase === 5 && (
                <>
                  {CHUNK_PARTICLES.map((chunk) => (
                    <motion.g
                      key={chunk.id}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear', delay: chunk.delay }}
                      style={{ transformOrigin: '80px 110px' }}
                    >
                      <text
                        x={80 + chunk.orbitRadius * Math.cos(chunk.startAngle)}
                        y={110 + chunk.orbitRadius * Math.sin(chunk.startAngle) * 0.5}
                        fontSize={16 * chunk.size}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        opacity="0.7"
                      >
                        {chunk.emoji}
                      </text>
                    </motion.g>
                  ))}
                </>
              )}

              {/* Blade indicator */}
              {phase === 5 && (
                <motion.ellipse
                  cx="80" cy="165" rx="30" ry="4"
                  fill="rgba(255,255,255,0.5)"
                  animate={{ rotate: 360, scaleX: [1, 0.5, 1] }}
                  transition={{ duration: 0.15, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '80px 165px' }}
                />
              )}

              {/* Blender base */}
              <rect x="12" y="175" width="136" height="48" rx="12" fill="url(#baseGrad)" stroke="#0f172a" strokeWidth="2" />
              <rect x="18" y="180" width="124" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
              <circle cx="80" cy="200" r="10" fill={phase === 5 ? '#22c55e' : '#64748b'} />
              {phase === 5 && (
                <motion.circle
                  cx="80" cy="200" r="10" fill="none" stroke="#22c55e" strokeWidth="2"
                  animate={{ r: [10, 16, 10], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
              <rect x="26" y="195" width="20" height="8" rx="2" fill="#334155" />
              <rect x="114" y="195" width="20" height="8" rx="2" fill="#334155" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ===== MILK/LIQUID POUR FROM TOP (phase 4) ===== */}
        <AnimatePresence>
          {phase === 4 && (
            <motion.div
              className="absolute z-25"
              style={{ left: '50%', top: '5%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="relative mx-auto"
                style={{ width: 14 }}
                initial={{ height: 0 }}
                animate={{ height: '35%' }}
                transition={{ duration: 0.3, ease: 'easeIn' }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(250,250,249,0.95), rgba(245,245,244,0.8), rgba(231,229,228,0.6))',
                    filter: 'blur(0.5px)',
                  }}
                />
                <div className="absolute left-1 top-0 w-1.5 h-full rounded-full" style={{ background: 'rgba(255,255,255,0.6)' }} />
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 0] }}
                  transition={{ duration: 0.4, repeat: 3 }}
                >
                  <div className="w-6 h-6 rounded-full bg-white/40 blur-sm" />
                </motion.div>
              </motion.div>

              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/50"
                  style={{ width: 4, height: 4, left: `${30 + i * 20}%` }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: [0, 100, 200], opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.6, delay: i * 0.15, repeat: 2 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== JUICE POUR FROM BLENDER TO GLASS (phase 6) ===== */}
        <AnimatePresence>
          {phase === 6 && (
            <motion.div
              className="absolute z-25"
              style={{ left: '50%', top: '12%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="120" height="180" viewBox="0 0 120 180" className="overflow-visible">
                <defs>
                  <linearGradient id="juiceStream" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fde047" />
                    <stop offset="40%" stopColor="#fb923c" />
                    <stop offset="70%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 10 0 Q 30 60 50 100 Q 70 140 60 180"
                  fill="none" stroke="url(#juiceStream)" strokeWidth="6" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.3, times: [0, 0.3, 0.7, 1] }}
                />
                <motion.path
                  d="M 10 0 Q 30 60 50 100 Q 70 140 60 180"
                  fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0] }}
                  transition={{ duration: 1.3, times: [0, 0.3, 0.7, 1] }}
                />
              </svg>

              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 5 + i * 2, height: 5 + i * 2,
                    background: i % 2 === 0 ? '#fb923c' : '#ec4899',
                    left: `${40 + i * 8}%`, top: '85%',
                  }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: [0, 30, 50], opacity: [0, 0.9, 0], scale: [1, 0.6, 0] }}
                  transition={{ duration: 0.5, delay: i * 0.1, repeat: 2 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== GLASS WITH JUICE ===== */}
        <motion.div
          className="absolute z-15"
          style={{ bottom: '8%', right: '8%' }}
          initial={{ opacity: 0, scale: 0.4, y: 30 }}
          animate={
            phase >= 6
              ? { opacity: 1, scale: phase >= 7 ? [1, 1.15, 1] : 1, y: 0 }
              : { opacity: 0, scale: 0.4, y: 30 }
          }
          transition={phase >= 7 ? { duration: 0.6, ease: 'backOut' } : { duration: 0.5, ease: 'easeOut' }}
        >
          <svg width="100" height="140" viewBox="0 0 100 140" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="glassJuice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="30%" stopColor="#fb923c" />
                <stop offset="60%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </linearGradient>
              <clipPath id="glassClip">
                <path d="M 18 8 L 82 8 L 74 128 L 26 128 Z" />
              </clipPath>
            </defs>

            <path d="M 18 8 L 82 8 L 74 128 L 26 128 Z" fill="url(#glassBody)" stroke="#cbd5e1" strokeWidth="2.5" />

            {phase >= 6 && (
              <motion.rect
                x="18" y="8" width="64" height="120"
                fill="url(#glassJuice)" clipPath="url(#glassClip)"
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: phase >= 7 ? 30 : [120, 60], opacity: 1 }}
                transition={phase >= 7 ? { duration: 0.5 } : { duration: 1.2, ease: 'easeOut' }}
                style={{ transformOrigin: 'bottom' }}
              />
            )}

            {phase >= 6 && (
              <motion.ellipse
                cx="50" cy={phase >= 7 ? 38 : 68} rx="28" ry="4"
                fill="rgba(255,255,255,0.3)" clipPath="url(#glassClip)"
                animate={{ rx: [28, 30, 28], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}

            <path d="M 25 12 L 30 12 L 27 125 L 22 125 Z" fill="rgba(255,255,255,0.4)" />
            <path d="M 70 12 L 73 12 L 71 125 L 68 125 Z" fill="rgba(255,255,255,0.15)" />
            <ellipse cx="50" cy="8" rx="32" ry="5" fill="rgba(255,255,255,0.2)" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="58" y1="0" x2="68" y2="125" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />
            <line x1="58" y1="0" x2="68" y2="125" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />

            {phase >= 7 && (
              <motion.g
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: 'backOut' }}
              >
                <circle cx="50" cy="4" r="6" fill="#ef4444" />
                <circle cx="47" cy="2" r="2" fill="rgba(255,255,255,0.5)" />
              </motion.g>
            )}
          </svg>

          {/* Steam/aroma wisps */}
          {phase >= 7 && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ left: `${40 + i * 15}%`, top: '-10%' }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 0.4, 0], y: [-10, -40, -60], x: [0, 10, -5] }}
                  transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: 'easeOut' }}
                >
                  <div className="w-6 h-10 rounded-full bg-white/20 blur-sm" />
                </motion.div>
              ))}
            </>
          )}
        </motion.div>

        {/* ===== SPARKLE BURST (glass full) ===== */}
        {phase >= 7 && (
          <div className="absolute z-35" style={{ bottom: '15%', right: '12%' }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const dist = 50 + Math.random() * 30;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ width: 6, height: 6 }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    rotate: 180,
                  }}
                  transition={{ duration: 0.8, delay: i * 0.05, repeat: Infinity, repeatDelay: 1 }}
                >
                  <div className="w-full h-full bg-accent-300 rounded-full" style={{ filter: 'drop-shadow(0 0 4px #fde047)' }} />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ===== ORDER NOW BUTTON ===== */}
        <AnimatePresence>
          {animationComplete && (
            <motion.div
              className="absolute z-40"
              style={{ bottom: '2%' }}
              initial={{ opacity: 0, y: 40, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-berry-500 text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform"
              >
                <Sparkles className="w-5 h-5" />
                Order Now!
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== Hint text ===== */}
        {!animationStarted && (
          <motion.div
            className="absolute bottom-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-sm font-medium text-primary-600 bg-primary-50/80 backdrop-blur-sm px-4 py-2 rounded-full">
              Click the fruit bowl to start
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
