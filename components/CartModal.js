'use client'
import { useCart } from '@/context/CartContext'
import { FaTimes, FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function CartModal() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    getTotalItems
  } = useCart()

  const router = useRouter()
  const subtotal = getSubtotal()
  const shipping = 0 // Envío gratis incluido
  const total = subtotal + shipping

  const handleCheckout = () => {
    toggleCart()
    router.push('/checkout')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <FaShoppingBag className="text-2xl" />
                  <h2 className="font-heading text-2xl font-bold">
                    Tu Carrito
                  </h2>
                </div>
                <button
                  onClick={toggleCart}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <p className="text-pink-100 text-sm">
                {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
              </p>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="font-heading text-xl font-bold text-gray-800 mb-2">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-gray-600 font-body mb-6">
                    Agrega productos para proteger a tu bebé
                  </p>
                  <button onClick={toggleCart} className="btn-primary">
                    Ir a Comprar
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-gray-50 rounded-2xl p-4 relative"
                    >
                      {/* Botón eliminar */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                      >
                        <FaTrash />
                      </button>

                      {/* Información del producto */}
                      <h3 className="font-heading text-lg font-bold text-gray-800 mb-1 pr-8">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-3 bg-white rounded-full p-1 shadow">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-100 text-pink-500 transition-colors"
                          >
                            <FaMinus className="text-sm" />
                          </button>
                          <span className="font-bold text-gray-800 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-100 text-pink-500 transition-colors"
                          >
                            <FaPlus className="text-sm" />
                          </button>
                        </div>

                        {/* Precio */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-pink-600">
                            ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            ${item.price} c/u
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer con totales */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600 font-body">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-body">
                    <span className="flex items-center gap-2">
                      <span>Envío a Quito</span>
                      <span className="text-xs bg-green-100 px-2 py-1 rounded">GRATIS</span>
                    </span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                    <span className="font-heading text-xl font-bold text-gray-800">
                      Total
                    </span>
                    <span className="font-heading text-3xl font-bold text-pink-600">
                      ${total.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full mb-3"
                >
                  Proceder al Pago
                </button>

                <button
                  onClick={toggleCart}
                  className="w-full text-center text-gray-600 font-body text-sm hover:text-pink-500 transition-colors"
                >
                  Continuar comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
