// Ubicación: src/services/pedidoService.js
import apiClient from './api';

// Suponiendo que tu backend tiene un endpoint /pedidos/mis-pedidos
const getMisPedidos = () => {
    return apiClient.get('/pedidos/mis-pedidos'); // Necesitarás crear este endpoint en el backend
};

const crearPedido = (pedidoData) => {
    return apiClient.post('/pedidos', pedidoData);
};

const pedidoService = {
    getMisPedidos,
    crearPedido
};

export default pedidoService;