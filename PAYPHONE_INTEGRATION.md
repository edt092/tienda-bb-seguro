# 💳 Integración PayPhone - Flujo Completo

## 📋 Resumen

Esta documentación explica el flujo completo de integración de PayPhone usando **Button/Prepare API** para checkout web.

### ✅ Lo que tienes implementado:
- **API**: `/api/button/Prepare` (correcto para checkout web)
- **Flujo**: Cliente paga con tarjeta en navegador web
- **URLs**: PayPhone devuelve URLs web para completar el pago

### ❌ Lo que NO estás usando:
- **API Sale** (`/api/Sale`): Esta API solo envía notificaciones push al móvil del cliente y NO devuelve URLs web. No es apropiada para checkout web sin app móvil.

---

## 🔄 Flujo Completo del Pago

```
┌─────────────┐
│   Cliente   │
│  (Frontend) │
└──────┬──────┘
       │ 1. Click "Confirmar Pedido"
       │    (con datos del formulario)
       ▼
┌──────────────────────┐
│  Next.js Frontend    │
│  (checkout/page.js)  │
└──────┬───────────────┘
       │ 2. POST /api/payphone/create
       │    {amount, orderId, email, phone, ...}
       ▼
┌────────────────────────────┐
│   Next.js API Route        │
│   /api/payphone/create     │
│   (route.js)               │
└──────┬─────────────────────┘
       │ 3. Validación de datos
       │    ✓ Email válido
       │    ✓ Monto > 0
       │    ✓ Campos obligatorios
       ▼
┌────────────────────────────┐
│  PayPhone Service          │
│  (payphoneService.js)      │
└──────┬─────────────────────┘
       │ 4. POST a PayPhone API
       │    https://pay.payphonetodoesposible.com/api/button/Prepare
       │    Headers:
       │      - Authorization: Bearer TOKEN
       │      - Content-Type: application/json
       │    Body:
       │      - amount (en centavos)
       │      - storeId
       │      - clientTransactionId
       │      - email, phone, etc.
       ▼
┌────────────────────────────┐
│   PayPhone API             │
│   (Externa)                │
└──────┬─────────────────────┘
       │ 5. Respuesta de PayPhone
       │    {
       │      paymentId: "12345",
       │      payWithCard: "https://...",
       │      payWithPayPhone: "https://..."
       │    }
       ▼
┌────────────────────────────┐
│  Next.js API Route         │
│  (route.js)                │
└──────┬─────────────────────┘
       │ 6. Retorna URL al frontend
       │    {
       │      success: true,
       │      paymentUrl: "https://...",
       │      paymentId: "12345"
       │    }
       ▼
┌──────────────────────┐
│  Next.js Frontend    │
│  (checkout/page.js)  │
└──────┬───────────────┘
       │ 7. Guarda datos en localStorage
       │    y redirige al cliente
       │
       │    window.location.href = paymentUrl
       ▼
┌────────────────────────────┐
│   PayPhone Checkout        │
│   (Página externa)         │
│   Cliente paga con tarjeta │
└──────┬─────────────────────┘
       │ 8. Cliente completa pago
       │
       │ 9. PayPhone redirige de vuelta
       │    URL: /checkout?id=XXX&clientTransactionId=YYY
       ▼
┌──────────────────────┐
│  Next.js Frontend    │
│  (checkout/page.js)  │
│  - Detecta parámetros│
│  - Muestra confirmación│
│  - Limpia carrito    │
└──────────────────────┘
```

---

## 📁 Estructura de Archivos

```
casco-para-bb/
├── .env.local                          # Variables de entorno (CREDENCIALES)
├── services/
│   └── payphoneService.js             # Servicio que llama a PayPhone API
├── app/
│   ├── checkout/
│   │   └── page.js                    # Página de checkout (Frontend)
│   └── api/
│       └── payphone/
│           └── create/
│               └── route.js           # API Route (Backend)
└── PAYPHONE_INTEGRATION.md            # Esta documentación
```

---

## 🔑 Variables de Entorno

**Archivo: `.env.local`**

```env
# Token de autenticación de PayPhone
PAYPHONE_TOKEN=tu_token_aqui

# ID de tu tienda en PayPhone
PAYPHONE_STORE_ID=tu_store_id_aqui

# URL donde PayPhone redirigirá después del pago
NEXT_PUBLIC_PAYPHONE_RESPONSE_URL=https://tu-sitio.com/checkout
```

### ¿Cómo obtener las credenciales?

1. **Regístrate en PayPhone Developer**: https://developer.payphone.app
2. **Crea una aplicación** tipo "API Web Services / Button"
3. **Copia las credenciales**:
   - Token (Bearer token)
   - Store ID

---

## 💻 Código del Frontend

**Archivo: `app/checkout/page.js`**

