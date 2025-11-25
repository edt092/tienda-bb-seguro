# 🛡️ BebéSeguro - Landing Page

Landing page profesional para venta de cascos protectores para bebés, diseñada con Next.js 14, React y Tailwind CSS.

**🌐 En producción**: https://tienda-bb-seguro.netlify.app

## ✨ Características

- 🎨 Diseño tierno y emocional enfocado en seguridad infantil
- 🛒 Carrito de compras funcional con Context API
- 📱 Responsive y mobile-first
- ⚡ Optimizado con Next.js 14 (App Router)
- 🎭 Animaciones suaves con Framer Motion
- 💳 **Integración completa con Payphone** (SDK Cajita de Pagos)
- 🚀 Performance optimizado
- 🔒 Deployado en Netlify con variables de entorno seguras

## 📋 Requisitos Previos

- Node.js 18.0 o superior
- npm o yarn

## 🚀 Inicio Rápido

### Desarrollo Local

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia `.env.example` a `.env.local` y completa con tus credenciales:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores de Payphone:
```env
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_PAYPHONE_TOKEN=tu_token
NEXT_PUBLIC_PAYPHONE_STORE_ID=tu_store_id
NEXT_PUBLIC_PAYPHONE_RESPONSE_URL=http://localhost:3000/checkout
PAYPHONE_TOKEN=tu_token
PAYPHONE_STORE_ID=tu_store_id
```

4. **Probar conexión con Payphone** (opcional)
```bash
node test-payphone.js
```

5. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

6. **Abrir el navegador**
```
http://localhost:3000
```

### Producción en Netlify

**Guías disponibles**:
- 🚀 [QUICK_SETUP_NETLIFY.md](./QUICK_SETUP_NETLIFY.md) - Configuración rápida (5 min)
- 📚 [NETLIFY_ENV_SETUP.md](./NETLIFY_ENV_SETUP.md) - Guía completa paso a paso
- 🏗️ [PRODUCTION.md](./PRODUCTION.md) - Deployment completo

## 🏗️ Estructura del Proyecto

```
casco-para-bb/
├── app/
│   ├── layout.js          # Layout principal con SDK de Payphone
│   ├── page.js            # Página de inicio
│   ├── globals.css        # Estilos globales
│   ├── checkout/
│   │   └── page.js        # Página de checkout con Payphone
│   └── api/
│       └── payphone/
│           └── confirm/
│               └── route.js  # API para confirmar transacciones
├── components/
│   ├── Navbar.js          # Barra de navegación con carrito
│   ├── CartModal.js       # Modal del carrito
│   └── Footer.js          # Footer
├── context/
│   └── CartContext.js     # Context API para carrito
├── public/
│   └── img/              # Imágenes del sitio
├── .env.example          # Template de variables de entorno
├── netlify.toml          # Configuración de Netlify
├── test-payphone.js      # Script de prueba de Payphone
├── PRODUCTION.md         # Guía de deployment
├── PAYPHONE_SDK_CONFIG.md # Documentación de Payphone
└── package.json
```

## 🖼️ Imágenes Requeridas

Coloca las siguientes imágenes en `/public/img/`:

### Producto:
- `helmet-main.png` - Imagen principal del casco
- `helmet-detail.png` - Detalle del producto
- `helmet-measurements.png` - Medidas del casco

### Hero y contenido:
- `hero-video.mp4` - Video para el hero
- `worried-mom.jpg` - Imagen de madre preocupada

### Testimonios:
- `mom1.jpg`, `mom2.jpg`, `mom3.jpg` - Fotos de testimonios

### Galería:
- `baby-1.jpg` a `baby-8.jpg` - Fotos de bebés usando el casco

### Certificaciones:
- `cert-ce.png`
- `cert-iso-9001.png`
- `cert-astm.png`
- `cert-fda.png`

## 💰 Configuración de Precios

Los precios están configurados en `/components/PricingSection.js`:

- **Pack Individual**: $19.49 USD (envío gratis en Quito)
- **Pack Familiar**: $34.99 USD (2 cascos, envío gratis en Quito)

Para modificar precios, edita el array `packages` en `PricingSection.js`.

## 💳 Integración de Payphone

El proyecto está **completamente integrado con Payphone** usando el SDK JavaScript (Cajita de Pagos).

### Características de la integración:

- ✅ Botón de pago generado automáticamente
- ✅ Confirmación de transacciones server-side
- ✅ Manejo de callbacks y redirects
- ✅ Soporte para tarjetas y app Payphone
- ✅ Mensajes de éxito/error
- ✅ Guardado de información del pedido

### Archivos clave:

1. **`app/layout.js`** - Carga el SDK de Payphone (app/layout.js:36-44)
2. **`app/checkout/page.js`** - Inicializa el botón de pago (app/checkout/page.js:102-183)
3. **`app/api/payphone/confirm/route.js`** - Confirma transacciones (app/api/payphone/confirm/route.js:1-107)

### Flujo de pago:

```
Usuario llena formulario
    ↓
Botón de Payphone aparece automáticamente
    ↓
Usuario hace clic → Redirige a Payphone
    ↓
Usuario completa/cancela el pago
    ↓
Payphone redirige de vuelta con parámetros
    ↓
API confirma el estado de la transacción
    ↓
Se muestra mensaje de éxito o error
```

### Documentación:

- [PAYPHONE_SDK_CONFIG.md](./PAYPHONE_SDK_CONFIG.md) - Guía completa de configuración
- [PRODUCTION.md](./PRODUCTION.md) - Deployment a Netlify
- `node test-payphone.js` - Script de prueba de conexión

## 🎨 Personalización

### Colores:
Edita `/tailwind.config.js` para cambiar los colores:
```javascript
colors: {
  baby: {
    pink: '#FFE5E5',
    blue: '#E5F3FF',
    // ... más colores
  }
}
```

### Fuentes:
Las fuentes están en `/app/layout.js`:
- **Quicksand** - Títulos
- **Nunito** - Cuerpo de texto
- **Poppins** - Acentos

### Copy:
Todo el texto está en español y se puede editar directamente en cada componente.

## 📦 Build y Deploy

### Build local

```bash
npm run build
npm start
```

### Deploy a Netlify (Configurado)

El proyecto está configurado para Netlify con `netlify.toml`.

**Guía completa**: [PRODUCTION.md](./PRODUCTION.md)

**Pasos rápidos**:
1. Configura variables de entorno en Netlify
2. Autoriza tu dominio en Payphone Developer
3. Push a tu repositorio
4. Netlify despliega automáticamente

**Sitio en producción**: https://tienda-bb-seguro.netlify.app

## 🛠️ Tecnologías

- **Next.js 14** - Framework React
- **React 18** - Librería UI
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **React Icons** - Iconos
- **Context API** - Estado global

## 🧪 Pruebas y Testing

### Script de prueba de Payphone

Prueba la conexión con la API de Payphone:

```bash
node test-payphone.js
```

Este script verifica:
- ✅ Variables de entorno configuradas
- ✅ Conexión con API de Payphone
- ✅ Validez del token
- ✅ Configuración del SDK

### Prueba manual

1. Ejecuta el proyecto: `npm run dev`
2. Agrega un producto al carrito
3. Ve a checkout
4. Completa el formulario
5. Verifica que aparezca el botón de Payphone
6. Prueba el flujo completo de pago

### Credenciales de Payphone

Obtén tus credenciales en:
- https://developer.payphone.app

**NUNCA** compartas tu token o lo subas a Git. Usa `.env.local` (ignorado por Git).

## 📝 Notas Importantes

1. **Imágenes**: Debes agregar tus propias imágenes en `/public/img/`
2. **Video**: El video del hero debe estar optimizado (máx 5MB recomendado)
3. **SEO**: Actualiza metadata en `/app/layout.js` según tu negocio
4. **Legal**: Agrega páginas de términos y condiciones según legislación local
5. **Seguridad**:
   - ✅ `.env.local` está en `.gitignore`
   - ✅ Usa variables de entorno en Netlify para producción
   - ❌ NUNCA subas tokens o credenciales a Git
6. **Payphone**:
   - Autoriza tu dominio en https://developer.payphone.app
   - Configura URL de respuesta en Payphone Developer
   - Las variables `NEXT_PUBLIC_*` son públicas (esto es normal para el SDK)

## 🤝 Soporte y Documentación

### Proyecto
- [QUICK_SETUP_NETLIFY.md](./QUICK_SETUP_NETLIFY.md) - ⚡ Configuración rápida de Netlify (5 min)
- [NETLIFY_ENV_SETUP.md](./NETLIFY_ENV_SETUP.md) - 📚 Guía completa de variables de entorno
- [PRODUCTION.md](./PRODUCTION.md) - 🏗️ Guía de deployment completo
- [PAYPHONE_SDK_CONFIG.md](./PAYPHONE_SDK_CONFIG.md) - 💳 Configuración de Payphone
- [QUICKSTART.md](./QUICKSTART.md) - 🚀 Inicio rápido

### Servicios externos
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Payphone](https://developer.payphone.app/docs)
- [Documentación de Netlify](https://docs.netlify.com)

### Testing
```bash
node test-payphone.js  # Probar conexión con Payphone
npm run dev            # Desarrollo local
npm run build          # Build de producción
```

## 📄 Licencia

Proyecto privado. Todos los derechos reservados.

---

**Desarrollado con ❤️ para proteger a los más pequeños**
