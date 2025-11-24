'use client'
import { useCart } from '@/context/CartContext'
import { FaShoppingCart } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Navbar() {
  const { getTotalItems, toggleCart } = useCart()
  const totalItems = getTotalItems()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-4xl">🛡️</span>
            <div>
              <h1 className="font-heading text-2xl font-bold text-gray-800">
                BebéSeguro
              </h1>
              <p className="text-xs text-gray-500">Protección con amor</p>
            </div>
          </div>

          {/* Enlaces de navegación */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#problema"
              className="text-gray-600 hover:text-pink-500 font-body transition-colors duration-300"
            >
              ¿Por qué?
            </a>
            <a
              href="#solucion"
              className="text-gray-600 hover:text-pink-500 font-body transition-colors duration-300"
            >
              Beneficios
            </a>
            <a
              href="#testimonios"
              className="text-gray-600 hover:text-pink-500 font-body transition-colors duration-300"
            >
              Testimonios
            </a>
            <a
              href="#precio"
              className="text-gray-600 hover:text-pink-500 font-body transition-colors duration-300"
            >
              Precio
            </a>
          </div>

          {/* Botón de carrito */}
          <button
            onClick={toggleCart}
            className="relative bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <FaShoppingCart className="text-xl" />

            {/* Badge con contador */}
            {totalItems > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
              >
                {totalItems}
              </motion.div>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
