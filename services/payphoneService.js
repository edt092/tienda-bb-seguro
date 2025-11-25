/**
 * Servicio de integración con Payphone
 * Documentación: https://payphone.app/docs
 *
 * IMPORTANTE: Este servicio usa /api/button/Prepare que devuelve URLs web
 * para que el cliente pague con tarjeta en el navegador.
 *
 * Si necesitas usar /api/Sale (notificaciones push móvil), debes cambiar
 * completamente el flujo ya que ese endpoint NO devuelve URLs.
 */

/**
 * Crea un link de pago con Payphone usando Button/Prepare API
 * @param {Object} orderData - Datos del pedido
 * @param {number} orderData.amount - Monto total del pedido en USD (decimal)
 * @param {string} orderData.orderId - ID único del pedido
 * @param {string} orderData.clientName - Nombre del cliente
 * @param {string} orderData.clientEmail - Email del cliente
 * @param {string} orderData.clientPhone - Teléfono del cliente (ej: +593991234567)
 * @param {Array} orderData.items - Items del carrito
 * @param {string} orderData.address - Dirección de entrega
 * @param {string} orderData.city - Ciudad de entrega
 * @returns {Promise<Object>} - Objeto con la URL de pago o error
 */
export async function createPayphonePayment(orderData) {
  try {
    const token = process.env.PAYPHONE_TOKEN
    const storeId = process.env.PAYPHONE_STORE_ID
    const responseUrl = process.env.NEXT_PUBLIC_PAYPHONE_RESPONSE_URL

    if (!token || !storeId) {
      throw new Error('Faltan credenciales de Payphone en variables de entorno')
    }

    // Convertir el monto a centavos (entero)
    // Payphone requiere montos en centavos, NO decimales
    // Ejemplo: $45.99 -> 4599 centavos
    const amountInCents = Math.round(parseFloat(orderData.amount) * 100)

    // Calcular impuestos si es necesario (Ecuador: 15% IVA)
    // Si tus productos ya incluyen IVA, usa amountWithTax
    // Si tus productos no incluyen IVA, usa amountWithoutTax
    const taxRate = 0 // Cambiar a 0.15 si necesitas calcular IVA
    const tax = Math.round(amountInCents * taxRate)
    const amountWithoutTax = taxRate > 0 ? amountInCents - tax : 0
    const amountWithTax = taxRate > 0 ? amountInCents - tax : amountInCents

    // Preparar los datos para Payphone Button/Prepare API
    const paymentData = {
      // Montos en centavos (OBLIGATORIO)
      amount: amountInCents,
      amountWithoutTax: amountWithoutTax,
      amountWithTax: amountWithTax,
      tax: tax,
      service: 0,
      tip: 0,

      // Moneda (OBLIGATORIO)
      currency: 'USD',

      // IDs únicos (OBLIGATORIOS)
      reference: orderData.orderId,
      clientTransactionId: orderData.orderId,

      // Store ID (OBLIGATORIO)
      storeId: storeId,

      // Información del cliente (RECOMENDADO)
      email: orderData.clientEmail,
      phoneNumber: orderData.clientPhone,

      // URLs de respuesta (OPCIONAL pero recomendado)
      responseUrl: responseUrl,
      cancellationUrl: responseUrl
    }

    console.log('💳 Creando pago en Payphone:', {
      orderId: orderData.orderId,
      amount: `$${orderData.amount} USD (${amountInCents} centavos)`,
      email: orderData.clientEmail
    })

    // Llamar a la API de Payphone Button/Prepare
    const response = await fetch('https://pay.payphonetodoesposible.com/api/button/Prepare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(paymentData)
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('❌ Error de Payphone:', result)
      throw new Error(result.message || result.errorMessage || 'Error al crear el pago con Payphone')
    }

    // Payphone Button/Prepare devuelve:
    // - paymentId: ID único de la transacción
    // - payWithCard: URL para pagar con tarjeta (WEB)
    // - payWithPayPhone: URL para pagar con app PayPhone
    if (result.paymentId || result.transactionId) {
      const paymentId = result.paymentId || result.transactionId
      const paymentUrl = result.payWithCard || result.payWithPayPhone

      console.log('✅ Pago creado exitosamente:', {
        paymentId,
        hasCardUrl: !!result.payWithCard,
        hasPayPhoneUrl: !!result.payWithPayPhone
      })

      return {
        success: true,
        paymentUrl: paymentUrl, // URL principal para redirigir al cliente
        paymentId: paymentId,
        payWithCard: result.payWithCard, // URL específica para tarjeta
        payWithPayPhone: result.payWithPayPhone, // URL específica para app
        message: 'Link de pago generado exitosamente'
      }
    } else {
      console.error('❌ Respuesta inválida de Payphone:', result)
      throw new Error('Respuesta inválida de Payphone: no se recibió paymentId')
    }

  } catch (error) {
    console.error('❌ Error en createPayphonePayment:', error)
    return {
      success: false,
      error: error.message || 'Error al procesar el pago',
      message: 'No se pudo generar el link de pago. Por favor, intenta nuevamente.'
    }
  }
}

/**
 * Verifica el estado de una transacción de Payphone
 * @param {string} paymentId - ID del pago
 * @returns {Promise<Object>} - Estado de la transacción
 */
export async function verifyPayphoneTransaction(paymentId) {
  try {
    const token = process.env.PAYPHONE_TOKEN
    const storeId = process.env.PAYPHONE_STORE_ID

    if (!token || !storeId) {
      throw new Error('Faltan credenciales de Payphone')
    }

    const response = await fetch(`https://pay.payphonetodoesposible.com/api/Sale/Confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: paymentId,
        storeId: storeId
      })
    })

    if (!response.ok) {
      throw new Error('Error al verificar el estado de la transacción')
    }

    const result = await response.json()

    return {
      success: true,
      status: result.status,
      statusCode: result.statusCode,
      paymentId: result.transactionId,
      clientTransactionId: result.clientTransactionId,
      amount: result.amount,
      message: result.message
    }

  } catch (error) {
    console.error('Error en verifyPayphoneTransaction:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
