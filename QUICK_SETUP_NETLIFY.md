# ⚡ Configuración Rápida - Variables de Entorno en Netlify

Guía rápida para configurar las variables de entorno en 5 minutos.

---

## 🎯 Resumen

Vas a agregar **6 variables** en Netlify con tus credenciales de Payphone.

---

## 📍 Ubicación en Netlify

```
Dashboard → Tu Sitio → Site configuration → Environment variables → Add a variable
```

**URL directa**: https://app.netlify.com/sites/tienda-bb-seguro/configuration/env

---

## 🔑 Variables a Configurar

### 1. NEXT_PUBLIC_URL
```
Key:   NEXT_PUBLIC_URL
Value: https://tienda-bb-seguro.netlify.app
```

### 2. NEXT_PUBLIC_PAYPHONE_TOKEN
```
Key:   NEXT_PUBLIC_PAYPHONE_TOKEN
Value: [Tu token de Payphone]
```
**Ejemplo**: `-wzCmLaTAQhR8AClFCm-xxxxxxxxx`

### 3. NEXT_PUBLIC_PAYPHONE_STORE_ID
```
Key:   NEXT_PUBLIC_PAYPHONE_STORE_ID
Value: [Tu Store ID de Payphone]
```
**Ejemplo**: `ac6fce98-3294-45bd-8f16-c1e64d5bb492`

### 4. NEXT_PUBLIC_PAYPHONE_RESPONSE_URL
```
Key:   NEXT_PUBLIC_PAYPHONE_RESPONSE_URL
Value: https://tienda-bb-seguro.netlify.app/checkout
```

### 5. PAYPHONE_TOKEN
```
Key:   PAYPHONE_TOKEN
Value: [Mismo token que el de #2]
```

### 6. PAYPHONE_STORE_ID
```
Key:   PAYPHONE_STORE_ID
Value: [Mismo Store ID que el de #3]
```

---

## ✅ Checklist Post-Configuración

1. **Nuevo Deploy**:
   ```
   Netlify → Deploys → Trigger deploy → Clear cache and deploy site
   ```

2. **Configurar Payphone**:
   - Ve a: https://developer.payphone.app
   - Dominio Web: `https://tienda-bb-seguro.netlify.app`
   - URL de Respuesta: `https://tienda-bb-seguro.netlify.app/checkout`

3. **Probar**:
   - Abre: https://tienda-bb-seguro.netlify.app
   - Agrega producto al carrito
   - Ve al checkout
   - Completa el formulario
   - Verifica que aparezca el botón de Payphone

---

## 🐛 Si Algo No Funciona

1. **Botón no aparece**:
   - F12 → Console → Busca errores
   - Verifica que las 6 variables estén configuradas
   - Haz nuevo deploy con "Clear cache"

2. **Acceso denegado**:
   - Verifica dominio en Payphone Developer
   - Espera 1-2 minutos después de guardarlo

3. **Token inválido**:
   - Verifica el token en Payphone Developer
   - Asegúrate de copiar el token completo (con el `-` inicial)

---

## 📚 Documentación Completa

Para más detalles, ver: **NETLIFY_ENV_SETUP.md**