El formulario de checkout ya está implementado. Cuando el usuario hace clic en "Confirmar Pedido":

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsProcessing(true)

  // 1. Generar ID único para el pedido
  const orderId = `BB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  // 2. Preparar datos del pedido
  const orderData = {
    amount: total,
    orderId: orderId,
    clientName: formData.name,
    clientEmail: formData.email,
    clientPhone: formData.phone,
    address: formData.address,
    city: formData.city,
    items: cart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }))
  }

  // 3. Llamar a tu API backend
  const response = await fetch('/api/payphone/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })

  const result = await response.json()

  // 4. Si todo está bien, redirigir a PayPhone
  if (result.success && result.paymentUrl) {
    // Guardar información antes de redirigir
    localStorage.setItem('pendingOrder', JSON.stringify({
      orderId: orderId,
      paymentId: result.paymentId,
      ...orderData
    }))

    // Redirigir a PayPhone para completar el pago
    window.location.href = result.paymentUrl
  } else {
    alert(result.message || 'Error al generar el pago')
    setIsProcessing(false)
  }
}
```

---

## 🖥️ Código del Backend (API Route)

**Archivo: `app/api/payphone/create/route.js`**

Ya implementado. Valida datos y llama al servicio de PayPhone.

```javascript
export async function POST(request) {
  const body = await request.json()

  // Validaciones
  if (!amount || !orderId || !clientEmail || ...) {
    return NextResponse.json({ error: 'Datos faltantes' }, { status: 400 })
  }

  // Crear pago con PayPhone
  const result = await createPayphonePayment({ ... })

  return NextResponse.json(result)
}
```

---

## 🔧 Código del Servicio PayPhone

**Archivo: `services/payphoneService.js`**

Ya implementado. Este servicio:
- Convierte montos de USD a centavos (ej: $45.99 → 4599)
- Llama a `/api/button/Prepare` de PayPhone
- Retorna las URLs de pago

### Ejemplo de Request a PayPhone:

```javascript
POST https://pay.payphonetodoesposible.com/api/button/Prepare
Headers:
  Authorization: Bearer TU_TOKEN
  Content-Type: application/json

Body:
{
  "amount": 4599,              // $45.99 en centavos
  "amountWithoutTax": 4599,
  "amountWithTax": 0,
  "tax": 0,
  "currency": "USD",
  "storeId": "tu-store-id",
  "clientTransactionId": "BB-12345",
  "reference": "BB-12345",
  "email": "cliente@example.com",
  "phoneNumber": "+593991234567",
  "responseUrl": "https://tu-sitio.com/checkout"
}
```

### Ejemplo de Response de PayPhone:

```json
{
  "paymentId": "789456123",
  "payWithCard": "https://pay.payphonetodoesposible.com/Payment/Card?id=789456123",
  "payWithPayPhone": "https://pay.payphonetodoesposible.com/Payment/PayPhone?id=789456123"
}
```

---

## 🧪 Cómo Probar

### 1. **Desarrollo Local**

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ir a http://localhost:3000/checkout
```

### 2. **Prueba Manual en el Navegador**

1. Abre el checkout
2. Llena el formulario
3. Haz clic en "Confirmar Pedido"
4. Deberías ser redirigido a PayPhone
5. Completa el pago (usa tarjeta de prueba si estás en modo sandbox)
6. Serás redirigido de vuelta a `/checkout` con confirmación

### 3. **Prueba con cURL**

```bash
curl -X POST http://localhost:3000/api/payphone/create \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 45.99,
    "orderId": "TEST-001",
    "clientName": "Juan Pérez",
    "clientEmail": "juan@example.com",
    "clientPhone": "+593991234567",
    "address": "Av. Test 123",
    "city": "Quito",
    "items": [{"name": "Producto", "quantity": 1, "price": "45.99"}]
  }'
```

**Respuesta esperada:**

```json
{
  "success": true,
  "paymentUrl": "https://pay.payphonetodoesposible.com/Payment/Card?id=XXXXX",
  "paymentId": "XXXXX",
  "message": "Link de pago generado exitosamente"
}
```

### 4. **Prueba con Postman**

Importa el archivo `Payphone_Collection.postman.json` y ejecuta las peticiones de prueba.

---

## ⚠️ Consideraciones Importantes

### 1. **Formato del Teléfono**

El teléfono debe tener formato internacional:
- ✅ Correcto: `+593991234567`
- ❌ Incorrecto: `0991234567`

### 2. **Montos en Centavos**

PayPhone requiere montos en centavos (enteros):
- $1.00 = 100 centavos
- $45.99 = 4599 centavos
- $0.50 = 50 centavos

El servicio hace la conversión automáticamente.

### 3. **IDs Únicos**

Cada pedido debe tener un `clientTransactionId` único. El código actual genera:
```javascript
`BB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
// Ejemplo: "BB-1701234567890-x7k2m9p"
```

### 4. **Impuestos (IVA)**

Si tus productos incluyen IVA (15% en Ecuador), ajusta en `payphoneService.js`:

