// Ubicación: src/pages/MisPedidosPage.jsx
import React, { useState, useEffect } from 'react';
import pedidoService from '../services/pedidoService';

function MisPedidosPage() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        pedidoService.getMisPedidos()
            .then(response => {
                setPedidos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al obtener los pedidos:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando pedidos...</p>;

    return (
        <div>
            <h2>Mis Pedidos</h2>
            <ul>
                {pedidos.map(pedido => (
                    <li key={pedido.id}>
                        Pedido #{pedido.id} - Fecha: {new Date(pedido.fechaPedido).toLocaleDateString()} - Total: ${pedido.precioTotal} - Estado: {pedido.estado}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MisPedidosPage;