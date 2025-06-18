import React, { useEffect, useState } from "react";

const images = [
  "https://cdn1.totalcommerce.cloud/mercacentro/product-zoom/es/atun-pan-en-trozos-agua-x-150-g-1.webp",
  "https://aratiendas.com/wp-content/uploads/2024/04/LOMITOS-DE-ATUN-EN-ACEITE-AL-NATURAL-COSTA-BLANCA-X-170-G-1.webp",
  "https://aratiendas.com/wp-content/uploads/2024/07/LOMO-DE-ATUN-CON-LIMON-Y-PIMIENTA-COSTA-BLANCA-X-80-G.webp",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000); // Cambia cada 4 segundos
    return () => clearInterval(interval);
  }, [length]);

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  return (
    <section>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="relative w-full max-w-3xl rounded-xl overflow-hidden shadow-lg">
          <img
            src={images[current]}
            alt={`Atún ${current + 1}`}
            className="w-full h-[400px] object-contain transition-all duration-700"
          />
          {/* Botón anterior */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
          >
            ‹
          </button>
          {/* Botón siguiente */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
          >
            ›
          </button>
          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === current ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