```javascript
const taxRate = 0.15 // 15% IVA
const tax = Math.round(amountInCents * taxRate)
const amountWithoutTax = amountInCents - tax
const amountWithTax = amountInCents - tax
```

**Actualmente está configurado en 0 (sin IVA separado).**

### 5. **URLs de Respuesta**

PayPhone redirige al usuario a tu `responseUrl` con parámetros:
```
https://tu-sitio.com/checkout?id=XXXXX&clientTransactionId=BB-12345
```

El frontend detecta estos parámetros y muestra la confirmación.

### 6. **Webhook (Opcional)**

Para verificación server-to-server, PayPhone puede llamar a un webhook. Implementa:
- `POST /api/payphone/webhook` para recibir confirmaciones automáticas

---

## 🐛 Solución de Problemas

### Error: "Faltan credenciales de Payphone"

**Causa**: No están configuradas las variables de entorno.

**Solución**:
1. Verifica que existe `.env.local`
2. Verifica que tiene `PAYPHONE_TOKEN` y `PAYPHONE_STORE_ID`
3. Reinicia el servidor de desarrollo: `npm run dev`

---

### Error: "Error al crear el pago con Payphone"

**Causa**: Credenciales incorrectas o API no disponible.

**Solución**:
1. Verifica que el token sea válido
2. Verifica que el `PAYPHONE_STORE_ID` sea correcto
3. Revisa los logs del servidor para más detalles
4. Prueba las credenciales directamente con cURL:

```bash
curl -X POST https://pay.payphonetodoesposible.com/api/button/Prepare \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount":100,"currency":"USD","storeId":"TU_STORE_ID","clientTransactionId":"TEST-001"}'
```

---

### Error: "Respuesta inválida de Payphone"

**Causa**: PayPhone no devolvió `paymentId` o las URLs.

**Solución**:
1. Revisa los logs del servidor (`console.log` en `payphoneService.js`)
2. Verifica que el body de la petición tenga todos los campos requeridos
3. Asegúrate de estar usando el endpoint correcto: `/api/button/Prepare`

---

### El cliente no es redirigido de vuelta

**Causa**: `responseUrl` no está configurado correctamente.

**Solución**:
1. Verifica que `NEXT_PUBLIC_PAYPHONE_RESPONSE_URL` apunte a tu sitio
2. En desarrollo: `http://localhost:3000/checkout`
3. En producción: `https://tu-sitio.com/checkout`

---

## 📊 Estados de Transacción

Cuando consultes el estado de una transacción con `/api/Sale/Confirm`:

- **statusCode: 1** = Pendiente (el cliente aún no paga)
- **statusCode: 2** = Cancelado (el cliente canceló o expiró)
- **statusCode: 3** = Aprobado (pago exitoso) ✅
- **statusCode: 4** = Rechazado (pago falló)

---

## 🚀 Pasar a Producción

1. **Actualiza las variables de entorno** en tu hosting (Netlify, Vercel, etc.):
   ```env
   PAYPHONE_TOKEN=token_de_produccion
   PAYPHONE_STORE_ID=store_id_de_produccion
   NEXT_PUBLIC_PAYPHONE_RESPONSE_URL=https://tu-sitio.com/checkout
   ```

2. **Cambia a credenciales de producción** en PayPhone Developer

3. **Prueba el flujo completo** con una compra real pequeña

4. **Implementa webhook** (opcional pero recomendado) para confirmación automática

5. **Monitorea las transacciones** en el dashboard de PayPhone Business

---

## 📚 Recursos

- **Documentación PayPhone**: https://developer.payphone.app/docs
- **Dashboard PayPhone Developer**: https://developer.payphone.app
- **Dashboard PayPhone Business**: https://business.payphone.app
- **Soporte PayPhone**: soporte@payphone.app

---

## 🎯 Checklist de Implementación

- [x] Variables de entorno configuradas (`.env.local`)
- [x] Servicio PayPhone implementado (`payphoneService.js`)
- [x] API Route creada (`/api/payphone/create`)
- [x] Frontend de checkout implementado (`checkout/page.js`)
- [x] Manejo de errores implementado
- [x] Validaciones de datos agregadas
- [x] Logs para debugging agregados
- [ ] Webhook implementado (opcional)
- [ ] Pruebas en producción realizadas
- [ ] Monitoreo de transacciones configurado

---

## ✅ Resumen Final

Tu integración con PayPhone está **completa y funcional** usando:

- **Endpoint**: `/api/button/Prepare` (correcto para checkout web)
- **Flujo**: Cliente → Frontend → Backend → PayPhone → URL de pago → Cliente paga → Redirige de vuelta
- **Resultado**: El cliente puede pagar con tarjeta en el navegador web

**No necesitas API Sale** porque esa API es para notificaciones push móviles, no para checkout web.

---

¿Tienes dudas? Revisa los logs del servidor con `npm run dev` y verás mensajes detallados de cada paso del proceso.
