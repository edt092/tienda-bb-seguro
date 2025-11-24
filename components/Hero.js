'use client'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaHeart } from 'react-icons/fa'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function Hero() {
  const { addToCart } = useCart()

  const product = {
    id: 1,
    name: 'Pack Individual',
    price: '19.49',
    originalPrice: '39.99',
    quantity: 1
  }
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo con video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/img/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-baby-pink/80 via-white/90 to-baby-blue/80"></div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto principal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full">
              <FaShieldAlt className="text-pink-500" />
              <span className="text-pink-700 font-accent text-sm">Protección Certificada</span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Protege Cada
              <span className="text-gradient block">Primer Paso</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 font-body leading-relaxed">
              Porque sabemos que cada golpe duele más en tu corazón que en su cabecita.
              <span className="font-semibold text-pink-600"> Dale la protección que merece</span> mientras descubre el mundo.
            </p>

            <div className="flex items-center gap-3 text-gray-600">
              <FaHeart className="text-red-400 text-xl" />
              <p className="text-lg italic">
                "La tranquilidad que necesitas, el amor que ellos merecen"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => addToCart(product)}
                className="btn-primary"
              >
                Proteger a Mi Bebé Ahora
              </button>
              <button
                onClick={() => {
                  document.getElementById('solucion')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-secondary"
              >
                Ver Cómo Funciona
              </button>
            </div>

            {/* Badges de confianza */}
            <div className="flex flex-wrap gap-4 pt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500 text-xl">✓</span>
                <span>Envío en 24-48h</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500 text-xl">✓</span>
                <span>Garantía 30 días</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500 text-xl">✓</span>
                <span>+10,000 mamás confían</span>
              </div>
            </div>
          </motion.div>

          {/* Imagen del producto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative animate-float">
              <Image
                src="/img/1.jpg"
                alt="Casco protector para bebé"
                width={800}
                height={800}
                quality={95}
                className="w-full h-auto drop-shadow-2xl"
                priority={true}
              />
              {/* Círculos decorativos */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-300 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300 rounded-full opacity-20 blur-2xl"></div>
            </div>

            {/* Badge flotante */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-xl border-4 border-pink-200"
            >
              <p className="text-center">
                <span className="block text-2xl font-bold text-pink-500">4.9/5</span>
                <span className="text-sm text-gray-600">⭐⭐⭐⭐⭐</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-sm font-body">Descubre más</span>
          <div className="animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
