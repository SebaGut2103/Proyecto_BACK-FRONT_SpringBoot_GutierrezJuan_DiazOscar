import { useState } from "react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#about", label: "About Us" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        {/* Main header content */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-300">
              <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="#cceeff" />
              <path d="M12 32c12-8 28-8 40 0-12 8-28 8-40 0z" fill="currentColor" />
              <path d="M26 26c0 3.3 2.7 6 6 6s6-2.7 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <circle cx="32" cy="32" r="1.5" fill="#000" />
            </svg>
            <div>
              <h1 className="text-xl font-bold">Atunes del Pacífico S.A</h1>
              <p className="text-blue-200 text-sm hidden sm:block">Calidad del océano a tu mesa</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Primary navigation">
            <ul className="flex space-x-6">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-blue-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Book Appointment Button - Desktop */}
            <a
              href="#appointment"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 ml-4"
            >
              Book Appointment
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-white rounded"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              // Close icon
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden mt-4 pb-4 border-t border-blue-800 pt-4"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="block text-blue-200 hover:text-white transition-colors duration-200 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {/* Book Appointment Button - Mobile */}
              <li className="pt-2">
                <a
                  href="#appointment"
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors duration-200 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={toggleMenu}
                >
                  Book Appointment
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header
