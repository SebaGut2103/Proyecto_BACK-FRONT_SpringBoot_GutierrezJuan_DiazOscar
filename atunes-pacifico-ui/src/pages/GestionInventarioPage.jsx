import React, { useState, useEffect } from 'react';
import loteService from '../services/loteService';

function GestionInventarioPage() {
  const [lotes, setLotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [codigoLote, setCodigoLote] = useState('');
  const [fechaProduccion, setFechaProduccion] = useState('');
  const [tipoProducto, setTipoProducto] = useState('AtunAceite');
  const [cantidadProducida, setCantidadProducida] = useState('');

  const fetchLotes = () => {
    setLoading(true);
    loteService.getInventario()
      .then(response => setLotes(response.data))
      .catch(error => console.error("Error al obtener inventario:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLotes();
  }, []);

  const handleMarcarDefectuoso = (id) => {
    if (window.confirm('¿Marcar este lote como defectuoso?')) {
      loteService.marcarComoDefectuoso(id)
        .then(() => {
          alert('Lote marcado como defectuoso');
          fetchLotes();
        })
        .catch(error => alert('Error: ' + (error.response?.data || error.message)));
    }
  };

  const handleRegistrarLote = (e) => {
    e.preventDefault();
    const nuevoLote = {
      codigoLote,
      fechaProduccion,
      tipoProducto,
      cantidadProducida: parseInt(cantidadProducida, 10)
    };

    loteService.registrarLote(nuevoLote)
      .then(() => {
        alert('Nuevo lote registrado');
        setCodigoLote('');
        setFechaProduccion('');
        setCantidadProducida('');
        fetchLotes();
      })
      .catch(error => alert('Error: ' + (error.response?.data || error.message)));
  };

  if (loading) return <p className="text-blue-900 text-center mt-10">Cargando inventario...</p>;

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-50 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Gestión de Inventario</h2>

        {/* Formulario de nuevo lote */}
        <div className="bg-blue-50 rounded-xl p-6 mb-10 border border-blue-200 shadow-sm">
          <h3 className="text-xl font-semibold text-blue-800 mb-6">Registrar Nuevo Lote</h3>
          <form onSubmit={handleRegistrarLote} className="grid gap-y-4">
            <div className="bg-white border border-blue-200 rounded-xl px-4 py-3 shadow-sm">
              <label className="text-sm font-medium text-blue-800 block mb-1">Código del Lote</label>
              <input
                type="text"
                value={codigoLote}
                onChange={e => setCodigoLote(e.target.value)}
                required
                placeholder="Ej: A-100"
                className="w-full bg-gray-50 border-none focus:ring-0 text-sm p-2 rounded-md"
              />
            </div>

            <div className="bg-white border border-blue-200 rounded-xl px-4 py-3 shadow-sm">
              <label className="text-sm font-medium text-blue-800 block mb-1">Fecha de Producción</label>
              <input
                type="date"
                value={fechaProduccion}
                onChange={e => setFechaProduccion(e.target.value)}
                required
                className="w-full bg-gray-50 border-none focus:ring-0 text-sm p-2 rounded-md"
              />
            </div>

            <div className="bg-white border border-blue-200 rounded-xl px-4 py-3 shadow-sm">
              <label className="text-sm font-medium text-blue-800 block mb-1">Tipo de Producto</label>
              <select
                value={tipoProducto}
                onChange={e => setTipoProducto(e.target.value)}
                className="w-full bg-gray-50 border-none focus:ring-0 text-sm p-2 rounded-md"
                required
              >
                <option value="AtunAceite">Atún en Aceite</option>
                <option value="AtunAgua">Atún en Agua</option>
                <option value="AtunSalsa">Atún en Salsa</option>
              </select>
            </div>

            <div className="bg-white border border-blue-200 rounded-xl px-4 py-3 shadow-sm">
              <label className="text-sm font-medium text-blue-800 block mb-1">Cantidad Producida</label>
              <input
                type="number"
                min="1"
                value={cantidadProducida}
                onChange={e => setCantidadProducida(e.target.value)}
                required
                placeholder="Ej: 500"
                className="w-full bg-gray-50 border-none focus:ring-0 text-sm p-2 rounded-md"
              />
            </div>

            <div className="text-right pt-2">
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg shadow-md transition"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de lotes */}
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Inventario Actual</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-blue-100 text-blue-900 uppercase text-left">
              <tr>
                <th className="py-3 px-4">Código Lote</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Producido</th>
                <th className="py-3 px-4">Disponible</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lotes.map((lote, index) => (
                <tr
                  key={lote.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                >
                  <td className="py-3 px-4">{lote.codigoLote}</td>
                  <td className="py-3 px-4">{lote.tipoProducto}</td>
                  <td className="py-3 px-4">{lote.cantidadProducida}</td>
                  <td className="py-3 px-4">{lote.cantidadDisponible}</td>
                  <td className="py-3 px-4 font-semibold text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs ${
                        lote.estado === 'Defectuoso' ? 'bg-red-500' : 'bg-green-500'
                      }`}
                    >
                      {lote.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {lote.estado === 'Disponible' && (
                      <button
                        onClick={() => handleMarcarDefectuoso(lote.id)}
                        className="text-red-600 font-medium hover:underline"
                      >
                        Marcar Defectuoso
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default GestionInventarioPage;
