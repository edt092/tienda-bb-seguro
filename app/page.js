'use client'
import { useCart } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import CartModal from '@/components/CartModal'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import SolutionSection from '@/components/SolutionSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import TechnicalSection from '@/components/TechnicalSection'
import PricingSection from '@/components/PricingSection'
import Footer from '@/components/Footer'

export default function Home() {
  const { addToCart } = useCart()

  return (
    <>
      <Navbar />
      <CartModal />
      <main className="min-h-screen pt-20">
        <Hero />
        <div id="problema">
          <ProblemSection />
        </div>
        <div id="solucion">
          <SolutionSection />
        </div>
        <div id="testimonios">
          <TestimonialsSection />
        </div>
        <TechnicalSection />
        <div id="precio">
          <PricingSection onAddToCart={addToCart} />
        </div>
        <Footer />
      </main>
    </>
  )
}
