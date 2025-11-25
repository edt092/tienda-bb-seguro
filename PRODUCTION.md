# 🚀 Guía de Deployment a Producción - Netlify

Esta guía te ayudará a configurar y deployar tu proyecto a producción en Netlify.

## 📋 Pre-requisitos

- ✅ Proyecto deployado en Netlify
- ✅ Cuenta en Payphone Developer (https://developer.payphone.app)
- ✅ Token y Store ID de Payphone
- ✅ Dominio configurado (https://tienda-bb-seguro.netlify.app)

---

## 🔧 Paso 1: Configurar Variables de Entorno en Netlify

### 1.1. Acceder a las Variables de Entorno

1. Ve a tu sitio en Netlify: https://app.netlify.com
2. Selecciona tu sitio **tienda-bb-seguro**
3. Ve a **Site settings** > **Environment variables**
4. Haz clic en **Add a variable**

### 1.2. Agregar las Variables

Agrega las siguientes variables **una por una**:

#### Variables Frontend (NEXT_PUBLIC_*)

```
NEXT_PUBLIC_URL=https://tienda-bb-seguro.netlify.app
```

```
NEXT_PUBLIC_PAYPHONE_TOKEN=tu_token_de_payphone
```

```
NEXT_PUBLIC_PAYPHONE_STORE_ID=tu_store_id_de_payphone
```

```
NEXT_PUBLIC_PAYPHONE_RESPONSE_URL=https://tienda-bb-seguro.netlify.app/checkout
```

#### Variables Backend

```
PAYPHONE_TOKEN=tu_token_de_payphone
```

```
PAYPHONE_STORE_ID=tu_store_id_de_payphone
```

### 1.3. Obtener tus Credenciales de Payphone

1. Ve a https://developer.payphone.app
2. Inicia sesión con tu cuenta
3. Selecciona tu aplicación
4. Copia el **Token** y el **Store ID**
5. Úsalos en las variables de entorno

⚠️ **IMPORTANTE**: El token debe ser el mismo para las variables con y sin `NEXT_PUBLIC_`

---

## 🌐 Paso 2: Configurar Dominio en Payphone

### 2.1. Autorizar el Dominio

1. Ve a https://developer.payphone.app
2. Selecciona tu aplicación
3. En **Dominio Web**, agrega:
   ```
   https://tienda-bb-seguro.netlify.app
   ```

4. En **URL de Respuesta**, agrega:
   ```
   https://tienda-bb-seguro.netlify.app/checkout
   ```

5. Guarda los cambios

⚠️ **Sin esta configuración obtendrás el error "Acceso denegado"**

---

## 📦 Paso 3: Deploy del Proyecto

### 3.1. Hacer Deploy desde Git

Si tu proyecto está conectado a GitHub/GitLab:

```bash
git add .
git commit -m "feat: Configurar proyecto para producción"
git push origin main
```

Netlify automáticamente:
1. Detectará el push
2. Ejecutará `npm run build`
3. Desplegará la nueva versión

### 3.2. Verificar el Build

1. Ve a **Deploys** en Netlify
2. Espera a que el deploy termine (status: **Published**)
3. Revisa los logs si hay errores

---

## 🧪 Paso 4: Probar en Producción

### 4.1. Prueba de Conexión Local (Opcional)

Antes de probar en producción, puedes ejecutar el script de prueba:

```bash
node test-payphone.js
```

Este script verifica:
- ✅ Variables de entorno configuradas
- ✅ Conexión con API de Payphone
- ✅ Token válido
- ✅ Configuración del SDK

### 4.2. Prueba Manual en Producción

1. **Abre tu sitio**:
   ```
   https://tienda-bb-seguro.netlify.app
   ```

2. **Agrega un producto al carrito**:
   - Haz clic en "Agregar al Carrito"
   - Verifica que el contador del carrito aumente

3. **Ve al checkout**:
   - Haz clic en "Ir a Pagar"
   - Completa todos los campos del formulario

4. **Verifica el botón de Payphone**:
   - Cuando completes todos los campos, debe aparecer el botón de pago
   - El botón debe mostrar el logo de Payphone

5. **Prueba el flujo de pago**:
   - Haz clic en el botón de Payphone
   - Deberías ser redirigido a la página de pago de Payphone
   - Completa o cancela el pago
   - Verifica que regreses al sitio con el mensaje correspondiente

### 4.3. Checklist de Pruebas

- [ ] El sitio carga correctamente
- [ ] El carrito funciona
- [ ] El formulario de checkout se muestra
- [ ] El botón de Payphone aparece al completar el formulario
- [ ] El botón redirige a Payphone
- [ ] Después del pago, regresa al sitio
- [ ] Se muestra el mensaje de éxito o error
- [ ] Los datos del pedido se guardan correctamente

---

## 🐛 Solución de Problemas

### Error: "Acceso denegado"

**Causa**: El dominio no está autorizado en Payphone

**Solución**:
1. Ve a https://developer.payphone.app
2. Agrega tu dominio en "Dominio Web"
3. Guarda y espera unos minutos

---

### Error: El botón de Payphone no aparece

**Posibles causas**:

1. **Variables de entorno no configuradas**:
   - Ve a Netlify > Site settings > Environment variables
   - Verifica que todas las variables estén presentes
   - Haz un nuevo deploy después de agregar variables

2. **El SDK no se cargó**:
   - Abre la consola del navegador (F12)
   - Busca errores de red
   - Verifica que `payphone-payment-box.js` se cargue

3. **Formulario incompleto**:
   - Verifica que todos los campos obligatorios estén llenos

---

### Error: Variables de entorno no se actualizan

**Solución**:
1. Agrega o modifica las variables en Netlify
2. Ve a **Deploys** > **Trigger deploy** > **Clear cache and deploy site**
3. Esto forzará un nuevo build con las variables actualizadas

---

### Error 401: Token inválido

**Causa**: El token está mal configurado o expiró

**Solución**:
1. Ve a https://developer.payphone.app
2. Verifica que el token sea el correcto
3. Si es necesario, genera un nuevo token
4. Actualiza las variables de entorno en Netlify
5. Haz un nuevo deploy

---

## 📊 Monitoreo y Logs

### Ver logs en Netlify

1. Ve a **Deploys** en tu sitio de Netlify
2. Haz clic en el deploy más reciente
3. Revisa los logs de build

### Ver logs de funciones

1. Ve a **Functions** en Netlify
2. Haz clic en la función que quieres revisar
3. Verás los logs en tiempo real

### Depuración en producción

Para ver logs en producción:
1. Abre la consola del navegador (F12)
2. Ve a la pestaña **Console**
3. Los logs de la aplicación aparecerán aquí

---

## 🔒 Seguridad

### Variables de entorno

✅ **Correcto**:
- `.env.local` está en `.gitignore`
- Las variables están configuradas en Netlify
- Las variables `NEXT_PUBLIC_*` son públicas (esto es normal)

❌ **NUNCA**:
- Subir `.env.local` al repositorio
- Compartir el token en mensajes o código
- Usar el token de producción en desarrollo

---

## 📈 Optimización

### Cache y rendimiento

El archivo `netlify.toml` ya incluye:
- ✅ Headers de cache para assets estáticos
- ✅ Headers de seguridad
- ✅ Content Security Policy para Payphone
- ✅ Configuración de Node.js 18

### Mejoras futuras

Considera implementar:
- Analytics (Google Analytics, Plausible, etc.)
- Logs centralizados (Sentry, LogRocket, etc.)
- Monitoreo de uptime
- Webhooks de Payphone para actualización automática

---

## ✅ Checklist Final

Antes de considerar el deployment completo, verifica:

- [ ] Variables de entorno configuradas en Netlify
- [ ] Dominio autorizado en Payphone Developer
- [ ] URL de respuesta configurada en Payphone
- [ ] Build exitoso en Netlify
- [ ] Sitio accesible en https://tienda-bb-seguro.netlify.app
- [ ] Carrito funciona correctamente
- [ ] Botón de Payphone aparece en checkout
- [ ] Flujo de pago completo funciona
- [ ] Mensaje de éxito/error se muestra correctamente
- [ ] No hay errores en la consola del navegador
- [ ] No hay errores en los logs de Netlify

---

## 📞 Soporte

Si encuentras problemas:

1. **Documentación de Payphone**:
   - https://developer.payphone.app/docs

2. **Documentación de Netlify**:
   - https://docs.netlify.com

3. **Script de prueba local**:
   ```bash
   node test-payphone.js
   ```

4. **Logs**:
   - Netlify: Site > Deploys > [último deploy] > Deploy log
   - Browser: F12 > Console

---

## 🎉 ¡Listo!

Si completaste todos los pasos y las pruebas pasaron, tu sitio está listo para producción.

**URL del sitio**: https://tienda-bb-seguro.netlify.app

¡Felicidades! 🚀
