import React, { useState, useEffect } from 'react';
import loteService from '../services/loteService';
import pedidoService from '../services/pedidoService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CrearPedidoPage() {
  const [inventario, setInventario] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [fechaEntrega, setFechaEntrega] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loteService.getInventario()
      .then(response => {
        const disponibles = response.data.filter(lote => lote.estado === 'Disponible' && lote.cantidadDisponible > 0);
        setInventario(disponibles);
      })
      .catch(error => console.error("Error al cargar inventario:", error));
  }, []);

  const agregarAlCarrito = (lote, cantidad) => {
    const cantidadNumerica = parseInt(cantidad, 10);
    if (cantidadNumerica > 0 && cantidadNumerica <= lote.cantidadDisponible) {
      setCarrito(prev => [...prev, { ...lote, cantidadPedido: cantidadNumerica }]);
      alert(`${cantidadNumerica} unidades de ${lote.tipoProducto} añadidas al carrito.`);
    } else {
      alert("Cantidad no válida o excede el stock.");
    }
  };

  const handleCrearPedido = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    if (!fechaEntrega) {
      alert("Por favor, selecciona una fecha de entrega.");
      return;
    }

    const pedidoData = {
      clienteId: user.clienteId,
      fechaEntrega,
      detalles: carrito.map(item => ({
        loteId: item.id,
        cantidad: item.cantidadPedido
      }))
    };

    pedidoService.crearPedido(pedidoData)
      .then(() => {
        alert("¡Pedido creado exitosamente!");
        navigate('/mis-pedidos');
      })
      .catch(error => {
        console.error("Error al crear el pedido:", error);
        alert("Hubo un error al crear el pedido.");
      });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">Crear Nuevo Pedido</h2>
        <p className="text-gray-600 text-center mb-10">Selecciona productos disponibles y define una fecha de entrega</p>

        {/* Lista de Productos */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {inventario.map(lote => (
            <div key={lote.id} className="bg-white border border-blue-200 rounded-xl p-6 shadow hover:shadow-lg transition">
              <p className="text-lg font-semibold text-blue-800 mb-1">{lote.tipoProducto}</p>
              <p className="text-sm text-gray-500 mb-3">Lote: <strong>{lote.codigoLote}</strong></p>
              <p className="text-sm text-gray-600">Disponible: {lote.cantidadDisponible}</p>
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max={lote.cantidadDisponible}
                  placeholder="Cantidad"
                  id={`cantidad-${lote.id}`}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <button
                  onClick={() => agregarAlCarrito(lote, document.getElementById(`cantidad-${lote.id}`).value)}
                  className="bg-blue-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  Añadir
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del Pedido */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">Resumen del Pedido</h3>
          {carrito.length === 0 ? (
            <p className="text-sm text-gray-500">Aún no has añadido productos al carrito.</p>
          ) : (
            <ul className="text-sm text-blue-900 list-disc pl-5 space-y-1">
              {carrito.map(item => (
                <li key={item.id}>{item.cantidadPedido} x {item.tipoProducto}</li>
              ))}
            </ul>
          )}

          {/* Fecha de entrega */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-blue-900 mb-1">Fecha de Entrega:</label>
            <input
              type="date"
              value={fechaEntrega}
              onChange={e => setFechaEntrega(e.target.value)}
              className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Botón de confirmación */}
        <div className="text-center">
          <button
            onClick={handleCrearPedido}
            className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    </section>
  );
}

export default CrearPedidoPage;
