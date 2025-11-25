# 🌐 Ejemplos de cURL para Payphone

Guía de comandos cURL para probar la API de Payphone desde la terminal.

---

## 📋 Pre-requisitos

### En Windows (Git Bash, WSL o PowerShell)

**Git Bash** (recomendado):
```bash
# Ya viene con Git for Windows
curl --version
```

**PowerShell**:
```powershell
# Usar Invoke-WebRequest o instalar curl
curl.exe --version
```

### En Mac/Linux

```bash
# curl ya está instalado
curl --version
```

---

## 🔑 Configurar Variables

Para no repetir el token en cada comando, configúralo como variable de entorno:

### En Git Bash / Linux / Mac:

```bash
# Configurar token
export PAYPHONE_TOKEN="tu_token_aqui"

# Verificar que esté configurado
echo $PAYPHONE_TOKEN
```

### En PowerShell:

```powershell
# Configurar token
$env:PAYPHONE_TOKEN = "tu_token_aqui"

# Verificar
$env:PAYPHONE_TOKEN
```

---

## 🧪 Test 1: Conexión Básica

### Prueba con ID Falso (Verificar Token)

**Git Bash / Linux / Mac**:
```bash
curl -X POST https://pay.payphonetodoesposible.com/api/button/V2/Confirm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $PAYPHONE_TOKEN" \
  -d '{
    "id": 999999,
    "clientTxId": "TEST-'$(date +%s)'"
  }' \
  | jq '.'
```

**PowerShell**:
```powershell
curl.exe -X POST https://pay.payphonetodoesposible.com/api/button/V2/Confirm `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer $env:PAYPHONE_TOKEN" `
  -d '{\"id\": 999999, \"clientTxId\": \"TEST-123\"}'
```

**Sin jq** (respuesta sin formatear):
```bash
curl -X POST https://pay.payphonetodoesposible.com/api/button/V2/Confirm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $PAYPHONE_TOKEN" \
  -d '{"id": 999999, "clientTxId": "TEST-123"}'
```

**Resultado esperado**:
```
{"message":"Transaction not found"}
```
o
```
Status: 404
```

✅ **Esto es CORRECTO** - significa que tu token funciona.

---

## 🔍 Test 2: Confirmar Transacción Real

Primero necesitas un ID de transacción real de Payphone.

### Configurar variables:

```bash
# ID de transacción de Payphone
export TRANSACTION_ID="123456"

# Tu ID de cliente (del pedido)
export CLIENT_TX_ID="BB-1234567890-abc123"
```

### Ejecutar consulta:

```bash
curl -X POST https://pay.payphonetodoesposible.com/api/button/V2/Confirm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $PAYPHONE_TOKEN" \
  -d "{
    \"id\": $TRANSACTION_ID,
    \"clientTxId\": \"$CLIENT_TX_ID\"
  }" \
  | jq '.'
```

**Respuesta esperada** (transacción aprobada):
```json
{
  "transactionId": 123456,
  "clientTransactionId": "BB-1234567890-abc123",
  "status": "Approved",
  "statusCode": 3,
  "amount": 1949,
  "currency": "USD",
  "date": "2025-01-15T10:30:00Z"
}
```

---

## 🌐 Test 3: Tu API Local

Asegúrate de que `npm run dev` esté corriendo.

### Probar endpoint de confirmación:

```bash
curl -X POST http://localhost:3000/api/payphone/confirm \
  -H "Content-Type: application/json" \
  -d "{
    \"id\": \"$TRANSACTION_ID\",
    \"clientTxId\": \"$CLIENT_TX_ID\"
  }" \
  | jq '.'
```

**Respuesta esperada**:
```json
{
  "success": true,
  "status": 3,
  "statusMessage": "Aprobado",
  "transactionId": 123456,
  "clientTransactionId": "BB-1234567890-abc123",
  "amount": 1949,
  "currency": "USD"
}
```

---

## 🚀 Test 4: Tu API en Producción

```bash
curl -X POST https://tienda-bb-seguro.netlify.app/api/payphone/confirm \
  -H "Content-Type: application/json" \
  -d "{
    \"id\": \"$TRANSACTION_ID\",
    \"clientTxId\": \"$CLIENT_TX_ID\"
  }" \
  | jq '.'
```

---

## 📊 Test 5: Ver Headers y Status Code

Para debugging, a veces necesitas ver los headers y el status code:

```bash
curl -X POST https://pay.payphonetodoesposible.com/api/button/V2/Confirm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $PAYPHONE_TOKEN" \
  -d '{"id": 999999, "clientTxId": "TEST-123"}' \
  -i
```

La opción `-i` muestra los headers:
```
HTTP/2 404
content-type: application/json
date: Mon, 15 Jan 2025 10:30:00 GMT

{"message":"Transaction not found"}
```

---

## 🔧 Opciones Útiles de cURL

### Ver solo headers (sin body):
```bash
curl -X POST ... -I
```

### Ver request completo (debugging):
```bash
curl -X POST ... -v
```

### Guardar respuesta en archivo:
```bash
curl -X POST ... -o response.json
```

### Timeout (esperar máximo 10 segundos):
```bash
curl -X POST ... --max-time 10
```

### Seguir redirects:
```bash
curl -X POST ... -L
```

---

## 📋 Script de Test Completo

Crea un archivo `test-payphone-api.sh`:

```bash
#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🧪 Test de API de Payphone${NC}\n"

# Verificar que el token esté configurado
if [ -z "$PAYPHONE_TOKEN" ]; then
  echo -e "${RED}❌ Error: PAYPHONE_TOKEN no está configurado${NC}"
  echo "Configúralo con: export PAYPHONE_TOKEN='tu_token'"
  exit 1
fi

echo -e "${GREEN}✅ Token configurado${NC}\n"

# Test 1: Conexión básica
echo -e "${YELLOW}Test 1: Verificando conexión...${NC}"
RESPONSE=$(curl -s -X POST https://pay.payphonetodoesposible.com/api/button/V2/Confirm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $PAYPHONE_TOKEN" \
  -d '{"id": 999999, "clientTxId": "TEST-'$(date +%s)'"}' \
  -w "\n%{http_code}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 404 ] || [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✅ Conexión exitosa (Status: $HTTP_CODE)${NC}"
  echo "Respuesta: $BODY"
else
  echo -e "${RED}❌ Error (Status: $HTTP_CODE)${NC}"
  echo "Respuesta: $BODY"
  exit 1
fi

echo -e "\n${GREEN}✅ Todos los tests pasaron${NC}"
```

**Usar el script**:
```bash
# Dar permisos de ejecución
chmod +x test-payphone-api.sh

# Ejecutar
./test-payphone-api.sh
```

---

## 🐛 Solución de Problemas

### Error: "curl: command not found"

**Windows**: Usa Git Bash o instala curl:
```powershell
# PowerShell (como admin)
choco install curl
```

**Mac**:
```bash
brew install curl
```

---

### Error: "Could not resolve host"

**Causa**: Sin conexión a internet o DNS no funciona

**Solución**:
```bash
# Verificar conexión
ping google.com

# Verificar DNS
nslookup pay.payphonetodoesposible.com
```

---

### Error: 401 Unauthorized

**Causa**: Token inválido o mal configurado

**Verificar**:
```bash
# Ver si el token está configurado
echo $PAYPHONE_TOKEN

# Ver la longitud del token (debe ser >20 caracteres)
echo ${#PAYPHONE_TOKEN}
```

**Solución**:
- Copia el token de nuevo desde Payphone Developer
- Asegúrate de no tener espacios al inicio/final
- Verifica que el token no haya expirado

---

### Error: jq: command not found

**Causa**: jq no está instalado (es opcional, solo para formatear JSON)

**Solución**:

**Windows (Git Bash)**:
```bash
# Descargar jq
curl -L -o /usr/bin/jq.exe https://github.com/stedolan/jq/releases/latest/download/jq-win64.exe
```

**Mac**:
```bash
brew install jq
```

**Linux (Ubuntu/Debian)**:
```bash
sudo apt-get install jq
```

**Alternativa**: No uses jq, la respuesta estará sin formatear pero funciona igual.

---

## 📚 Ejemplos Rápidos (Copy-Paste)

### Test básico (sin variables):
```bash
curl -X POST https://pay.payphonetodoesposible.com/api/button/V2/Confirm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{"id": 999999, "clientTxId": "TEST-123"}'
```

### Tu API local:
```bash
curl -X POST http://localhost:3000/api/payphone/confirm \
  -H "Content-Type: application/json" \
  -d '{"id": "123456", "clientTxId": "BB-TEST-123"}'
```

### Tu API producción:
```bash
curl -X POST https://tienda-bb-seguro.netlify.app/api/payphone/confirm \
  -H "Content-Type: application/json" \
  -d '{"id": "123456", "clientTxId": "BB-TEST-123"}'
```

---

## ✅ Checklist

- [ ] curl instalado
- [ ] Token de Payphone copiado
- [ ] Variable PAYPHONE_TOKEN configurada
- [ ] Test de conexión exitoso (404 o 200)
- [ ] IDs de transacción reales obtenidos
- [ ] Test con transacción real exitoso

¡Listo para hacer pruebas! 🚀
