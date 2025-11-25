# Pruebas de Integración con Payphone

## 📋 Información de Credenciales

- **Token**: `KkWU7c6r5cjRtRDUBuUTF2-0es26uklh8bGsVKnupSIl6yKeNb5qiEV3mOxAcaDyvSDTKKSeeSPvLAW0exLmzQE1rZRU5OUbg5EFCvatIndlzEE4JfguLwiGCwejbsGIof1ugt2vp1jYgL7SY0U8cyuWx2pko879YyF6pF-gprWQ2Fr07lDZmUQ9HFo8AVtUZwMNKYWngnhKFhqJ8zTb88ibkQo81xUkz0ChJOZ7kwnpUvTa2AyJCx9luWZLSkxjl--fHPqTY0gjsL9aUedRiQMeMe2omRkanwTX0OV3tK94XMMvCw5HBejNodQzhD86aVHk5A`
- **Store ID**: `ac6fce98-3294-45bd-8f16-c1e64d5bb492`
- **API Base URL**: `https://pay.payphonetodoesposible.com`

---

## 🧪 1. Prueba Directa con API de Payphone (curl)

### Crear un link de pago

```bash
curl -X POST https://pay.payphonetodoesposible.com/api/button/Prepare \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer KkWU7c6r5cjRtRDUBuUTF2-0es26uklh8bGsVKnupSIl6yKeNb5qiEV3mOxAcaDyvSDTKKSeeSPvLAW0exLmzQE1rZRU5OUbg5EFCvatIndlzEE4JfguLwiGCwejbsGIof1ugt2vp1jYgL7SY0U8cyuWx2pko879YyF6pF-gprWQ2Fr07lDZmUQ9HFo8AVtUZwMNKYWngnhKFhqJ8zTb88ibkQo81xUkz0ChJOZ7kwnpUvTa2AyJCx9luWZLSkxjl--fHPqTY0gjsL9aUedRiQMeMe2omRkanwTX0OV3tK94XMMvCw5HBejNodQzhD86aVHk5A" \
  -d '{
    "amount": 45.99,
    "amountWithoutTax": 45.99,
    "amountWithTax": 0,
    "currency": "USD",
    "service": 0,
    "tip": 0,
    "reference": "BB-TEST-001",
    "clientTransactionId": "BB-TEST-001",
    "email": "test@example.com",
    "phoneNumber": "+593991234567",
    "responseUrl": "https://tienda-bb-seguro.netlify.app/checkout",
    "cancellationUrl": "https://tienda-bb-seguro.netlify.app/checkout",
    "storeId": "ac6fce98-3294-45bd-8f16-c1e64d5bb492"
  }'
```

### Verificar estado de transacción

```bash
curl -X POST https://pay.payphonetodoesposible.com/api/Sale/Confirm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer KkWU7c6r5cjRtRDUBuUTF2-0es26uklh8bGsVKnupSIl6yKeNb5qiEV3mOxAcaDyvSDTKKSeeSPvLAW0exLmzQE1rZRU5OUbg5EFCvatIndlzEE4JfguLwiGCwejbsGIof1ugt2vp1jYgL7SY0U8cyuWx2pko879YyF6pF-gprWQ2Fr07lDZmUQ9HFo8AVtUZwMNKYWngnhKFhqJ8zTb88ibkQo81xUkz0ChJOZ7kwnpUvTa2AyJCx9luWZLSkxjl--fHPqTY0gjsL9aUedRiQMeMe2omRkanwTX0OV3tK94XMMvCw5HBejNodQzhD86aVHk5A" \
  -d '{
    "id": "TRANSACTION_ID_AQUI",
    "storeId": "ac6fce98-3294-45bd-8f16-c1e64d5bb492"
  }'
```

---

## 🚀 2. Prueba con tu API Local de Next.js

Primero, inicia tu servidor de desarrollo:

```bash
npm run dev
```

Luego ejecuta esta prueba:

```bash
curl -X POST http://localhost:3000/api/payphone/create \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 45.99,
    "orderId": "BB-TEST-001",
    "clientName": "María González",
    "clientEmail": "maria@example.com",
    "clientPhone": "+593991234567",
    "address": "Av. Amazonas y Naciones Unidas",
    "city": "Quito",
    "items": [
      {
        "name": "Casco para Bebé Clásico",
        "quantity": 1,
        "price": "45.99"
      }
    ]
  }'
```

---

## 📊 Respuestas Esperadas

### ✅ Respuesta Exitosa (Crear Pago)

```json
{
  "success": true,
  "paymentUrl": "https://pay.payphonetodoesposible.com/Payment/Create?id=XXXXXXXXX",
  "transactionId": "XXXXXXXXX",
  "message": "Link de pago generado exitosamente"
}
```

### ❌ Respuesta de Error

```json
{
  "success": false,
  "error": "Error al crear el pago con Payphone",
  "message": "No se pudo generar el link de pago. Por favor, intenta nuevamente."
}
```

### ✅ Respuesta de Verificación (Estado de Transacción)

```json
{
  "success": true,
  "status": "Approved",
  "statusCode": 3,
  "transactionId": "XXXXXXXXX",
  "clientTransactionId": "BB-TEST-001",
  "amount": 45.99,
  "message": "Transacción aprobada"
}
```

---

## 🎯 Pasos para Probar con Postman

1. Importa la colección `Payphone_Collection.postman.json`
2. Las credenciales ya están configuradas
3. Ejecuta la petición "1. Create Payment Link"
4. Copia el `transactionId` de la respuesta
5. Pégalo en la petición "2. Verify Transaction"
6. Ejecuta la verificación

---

## 🔍 Códigos de Estado de Payphone

- `1` - Pending (Pendiente)
- `2` - Cancelled (Cancelado)
- `3` - Approved (Aprobado)
- `4` - Rejected (Rechazado)

---

## ⚠️ Notas Importantes

1. **Modo de Prueba**: Asegúrate de estar usando credenciales de prueba
2. **Montos**: En producción, valida que los montos sean correctos
3. **IDs únicos**: Cada `orderId` debe ser único
4. **Timeout**: Las transacciones pueden tomar hasta 30 segundos
5. **Webhooks**: Para producción, considera implementar webhooks para confirmación automática

---

## 🐛 Troubleshooting

### Error 401 Unauthorized
- Verifica que el token esté correcto en `.env.local`
- Asegúrate de que el token no haya expirado

### Error 400 Bad Request
- Revisa que el `storeId` sea correcto
- Verifica que todos los campos requeridos estén presentes

### Error 500 Internal Server Error
- Revisa los logs del servidor de Next.js
- Verifica que las variables de entorno estén cargadas

### No se genera el link de pago
- Asegúrate de que el servidor de desarrollo esté corriendo
- Verifica que los módulos estén instalados: `npm install`
