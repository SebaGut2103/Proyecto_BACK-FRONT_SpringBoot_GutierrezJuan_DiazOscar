import React from 'react';

const productData = [
  {
    id: 1,
    name: "Atún en Agua",
    description: "Trozos de atún en agua natural, ideal para ensaladas.",
    price: "$7.500",
    image:
      "https://cdn1.totalcommerce.cloud/mercacentro/product-zoom/es/atun-pan-en-trozos-agua-x-150-g-1.webp",
  },
  {
    id: 2,
    name: "Atún en Aceite",
    description: "Lomos de atún en aceite vegetal, sabor clásico.",
    price: "$8.200",
    image:
      "https://aratiendas.com/wp-content/uploads/2024/04/LOMITOS-DE-ATUN-EN-ACEITE-AL-NATURAL-COSTA-BLANCA-X-170-G-1.webp",
  },
  {
    id: 3,
    name: "Atún Limón y Pimienta",
    description: "Atún con un toque cítrico y picante, listo para servir.",
    price: "$6.900",
    image:
      "https://aratiendas.com/wp-content/uploads/2024/07/LOMO-DE-ATUN-CON-LIMON-Y-PIMIENTA-COSTA-BLANCA-X-80-G.webp",
  },
];

const Products = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-sky-100 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Nuestros Productos</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {productData.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col h-full"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-contain bg-gray-50"
              />
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-semibold text-blue-800">{product.name}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-bold text-blue-700">{product.price}</p>
                  <button className="mt-2 w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
