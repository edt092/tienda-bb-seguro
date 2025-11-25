# 🛡️ BebéSeguro - Landing Page

Landing page profesional para venta de cascos protectores para bebés, diseñada con Next.js 14, React y Tailwind CSS.

## ✨ Características

- 🎨 Diseño tierno y emocional enfocado en seguridad infantil
- 🛒 Carrito de compras funcional con Context API
- 📱 Responsive y mobile-first
- ⚡ Optimizado con Next.js 14 (App Router)
- 🎭 Animaciones suaves con Framer Motion
- 💳 Preparado para integración de pasarela de pago
- 🚀 Performance optimizado

## 📋 Requisitos Previos

- Node.js 18.0 o superior
- npm o yarn

## 🚀 Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir el navegador**
```
http://localhost:3000
```

## 🏗️ Estructura del Proyecto

```
casco-para-bb/
├── app/
│   ├── layout.js          # Layout principal con providers
│   ├── page.js            # Página de inicio
│   ├── globals.css        # Estilos globales
│   └── checkout/
│       └── page.js        # Página de checkout
├── components/
│   ├── Navbar.js          # Barra de navegación con carrito
│   ├── Hero.js            # Sección hero con video
│   ├── ProblemSection.js  # Sección de problemas/dolores
│   ├── SolutionSection.js # Sección de solución
│   ├── TestimonialsSection.js # Testimonios
│   ├── TechnicalSection.js    # Especificaciones técnicas
│   ├── PricingSection.js  # Precios y paquetes
│   ├── CartModal.js       # Modal del carrito
│   └── Footer.js          # Footer
├── context/
│   └── CartContext.js     # Context API para carrito
├── public/
│   └── img/              # Imágenes del sitio
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

## 🔌 Integración de Pasarela de Pago

La landing está preparada para integrar cualquier pasarela de pago. Aquí está cómo hacerlo:

### Para Mercado Pago:

1. **Instalar SDK**
```bash
npm install mercadopago @mercadopago/sdk-react
```

2. **Crear API Route** (`/app/api/create-preference/route.js`):
```javascript
import { MercadoPagoConfig, Preference } from 'mercadopago'

export async function POST(request) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
  })

  const preference = new Preference(client)
  const body = await request.json()

  const result = await preference.create({
    body: {
      items: body.items,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_URL}/failure`,
        pending: `${process.env.NEXT_PUBLIC_URL}/pending`
      },
      auto_return: 'approved'
    }
  })

  return Response.json({ id: result.id })
}
```

3. **Actualizar página de checkout** (`/app/checkout/page.js`):

Reemplaza la función `handleSubmit` con:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsProcessing(true)

  try {
    const response = await fetch('/api/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map(item => ({
          title: item.name,
          quantity: item.quantity,
          unit_price: parseFloat(item.price)
        }))
      })
    })

    const { id } = await response.json()

    // Redirigir a Mercado Pago
    window.location.href = `https://www.mercadopago.com.ec/checkout/v1/redirect?pref_id=${id}`
  } catch (error) {
    console.error(error)
    alert('Error al procesar el pago')
  }
}
```

4. **Configurar variables de entorno** (`.env.local`):
```
MP_ACCESS_TOKEN=tu_access_token_aqui
NEXT_PUBLIC_URL=http://localhost:3000
```

### Para otras pasarelas:

El flujo es similar. La función `handleSubmit` en `/app/checkout/page.js` es donde debes integrar tu pasarela preferida.

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

## 📦 Build para Producción

```bash
npm run build
npm start
```

## 🚀 Deploy

### Vercel (Recomendado):
```bash
npm install -g vercel
vercel
```

### Otras plataformas:
- Netlify
- AWS Amplify
- Railway
- Render

Todos soportan Next.js 14 nativamente.

## 🛠️ Tecnologías

- **Next.js 14** - Framework React
- **React 18** - Librería UI
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **React Icons** - Iconos
- **Context API** - Estado global

## 🧪 Pruebas con Postman

Este proyecto incluye una colección de Postman (`Payphone_Collection.postman.json`) para probar la integración con Payphone.

### Configurar Variables de Postman:

**IMPORTANTE**: La colección usa variables de entorno para mantener las credenciales seguras. Nunca agregues tokens reales al archivo de colección.

1. **Abrir Postman** y importar `Payphone_Collection.postman.json`

2. **Crear un Environment** en Postman:
   - Click en "Environments" (ícono de engranaje)
   - Click en "Create Environment" o "Add"
   - Nombre: `Payphone - BebéSeguro`

3. **Agregar la variable**:
   - Variable: `PAYPHONE_BEARER_TOKEN`
   - Type: `secret` (para ocultar el valor)
   - Initial Value: (dejar vacío)
   - Current Value: `tu_token_de_payphone_aqui`

4. **Seleccionar el Environment**:
   - En el dropdown de environments (esquina superior derecha)
   - Selecciona "Payphone - BebéSeguro"

5. **Usar la colección**:
   - Ahora puedes usar las requests en la colección
   - El token se insertará automáticamente desde la variable de entorno

### Obtener tu Bearer Token de Payphone:
1. Inicia sesión en tu cuenta de Payphone
2. Ve a la sección de API/Desarrolladores
3. Copia tu token de autenticación
4. Pégalo en la variable `PAYPHONE_BEARER_TOKEN` en Postman

**NUNCA** compartas tu token de Payphone o lo agregues directamente en archivos que serán subidos a GitHub.

## 📝 Notas Importantes

1. **Imágenes**: Debes agregar tus propias imágenes en `/public/img/`
2. **Video**: El video del hero debe estar optimizado (máx 5MB recomendado)
3. **SEO**: Actualiza metadata en `/app/layout.js` según tu negocio
4. **Legal**: Agrega páginas de términos y condiciones según legislación local
5. **Seguridad**: Nunca subas tokens o credenciales a Git. Usa variables de entorno (.env) o variables de Postman

## 🤝 Soporte

Para dudas sobre integración de pasarelas o personalización, revisa:
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Mercado Pago](https://www.mercadopago.com.ec/developers)

## 📄 Licencia

Proyecto privado. Todos los derechos reservados.

---

**Desarrollado con ❤️ para proteger a los más pequeños**
