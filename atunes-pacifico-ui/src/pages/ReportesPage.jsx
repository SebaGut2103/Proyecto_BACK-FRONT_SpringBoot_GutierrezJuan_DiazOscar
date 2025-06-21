// Ubicación: src/pages/ReportesPage.jsx
import React, { useState, useEffect } from 'react';
import reporteService from '../services/reporteService';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportesPage() {
    const [ventasData, setVentasData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        reporteService.getVentasPorProducto()
            .then(response => {
                const dataFromApi = response.data;

                
                const chartData = {
                    labels: dataFromApi.map(d => d.tipoProducto.replace('Atun', 'Atún ')), 
                    datasets: [
                        {
                            label: 'Total de Ventas ($)',
                            data: dataFromApi.map(d => d.totalVentas),
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        }
                    ]
                };
                setVentasData(chartData);
            })
            .catch(error => console.error("Error al cargar reporte:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Generando reporte de ventas...</p>;

    return (
        <div>
            <h2>Reportes de la Empresa</h2>
            <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Ventas Totales por Tipo de Producto</h3>
                {ventasData ? (
                    <Bar 
                        data={ventasData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Rendimiento de Ventas' }
                            }
                        }}
                    />
                ) : (
                    <p>No hay datos de ventas para mostrar.</p>
                )}
            </div>
        </div>
    );
}

export default ReportesPage;