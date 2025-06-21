import React, { useState, useEffect } from 'react';
import pedidoService from '../services/pedidoService';

function MisPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    pedidoService.getHistorial()
      .then(response => setPedidos(response.data))
      .catch(err => {
        console.error("Error al obtener el historial de pedidos:", err);
        setError("No se pudo cargar tu historial. Por favor, intenta de nuevo más tarde.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-sky-50 text-blue-900 text-lg font-medium">
        Cargando tus pedidos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-700 bg-red-50 font-medium">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">Mis Pedidos</h2>
        <p className="text-gray-600 text-center mb-8">Consulta el historial de tus compras realizadas</p>

        {pedidos.length === 0 ? (
          <div className="text-center text-gray-500 text-base">Aún no has realizado ningún pedido.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
              <thead className="bg-blue-100 text-blue-900 uppercase text-left">
                <tr>
                  <th className="py-3 px-4">ID Pedido</th>
                  <th className="py-3 px-4">Fecha Pedido</th>
                  <th className="py-3 px-4">Fecha Entrega</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido, index) => (
                  <tr
                    key={pedido.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                  >
                    <td className="py-3 px-4 font-medium text-blue-900">#{pedido.id}</td>
                    <td className="py-3 px-4">{new Date(pedido.fechaPedido).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{new Date(pedido.fechaEntrega).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-semibold text-blue-700">${pedido.precioTotal.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        pedido.estado === 'Entregado'
                          ? 'bg-green-500'
                          : pedido.estado === 'Pendiente'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                      }`}>
                        {pedido.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default MisPedidosPage;
