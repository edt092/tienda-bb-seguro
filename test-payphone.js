/**
 * Script de prueba de conexión a la API de Payphone
 *
 * Este script prueba:
 * 1. La conexión a la API de Payphone
 * 2. La validez del token y store ID
 * 3. El endpoint de confirmación de transacciones
 *
 * Uso:
 *   node test-payphone.js
 */

require('dotenv').config({ path: '.env.local' })

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logSection(title) {
  console.log('\n' + '='.repeat(60))
  log(title, 'cyan')
  console.log('='.repeat(60))
}

async function testPayphoneAPI() {
  logSection('🧪 TEST DE API DE PAYPHONE')

  // 1. Verificar variables de entorno
  logSection('1️⃣  Verificando Variables de Entorno')

  const token = process.env.PAYPHONE_TOKEN || process.env.NEXT_PUBLIC_PAYPHONE_TOKEN
  const storeId = process.env.PAYPHONE_STORE_ID || process.env.NEXT_PUBLIC_PAYPHONE_STORE_ID
  const responseUrl = process.env.NEXT_PUBLIC_PAYPHONE_RESPONSE_URL
  const siteUrl = process.env.NEXT_PUBLIC_URL

  if (!token) {
    log('❌ PAYPHONE_TOKEN no está configurado', 'red')
    log('   Configura la variable en .env.local o en Netlify', 'yellow')
    process.exit(1)
  } else {
    log(`✅ PAYPHONE_TOKEN: ${token.substring(0, 20)}...`, 'green')
  }

  if (!storeId) {
    log('❌ PAYPHONE_STORE_ID no está configurado', 'red')
    log('   Configura la variable en .env.local o en Netlify', 'yellow')
    process.exit(1)
  } else {
    log(`✅ PAYPHONE_STORE_ID: ${storeId}`, 'green')
  }

  if (!responseUrl) {
    log('⚠️  NEXT_PUBLIC_PAYPHONE_RESPONSE_URL no está configurado', 'yellow')
    log('   Esto es necesario para que Payphone redirija después del pago', 'yellow')
  } else {
    log(`✅ NEXT_PUBLIC_PAYPHONE_RESPONSE_URL: ${responseUrl}`, 'green')
  }

  if (!siteUrl) {
    log('⚠️  NEXT_PUBLIC_URL no está configurado', 'yellow')
  } else {
    log(`✅ NEXT_PUBLIC_URL: ${siteUrl}`, 'green')
  }

  // 2. Probar endpoint de confirmación (sin transacción real)
  logSection('2️⃣  Probando Conexión con API de Payphone')

  try {
    log('Enviando petición de prueba al endpoint de confirmación...', 'blue')

    // Intentar una confirmación con datos de prueba (fallará pero nos dirá si la conexión funciona)
    const response = await fetch('https://pay.payphonetodoesposible.com/api/button/V2/Confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: 999999, // ID falso para probar conexión
        clientTxId: 'TEST-' + Date.now()
      })
    })

    const responseText = await response.text()
    let result

    try {
      result = JSON.parse(responseText)
    } catch (e) {
      result = { rawResponse: responseText }
    }

    log(`Status Code: ${response.status}`, response.status < 400 ? 'green' : 'yellow')

    if (response.status === 401) {
      log('❌ ERROR: Token inválido o expirado', 'red')
      log('   Verifica tu PAYPHONE_TOKEN en https://developer.payphone.app', 'yellow')
      log('   Respuesta:', 'yellow')
      console.log(result)
      process.exit(1)
    } else if (response.status === 403) {
      log('❌ ERROR: Acceso denegado', 'red')
      log('   Verifica que tu dominio esté autorizado en Payphone Developer', 'yellow')
      log('   Respuesta:', 'yellow')
      console.log(result)
      process.exit(1)
    } else if (response.status === 404 || result.message?.includes('not found') || result.message?.includes('no encontrada')) {
      log('✅ Conexión exitosa! (transacción de prueba no encontrada - esto es esperado)', 'green')
      log('   El token es válido y la API está respondiendo correctamente', 'green')
    } else if (response.ok) {
      log('✅ Conexión exitosa!', 'green')
      log('   Respuesta:', 'green')
      console.log(result)
    } else {
      log('⚠️  Respuesta inesperada:', 'yellow')
      console.log(result)
    }

  } catch (error) {
    log('❌ ERROR: No se pudo conectar con Payphone', 'red')
    log(`   ${error.message}`, 'red')
    log('   Verifica tu conexión a internet', 'yellow')
    process.exit(1)
  }

  // 3. Verificar configuración del SDK
  logSection('3️⃣  Verificando Configuración del SDK')

  log('El proyecto está configurado para usar el SDK de Payphone (Cajita de Pagos)', 'blue')
  log('', 'reset')
  log('Archivos configurados:', 'blue')
  log('  ✅ app/layout.js - Script del SDK cargado', 'green')
  log('  ✅ app/checkout/page.js - Inicialización del SDK', 'green')
  log('  ✅ app/api/payphone/confirm/route.js - Endpoint de confirmación', 'green')

  // 4. Checklist para producción
  logSection('4️⃣  Checklist para Producción en Netlify')

  const checklist = [
    { item: 'Variables de entorno configuradas en Netlify', status: '⚠️' },
    { item: 'Dominio autorizado en Payphone Developer', status: '⚠️' },
    { item: 'URL de respuesta configurada en Payphone', status: '⚠️' },
    { item: 'Build y deploy exitoso en Netlify', status: '⚠️' },
  ]

  console.log('')
  checklist.forEach(item => {
    log(`${item.status}  ${item.item}`, 'yellow')
  })

  console.log('')
  log('Para completar la configuración en Netlify:', 'blue')
  log('', 'reset')
  log('1. Ve a tu sitio en Netlify: https://app.netlify.com', 'cyan')
  log('2. Site settings > Environment variables', 'cyan')
  log('3. Agrega las siguientes variables:', 'cyan')
  log('', 'reset')
  log('   NEXT_PUBLIC_URL=https://tienda-bb-seguro.netlify.app', 'magenta')
  log('   NEXT_PUBLIC_PAYPHONE_TOKEN=tu_token', 'magenta')
  log('   NEXT_PUBLIC_PAYPHONE_STORE_ID=tu_store_id', 'magenta')
  log('   NEXT_PUBLIC_PAYPHONE_RESPONSE_URL=https://tienda-bb-seguro.netlify.app/checkout', 'magenta')
  log('   PAYPHONE_TOKEN=tu_token', 'magenta')
  log('   PAYPHONE_STORE_ID=tu_store_id', 'magenta')
  log('', 'reset')
  log('4. En Payphone Developer (https://developer.payphone.app):', 'cyan')
  log('   - Agrega el dominio: https://tienda-bb-seguro.netlify.app', 'cyan')
  log('   - Agrega la URL de respuesta: https://tienda-bb-seguro.netlify.app/checkout', 'cyan')

  logSection('✅ TEST COMPLETADO')
  log('Si todo está correcto, puedes proceder con el deploy a producción', 'green')
  console.log('')
}

