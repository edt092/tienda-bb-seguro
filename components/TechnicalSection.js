'use client'
import { motion } from 'framer-motion'
import { FaCertificate, FaLeaf, FaWind, FaTshirt } from 'react-icons/fa'
import Image from 'next/image'

export default function TechnicalSection() {
  const specs = [
    {
      icon: <FaCertificate className="text-4xl text-blue-500" />,
      title: 'Certificaciones',
      items: [
        'CE - Certificado Europeo',
        'ISO 9001 - Calidad',
        'ASTM F1447 - Seguridad',
        'Sin BPA ni ftalatos'
      ]
    },
    {
      icon: <FaLeaf className="text-4xl text-green-500" />,
      title: 'Materiales',
      items: [
        'Espuma EVA premium',
        'Algodón hipoalergénico',
        'Tela antibacteriana',
        '100% no tóxico'
      ]
    },
    {
      icon: <FaWind className="text-4xl text-cyan-500" />,
      title: 'Comodidad',
      items: [
        'Ultra respirable',
        'Solo 75 gramos',
        'Tejido anti-sudor',
        'Ventilación 360°'
      ]
    },
    {
      icon: <FaTshirt className="text-4xl text-purple-500" />,
      title: 'Mantenimiento',
      items: [
        'Lavable en máquina',
        'Secado rápido (2h)',
        'No pierde forma',
        'Dura +12 meses'
      ]
    }
  ]

  const colors = [
    { name: 'Rosa Dulce', color: 'bg-pink-300', hex: '#FFB6C1' },
    { name: 'Azul Cielo', color: 'bg-blue-300', hex: '#87CEEB' },
    { name: 'Menta', color: 'bg-green-200', hex: '#98FB98' },
    { name: 'Lavanda', color: 'bg-purple-300', hex: '#E6E6FA' },
    { name: 'Melocotón', color: 'bg-orange-200', hex: '#FFDAB9' },
    { name: 'Gris Nube', color: 'bg-gray-300', hex: '#D3D3D3' }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-baby-blue/20">
      <div className="container mx-auto max-w-7xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">🔬</span>
            <span className="text-blue-700 font-accent text-sm">Diseñado con ciencia y amor</span>
          </div>

          <h2 className="section-title">
            Calidad y seguridad
            <span className="text-gradient block">respaldadas por expertos</span>
          </h2>

          <p className="section-subtitle mt-6">
            Cada detalle ha sido probado y certificado para la máxima protección de tu bebé.
          </p>
        </motion.div>

        {/* Especificaciones técnicas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card"
            >
              <div className="mb-4">{spec.icon}</div>
              <h3 className="font-heading text-2xl font-bold text-gray-800 mb-4">
                {spec.title}
              </h3>
              <ul className="space-y-2">
                {spec.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 font-body text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Dimensiones y ajustes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-baby-blue/40 to-baby-pink/40 rounded-3xl p-8 md:p-12 mb-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading text-3xl font-bold text-gray-800 mb-6">
                Se adapta perfectamente a tu bebé
              </h3>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-accent font-bold text-lg text-gray-800 mb-3">
                    Rango de edad
                  </h4>
                  <p className="text-gray-600 font-body">
                    <span className="font-bold text-2xl text-pink-500">6-24 meses</span>
                    <br />
                    <span className="text-sm">Ideal para fase de gateo y primeros pasos</span>
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-accent font-bold text-lg text-gray-800 mb-3">
                    Circunferencia de cabeza
                  </h4>
                  <p className="text-gray-600 font-body">
                    <span className="font-bold text-2xl text-blue-500">42-52 cm</span>
                    <br />
                    <span className="text-sm">Ajustable con sistema de correas elásticas</span>
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-accent font-bold text-lg text-gray-800 mb-3">
                    Peso del casco
                  </h4>
                  <p className="text-gray-600 font-body">
                    <span className="font-bold text-2xl text-purple-500">Solo 75g</span>
                    <br />
                    <span className="text-sm">Más ligero que un smartphone</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/img/6.jpg"
                alt="Medidas del casco"
                width={600}
                height={600}
                quality={90}
                className="w-full h-auto rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-white rounded-2xl p-4 shadow-xl">
                <p className="font-bold text-sm">Talla única</p>
                <p className="text-xs">Crece con tu bebé</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Colores disponibles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Elige el color favorito de tu bebé
          </h3>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {colors.map((color, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform duration-300"
              >
                <div className={`w-16 h-16 ${color.color} rounded-full shadow-lg border-4 border-white hover:shadow-2xl`}></div>
                <p className="text-sm font-body text-gray-600">{color.name}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-gray-500 font-body italic">
            Todos los colores incluyen el mismo nivel de protección certificada
          </p>
        </motion.div>

        {/* Certificados visuales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/img/CERTIFICACIONES/certificacion-ce.png"
              alt="Certificación CE"
              width={80}
              height={80}
              quality={90}
              className="w-20 h-20 object-contain mb-3"
              loading="lazy"
            />
            <p className="font-accent font-bold text-gray-800">CE</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/img/CERTIFICACIONES/certificacion-iso-9001.png"
              alt="Certificación ISO-9001"
              width={80}
              height={80}
              quality={90}
              className="w-20 h-20 object-contain mb-3"
              loading="lazy"
            />
            <p className="font-accent font-bold text-gray-800">ISO-9001</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/img/CERTIFICACIONES/certificacion-astm.png"
              alt="Certificación ASTM"
              width={80}
              height={80}
              quality={90}
              className="w-20 h-20 object-contain mb-3"
              loading="lazy"
            />
            <p className="font-accent font-bold text-gray-800">ASTM</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/img/CERTIFICACIONES/certificacion-fda.png"
              alt="Certificación FDA"
              width={80}
              height={80}
              quality={90}
              className="w-20 h-20 object-contain mb-3"
              loading="lazy"
            />
            <p className="font-accent font-bold text-gray-800">FDA</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
