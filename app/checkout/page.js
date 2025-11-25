'use client'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaShieldAlt, FaCheckCircle, FaArrowLeft, FaTimesCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function CheckoutPage() {
  const { cart, getSubtotal, clearCart } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [paymentFailed, setPaymentFailed] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Quito',
    notes: ''
  })

  const subtotal = getSubtotal()
  const shipping = 0
  const total = subtotal + shipping

  // Verificar respuesta de Payphone al regresar
  useEffect(() => {
    const clientTransactionId = searchParams.get('clientTransactionId')
    const id = searchParams.get('id') // Transaction ID de Payphone

    if (clientTransactionId && id) {
      // El usuario regresó de Payphone - confirmar el estado
      const confirmTransaction = async () => {
        try {
          setIsProcessing(true)

          // Llamar al endpoint de confirmación
          const response = await fetch('/api/payphone/confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: id,
              clientTxId: clientTransactionId
            })
          })

          const result = await response.json()

          if (result.success && result.status === 3) {
            // Pago aprobado
            setOrderComplete(true)
            clearCart()
            localStorage.removeItem('pendingOrder')
          } else {
            // Pago no aprobado (cancelado, rechazado, etc.)
            setPaymentFailed(true)
            console.error('Pago no aprobado:', result)
          }

          // Limpiar los parámetros de la URL
          router.replace('/checkout', { scroll: false })

        } catch (error) {
          console.error('Error al confirmar transacción:', error)
          setPaymentFailed(true)
        } finally {
          setIsProcessing(false)
        }
      }

      confirmTransaction()
    }
  }, [searchParams, clearCart, router])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Validar formulario y mostrar botón de pago
  const [formValid, setFormValid] = useState(false)
  const [orderId, setOrderId] = useState('')

  // Validar formulario
  useEffect(() => {
    const isValid = formData.name &&
                   formData.email &&
                   formData.phone &&
                   formData.address &&
                   formData.city
    setFormValid(isValid)
  }, [formData])

  // Inicializar Payphone SDK cuando el formulario es válido
  useEffect(() => {
    if (!formValid || typeof window === 'undefined') return

    // Generar ID único para el pedido
    const newOrderId = `BB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setOrderId(newOrderId)

    // Convertir el total a centavos
    const amountInCents = Math.round(parseFloat(total) * 100)

    // Guardar información del pedido antes de iniciar el pago
    localStorage.setItem('pendingOrder', JSON.stringify({
      orderId: newOrderId,
      ...formData,
      amount: total,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    }))

    // Esperar a que el SDK esté disponible
    const initPayphone = () => {
      if (window.PPaymentButtonBox) {
        try {
          // Limpiar el contenedor antes de renderizar
          const container = document.getElementById('pp-button')
          if (container) {
            container.innerHTML = ''
          }

          // Configurar Payphone SDK
          const ppb = new window.PPaymentButtonBox({
            token: process.env.NEXT_PUBLIC_PAYPHONE_TOKEN,
            clientTransactionId: newOrderId,
            amount: amountInCents,
            amountWithoutTax: 0,
            amountWithTax: amountInCents,
            tax: 0,
            service: 0,
            tip: 0,
            currency: "USD",
            storeId: process.env.NEXT_PUBLIC_PAYPHONE_STORE_ID,
            reference: `Pedido BebéSeguro ${newOrderId}`,
            lang: "es",
            defaultMethod: "card",
            phoneNumber: formData.phone,
            email: formData.email
          })

          ppb.render('pp-button')
        } catch (error) {
          console.error('Error al inicializar Payphone:', error)
        }
      }
    }

    // Verificar si el SDK ya está cargado
    if (window.PPaymentButtonBox) {
      initPayphone()
    } else {
      // Si no está cargado, esperar al evento DOMContentLoaded
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', initPayphone)
        return () => window.removeEventListener('DOMContentLoaded', initPayphone)
      } else {
        // Si el DOM ya está listo, esperar un poco más
        const checkInterval = setInterval(() => {
          if (window.PPaymentButtonBox) {
            clearInterval(checkInterval)
            initPayphone()
          }
        }, 100)

        // Timeout después de 5 segundos
        setTimeout(() => clearInterval(checkInterval), 5000)

        return () => clearInterval(checkInterval)
      }
    }
  }, [formValid, formData, total, cart])

  const handleSubmit = (e) => {
    e.preventDefault()
    // La validación ya se hace automáticamente con useEffect
    // El botón de Payphone aparecerá cuando el formulario sea válido
  }

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-baby-pink via-white to-baby-blue flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="font-heading text-3xl font-bold text-gray-800 mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-gray-600 font-body mb-8">
            Agrega productos antes de proceder al checkout
          </p>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            Ir a Comprar
          </button>
        </div>
      </div>
    )
  }

  if (paymentFailed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-baby-pink via-white to-baby-blue flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaTimesCircle className="text-5xl text-red-500" />
          </motion.div>

          <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
            Pago no completado
          </h1>

          <p className="text-xl text-gray-600 font-body mb-6">
            Tu pago no pudo ser procesado o fue cancelado
          </p>

          <div className="bg-red-50 rounded-2xl p-6 mb-8">
            <p className="text-gray-700 font-body mb-2">
              No se ha realizado ningún cargo a tu tarjeta.
            </p>
            <p className="text-red-600 font-semibold">
              Puedes intentar nuevamente cuando estés listo.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setPaymentFailed(false)
                router.push('/checkout')
              }}
              className="btn-primary"
            >
              Intentar de Nuevo
            </button>

            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-body font-semibold rounded-xl hover:bg-gray-300 transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-baby-pink via-white to-baby-blue flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaCheckCircle className="text-5xl text-green-500" />
          </motion.div>

          <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
            ¡Pedido Recibido! 🎉
          </h1>

          <p className="text-xl text-gray-600 font-body mb-6">
            Gracias por confiar en BebéSeguro para proteger a tu pequeño
          </p>

          <div className="bg-pink-50 rounded-2xl p-6 mb-8">
            <p className="text-gray-700 font-body mb-2">
              Hemos recibido tu pedido y te contactaremos pronto para coordinar la entrega.
            </p>
            <p className="text-pink-600 font-semibold">
              📧 Revisa tu email para más detalles
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-accent font-bold text-lg text-gray-800 mb-4">
              Resumen de tu compra
            </h3>
            <div className="text-left space-y-2 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Total pagado:</span>
                <span className="font-bold text-pink-600 text-2xl">
                  ${total.toFixed(2)} USD
                </span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Envío a Quito:</span>
                <span className="font-semibold">GRATIS ✓</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            Volver al Inicio
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Serás redirigido automáticamente en 5 segundos...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-baby-pink via-white to-baby-blue py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-pink-500 font-body mb-4 transition-colors"
          >
            <FaArrowLeft />
            <span>Volver a la tienda</span>
          </button>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Finalizar Compra
          </h1>
          <p className="text-gray-600 font-body">
            Estás a un paso de proteger a tu bebé 💙
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaShieldAlt className="text-pink-500" />
                Información de Entrega
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-body font-semibold mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                    placeholder="María González"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-body font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-body font-semibold mb-2">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                      placeholder="+593 99 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-body font-semibold mb-2">
                    Dirección Completa *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                    placeholder="Calle, número, sector"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-body font-semibold mb-2">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors bg-green-50"
                    placeholder="Quito"
                  />
                  <p className="text-xs text-green-600 mt-1">
                    ✓ Envío gratis incluido en Quito
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-body font-semibold mb-2">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors resize-none"
                    placeholder="Ej: Entregar en la tarde, referencias del lugar, etc."
                  />
                </div>
              </div>

              <div className="mt-8 bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-blue-800 font-body">
                  <strong>Nota:</strong> Completa el formulario para proceder al pago.
                  El pago se procesa de forma segura con Payphone.
                  Luego de completar el pago, nos pondremos en contacto contigo para coordinar la entrega.
                </p>
              </div>

              {!formValid && (
                <div className="mt-6 bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-800 font-body">
                    ℹ️ Completa todos los campos obligatorios (*) para continuar con el pago
                  </p>
                </div>
              )}

              {/* Contenedor del botón de Payphone */}
              <div className="mt-6">
                <div id="pp-button"></div>
              </div>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">
              <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
                    <div className="flex-1">
                      <h3 className="font-body font-bold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-pink-600">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 font-body">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600 font-body">
                  <span>Envío</span>
                  <span className="font-semibold">GRATIS</span>
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

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <FaCheckCircle />
                  <span className="font-bold text-sm">Garantías incluidas:</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ Envío gratis en Quito</li>
                  <li>✓ Garantía de 30 días</li>
                  <li>✓ Devolución sin costo</li>
                  <li>✓ Soporte 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
