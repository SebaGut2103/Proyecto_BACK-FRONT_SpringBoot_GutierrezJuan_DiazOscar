import apiClient from './api';

const getVentasPorProducto = () => {
    return apiClient.get('/reportes/ventas-por-producto');
};

const reporteService = {
    getVentasPorProducto
};

export default reporteService;