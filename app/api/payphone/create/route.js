import { NextResponse } from 'next/server'
import { createPayphonePayment } from '@/services/payphoneService'

export async function POST(request) {
  try {
    const body = await request.json()

    // Validar datos requeridos
    const { amount, orderId, clientName, clientEmail, clientPhone, items, address, city } = body

    if (!amount || !orderId || !clientName || !clientEmail || !clientPhone) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    // Crear el pago con Payphone
    const result = await createPayphonePayment({
      amount,
      orderId,
      clientName,
      clientEmail,
      clientPhone,
      items: items || [],
      address: address || '',
      city: city || 'Quito'
    })

    if (result.success) {
      return NextResponse.json(result, { status: 200 })
    } else {
      return NextResponse.json(result, { status: 500 })
    }

  } catch (error) {
    console.error('Error en API de Payphone:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: 'Error al procesar la solicitud de pago'
      },
      { status: 500 }
    )
  }
}
