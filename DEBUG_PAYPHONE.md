# 🔍 Guía de Debugging - Payphone SDK

Esta guía te ayudará a diagnosticar y solucionar problemas con el SDK de Payphone.

---

## ✅ Cambios Realizados

He mejorado el código para diagnosticar mejor los problemas:

### 1. **Mejor carga del SDK**
- Cambié de `lazyOnload` a `afterInteractive` para cargar el SDK más rápido
- Aumenté el timeout de 5 a 10 segundos
- Agregué callbacks para saber cuándo se carga o falla

### 2. **Logging detallado**
- Ahora verás mensajes en la consola del navegador
- Cada paso del proceso tiene un log

### 3. **Indicadores visuales**
- Spinner de carga mientras se carga el SDK
- Mensaje de error si algo falla
- Botón para recargar si hay error

---

## 🧪 Cómo Verificar

### Paso 1: Esperar el Deploy

Netlify está desplegando los cambios ahora mismo. Espera 2-3 minutos.

**Verificar status del deploy**:
1. Ve a: https://app.netlify.com/sites/tienda-bb-seguro/deploys
2. El deploy más reciente debe decir **"Published"** (verde)

### Paso 2: Abrir el Sitio con DevTools

1. **Abre tu sitio en modo incógnito**:
   ```
   https://tienda-bb-seguro.netlify.app
   ```

2. **Abre la consola del navegador** (antes de navegar):
   - **Windows**: Presiona `F12`
   - **Mac**: `Cmd + Option + I`
   - Ve a la pestaña **"Console"**

3. **Navega al checkout**:
   - Agrega un producto al carrito
   - Haz clic en "Ir a Pagar"

### Paso 3: Completar el Formulario

Completa todos los campos obligatorios:
- Nombre completo
- Email
- Teléfono (formato: +593999999999)
- Dirección
- Ciudad

**Mientras completas el formulario**, observa la consola.

### Paso 4: Leer los Logs

Deberías ver mensajes como estos en la consola:

#### ✅ **Flujo Exitoso**:

```
✅ Payphone SDK cargado
🔍 Verificando configuración de Payphone:
- Token presente: true
- Store ID presente: true
⏳ Esperando a que se cargue el SDK de Payphone...
✅ SDK de Payphone detectado
🚀 Inicializando SDK de Payphone...
✅ SDK configurado, renderizando botón...
✅ Botón de Payphone renderizado exitosamente
```

#### ❌ **Flujo con Error (Variables no configuradas)**:

```
✅ Payphone SDK cargado
🔍 Verificando configuración de Payphone:
- Token presente: false  ← PROBLEMA
- Store ID presente: false  ← PROBLEMA
❌ Variables de entorno no configuradas
```

**Solución**: Las variables no están en Netlify. Ve a:
- https://app.netlify.com/sites/tienda-bb-seguro/configuration/env
- Agrega las 6 variables
- Haz un nuevo deploy

#### ❌ **Flujo con Error (SDK no se carga)**:

```
❌ Error cargando Payphone SDK  ← PROBLEMA
```

**Posibles causas**:
1. Problema de red
2. Payphone CDN caído (raro)
3. Bloqueador de anuncios bloqueando el script

**Solución**: Desactiva bloqueadores de anuncios y recarga.

---

## 🎯 Qué Esperar Ver

### En el Formulario

1. **Mientras completas los campos**:
   - No debería aparecer nada todavía
   - Mensaje amarillo: "Completa todos los campos obligatorios"

2. **Cuando completes TODOS los campos**:
   - Desaparece el mensaje amarillo
   - Aparece un **spinner azul** con "Cargando métodos de pago..."
   - Después de 1-2 segundos, el spinner desaparece
   - **Aparece el botón de Payphone** (azul con logo)

3. **Si hay un error**:
   - Aparece un mensaje rojo con el error
   - Botón para "Recargar página"

### El Botón de Payphone

El botón debe verse así:
- Color azul
- Logo de Payphone
- Texto: "Pagar con Payphone" o similar
- Debajo del formulario

**NO debe haber**:
- Botón "Confirmar Pedido" (ese botón no debe existir)
- Botón verde o rosa
- Botón genérico de "Submit"

---

## 🐛 Problemas Comunes y Soluciones

### Problema 1: "Cargando métodos de pago..." se queda pegado

**Causa**: El SDK no se está cargando

**Debug**:
1. Abre la consola (F12)
2. Ve a la pestaña **"Network"**
3. Filtra por "payphone"
4. Busca el archivo `payphone-payment-box.js`
5. Verifica el status code:
   - ✅ **200**: Se cargó bien
   - ❌ **404, 500**: Problema con Payphone CDN
   - ❌ **blocked**: Bloqueador de anuncios

**Solución**:
- Desactiva bloqueadores de anuncios
- Prueba en modo incógnito
- Prueba con otro navegador

---

### Problema 2: Error "Variables de entorno no configuradas"

**Causa**: Las variables no están en Netlify o el build es viejo

**Solución**:

