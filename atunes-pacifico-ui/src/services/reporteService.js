import apiClient from './api';

const getVentasPorProducto = () => {
    return apiClient.get('/reportes/ventas-por-producto');
};

const getVentasPorCliente = () => {
    return apiClient.get('/reportes/ventas-por-cliente');
};

const reporteService = {
    getVentasPorProducto,
    getVentasPorCliente,
};

export default reporteService;