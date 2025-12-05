import { Quicksand, Nunito, Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { CartProvider } from '@/context/CartContext'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
})

export const metadata = {
  title: 'Casco Protector para Bebé | Protección Amorosa Para Sus Primeros Pasos',
  description: 'Protege la cabecita de tu bebé mientras aprende a caminar. Casco de gateo suave, cómodo y certificado. Porque cada paso cuenta y cada caída duele en tu corazón.',
  keywords: 'casco bebé, protección bebé, casco gateo, seguridad infantil, primeros pasos',
  referrer: 'origin-when-cross-origin',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${quicksand.variable} ${nunito.variable} ${poppins.variable}`}>
      <body className="font-body antialiased">
        <CartProvider>
          {children}
        </CartProvider>
        <Script
          src="https://pay.payphonetodoesposible.com/api/button/js?appId=U4vZUeEhGUqSzQjZfVgL1w"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
