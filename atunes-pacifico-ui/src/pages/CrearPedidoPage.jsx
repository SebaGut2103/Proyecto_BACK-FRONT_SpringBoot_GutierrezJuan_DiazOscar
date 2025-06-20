// Ubicación: src/pages/CrearPedidoPage.jsx
import React, { useState, useEffect } from 'react';
import loteService from '../services/loteService';
import pedidoService from '../services/pedidoService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Para obtener el ID del cliente logueado

function CrearPedidoPage() {
    const [inventario, setInventario] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [fechaEntrega, setFechaEntrega] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth(); // Asumimos que el token JWT contiene el 'clienteId'

    useEffect(() => {
        // Solo traemos los lotes disponibles para la venta
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
            // Lógica para añadir o actualizar la cantidad en el carrito
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
            clienteId: user.clienteId, // Necesitarás asegurarte de que este dato venga en el JWT
            fechaEntrega: fechaEntrega,
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
        <div>
            <h2>Crear Nuevo Pedido</h2>
            <h3>Productos Disponibles</h3>
            {inventario.map(lote => (
                <div key={lote.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
                    <p><strong>{lote.tipoProducto}</strong> (Lote: {lote.codigoLote})</p>
                    <p>Disponible: {lote.cantidadDisponible}</p>
                    <input type="number" min="1" max={lote.cantidadDisponible} placeholder="Cantidad" id={`cantidad-${lote.id}`} />
                    <button onClick={() => agregarAlCarrito(lote, document.getElementById(`cantidad-${lote.id}`).value)}>
                        Añadir al Carrito
                    </button>
                </div>
            ))}
            
            <hr />

            <h3>Resumen del Pedido</h3>
            <ul>
                {carrito.map(item => <li key={item.id}>{item.cantidadPedido} x {item.tipoProducto}</li>)}
            </ul>
            <label>Fecha de Entrega:</label>
            <input type="date" value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} />
            <br />
            <button onClick={handleCrearPedido} style={{ marginTop: '20px', padding: '10px' }}>
                Confirmar Pedido
            </button>
        </div>
    );
}

export default CrearPedidoPage;