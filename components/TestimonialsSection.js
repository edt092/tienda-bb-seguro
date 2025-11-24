'use client'
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function TestimonialsSection() {
  const { addToCart } = useCart()

  const product = {
    id: 1,
    name: 'Pack Individual',
    price: '19.49',
    originalPrice: '39.99',
    quantity: 1
  }
  const testimonials = [
    {
      name: 'María González',
      location: 'Madrid, España',
      image: '/img/1.jpg',
      rating: 5,
      text: 'Mi pequeño Lucas está aprendiendo a caminar y cada caída me partía el corazón. Desde que usa el casco, puedo verlo explorar sin ese nudo en el estómago. Es ligero, se ve adorable y él ni se queja. ¡La mejor inversión!',
      highlight: 'Ya no vivo con miedo constante'
    },
    {
      name: 'Ana Martínez',
      location: 'Barcelona, España',
      image: '/img/2.jpg',
      rating: 5,
      text: 'Sofía se golpeó fuerte la cabeza contra la mesita y terminamos en urgencias. Juré que no volvería a pasar. Este casco ha sido mi salvación. Ahora ella corre, salta y juega libremente. Las caídas son solo parte del juego, no un drama.',
      highlight: 'Después de un susto, esto me dio paz'
    },
    {
      name: 'Carmen López',
      location: 'Valencia, España',
      image: '/img/3.jpg',
      rating: 5,
      text: 'Soy mamá primeriza y todo me asusta. Este casco me ha dado la confianza que necesitaba. Diego está protegido y yo puedo disfrutar de sus logros sin paranoia. Además, el diseño es súper tierno. ¡Lo recomiendo al 100%!',
      highlight: 'Tranquilidad para mamás primerizas'
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-baby-lavender/30 via-white to-baby-pink/30">
      <div className="container mx-auto max-w-7xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">💕</span>
            <span className="text-purple-700 font-accent text-sm">Historias reales de mamás como tú</span>
          </div>

          <h2 className="section-title">
            Miles de mamás ya duermen
            <span className="text-gradient block">más tranquilas</span>
          </h2>

          <p className="section-subtitle mt-6">
            No solo vendemos cascos, compartimos tranquilidad y amor.
          </p>

          {/* Estadísticas sociales */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <p className="text-4xl font-bold text-pink-500">10,000+</p>
              <p className="text-gray-600 font-body">Familias protegidas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-500">4.9/5</p>
              <p className="text-gray-600 font-body flex items-center justify-center gap-1">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-500">98%</p>
              <p className="text-gray-600 font-body">Lo recomiendan</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonios */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Calificación */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>

              {/* Highlight */}
              <div className="bg-pink-50 rounded-xl p-3 mb-4">
                <p className="text-pink-600 font-accent font-semibold text-sm">
                  "{testimonial.highlight}"
                </p>
              </div>

              {/* Testimonio */}
              <p className="text-gray-600 font-body leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Autor */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  quality={90}
                  className="w-14 h-14 rounded-full object-cover border-4 border-pink-200"
                  loading="lazy"
                />
                <div>
                  <p className="font-heading font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Galería de fotos tiernas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Bebés felices, madres tranquilas 💙
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: num * 0.1 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <Image
                  src={`/img/${num}.jpg`}
                  alt={`Bebé usando casco protector ${num}`}
                  width={400}
                  height={400}
                  quality={90}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-white font-body text-sm">😊 Protegido y feliz</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action emocional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl"
        >
          <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Únete a las miles de mamás que eligieron tranquilidad
          </h3>
          <p className="text-xl mb-8 opacity-90">
            No esperes a que pase un accidente. Protégelo hoy.
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-white text-pink-500 font-accent font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
          >
            Sí, Quiero Proteger a Mi Bebé
          </button>
        </motion.div>
      </div>
    </section>
  )
}
