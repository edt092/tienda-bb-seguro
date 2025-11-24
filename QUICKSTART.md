# 🚀 Inicio Rápido - BebéSeguro

## Pasos para ver tu landing page funcionando

### 1️⃣ Instalar dependencias
```bash
npm install
```

### 2️⃣ Ejecutar en desarrollo
```bash
npm run dev
```

### 3️⃣ Abrir navegador
Visita: **http://localhost:3000**

---

## 🎨 Agregar tus imágenes

Ve a la carpeta `/public/img/` y lee el archivo `IMAGES_NEEDED.txt` para saber qué imágenes necesitas.

**Tip rápido:** Para probar sin imágenes reales, puedes usar placeholders:
- https://via.placeholder.com/1000x1000.png?text=Casco
- https://source.unsplash.com/1000x1000/?baby,helmet

---

## 💰 Cambiar precios

Edita: `components/PricingSection.js`

Busca:
```javascript
price: '19.49',          // ← Cambia aquí
```

---

## 🔌 Integrar pasarela de pago

Cuando estés listo para conectar Mercado Pago u otra pasarela:

1. Lee las instrucciones en `README.md` sección "Integración de Pasarela de Pago"
2. Instala el SDK correspondiente
3. Configura variables de entorno en `.env.local`
4. Actualiza `app/checkout/page.js`

---

## 🎯 Funcionalidades listas

✅ Carrito de compras funcional
✅ Página de checkout
✅ Diseño responsive
✅ Animaciones suaves
✅ SEO optimizado
✅ Todo el copy emocional

---

## ❓ Necesitas ayuda

- Para dudas de Next.js: https://nextjs.org/docs
- Para dudas de Tailwind: https://tailwindcss.com/docs
- Para integrar Mercado Pago: https://www.mercadopago.com.ec/developers

---

**¡Listo! Tu landing page está funcionando** 🎉
