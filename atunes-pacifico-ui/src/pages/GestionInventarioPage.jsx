// Ubicación: src/pages/GestionInventarioPage.jsx
import React, { useState, useEffect } from 'react';
import loteService from '../services/loteService';

function GestionInventarioPage() {
    const [lotes, setLotes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para el formulario de nuevo lote
    const [codigoLote, setCodigoLote] = useState('');
    const [fechaProduccion, setFechaProduccion] = useState('');
    const [tipoProducto, setTipoProducto] = useState('AtunAceite'); // Valor por defecto
    const [cantidadProducida, setCantidadProducida] = useState('');

    const fetchLotes = () => {
        setLoading(true);
        loteService.getInventario()
            .then(response => {
                setLotes(response.data);
            })
            .catch(error => console.error("Error al obtener inventario:", error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchLotes();
    }, []);

    const handleMarcarDefectuoso = (id) => {
        if (window.confirm('¿Estás seguro de que quieres marcar este lote como defectuoso?')) {
            loteService.marcarComoDefectuoso(id)
                .then(() => {
                    alert('Lote marcado como defectuoso');
                    fetchLotes(); 
                })
                .catch(error => alert('Error al marcar el lote: ' + (error.response?.data || error.message)));
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
                alert('Nuevo lote registrado exitosamente.');
                
                setCodigoLote('');
                setFechaProduccion('');
                setCantidadProducida('');
                fetchLotes();
            })
            .catch(error => alert('Error al registrar el lote: ' + (error.response?.data || error.message)));
    };

    if (loading) return <p>Cargando inventario...</p>;

    return (
        <div>
            <h2>Gestión de Inventario</h2>
            
            {/* Formulario para registrar nuevos lotes */}
            <div style={{ border: '1px solid #000', padding: '1rem', marginBottom: '2rem' }}>
                <h3>Registrar Nuevo Lote</h3>
                <form onSubmit={handleRegistrarLote}>
                    <input type="text" placeholder="Código del Lote" value={codigoLote} onChange={e => setCodigoLote(e.target.value)} required />
                    <input type="date" value={fechaProduccion} onChange={e => setFechaProduccion(e.target.value)} required />
                    <select value={tipoProducto} onChange={e => setTipoProducto(e.target.value)} required>
                        <option value="AtunAceite">Atún en Aceite</option>
                        <option value="AtunAgua">Atún en Agua</option>
                        <option value="AtunSalsa">Atún en Salsa</option>
                    </select>
                    <input type="number" placeholder="Cantidad Producida" value={cantidadProducida} onChange={e => setCantidadProducida(e.target.value)} required min="1" />
                    <button type="submit">Registrar</button>
                </form>
            </div>

            {/* Tabla de inventario */}
            <h3>Inventario Actual</h3>
            <table>
                <thead>
                    <tr>
                        <th>Código Lote</th>
                        <th>Tipo</th>
                        <th>Producido</th>
                        <th>Disponible</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lotes.map(lote => (
                        <tr key={lote.id}>
                            <td>{lote.codigoLote}</td>
                            <td>{lote.tipoProducto}</td>
                            <td>{lote.cantidadProducida}</td>
                            <td>{lote.cantidadDisponible}</td>
                            <td style={{ fontWeight: 'bold', color: lote.estado === 'Defectuoso' ? 'red' : 'green' }}>
                                {lote.estado}
                            </td>
                            <td>
                                {lote.estado === 'Disponible' && (
                                    <button onClick={() => handleMarcarDefectuoso(lote.id)}>
                                        Marcar como Defectuoso
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionInventarioPage;