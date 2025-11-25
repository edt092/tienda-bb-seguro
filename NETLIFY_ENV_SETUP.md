# 🔧 Guía: Configurar Variables de Entorno en Netlify

Esta guía te llevará paso a paso para configurar las variables de entorno necesarias en Netlify.

---

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener:

- ✅ Una cuenta en Netlify (https://app.netlify.com)
- ✅ Tu proyecto ya deployado en Netlify
- ✅ Tus credenciales de Payphone (Token y Store ID)

---

## 🔑 Paso 1: Obtener tus Credenciales de Payphone

### 1.1. Acceder a Payphone Developer

1. Ve a: **https://developer.payphone.app**
2. Inicia sesión con tu cuenta
3. Si no tienes cuenta, regístrate primero

### 1.2. Obtener el Token

1. En el dashboard de Payphone, busca la sección **"Aplicaciones"** o **"Apps"**
2. Selecciona tu aplicación (o créala si es la primera vez)
3. Busca el campo **"Token"** o **"API Token"**
4. Copia el token completo

   **Ejemplo del token**:
   ```
   -wzCmLaTAQhR8AClFCm-xxxxxxxxxxxxxxxxxx
   ```

   ⚠️ **IMPORTANTE**: El token puede empezar con `-` (guión), esto es normal

### 1.3. Obtener el Store ID

1. En la misma sección de tu aplicación en Payphone
2. Busca el campo **"Store ID"** o **"ID de Tienda"**
3. Copia el Store ID completo

   **Ejemplo del Store ID**:
   ```
   ac6fce98-3294-45bd-8f16-c1e64d5bb492
   ```

   Es un UUID (formato: 8-4-4-4-12 caracteres)

### 1.4. Guardar las Credenciales (temporal)

**Copia y pega esto en un archivo temporal** en tu computadora para tenerlo a mano:

```
TOKEN: tu_token_aqui
STORE_ID: tu_store_id_aqui
```

⚠️ **NO lo compartas con nadie ni lo subas a Git**

---

## 🌐 Paso 2: Acceder a tu Sitio en Netlify

### 2.1. Ir al Dashboard de Netlify

1. Abre tu navegador
2. Ve a: **https://app.netlify.com**
3. Inicia sesión si no lo has hecho

### 2.2. Seleccionar tu Sitio

1. Verás una lista de tus sitios
2. Busca **"tienda-bb-seguro"** (o el nombre que le hayas dado)
3. Haz clic en el nombre del sitio para entrar

---

## ⚙️ Paso 3: Configurar Variables de Entorno

### 3.1. Navegar a Variables de Entorno

Una vez dentro de tu sitio:

1. En el menú superior, haz clic en **"Site configuration"** o **"Site settings"**
2. En el menú lateral izquierdo, busca la sección **"Environment variables"**
3. Haz clic en **"Environment variables"**

**Ruta visual**:
```
Dashboard → [Tu Sitio] → Site configuration → Environment variables
```

### 3.2. Agregar las Variables

Ahora vas a agregar **6 variables**, una por una.

#### ✅ Variable 1: NEXT_PUBLIC_URL

1. Haz clic en el botón **"Add a variable"** o **"Add environment variable"**
2. En el campo **"Key"** (nombre de la variable), escribe exactamente:
   ```
   NEXT_PUBLIC_URL
   ```
3. En el campo **"Value"** (valor), escribe la URL de tu sitio:
   ```
   https://tienda-bb-seguro.netlify.app
   ```

   ⚠️ **IMPORTANTE**:
   - Asegúrate de que la URL sea EXACTAMENTE la de tu sitio en Netlify
   - NO agregues `/` al final
   - Usa `https://` (no `http://`)

4. En **"Scopes"** o **"Environment"**, asegúrate de que esté marcado:
   - ✅ **Production** (o "All")
   - ✅ **Deploy previews** (opcional)
   - ✅ **Branch deploys** (opcional)

5. Haz clic en **"Create variable"** o **"Save"**

---

#### ✅ Variable 2: NEXT_PUBLIC_PAYPHONE_TOKEN

1. Haz clic nuevamente en **"Add a variable"**
2. En **"Key"**, escribe:
   ```
   NEXT_PUBLIC_PAYPHONE_TOKEN
   ```
3. En **"Value"**, pega tu **TOKEN de Payphone** que copiaste en el Paso 1:
   ```
   -wzCmLaTAQhR8AClFCm-xxxxxxxxxxxxxxxxxx
   ```

   ⚠️ **Verifica que**:
   - No haya espacios al inicio o al final
   - El token esté completo
   - Incluya el guión `-` inicial si lo tiene

4. **Scopes**: Production, Deploy previews (opcional)
5. Haz clic en **"Create variable"**

---

#### ✅ Variable 3: NEXT_PUBLIC_PAYPHONE_STORE_ID

1. Haz clic en **"Add a variable"**
2. En **"Key"**, escribe:
   ```
   NEXT_PUBLIC_PAYPHONE_STORE_ID
   ```
3. En **"Value"**, pega tu **STORE ID de Payphone**:
   ```
   ac6fce98-3294-45bd-8f16-c1e64d5bb492
   ```

   ⚠️ **Verifica que**:
   - Sea el UUID completo (formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
   - No haya espacios

4. **Scopes**: Production, Deploy previews (opcional)
5. Haz clic en **"Create variable"**

---

#### ✅ Variable 4: NEXT_PUBLIC_PAYPHONE_RESPONSE_URL

1. Haz clic en **"Add a variable"**
2. En **"Key"**, escribe:
   ```
   NEXT_PUBLIC_PAYPHONE_RESPONSE_URL
   ```
3. En **"Value"**, escribe la URL de tu checkout:
   ```
   https://tienda-bb-seguro.netlify.app/checkout
   ```

   ⚠️ **IMPORTANTE**:
   - Debe terminar en `/checkout`
   - NO agregues `/` adicional al final
   - Usa la URL EXACTA de tu sitio

4. **Scopes**: Production, Deploy previews (opcional)
5. Haz clic en **"Create variable"**

---

#### ✅ Variable 5: PAYPHONE_TOKEN

1. Haz clic en **"Add a variable"**
2. En **"Key"**, escribe:
   ```
   PAYPHONE_TOKEN
   ```

   ⚠️ **Nota**: Esta es SIN el prefijo `NEXT_PUBLIC_`

3. En **"Value"**, pega el **MISMO TOKEN** que usaste en la Variable 2:
   ```
   -wzCmLaTAQhR8AClFCm-xxxxxxxxxxxxxxxxxx
   ```

   Debe ser **idéntico** al de la Variable 2

4. **Scopes**: Production, Deploy previews (opcional)
5. Haz clic en **"Create variable"**

---

#### ✅ Variable 6: PAYPHONE_STORE_ID

1. Haz clic en **"Add a variable"**
2. En **"Key"**, escribe:
   ```
   PAYPHONE_STORE_ID
   ```

   ⚠️ **Nota**: Esta es SIN el prefijo `NEXT_PUBLIC_`

3. En **"Value"**, pega el **MISMO STORE ID** que usaste en la Variable 3:
   ```
   ac6fce98-3294-45bd-8f16-c1e64d5bb492
   ```

   Debe ser **idéntico** al de la Variable 3

4. **Scopes**: Production, Deploy previews (opcional)
5. Haz clic en **"Create variable"**

---

### 3.3. Verificar las Variables

Después de agregar las 6 variables, deberías ver algo como esto:

```
✅ NEXT_PUBLIC_URL = https://tienda-bb-seguro.netlify.app
✅ NEXT_PUBLIC_PAYPHONE_TOKEN = -wzCmLaTAQhR8AClFCm-...
✅ NEXT_PUBLIC_PAYPHONE_STORE_ID = ac6fce98-3294-45bd-...
✅ NEXT_PUBLIC_PAYPHONE_RESPONSE_URL = https://tienda-bb-seguro.netlify.app/checkout
✅ PAYPHONE_TOKEN = -wzCmLaTAQhR8AClFCm-...
✅ PAYPHONE_STORE_ID = ac6fce98-3294-45bd-...
```

**Checklist de verificación**:
- [ ] 6 variables agregadas
- [ ] Los tokens en Variable 2 y Variable 5 son idénticos
- [ ] Los Store IDs en Variable 3 y Variable 6 son idénticos
- [ ] Las URLs no tienen `/` al final (excepto `/checkout`)
- [ ] Todas usan `https://`

---

## 🔄 Paso 4: Hacer un Nuevo Deploy

### 4.1. ¿Por qué es necesario?

Las variables de entorno solo se cargan durante el **build**. Si acabas de agregarlas, necesitas hacer un nuevo deploy para que se apliquen.

### 4.2. Trigger un Nuevo Deploy

**Opción A: Desde Netlify (Recomendado)**

1. Ve a la pestaña **"Deploys"** en tu sitio de Netlify
2. Haz clic en el botón **"Trigger deploy"**
3. Selecciona **"Clear cache and deploy site"**
4. Espera a que el deploy termine (verás el estado en tiempo real)
5. Cuando veas **"Published"** en verde, ¡está listo!

**Opción B: Desde Git**

Si prefieres hacerlo desde tu computadora:

```bash
git add .
git commit -m "docs: Actualizar documentación"
git push origin main
```

Netlify detectará el push y hará un deploy automáticamente.

### 4.3. Verificar el Deploy

1. En la pestaña **"Deploys"**, haz clic en el deploy más reciente
2. Revisa el **"Deploy log"**
3. Busca errores (texto en rojo)
4. Si todo está bien, verás **"Site is live"**

---

## 🌍 Paso 5: Configurar Dominio en Payphone

Ahora que las variables están en Netlify, debes autorizar tu dominio en Payphone.

### 5.1. Volver a Payphone Developer

1. Ve a: **https://developer.payphone.app**
2. Inicia sesión
3. Selecciona tu aplicación

### 5.2. Agregar Dominio Autorizado

1. Busca el campo **"Dominio Web"** o **"Authorized Domain"**
2. Agrega tu URL de Netlify:
   ```
   https://tienda-bb-seguro.netlify.app
   ```

   ⚠️ **IMPORTANTE**:
   - NO incluyas `/checkout` ni ninguna ruta
   - Solo el dominio base
   - Usa `https://`

3. Haz clic en **"Guardar"** o **"Save"**

### 5.3. Agregar URL de Respuesta

1. Busca el campo **"URL de Respuesta"** o **"Response URL"** o **"Callback URL"**
2. Agrega la URL de tu checkout:
   ```
   https://tienda-bb-seguro.netlify.app/checkout
   ```

3. Haz clic en **"Guardar"** o **"Save"**

### 5.4. Esperar Propagación

Los cambios en Payphone pueden tardar **1-2 minutos** en aplicarse. Espera un momento antes de probar.

---

## 🧪 Paso 6: Probar en Producción

### 6.1. Abrir tu Sitio

1. Abre tu navegador
2. Ve a: **https://tienda-bb-seguro.netlify.app**
3. Verifica que el sitio cargue correctamente

### 6.2. Probar el Flujo de Pago

1. **Agrega un producto al carrito**:
   - Haz clic en "Agregar al Carrito"
   - Verifica que el contador del carrito aumente

2. **Ve al checkout**:
   - Haz clic en el ícono del carrito
   - Haz clic en "Ir a Pagar"

3. **Completa el formulario**:
   - Llena todos los campos obligatorios (*)
   - Nombre completo
   - Email válido
   - Teléfono (formato: +593999999999)
   - Dirección
   - Ciudad

4. **Verifica el botón de Payphone**:
   - Cuando completes todos los campos, debe aparecer el botón de pago
   - El botón debe mostrar el logo de Payphone
   - Si no aparece, abre la consola (F12) y busca errores

5. **Prueba el pago** (opcional):
   - Haz clic en el botón de Payphone
   - Deberías ser redirigido a la página de pago de Payphone
   - Completa o cancela el pago
   - Verifica que regreses al sitio con el mensaje correspondiente

---

## ✅ Checklist Final

Antes de considerar la configuración completa:

### Variables de Entorno en Netlify
- [ ] NEXT_PUBLIC_URL configurada
- [ ] NEXT_PUBLIC_PAYPHONE_TOKEN configurada
- [ ] NEXT_PUBLIC_PAYPHONE_STORE_ID configurada
- [ ] NEXT_PUBLIC_PAYPHONE_RESPONSE_URL configurada
- [ ] PAYPHONE_TOKEN configurada (mismo valor que NEXT_PUBLIC_PAYPHONE_TOKEN)
- [ ] PAYPHONE_STORE_ID configurada (mismo valor que NEXT_PUBLIC_PAYPHONE_STORE_ID)

### Payphone Developer
- [ ] Dominio autorizado: https://tienda-bb-seguro.netlify.app
- [ ] URL de respuesta configurada: https://tienda-bb-seguro.netlify.app/checkout

### Deploy y Testing
- [ ] Nuevo deploy realizado (con "Clear cache")
- [ ] Deploy exitoso (status: Published)
- [ ] Sitio cargando correctamente en producción
- [ ] Carrito funciona
- [ ] Formulario de checkout se muestra
- [ ] Botón de Payphone aparece al completar el formulario
- [ ] No hay errores en la consola del navegador (F12)

---

## 🐛 Solución de Problemas

### ❌ El botón de Payphone no aparece

**Diagnóstico**:
1. Abre la consola del navegador (F12)
2. Ve a la pestaña **"Console"**
3. Busca errores en rojo

**Posibles causas y soluciones**:

#### 1. Variables de entorno no configuradas

**Error en consola**: `undefined` o `null` en las variables

**Solución**:
- Ve a Netlify > Site configuration > Environment variables
- Verifica que las 6 variables estén presentes
- Haz un nuevo deploy con "Clear cache and deploy site"

#### 2. El SDK no se carga

**Error en consola**: `PPaymentButtonBox is not defined`

**Solución**:
- Verifica tu conexión a internet
- Abre las DevTools (F12) > pestaña "Network"
- Busca `payphone-payment-box.js`
- Si tiene error 4xx o 5xx, puede ser un problema de Payphone (raro)
- Intenta recargar la página (Ctrl + F5)

#### 3. Dominio no autorizado

**Error en consola**: No hay error visible, pero el botón no renderiza

**Solución**:
- Ve a https://developer.payphone.app
- Verifica que tu dominio esté autorizado
- Espera 1-2 minutos después de guardarlo
- Recarga la página del sitio

---

### ❌ Error: "Acceso denegado"

**Causa**: El dominio no está autorizado en Payphone

**Solución**:
1. Ve a https://developer.payphone.app
2. Edita tu aplicación
3. En "Dominio Web", agrega: `https://tienda-bb-seguro.netlify.app`
4. Guarda los cambios
5. Espera 1-2 minutos
6. Intenta de nuevo

---

### ❌ Las variables no se actualizan

**Causa**: Netlify necesita un nuevo build para cargar las variables

**Solución**:
1. Ve a Netlify > Deploys
2. Haz clic en "Trigger deploy"
3. Selecciona **"Clear cache and deploy site"**
4. Espera a que termine el deploy
5. Prueba de nuevo

---

### ❌ Error 401: Token inválido

**Causa**: El token está mal copiado o expiró

**Solución**:
1. Ve a https://developer.payphone.app
2. Verifica que el token sea el correcto
3. Si es necesario, genera un nuevo token
4. Actualiza las variables en Netlify:
   - NEXT_PUBLIC_PAYPHONE_TOKEN
   - PAYPHONE_TOKEN
5. Haz un nuevo deploy
6. Espera a que termine
7. Prueba de nuevo

---

## 📞 ¿Necesitas Ayuda?

### Recursos útiles

- **Documentación de Payphone**: https://developer.payphone.app/docs
- **Documentación de Netlify**: https://docs.netlify.com
- **Guía de producción completa**: Ver `PRODUCTION.md` en el proyecto

### Verificar logs

**En Netlify**:
1. Ve a Deploys > [último deploy] > Deploy log
2. Busca mensajes de error

**En el navegador**:
1. Presiona F12
2. Ve a la pestaña "Console"
3. Busca mensajes en rojo

---

## 🎉 ¡Listo!

Si completaste todos los pasos y las verificaciones pasaron, tu sitio está configurado correctamente y listo para recibir pagos en producción.

**Sitio en producción**: https://tienda-bb-seguro.netlify.app

¡Felicidades! 🚀

---

## 📝 Resumen de Variables

Para tu referencia futura:

| Variable | Valor | Uso |
|----------|-------|-----|
| NEXT_PUBLIC_URL | https://tienda-bb-seguro.netlify.app | URL del sitio |
| NEXT_PUBLIC_PAYPHONE_TOKEN | Tu token de Payphone | Token para SDK (frontend) |
| NEXT_PUBLIC_PAYPHONE_STORE_ID | Tu Store ID | Store ID para SDK (frontend) |
| NEXT_PUBLIC_PAYPHONE_RESPONSE_URL | https://tienda-bb-seguro.netlify.app/checkout | URL de retorno después del pago |
| PAYPHONE_TOKEN | Tu token de Payphone (mismo que arriba) | Token para API (backend) |
| PAYPHONE_STORE_ID | Tu Store ID (mismo que arriba) | Store ID para API (backend) |

⚠️ **Recuerda**: Los valores `NEXT_PUBLIC_PAYPHONE_TOKEN` y `PAYPHONE_TOKEN` deben ser idénticos. Lo mismo aplica para los Store IDs.
