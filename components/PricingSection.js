'use client'
import { motion } from 'framer-motion'
import { FaTruck, FaUndo, FaGift, FaCreditCard } from 'react-icons/fa'

export default function PricingSection({ onAddToCart }) {
  const product = {
    id: 1,
    name: 'Pack Individual',
    price: '19.49',
    originalPrice: '39.99',
    quantity: 1
  }

  const packages = [
    {
      id: 1,
      name: 'Pack Individual',
      badge: 'Más popular',
      price: '19.49',
      originalPrice: '39.99',
      discount: '51%',
      description: 'Perfecto para empezar a proteger',
      features: [
        '1 Casco Protector Premium',
        'Guía de ajuste incluida',
        'Garantía de 30 días',
        'Envío GRATIS incluido en Quito',
        'Soporte 24/7'
      ],
      highlight: true,
      quantity: 1
    }
  ]

  const guarantees = [
    {
      icon: <FaTruck className="text-3xl" />,
      title: 'Envío GRATIS',
      description: 'Incluido en Quito'
    },
    {
      icon: <FaUndo className="text-3xl" />,
      title: 'Devolución gratis',
      description: '30 días de garantía'
    },
    {
      icon: <FaGift className="text-3xl" />,
      title: 'Regalo especial',
      description: 'Guía digital de seguridad'
    },
    {
      icon: <FaCreditCard className="text-3xl" />,
      title: 'Pago seguro',
      description: 'Protección del comprador'
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto max-w-7xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">🎉</span>
            <span className="text-red-700 font-accent text-sm font-bold">OFERTA LIMITADA - 51% DE DESCUENTO</span>
          </div>

          <h2 className="section-title">
            Protege a tu bebé
            <span className="text-gradient block">desde solo $19.49 USD</span>
          </h2>

          <p className="section-subtitle mt-6">
            Una inversión pequeña para una tranquilidad inmensa. Sin mensualidades, sin letra pequeña.
          </p>
        </motion.div>

        {/* Paquetes de precio */}
        <div className="flex justify-center mb-20 max-w-2xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden ${
                pkg.highlight ? 'border-4 border-pink-400 transform md:scale-105' : ''
              }`}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className={`absolute top-6 right-6 ${
                  pkg.highlight ? 'bg-pink-500' : 'bg-purple-500'
                } text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                  {pkg.badge}
                </div>
              )}

              <div className="p-8">
                {/* Nombre del paquete */}
                <h3 className="font-heading text-3xl font-bold text-gray-800 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-gray-600 font-body mb-6">{pkg.description}</p>

                {/* Precio */}
                <div className="mb-6">
                  <div className="flex items-end gap-3 mb-2">
                    <span className="text-gray-400 line-through text-2xl">${pkg.originalPrice}</span>
                    <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                      -{pkg.discount}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-pink-600">${pkg.price}</span>
                    <span className="text-gray-500 font-body text-sm">USD (pago único)</span>
                  </div>
                  <p className="text-green-600 font-body text-sm font-semibold mt-2">
                    ✓ Envío incluido en Quito
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-500 text-xl flex-shrink-0 mt-1">✓</span>
                      <span className="text-gray-700 font-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => onAddToCart && onAddToCart(pkg)}
                  className={`w-full ${
                    pkg.highlight ? 'btn-primary' : 'btn-secondary'
                  } text-center`}
                >
                  Agregar al Carrito
                </button>

                {/* Urgencia */}
                <p className="text-center text-sm text-gray-500 mt-4">
                  ⏰ Solo quedan <span className="font-bold text-red-500">7 unidades</span> a este precio
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Garantías */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-pink-500 mb-3 flex justify-center">
                {guarantee.icon}
              </div>
              <h4 className="font-accent font-bold text-gray-800 mb-2">
                {guarantee.title}
              </h4>
              <p className="text-sm text-gray-600 font-body">
                {guarantee.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ rápido */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto"
        >
          <h3 className="font-heading text-3xl font-bold text-center text-gray-800 mb-8">
            Preguntas frecuentes
          </h3>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h4 className="font-accent font-bold text-lg text-gray-800 mb-2">
                ¿Mi bebé realmente lo usará?
              </h4>
              <p className="text-gray-600 font-body">
                Sí. Es tan ligero (75g) y cómodo que la mayoría de bebés lo olvidan después de 2-3 minutos.
                El 94% de nuestros clientes confirman que sus bebés lo aceptan sin problema.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h4 className="font-accent font-bold text-lg text-gray-800 mb-2">
                ¿Es realmente seguro y certificado?
              </h4>
              <p className="text-gray-600 font-body">
                Absolutamente. Cumple con CE, ISO 9001, y ASTM F1447. Está libre de BPA, ftalatos y sustancias tóxicas.
                Probado por laboratorios independientes.
              </p>
            </div>

            <div>
              <h4 className="font-accent font-bold text-lg text-gray-800 mb-2">
                ¿Cuánto tarda en llegar?
              </h4>
              <p className="text-gray-600 font-body">
                24-48 horas en Quito con envío GRATIS incluido. Recibirás tracking en cuanto se envíe.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-12 shadow-2xl">
            <h3 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
              No esperes a que pase un accidente
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Miles de mamás ya protegen a sus bebés. Únete a ellas hoy y duerme tranquila esta noche.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onAddToCart && onAddToCart(product)}
                className="bg-white text-pink-500 font-accent font-bold px-10 py-5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-xl"
              >
                Sí, Proteger a Mi Bebé Ahora
              </button>
            </div>

            <p className="text-white/80 text-sm mt-6">
              💳 Pago 100% seguro | 🚚 Envío gratis | 🔄 Devolución sin coste
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
