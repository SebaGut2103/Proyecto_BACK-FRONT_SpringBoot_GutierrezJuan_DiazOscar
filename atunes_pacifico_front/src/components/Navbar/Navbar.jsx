import React, { useState } from "react";
import Logo from "../../assets/fish.svg";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lista de enlaces del menú
  const menu = [
    { label: "Inicio", href: "#inicio", section: "inicio" },
    { label: "Productos", href: "#productos", section: "productos" },
    { label: "Servicios", href: "#servicios", section: "servicios" },
    { label: "Contacto", href: "#contacto", section: "contacto" },
  ];

  // Alternar visibilidad del menú móvil
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Cerrar menú al hacer clic en un enlace (modo móvil)
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Parte superior del navbar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo + Marca + Lema */}
          <div className="flex items-start space-x-3 hover:opacity-80 transition-opacity">
            <a href="#" className="flex items-start gap-3 text-white">
              <img className="w-10 h-10 mt-1" src={Logo} alt="Logo de Atunes" />
              <div>
                <p className="font-bold text-2xl sm:text-3xl">
                  Atunes del Pacífico S.A.
                </p>
                <p className="text-blue-200 text-sm leading-snug">
                  Calidad del océano a tu mesa
                </p>
              </div>
            </a>
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={toggleMenu}
            className="sm:hidden text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Menú de navegación (pantallas grandes) */}
          <ul className="hidden sm:flex items-center gap-4 text-white text-base sm:text-lg font-semibold">
            {menu.map((item) => (
              <li key={item.section}>
                <a
                  href={item.href}
                  data-section={item.section}
                  className="hover:opacity-80 transition-opacity"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Menú móvil desplegable */}
        {isOpen && (
          <div className="sm:hidden bg-blue-800 text-white px-6 pb-4 space-y-2 font-medium text-base">
            {menu.map((item) => (
              <a
                key={item.section}
                href={item.href}
                data-section={item.section}
                onClick={closeMenu}
                className="block hover:opacity-80"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
