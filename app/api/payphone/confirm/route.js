import { NextResponse } from 'next/server'

/**
 * Endpoint para confirmar el estado de una transacción de Payphone
 * Llamar después de que el usuario regrese de completar el pago
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const { id, clientTxId } = body

    // Validar parámetros requeridos
    if (!id || !clientTxId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Faltan parámetros requeridos: id y clientTxId'
        },
        { status: 400 }
      )
    }

    const token = process.env.PAYPHONE_TOKEN || process.env.NEXT_PUBLIC_PAYPHONE_TOKEN

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Token de Payphone no configurado'
        },
        { status: 500 }
      )
    }

    console.log('🔍 Confirmando transacción de Payphone:', {
      id,
      clientTxId
    })

    // Llamar al endpoint de confirmación de Payphone
    const response = await fetch('https://pay.payphonetodoesposible.com/api/button/V2/Confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: parseInt(id),
        clientTxId: clientTxId
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error de Payphone:', errorText)

      return NextResponse.json(
        {
          success: false,
          error: 'Error al confirmar la transacción con Payphone',
          details: errorText
        },
        { status: response.status }
      )
    }

    const result = await response.json()

    console.log('✅ Respuesta de confirmación:', result)

    // Interpretar el estado de la transacción
    const statusMessages = {
      1: 'Pendiente',
      2: 'Cancelado',
      3: 'Aprobado',
      4: 'Rechazado'
    }

    const status = result.statusCode || result.status
    const statusMessage = statusMessages[status] || 'Desconocido'

    return NextResponse.json({
      success: status === 3, // Aprobado
      status: status,
      statusMessage: statusMessage,
      transactionId: result.transactionId,
      clientTransactionId: result.clientTransactionId,
      amount: result.amount,
      currency: result.currency,
      date: result.date,
      reference: result.reference,
      fullResponse: result
    })

  } catch (error) {
    console.error('❌ Error al confirmar transacción:', error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error interno al confirmar la transacción'
      },
      { status: 500 }
    )
  }
}
