# 📮 Configurar Postman para Payphone

Guía completa para configurar y usar Postman con la API de Payphone.

---

## 📥 Paso 1: Importar la Colección

### 1.1. Abrir Postman

Si no tienes Postman instalado:
- Descarga desde: https://www.postman.com/downloads/
- O usa la versión web: https://web.postman.com/

### 1.2. Importar el Archivo

1. Abre Postman
2. Haz clic en **"Import"** (esquina superior izquierda)
3. Arrastra el archivo `Payphone_API_Tests.postman_collection.json`
4. Haz clic en **"Import"**

Deberías ver una nueva colección: **"Payphone API - BebéSeguro"**

---

## 🔑 Paso 2: Configurar Variables de Entorno

### 2.1. Crear un Environment

1. Haz clic en **"Environments"** (ícono de ojo en la esquina superior derecha)
2. Haz clic en **"+"** o **"Create Environment"**
3. Nombre: `Payphone - BebéSeguro`

### 2.2. Agregar Variables

Agrega las siguientes variables:

| Variable | Type | Initial Value | Current Value |
|----------|------|---------------|---------------|
| `PAYPHONE_TOKEN` | secret | (vacío) | Tu token aquí |
| `transaction_id` | default | (vacío) | Se llena después |
| `client_transaction_id` | default | (vacío) | Se llena después |

**Ejemplo**:

```
Variable: PAYPHONE_TOKEN
Type: secret
Initial Value: (vacío)
Current Value: -wzCmLaTAQhR8AClFCm-xxxxxxxxxx
```

⚠️ **IMPORTANTE**:
- Usa `Type: secret` para el token (oculta el valor)
- NO pongas valores en "Initial Value" (se sincroniza con Git)
- Solo pon valores en "Current Value" (local en tu computadora)

### 2.3. Obtener tu Token de Payphone

1. Ve a: https://developer.payphone.app
2. Inicia sesión
3. Selecciona tu aplicación
4. Copia el **Token**
5. Pégalo en la variable `PAYPHONE_TOKEN` en Postman

### 2.4. Seleccionar el Environment

1. En la esquina superior derecha de Postman
2. Selecciona **"Payphone - BebéSeguro"** en el dropdown
3. Verifica que esté seleccionado (debe aparecer el nombre)

---

## 🧪 Paso 3: Probar la Conexión

### 3.1. Primera Prueba: Test de Conexión

1. En la colección, abre: **1. Test de Conexión**
2. Selecciona: **"Test: Confirmar transacción (ID falso)"**
3. Haz clic en **"Send"**

**Resultado esperado**:

```json
{
  "message": "Transaction not found"
}
```

o

```
Status: 404
```

✅ **Esto es CORRECTO**. Significa que:
- Tu token es válido
- La conexión con Payphone funciona
- El ID de transacción no existe (esperado)

❌ **Si obtienes**:

- **401 Unauthorized**: Token inválido o expirado
- **403 Forbidden**: Acceso denegado
- **500 Error**: Problema del servidor de Payphone

---

## 🔄 Paso 4: Probar con Transacción Real

Para probar con una transacción real, primero necesitas crear una.

### 4.1. Crear una Transacción de Prueba

1. Abre tu sitio: https://tienda-bb-seguro.netlify.app
2. Agrega un producto al carrito
3. Ve al checkout
4. Completa el formulario
5. Haz clic en el botón de Payphone
6. **NO completes el pago**, solo observa la URL

La URL se verá así:
```
https://pay.payphonetodoesposible.com/?id=123456&clientTransactionId=BB-1234567890-abc123
```

**Copia estos valores**:
- `id`: **123456** (ejemplo)
- `clientTransactionId`: **BB-1234567890-abc123** (ejemplo)

### 4.2. Actualizar Variables en Postman

1. Haz clic en **"Environments"** → **"Payphone - BebéSeguro"**
2. Edita las variables:

```
transaction_id: 123456
client_transaction_id: BB-1234567890-abc123
```

3. Guarda el environment

### 4.3. Probar Confirmación

1. En la colección, abre: **2. API de Payphone (Directa)**
2. Selecciona: **"Confirmar Transacción Real"**
3. Haz clic en **"Send"**

**Resultado esperado**:

```json
{
  "success": true,
  "status": 1,
  "statusMessage": "Pendiente",
  "transactionId": 123456,
  "clientTransactionId": "BB-1234567890-abc123",
  "amount": 1949,
  "currency": "USD"
}
```

---

## 🌐 Paso 5: Probar tu API

### 5.1. Probar en Local

**Pre-requisitos**:
- `npm run dev` debe estar corriendo
- `.env.local` configurado con tus credenciales

