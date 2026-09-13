import { motion } from 'framer-motion';
import { Leaf, Heart, Award, Users, Sprout, Beaker } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    { icon: Leaf, title: 'Fresh & Natural', desc: 'We source only the freshest fruits from local farms, pressed daily for maximum flavor and nutrition.' },
    { icon: Heart, title: 'Passion in Every Cup', desc: 'Every juice and milkshake is crafted with care by our expert mixologists who love what they do.' },
    { icon: Award, title: 'Quality First', desc: 'No concentrates, no artificial flavors. Just real fruit, real ingredients, and real taste.' },
    { icon: Sprout, title: 'Sustainable', desc: 'We use eco-friendly packaging and partner with farms that practice sustainable agriculture.' },
  ];

  const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '12', label: 'Fresh Flavors' },
    { value: '100%', label: 'Real Fruit' },
    { value: '30min', label: 'Delivery Time' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 lg:py-24 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-berry-200/30 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Story
            </span>
            <h1 className="font-display font-extrabold text-4xl lg:text-6xl text-gray-900 mb-6">
              From Farm to Glass,
              <br />
              <span className="bg-gradient-to-r from-primary-500 to-berry-500 bg-clip-text text-transparent">
                with Love
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              JUICELY was born from a simple idea: that everyone deserves access to
              fresh, delicious, and nutritious beverages made from real ingredients.
              No shortcuts, no compromises — just pure fruit goodness in every sip.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display font-extrabold text-3xl lg:text-5xl text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm lg:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our core values shape every bottle we make and every customer we serve.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-gray-900 mb-4">
              How We Make It
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              A simple process that ensures maximum freshness and flavor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Sprout, step: '01', title: 'Source', desc: 'We hand-pick the best fruits from local organic farms every morning.' },
              { icon: Beaker, step: '02', title: 'Press & Blend', desc: 'Fruits are cold-pressed and blended to preserve nutrients and natural flavor.' },
              { icon: Users, step: '03', title: 'Deliver', desc: 'Your order is packaged and delivered fresh to your door within 30 minutes.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white shadow-lg flex items-center justify-center relative">
                  <item.icon className="w-10 h-10 text-primary-500" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-berry-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-white mb-4">
            Taste the Difference
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Experience the freshness for yourself. Your first sip will tell you everything.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-primary-50 font-bold px-8 py-4 rounded-full transition-all active:scale-95"
          >
            Explore Our Menu
          </Link>
        </div>
      </section>
    </div>
  );
}
