import React, { useState } from "react";
import Logo from "../../assets/fish.svg";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { label: "Inicio", href: "#inicio", section: "inicio" },
    { label: "Productos", href: "#productos", section: "productos" },
    { label: "Servicios", href: "#servicios", section: "servicios" },
    { label: "Contacto", href: "#contacto", section: "contacto" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo y nombre */}
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

          {/* Botón hamburguesa para móvil */}
          <button
            onClick={toggleMenu}
            className="sm:hidden text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Navegación en escritorio */}
          <div className="hidden sm:flex items-center gap-6">
            <ul className="flex items-center gap-4 text-white text-base sm:text-lg font-semibold">
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
            {/* Botones */}
            <div className="flex gap-3 ml-6">
              <button className="bg-white text-blue-900 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition">
                Registrar
              </button>
              <button className="border border-white text-white px-4 py-1 rounded hover:bg-white hover:text-blue-900 transition">
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <div className="sm:hidden bg-blue-800 text-white px-6 pb-4 space-y-3 font-medium text-base">
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
            <div className="pt-2 space-y-2">
              <button className="w-full bg-white text-blue-900 font-semibold py-1 rounded hover:bg-gray-100 transition">
                Registrar
              </button>
              <button className="w-full border border-white text-white py-1 rounded hover:bg-white hover:text-blue-900 transition">
                Iniciar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
