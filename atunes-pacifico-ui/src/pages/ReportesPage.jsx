// Ubicación: src/pages/ReportesPage.jsx
import React, { useState, useEffect } from 'react';
import reporteService from '../services/reporteService';
import { Bar, Pie } from 'react-chartjs-2'; // Importamos el componente para el gráfico de Torta
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement 
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement 
);

function ReportesPage() {
    const [ventasProductoData, setVentasProductoData] = useState(null);
    const [ventasClienteData, setVentasClienteData] = useState(null); // Nuevo estado para el reporte de clientes

    useEffect(() => {
        
        reporteService.getVentasPorProducto()
            .then(response => {
                const dataFromApi = response.data;
                const chartData = {
                    labels: dataFromApi.map(d => d.tipoProducto.replace('Atun', 'Atún ')),
                    datasets: [{
                        label: 'Total de Ventas ($)',
                        data: dataFromApi.map(d => d.totalVentas),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    }]
                };
                setVentasProductoData(chartData);
            })
            .catch(error => console.error("Error al cargar reporte de productos:", error));

        
        reporteService.getVentasPorCliente()
            .then(response => {
                const dataFromApi = response.data;
                const chartData = {
                    labels: dataFromApi.map(d => d.nombreCliente),
                    datasets: [{
                        label: 'Total Comprado ($)',
                        data: dataFromApi.map(d => d.totalComprado),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)'
                        ],
                        borderWidth: 1,
                    }]
                };
                setVentasClienteData(chartData);
            })
            .catch(error => console.error("Error al cargar reporte de clientes:", error));
    }, []);

    return (
        <div>
            <h2>Reportes de la Empresa</h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                {/* Contenedor para el Gráfico de Ventas por Producto */}
                <div style={{ flex: '1 1 45%', minWidth: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
                    <h3>Ventas Totales por Tipo de Producto</h3>
                    {ventasProductoData ? <Bar data={ventasProductoData} /> : <p>Cargando reporte...</p>}
                </div>

                {/* Contenedor para el Gráfico de Ventas por Cliente */}
                <div style={{ flex: '1 1 45%', minWidth: '400px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
                    <h3>Contribución de Ventas por Cliente</h3>
                    {ventasClienteData ? <Pie data={ventasClienteData} /> : <p>Cargando reporte...</p>}
                </div>
            </div>
        </div>
    );
}

export default ReportesPage;