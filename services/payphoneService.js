/**
 * Servicio de integración con Payphone
 * Documentación: https://payphone.app/docs
 */

/**
 * Crea un link de pago con Payphone
 * @param {Object} orderData - Datos del pedido
 * @param {string} orderData.amount - Monto total del pedido
 * @param {string} orderData.orderId - ID único del pedido
 * @param {string} orderData.clientName - Nombre del cliente
 * @param {string} orderData.clientEmail - Email del cliente
 * @param {string} orderData.clientPhone - Teléfono del cliente
 * @param {Array} orderData.items - Items del carrito
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

    // Preparar los datos para Payphone
    const paymentData = {
      amount: parseFloat(orderData.amount).toFixed(2),
      amountWithoutTax: parseFloat(orderData.amount).toFixed(2),
      amountWithTax: 0,
      currency: 'USD',
      service: 0, // 0 para pago único
      tip: 0,
      reference: orderData.orderId,
      clientTransactionId: orderData.orderId,

      // Información del cliente
      email: orderData.clientEmail,
      phoneNumber: orderData.clientPhone,

      // URLs de respuesta
      responseUrl: responseUrl,
      cancellationUrl: responseUrl,

      // Opcional: detalles adicionales
      optional: {
        clientName: orderData.clientName,
        items: orderData.items,
        address: orderData.address,
        city: orderData.city
      }
    }

    // Llamar a la API de Payphone
    const response = await fetch('https://pay.payphonetodoesposible.com/api/button/Prepare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...paymentData,
        storeId: storeId
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear el pago con Payphone')
    }

    const result = await response.json()

    // Payphone retorna un objeto con la transactionId y payWithCard
    if (result.transactionId) {
      return {
        success: true,
        paymentUrl: `https://pay.payphonetodoesposible.com/Payment/Create?id=${result.transactionId}`,
        transactionId: result.transactionId,
        message: 'Link de pago generado exitosamente'
      }
    } else {
      throw new Error('Respuesta inválida de Payphone')
    }

  } catch (error) {
    console.error('Error en createPayphonePayment:', error)
    return {
      success: false,
      error: error.message || 'Error al procesar el pago',
      message: 'No se pudo generar el link de pago. Por favor, intenta nuevamente.'
    }
  }
}

/**
 * Verifica el estado de una transacción de Payphone
 * @param {string} transactionId - ID de la transacción
 * @returns {Promise<Object>} - Estado de la transacción
 */
export async function verifyPayphoneTransaction(transactionId) {
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
        id: transactionId,
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
      transactionId: result.transactionId,
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
