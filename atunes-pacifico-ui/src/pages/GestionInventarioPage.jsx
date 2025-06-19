// Ubicación: src/pages/GestionInventarioPage.jsx
import React, { useState, useEffect } from 'react';
import loteService from '../services/loteService';

function GestionInventarioPage() {
    const [lotes, setLotes] = useState([]);

    const fetchLotes = () => {
        loteService.getInventario()
            .then(response => setLotes(response.data))
            .catch(error => console.error("Error al obtener inventario:", error));
    };

    useEffect(() => {
        fetchLotes();
    }, []);

    const handleMarcarDefectuoso = (id) => {
        loteService.marcarComoDefectuoso(id)
            .then(() => {
                alert('Lote marcado como defectuoso');
                fetchLotes(); // Recargar la lista
            })
            .catch(error => alert('Error al marcar lote'));
    };

    return (
        <div>
            <h2>Gestión de Inventario</h2>
            <table>
                <thead>
                    <tr>
                        <th>Código Lote</th>
                        <th>Tipo</th>
                        <th>Cantidad Disponible</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lotes.map(lote => (
                        <tr key={lote.id}>
                            <td>{lote.codigoLote}</td>
                            <td>{lote.tipoProducto}</td>
                            <td>{lote.cantidadDisponible}</td>
                            <td>{lote.estado}</td>
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