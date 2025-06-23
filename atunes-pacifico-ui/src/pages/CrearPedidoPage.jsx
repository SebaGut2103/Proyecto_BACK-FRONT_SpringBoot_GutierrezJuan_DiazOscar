import React, { useState, useEffect } from 'react';
import loteService from '../services/loteService';
import pedidoService from '../services/pedidoService';
import { useNavigate } from 'react-router-dom';

function CrearPedidoPage() {
    const [inventario, setInventario] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loteService.getInventario()
            .then(response => {
                const disponibles = response.data.filter(lote => lote.estado === 'Disponible' && lote.cantidadDisponible > 0);
                setInventario(disponibles);
            })
            .catch(error => console.error("Error al cargar inventario:", error))
            .finally(() => setLoading(false));
    }, []);

    const agregarAlCarrito = (lote, cantidadInput) => {
        const cantidad = parseInt(cantidadInput, 10);
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor, introduce una cantidad válida.");
            return;
        }
        if (cantidad > lote.cantidadDisponible) {
            alert("La cantidad solicitada excede el stock disponible.");
            return;
        }

        
        
        setCarrito(prev => [...prev, { ...lote, cantidadPedido: cantidad }]);
        alert(`${cantidad} unidades de ${lote.tipoProducto} añadidas al carrito.`);
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
            fechaEntrega: fechaEntrega,
            detalles: carrito.map(item => ({
                loteId: item.id,
                cantidad: item.cantidadPedido
            }))
        };

        pedidoService.crearPedido(pedidoData)
            .then(() => {
                alert("¡Pedido creado exitosamente!");
                navigate('/historial-compras');
            })
            .catch(error => {
                console.error("Error al crear el pedido:", error);
                
                const mensajeError = error.response?.data || error.message;
                alert(`Hubo un error al crear el pedido: ${mensajeError}`);
            });
    };

    if (loading) return <p>Cargando productos disponibles...</p>;

    return (
        <div>
            <h2>Crear Nuevo Pedido</h2>
            <div style={{ marginBottom: '2rem' }}>
                <h3>Resumen del Pedido</h3>
                {carrito.length > 0 ? (
                    <ul>
                        {carrito.map((item, index) => <li key={`${item.id}-${index}`}>{item.cantidadPedido} x {item.tipoProducto} (Lote: {item.codigoLote})</li>)}
                    </ul>
                ) : (
                    <p>Tu carrito está vacío.</p>
                )}
                <label style={{ marginRight: '10px' }}>Fecha de Entrega Requerida:</label>
                <input type="date" value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} />
                <br />
                <button onClick={handleCrearPedido} disabled={carrito.length === 0 || !fechaEntrega} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>
                    Confirmar y Crear Pedido
                </button>
            </div>
            
            <hr />

            <h3>Productos Disponibles</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {inventario.map(lote => (
                    <div key={lote.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', minWidth: '250px' }}>
                        <p><strong>{lote.tipoProducto.replace('Atun', 'Atún ')}</strong></p>
                        <p><small>Lote: {lote.codigoLote}</small></p>
                        <p>Disponibles: {lote.cantidadDisponible}</p>
                        <div>
                            <input type="number" min="1" max={lote.cantidadDisponible} placeholder="Cantidad" id={`cantidad-${lote.id}`} style={{ width: '80px', marginRight: '10px' }}/>
                            <button onClick={() => agregarAlCarrito(lote, document.getElementById(`cantidad-${lote.id}`).value)}>
                                Añadir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CrearPedidoPage;