// Ubicación: src/services/loteService.js
import apiClient from './api';

const getInventario = () => {
    return apiClient.get('/lotes');
};

const marcarComoDefectuoso = (id) => {
    return apiClient.patch(`/lotes/${id}/marcar-defectuoso`);
};

const loteService = {
    getInventario,
    marcarComoDefectuoso
};

export default loteService;