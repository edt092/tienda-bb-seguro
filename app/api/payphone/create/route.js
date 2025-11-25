import { NextResponse } from 'next/server'
import { createPayphonePayment } from '@/services/payphoneService'

/**
 * API Route: POST /api/payphone/create
 *
 * Crea un link de pago con Payphone para checkout web
 *
 * Body esperado:
 * {
 *   amount: number,          // Monto en USD (ej: 45.99)
 *   orderId: string,         // ID único del pedido
 *   clientName: string,      // Nombre del cliente
 *   clientEmail: string,     // Email del cliente
 *   clientPhone: string,     // Teléfono con formato +593XXXXXXXXX
 *   items: array,            // Items del carrito
 *   address: string,         // Dirección de entrega
 *   city: string             // Ciudad de entrega
 * }
 *
 * Respuesta exitosa:
 * {
 *   success: true,
 *   paymentUrl: string,      // URL para redirigir al cliente
 *   paymentId: string,       // ID de la transacción en Payphone
 *   message: string
 * }
 */
export async function POST(request) {
  try {
    const body = await request.json()

    console.log('📥 Solicitud de pago recibida:', {
      orderId: body.orderId,
      amount: body.amount,
      email: body.clientEmail
    })

    // Validar datos requeridos
    const { amount, orderId, clientName, clientEmail, clientPhone, items, address, city } = body

    // Validaciones
    if (!amount || !orderId || !clientName || !clientEmail || !clientPhone) {
      console.error('❌ Datos faltantes:', { amount, orderId, clientName, clientEmail, clientPhone })
      return NextResponse.json(
        {
          success: false,
          error: 'Faltan datos requeridos',
          message: 'Por favor completa todos los campos obligatorios'
        },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(clientEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email inválido',
          message: 'Por favor ingresa un email válido'
        },
        { status: 400 }
      )
    }

    // Validar monto positivo
    if (parseFloat(amount) <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Monto inválido',
          message: 'El monto debe ser mayor a 0'
        },
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
      console.log('✅ Pago creado exitosamente:', {
        orderId,
        paymentId: result.paymentId
      })
      return NextResponse.json(result, { status: 200 })
    } else {
      console.error('❌ Error al crear pago:', result.error)
      return NextResponse.json(result, { status: 500 })
    }

  } catch (error) {
    console.error('❌ Error en API de Payphone:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: 'Error al procesar la solicitud de pago. Por favor, intenta nuevamente.'
      },
      { status: 500 }
    )
  }
}
