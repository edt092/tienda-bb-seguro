'use client'
import { motion } from 'framer-motion'
import { FaExclamationTriangle } from 'react-icons/fa'
import Image from 'next/image'

export default function ProblemSection() {
  const problems = [
    {
      icon: '😰',
      title: 'Cada caída es un susto',
      description: 'Tu corazón se detiene cada vez que tu bebé pierde el equilibrio. Esos primeros pasos son hermosos, pero también aterradores.',
      stat: '9 de cada 10 bebés',
      statDetail: 'sufren golpes en la cabeza aprendiendo a caminar'
    },
    {
      icon: '🏥',
      title: 'El riesgo es real',
      description: 'Los golpes en la cabeza pueden causar lesiones serias. La fontanela sigue abierta, el cráneo aún está en desarrollo.',
      stat: 'Miles de visitas',
      statDetail: 'a urgencias por caídas en bebés cada año'
    },
    {
      icon: '💔',
      title: 'La culpa que no se va',
      description: 'Aunque sepas que es parte del crecimiento, cada golpe duele más en tu alma. "¿Pude haberlo evitado?"',
      stat: 'Tu tranquilidad',
      statDetail: 'no tiene precio'
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-baby-pink/30">
      <div className="container mx-auto max-w-7xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-6">
            <FaExclamationTriangle className="text-red-500" />
            <span className="text-red-700 font-accent text-sm">Lo que toda madre teme</span>
          </div>

          <h2 className="section-title">
            Sabemos lo que
            <span className="text-red-500"> te quita el sueño</span>
          </h2>

          <p className="section-subtitle mt-6">
            Porque ser mamá es amar con el corazón en la mano, especialmente cuando empiezan a caminar.
          </p>
        </motion.div>

        {/* Tarjetas de problemas */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card"
            >
              <div className="text-6xl mb-4">{problem.icon}</div>
              <h3 className="font-heading text-2xl font-bold text-gray-800 mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                {problem.description}
              </p>
              <div className="pt-6 border-t border-gray-200">
                <p className="text-pink-600 font-bold text-xl">{problem.stat}</p>
                <p className="text-gray-500 text-sm">{problem.statDetail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Historia emocional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="font-heading text-3xl font-bold text-gray-800">
                "Solo fue un segundo..."
              </h3>
              <p className="text-gray-600 font-body leading-relaxed">
                Estabas allí. Vigilante. Atenta a cada movimiento. Pero sucedió tan rápido...
              </p>
              <p className="text-gray-600 font-body leading-relaxed">
                Ese golpe contra la esquina de la mesa. El llanto desgarrador. El chichón que apareció al instante.
              </p>
              <p className="text-gray-700 font-body leading-relaxed font-semibold">
                Y esa pregunta que no deja de repetirse: <span className="text-red-500">"¿Pude haberlo evitado?"</span>
              </p>
              <div className="pt-4">
                <p className="text-pink-600 font-accent text-lg italic">
                  No puedes estar en todos lados. Pero sí puedes protegerlos siempre.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/img/2.jpg"
                alt="Madre preocupada por su bebé"
                width={600}
                height={600}
                quality={90}
                className="rounded-2xl shadow-lg w-full h-auto"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-xl">
                <p className="text-4xl">💙</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA de transición */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-2xl md:text-3xl font-heading text-gray-700 mb-2">
            Pero no tiene que ser así...
          </p>
          <div className="animate-bounce mt-4">
            <svg className="w-8 h-8 mx-auto text-pink-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
