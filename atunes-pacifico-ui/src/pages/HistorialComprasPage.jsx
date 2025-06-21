import React, { useState, useEffect } from 'react';
import pedidoService from '../services/pedidoService';

function HistorialComprasPage() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    pedidoService.getHistorial()
      .then(response => {
        setPedidos(response.data);
      })
      .catch(err => {
        console.error("Error al obtener el historial:", err);
        setError("No se pudo cargar el historial de compras.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-blue-700 font-medium">
        Cargando historial de compras...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-medium py-4">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10 border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Mi Historial de Compras
        </h2>

        {pedidos.length === 0 ? (
          <p className="text-gray-500 text-center">No has realizado ningún pedido todavía.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden bg-white text-sm">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="py-3 px-4 text-left">ID Pedido</th>
                  <th className="py-3 px-4 text-left">Fecha de Pedido</th>
                  <th className="py-3 px-4 text-left">Fecha de Entrega</th>
                  <th className="py-3 px-4 text-left">Precio Total</th>
                  <th className="py-3 px-4 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(pedido => (
                  <tr key={pedido.id} className="border-t hover:bg-blue-50 transition">
                    <td className="py-3 px-4 font-semibold text-blue-900">#{pedido.id}</td>
                    <td className="py-3 px-4 text-gray-700">{new Date(pedido.fechaPedido).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-gray-700">{new Date(pedido.fechaEntrega).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-blue-700 font-semibold">${pedido.precioTotal.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                        ${pedido.estado === 'Entregado' ? 'bg-green-100 text-green-700' :
                          pedido.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-600'}`}>
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

export default HistorialComprasPage;
