import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Visit Us', value: '123 Orchard Lane, Fresh City, FC 12345' },
    { icon: Phone, title: 'Call Us', value: '(555) 123-4567' },
    { icon: Mail, title: 'Email Us', value: 'hello@juicely.com' },
    { icon: Clock, title: 'Hours', value: 'Mon-Sun: 7am - 9pm' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-berry-50 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              Have a question, suggestion, or just want to say hi? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Info */}
            <div>
              <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-gray-900 mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-gray-500">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center border border-gray-100">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary-400 mx-auto mb-2" />
                  <p className="text-gray-500 font-medium">123 Orchard Lane, Fresh City</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-3xl p-8 lg:p-10"
            >
              <h2 className="font-display font-extrabold text-2xl text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary-400 transition-colors resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sent}
                  className={`w-full flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-full transition-all active:scale-95 ${
                    sent
                      ? 'bg-secondary-500 text-white'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  {sent ? (
                    <>
                      <Check className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
