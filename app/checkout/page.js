'use client'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { FaShieldAlt, FaCheckCircle, FaArrowLeft, FaTimesCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function CheckoutPage() {
  const { cart, getSubtotal, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [paymentFailed, setPaymentFailed] = useState(false)
  const [buttonReady, setButtonReady] = useState(false)
  const [buttonError, setButtonError] = useState(null)

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Validar formulario
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    const isValid = formData.name &&
                   formData.email &&
                   formData.phone &&
                   formData.address &&
                   formData.city
    setFormValid(isValid)
  }, [formData])

  // Inicializar Payphone cuando el formulario es válido
  useEffect(() => {
    if (!formValid || typeof window === 'undefined') {
      return
    }

    // Generar ID único para el pedido
    const orderId = `BB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Guardar información del pedido
    localStorage.setItem('pendingOrder', JSON.stringify({
      orderId: orderId,
      ...formData,
      amount: total,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    }))

    // Función para confirmar el pago
    const verificarPagoEnBackend = async (id, clientTxId) => {
      try {
        console.log('🔍 Verificando pago en backend...', { id, clientTxId })

        const response = await fetch('/api/payphone/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id, clientTxId: clientTxId })
        })

        const data = await response.json()
        console.log('📥 Respuesta del backend:', data)

        if (data.success && data.status === 3) {
          // Pago aprobado
          console.log('✅ Pago aprobado!')
          setOrderComplete(true)
          clearCart()
          localStorage.removeItem('pendingOrder')
        } else {
          // Pago no aprobado
          console.log('❌ Pago no aprobado:', data.statusMessage)
          setPaymentFailed(true)
        }
      } catch (error) {
        console.error('❌ Error al verificar pago:', error)
        setPaymentFailed(true)
      } finally {
        setIsProcessing(false)
      }
    }

    // Función para inicializar el botón de Payphone
    const initPayphoneButton = async () => {
      try {
        console.log('🚀 Iniciando preparación de transacción...')
        setButtonReady(false)
        setButtonError(null)

        // Paso 1: Preparar la transacción en el backend
        const prepareResponse = await fetch('/api/payphone/prepare', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: total,
            clientTransactionId: orderId,
            email: formData.email,
            phone: formData.phone
          })
        })

        if (!prepareResponse.ok) {
          throw new Error('Error al preparar la transacción')
        }

        const prepareData = await prepareResponse.json()
        console.log('✅ Transacción preparada:', prepareData)

        if (!prepareData.success || !prepareData.transactionId) {
          throw new Error('No se recibió el ID de transacción')
        }

        const transactionId = prepareData.transactionId

        // Verificar que el SDK esté disponible
        if (!window.payphone) {
          throw new Error('SDK de Payphone no está disponible')
        }

        // Limpiar el contenedor
        const container = document.getElementById('pp-button')
        if (container) {
          container.innerHTML = ''
        }

        console.log('🎨 Renderizando botón de Payphone...')

        // Paso 2: Configurar y renderizar el botón de Payphone
        // IMPORTANTE: NO usar token aquí - el transactionId ya está autenticado por el backend
        window.payphone.Button({
          btnHorizontal: true,
          btnCard: true,
          createOrder: function(actions) {
            console.log('📝 createOrder llamado, usando transactionId:', transactionId)
            // El transactionId ya viene autenticado del backend
            return actions.prepare({
              transactionId: transactionId
            })
          },
          onComplete: function(model) {
            console.log('✅ onComplete llamado:', model)
            setIsProcessing(true)
            // Verificar el pago en el backend (NUNCA confiar solo en el frontend)
            verificarPagoEnBackend(model.id, model.clientTxId)
          },
          onError: function(error) {
            console.error('❌ Error en Payphone:', error)
            setPaymentFailed(true)
          }
        }).render('#pp-button')

        console.log('✅ Botón renderizado exitosamente')
        setButtonReady(true)

      } catch (error) {
        console.error('❌ Error al inicializar botón:', error)
        setButtonError(error.message)
      }
    }

    // Esperar a que el SDK de Payphone esté disponible
    const checkPayphone = () => {
      if (window.payphone) {
        console.log('✅ SDK de Payphone disponible')
        initPayphoneButton()
      } else {
        console.log('⏳ Esperando SDK de Payphone...')
      }
    }

    if (window.payphone) {
      checkPayphone()
    } else {
      const interval = setInterval(() => {
        if (window.payphone) {
          clearInterval(interval)
          checkPayphone()
        }
      }, 200)

      const timeout = setTimeout(() => {
        clearInterval(interval)
        if (!window.payphone) {
          setButtonError('El SDK de Payphone no se pudo cargar. Por favor recarga la página.')
        }
      }, 10000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [formValid, formData, total, cart, clearCart])

  const handleSubmit = (e) => {
    e.preventDefault()
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
                </p>
              </div>

              {!formValid && (
                <div className="mt-6 bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-800 font-body">
                    ℹ️ Completa todos los campos obligatorios (*) para continuar con el pago
                  </p>
                </div>
              )}

              {formValid && !buttonReady && !buttonError && (
                <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200 flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <p className="text-sm text-blue-800 font-body">
                    Preparando métodos de pago...
                  </p>
                </div>
              )}

              {buttonError && (
                <div className="mt-6 bg-red-50 rounded-xl p-4 border border-red-200">
                  <p className="text-sm text-red-800 font-body font-semibold mb-2">
                    ❌ Error al cargar el botón de pago
                  </p>
                  <p className="text-xs text-red-700 font-body mb-3">
                    {buttonError}
                  </p>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="text-xs bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Recargar página
                  </button>
                </div>
              )}

              {/* Contenedor del botón de Payphone */}
              {formValid && (
                <div className="mt-6">
                  <div id="pp-button"></div>
                </div>
              )}

              {isProcessing && (
                <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200 flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <p className="text-sm text-blue-800 font-body">
                    Verificando tu pago...
                  </p>
                </div>
              )}
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
