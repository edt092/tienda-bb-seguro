'use client'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaCloud, FaHeart, FaStar, FaCheckCircle } from 'react-icons/fa'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function SolutionSection() {
  const { addToCart } = useCart()

  const product = {
    id: 1,
    name: 'Pack Individual',
    price: '19.49',
    originalPrice: '39.99',
    quantity: 1
  }
  const benefits = [
    {
      icon: <FaShieldAlt className="text-4xl text-blue-500" />,
      title: 'Protección 360°',
      description: 'Diseño envolvente que protege toda la cabeza: frente, laterales y parte posterior. Absorbe impactos hasta 90%.',
      color: 'bg-blue-50'
    },
    {
      icon: <FaCloud className="text-4xl text-pink-500" />,
      title: 'Suave como una nube',
      description: 'Espuma premium ultra-suave. No causa rozaduras ni incomodidad. Tu bebé ni notará que lo lleva puesto.',
      color: 'bg-pink-50'
    },
    {
      icon: <FaHeart className="text-4xl text-purple-500" />,
      title: 'Diseño adorable',
      description: 'Colores tiernos y diseños que enamoran. Tu bebé se verá aún más adorable mientras está protegido.',
      color: 'bg-purple-50'
    },
    {
      icon: <FaStar className="text-4xl text-yellow-500" />,
      title: 'Ajuste perfecto',
      description: 'Sistema de correas ajustables. Crece con tu bebé de 6 a 24 meses. Ligero: solo 75 gramos.',
      color: 'bg-yellow-50'
    }
  ]

  const features = [
    'Respirable y anti-sudor',
    'Lavable en máquina',
    'Sin BPA ni tóxicos',
    'Certificado de seguridad',
    'Material hipoalergénico',
    'Secado rápido'
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white via-baby-blue/20 to-baby-mint/30">
      <div className="container mx-auto max-w-7xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">✨</span>
            <span className="text-green-700 font-accent text-sm">La solución que esperabas</span>
          </div>

          <h2 className="section-title">
            Protección que se siente como
            <span className="text-gradient block">un abrazo constante</span>
          </h2>

          <p className="section-subtitle mt-6">
            Diseñado por padres, probado por expertos, amado por miles de familias.
          </p>
        </motion.div>

        {/* Imagen destacada del producto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 relative"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/img/3.jpg"
                alt="Detalle del casco protector"
                width={700}
                height={700}
                quality={90}
                className="w-full h-auto rounded-3xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -top-6 -right-6 bg-pink-500 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <p className="text-xs font-bold">NUEVO</p>
                  <p className="text-2xl font-bold">2025</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-heading text-4xl font-bold text-gray-800">
                Cada detalle pensado para tu tranquilidad
              </h3>
              <p className="text-xl text-gray-600 font-body leading-relaxed">
                No es solo un casco. Es la libertad de dejar que tu bebé explore, aprenda y crezca,
                mientras tú respiras tranquila sabiendo que está protegido.
              </p>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                    <span className="text-gray-700 font-body">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <button
                  onClick={() => addToCart(product)}
                  className="btn-primary w-full sm:w-auto"
                >
                  Quiero Proteger a Mi Bebé
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Beneficios principales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${benefit.color} rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="mb-4">{benefit.icon}</div>
              <h4 className="font-heading text-xl font-bold text-gray-800 mb-3">
                {benefit.title}
              </h4>
              <p className="text-gray-600 font-body text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparación visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-pink-50 to-blue-50 rounded-3xl p-8 md:p-12"
        >
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Con y sin protección: La diferencia es clara
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Sin protección */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-200">
              <div className="text-center mb-4">
                <span className="text-4xl">😰</span>
                <h4 className="font-heading text-2xl font-bold text-red-600 mt-2">Sin Casco</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Impacto directo en el cráneo</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Riesgo de lesiones graves</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Miedo constante y estrés</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Chichones y llantos frecuentes</span>
                </li>
              </ul>
            </div>

            {/* Con protección */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
              <div className="text-center mb-4">
                <span className="text-4xl">😊</span>
                <h4 className="font-heading text-2xl font-bold text-green-600 mt-2">Con Nuestro Casco</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Absorbe el 90% del impacto</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Protección certificada</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Tranquilidad para toda la familia</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Bebé feliz explorando sin límites</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
