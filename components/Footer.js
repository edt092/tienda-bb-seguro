'use client'
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaHeart } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Columna 1 - Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🛡️</span>
              BebéSeguro
            </h3>
            <p className="text-gray-300 font-body text-sm leading-relaxed mb-4">
              Protección amorosa para los primeros pasos de tu bebé.
              Diseñado por padres, probado por expertos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                <FaTwitter className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Columna 2 - Enlaces rápidos */}
          <div>
            <h4 className="font-accent font-bold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  Beneficios
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  Blog de seguridad
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Información */}
          <div>
            <h4 className="font-accent font-bold text-lg mb-4">Información</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  Envíos y devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  Garantía de 30 días
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Contacto */}
          <div>
            <h4 className="font-accent font-bold text-lg mb-4">Contáctanos</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-pink-400 text-lg mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Email</p>
                  <a href="mailto:hola@bebeseguro.com" className="text-white hover:text-pink-400 transition-colors">
                    hola@bebeseguro.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaPhone className="text-pink-400 text-lg mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">WhatsApp</p>
                  <a href="tel:+34900123456" className="text-white hover:text-pink-400 transition-colors">
                    +34 900 123 456
                  </a>
                  <p className="text-xs text-gray-400 mt-1">Lun-Vie 9:00-18:00</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-gray-300 text-sm mb-2">Consejos de seguridad gratis</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-3 py-2 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Certificaciones */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="bg-white rounded-lg px-4 py-2 inline-block">
                <p className="text-gray-800 font-bold text-xs">CE</p>
                <p className="text-gray-600 text-xs">Certificado</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg px-4 py-2 inline-block">
                <p className="text-gray-800 font-bold text-xs">ISO 9001</p>
                <p className="text-gray-600 text-xs">Calidad</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg px-4 py-2 inline-block">
                <p className="text-gray-800 font-bold text-xs">ASTM</p>
                <p className="text-gray-600 text-xs">Seguridad</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg px-4 py-2 inline-block">
                <p className="text-gray-800 font-bold text-xs">100%</p>
                <p className="text-gray-600 text-xs">Sin tóxicos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            © {currentYear} BebéSeguro. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
            Hecho con <FaHeart className="text-pink-400" /> para proteger a los más pequeños
          </p>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-center text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Pago 100% seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Envío gratis</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Garantía 30 días</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Soporte 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