**Probar**:
1. En la colección: **3. API de Tu Aplicación**
2. Selecciona: **"Confirmar - Local"**
3. Haz clic en **"Send"**

**Resultado esperado**: Igual que el anterior pero con más campos.

### 5.2. Probar en Producción

**Pre-requisitos**:
- Sitio deployado en Netlify
- Variables de entorno configuradas en Netlify

**Probar**:
1. En la colección: **3. API de Tu Aplicación**
2. Selecciona: **"Confirmar - Producción"**
3. Haz clic en **"Send"**

---

## 📋 Estructura de la Colección

La colección tiene 4 carpetas:

### 1️⃣ Test de Conexión
- **Test: Confirmar transacción (ID falso)**: Verifica que el token funciona

### 2️⃣ API de Payphone (Directa)
- **Confirmar Transacción Real**: Consulta el estado de una transacción

### 3️⃣ API de Tu Aplicación
- **Confirmar - Local**: Prueba tu API en desarrollo
- **Confirmar - Producción**: Prueba tu API en Netlify

### 4️⃣ Health Check
- **Check Local Server**: Verifica que el servidor local esté corriendo
- **Check Production**: Verifica que el sitio en producción esté activo

---

## 🔍 Entender las Respuestas

### Status Codes de Transacción

| Code | Estado | Descripción |
|------|--------|-------------|
| 1 | Pendiente | Transacción creada pero no pagada |
| 2 | Cancelado | Usuario canceló el pago |
| 3 | ✅ Aprobado | Pago completado exitosamente |
| 4 | Rechazado | Pago rechazado (tarjeta, fondos, etc.) |

### Ejemplo de Respuesta Completa

```json
{
  "success": true,
  "status": 3,
  "statusMessage": "Aprobado",
  "transactionId": 123456,
  "clientTransactionId": "BB-1234567890-abc123",
  "amount": 1949,
  "currency": "USD",
  "date": "2025-01-15T10:30:00Z",
  "reference": "Pedido BebéSeguro BB-1234567890-abc123",
  "fullResponse": {
    // Respuesta completa de Payphone
  }
}
```

### Campos Importantes

- `success`: `true` si el pago fue aprobado (status === 3)
- `status`: Código numérico del estado
- `statusMessage`: Descripción en español
- `transactionId`: ID de Payphone
- `clientTransactionId`: Tu ID único
- `amount`: Monto en centavos (1949 = $19.49)

---

## 🐛 Solución de Problemas

### Error: "Could not send request"

**Causa**: No hay conexión o URL incorrecta

**Solución**:
- Verifica tu conexión a internet
- Verifica que la URL sea correcta
- Si pruebas local, verifica que `npm run dev` esté corriendo

---

### Error: 401 Unauthorized

**Causa**: Token inválido o no configurado

**Solución**:
1. Verifica que el environment esté seleccionado
2. Verifica que la variable `PAYPHONE_TOKEN` tenga valor
3. Verifica que el token sea correcto (cópialo de nuevo)
4. El token puede haber expirado (genera uno nuevo)

---

### Error: 404 Not Found

**En test de conexión**: ✅ **NORMAL** (significa que funciona)

**En transacción real**: La transacción no existe
- Verifica el ID de transacción
- Verifica el clientTransactionId
- Asegúrate de que la transacción se haya creado

---

### Error: Variables no se reemplazan

**Síntoma**: Ves `{{PAYPHONE_TOKEN}}` en lugar del valor real

**Solución**:
1. Verifica que el environment esté **seleccionado**
2. Las variables deben tener valores en "Current Value"
3. Guarda el environment después de editar

---

## 💡 Tips y Mejores Prácticas

### 1. Organización

Crea environments diferentes para cada entorno:
- `Payphone - Development`
- `Payphone - Production`

### 2. Seguridad

- ✅ Usa `Type: secret` para tokens
- ✅ NO pongas valores en "Initial Value"
- ❌ NO compartas tu environment con tokens

### 3. Testing

- Primero prueba el test de conexión
- Luego prueba con transacción real
- Finalmente prueba tus endpoints

### 4. Debugging

Usa la consola de Postman:
- Ve a **"Console"** (esquina inferior izquierda)
- Verás todas las requests y responses
- Útil para debugging

---

## 📚 Recursos Adicionales

- **Documentación de Payphone**: https://developer.payphone.app/docs
- **Postman Learning Center**: https://learning.postman.com/

---

## ✅ Checklist

Antes de empezar:
- [ ] Postman instalado o abierto en web
- [ ] Colección importada
- [ ] Environment creado
- [ ] Variable `PAYPHONE_TOKEN` configurada
- [ ] Environment seleccionado
- [ ] Test de conexión exitoso

¡Listo para hacer pruebas! 🚀