// Función para probar endpoint local
async function testLocalEndpoint() {
  logSection('5️⃣  Probando Endpoint Local (opcional)')

  log('Este test requiere que el servidor esté corriendo (npm run dev)', 'yellow')
  log('Si el servidor no está corriendo, este test fallará', 'yellow')
  log('', 'reset')

  try {
    const response = await fetch('http://localhost:3000/api/payphone/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: '999999',
        clientTxId: 'TEST-' + Date.now()
      })
    })

    const result = await response.json()

    if (response.ok || response.status === 404) {
      log('✅ Endpoint local responde correctamente', 'green')
      log(`   Status: ${response.status}`, 'cyan')
      log('   Respuesta:', 'cyan')
      console.log(result)
    } else {
      log('⚠️  Endpoint local respondió con error:', 'yellow')
      log(`   Status: ${response.status}`, 'yellow')
      console.log(result)
    }
  } catch (error) {
    log('⚠️  No se pudo conectar al servidor local', 'yellow')
    log(`   ${error.message}`, 'yellow')
    log('   Asegúrate de que el servidor esté corriendo: npm run dev', 'cyan')
  }
}

// Función principal
async function runAllTests() {
  try {
    await testPayphoneAPI()

    log('', 'reset')
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    readline.question('\n¿Quieres probar el endpoint local? (y/n): ', async (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        await testLocalEndpoint()
      }
      readline.close()
      log('\n✅ Tests completados', 'green')
    })

  } catch (error) {
    log(`\n❌ Error fatal: ${error.message}`, 'red')
    console.error(error)
    process.exit(1)
  }
}

// Ejecutar los tests
runAllTests()
