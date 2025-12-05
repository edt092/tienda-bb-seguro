import { NextResponse } from 'next/server'

/**
 * Endpoint para preparar una transacción con Payphone
 * Este endpoint debe llamarse ANTES de mostrar el botón de pago
 * Devuelve un transactionId que se usará en el frontend
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const { amount, clientTransactionId, email, phone, documentId } = body

    // Validar parámetros requeridos
    if (!amount || !clientTransactionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Faltan parámetros requeridos: amount y clientTransactionId'
        },
        { status: 400 }
      )
    }

    // IMPORTANTE: Usar variables del servidor (sin NEXT_PUBLIC_)
    // Las variables NEXT_PUBLIC_ son para el cliente, NO para el backend
    const token = process.env.PAYPHONE_TOKEN
    const storeId = process.env.PAYPHONE_STORE_ID

    if (!token || !storeId) {
      console.error('❌ Variables de entorno no configuradas:', {
        hasToken: !!token,
        hasStoreId: !!storeId
      })
      return NextResponse.json(
        {
          success: false,
          error: 'Credenciales de Payphone no configuradas en el servidor'
        },
        { status: 500 }
      )
    }

    // Convertir el monto de dólares a centavos (enteros)
    const amountInDollars = parseFloat(amount)
    const amountInCents = Math.round(amountInDollars * 100) // Ej: 19.49 -> 1949

    // Calcular valores sin y con impuestos (12% IVA) - en centavos
    const taxPercentage = 0.12
    const amountWithoutTaxInCents = Math.round(amountInCents / (1 + taxPercentage)) // 1949 / 1.12 = 1740
    const taxInCents = amountInCents - amountWithoutTaxInCents // 1949 - 1740 = 209

    console.log('🔍 Preparando transacción de Payphone:', {
      clientTransactionId,
      amountInDollars: amountInDollars,
      amountInCents: amountInCents,
      amountWithoutTaxInCents: amountWithoutTaxInCents,
      taxInCents: taxInCents
    })

    // Preparar los datos para Payphone - TODOS los montos deben ser enteros en centavos
    // Objeto base con campos obligatorios
    const payphoneData = {
      amount: amountInCents,                    // Total en centavos
      amountWithTax: taxInCents,                // Valor del impuesto en centavos
      amountWithoutTax: amountWithoutTaxInCents, // Monto sin impuestos en centavos
      tax: 12,                                   // Porcentaje de impuesto
      service: 0,
      tip: 0,
      currency: "USD",
      clientTransactionId: clientTransactionId,
      storeId: storeId,
      responseUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout?clientTransactionId=${clientTransactionId}`,
      cancellationUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout?cancelled=true`
    }

    // Agregar campos opcionales SOLO si tienen valores válidos (no vacíos)
    if (email && email.trim()) {
      payphoneData.email = email.trim()
    }
    if (documentId && documentId.trim()) {
      payphoneData.documentId = documentId.trim()
    }
    if (phone && phone.trim()) {
      payphoneData.phoneNumber = phone.trim()
    }

    console.log('📤 Enviando a Payphone:', payphoneData)

    // Llamar al endpoint de Payphone para crear la transacción
    const response = await fetch('https://pay.payphonetodoesposible.com/api/button/V2/Sale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payphoneData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error de Payphone:', errorText)

      return NextResponse.json(
        {
          success: false,
          error: 'Error al preparar la transacción con Payphone',
          details: errorText
        },
        { status: response.status }
      )
    }

    const result = await response.json()

    console.log('✅ Transacción preparada:', result)

    return NextResponse.json({
      success: true,
      transactionId: result.transactionId,
      payWithCard: result.payWithCard,
      clientTransactionId: clientTransactionId
    })

  } catch (error) {
    console.error('❌ Error al preparar transacción:', error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error interno al preparar la transacción'
      },
      { status: 500 }
    )
  }
}