1. **Verificar variables en Netlify**:
   ```
   https://app.netlify.com/sites/tienda-bb-seguro/configuration/env
   ```

   Debes tener estas 6 variables:
   - NEXT_PUBLIC_URL
   - NEXT_PUBLIC_PAYPHONE_TOKEN
   - NEXT_PUBLIC_PAYPHONE_STORE_ID
   - NEXT_PUBLIC_PAYPHONE_RESPONSE_URL
   - PAYPHONE_TOKEN
   - PAYPHONE_STORE_ID

2. **Forzar un nuevo deploy**:
   ```
   Netlify → Deploys → Trigger deploy → Clear cache and deploy site
   ```

3. **Esperar a que termine el deploy**

4. **Probar de nuevo**

---

### Problema 3: El botón aparece pero al hacer clic no pasa nada

**Causa**: Configuración incorrecta del SDK o dominio no autorizado

**Debug**:
1. Abre la consola (F12)
2. Haz clic en el botón
3. Busca errores en rojo

**Posibles errores**:

#### "Dominio no autorizado"

**Solución**:
1. Ve a https://developer.payphone.app
2. Edita tu aplicación
3. En "Dominio Web", agrega:
   ```
   https://tienda-bb-seguro.netlify.app
   ```
4. En "URL de Respuesta", agrega:
   ```
   https://tienda-bb-seguro.netlify.app/checkout
   ```
5. Guarda y espera 1-2 minutos
6. Prueba de nuevo

---

### Problema 4: Aparece un botón "Confirmar Pedido" en lugar del botón de Payphone

**Causa**: Código viejo en producción

**Solución**:
1. Fuerza actualización del navegador:
   - **Windows**: `Ctrl + F5`
   - **Mac**: `Cmd + Shift + R`

2. Si persiste, verifica el deploy:
   ```
   https://app.netlify.com/sites/tienda-bb-seguro/deploys
   ```
   - El último deploy debe ser el de hace pocos minutos
   - Status: "Published"

3. Si el deploy es viejo, haz uno nuevo:
   ```
   Trigger deploy → Deploy site
   ```

---

## 📋 Checklist de Verificación

Usa este checklist para verificar que todo esté bien:

### En Netlify
- [ ] Variables de entorno configuradas (6 variables)
- [ ] Deploy exitoso (status: Published)
- [ ] Deploy reciente (hace menos de 5 minutos)
- [ ] No hay errores en el deploy log

### En Payphone Developer
- [ ] Dominio autorizado: `https://tienda-bb-seguro.netlify.app`
- [ ] URL de respuesta: `https://tienda-bb-seguro.netlify.app/checkout`
- [ ] Token copiado correctamente (sin espacios)
- [ ] Store ID copiado correctamente

### En el Sitio (Consola del Navegador)
- [ ] "✅ Payphone SDK cargado" aparece
- [ ] "Token presente: true" aparece
- [ ] "Store ID presente: true" aparece
- [ ] "✅ Botón de Payphone renderizado exitosamente" aparece
- [ ] No hay errores en rojo

### En el Sitio (Visual)
- [ ] El sitio carga sin errores
- [ ] El carrito funciona
- [ ] El formulario de checkout se muestra
- [ ] Al completar el formulario, aparece spinner azul
- [ ] Después del spinner, aparece botón azul de Payphone
- [ ] El botón tiene el logo de Payphone
- [ ] NO hay botón "Confirmar Pedido"

---

## 📸 Cómo Reportar un Problema

Si después de seguir todos los pasos aún tienes problemas, necesito esta información:

### 1. Captura de pantalla de la consola del navegador
- Presiona F12
- Ve a la pestaña "Console"
- Toma captura de pantalla de TODOS los mensajes

### 2. Captura de pantalla del formulario
- Muestra cómo se ve el checkout
- Incluye si hay botones, mensajes, etc.

### 3. Captura de la pestaña Network
- F12 → Network
- Filtra por "payphone"
- Muestra el archivo payphone-payment-box.js
- Muestra el status code

### 4. Copia de los logs
Copia y pega TODOS los mensajes de la consola que empiecen con:
- ✅
- ❌
- 🔍
- ⏳
- 🚀

### 5. Variables de entorno (sin valores)
Ve a Netlify y verifica que tengas estas variables (NO copies los valores):
- [ ] NEXT_PUBLIC_URL
- [ ] NEXT_PUBLIC_PAYPHONE_TOKEN
- [ ] NEXT_PUBLIC_PAYPHONE_STORE_ID
- [ ] NEXT_PUBLIC_PAYPHONE_RESPONSE_URL
- [ ] PAYPHONE_TOKEN
- [ ] PAYPHONE_STORE_ID

---

## 🎯 Próximos Pasos

1. **Espera a que se complete el deploy** (2-3 minutos)
2. **Abre el sitio en modo incógnito** con F12 abierto
3. **Completa el formulario** y observa los logs
4. **Reporta lo que veas** con capturas de pantalla

---

## 📞 Enlaces Útiles

- **Tu sitio**: https://tienda-bb-seguro.netlify.app
- **Netlify Deploys**: https://app.netlify.com/sites/tienda-bb-seguro/deploys
- **Variables Netlify**: https://app.netlify.com/sites/tienda-bb-seguro/configuration/env
- **Payphone Developer**: https://developer.payphone.app

---

**¡Suerte con el debugging!** 🚀
