import React from 'react'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        {/* Información de la empresa */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Atunes del Pacífico S.A.</h2>
          <p className="text-blue-200">Calidad del océano a tu mesa</p>
          <p className="text-sm mt-2">© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>

        {/* Enlaces de navegación */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Enlaces útiles</h3>
          <ul className="space-y-1 text-blue-200">
            <li><a href="#inicio" className="hover:text-white transition">Inicio</a></li>
            <li><a href="#productos" className="hover:text-white transition">Productos</a></li>
            <li><a href="#servicios" className="hover:text-white transition">Servicios</a></li>
            <li><a href="#contacto" className="hover:text-white transition">Contacto</a></li>
          </ul>
        </div>

        {/* Contacto y redes */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Contáctanos</h3>
          <div className="flex items-center gap-2 text-blue-200 mb-1">
            <Phone size={18} /> <span>+57 123 456 7890</span>
          </div>
          <div className="flex items-center gap-2 text-blue-200 mb-3">
            <Mail size={18} /> <span>info@atunespacifico.com</span>
          </div>
          <div className="flex space-x-4 text-blue-200 mt-2">
            <a href="#"><Facebook className="hover:text-white" size={20} /></a>
            <a href="#"><Instagram className="hover:text-white" size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
