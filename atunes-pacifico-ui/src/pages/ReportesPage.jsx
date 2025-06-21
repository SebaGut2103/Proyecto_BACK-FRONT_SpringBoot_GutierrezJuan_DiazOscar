import React, { useState, useEffect } from 'react';
import reporteService from '../services/reporteService';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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
              backgroundColor: 'rgba(37, 99, 235, 0.6)',
              borderColor: 'rgba(30, 58, 138, 1)',
              borderWidth: 1,
              borderRadius: 6
            }
          ]
        };
        setVentasData(chartData);
      })
      .catch(error => console.error("Error al cargar reporte:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-sky-50 text-blue-900 text-lg font-medium">
        Generando reporte de ventas...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">Reportes de la Empresa</h2>
        <p className="text-gray-600 text-center mb-8">Resumen gráfico de las ventas por tipo de producto</p>

        <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
          <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">Ventas Totales por Tipo de Producto</h3>
          {ventasData ? (
            <Bar
              data={ventasData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: '#1e3a8a',
                      font: { size: 14 }
                    }
                  },
                  title: {
                    display: true,
                    text: 'Rendimiento de Ventas',
                    color: '#1e3a8a',
                    font: {
                      size: 18,
                      weight: 'bold'
                    }
                  }
                },
                scales: {
                  x: {
                    ticks: { color: '#1e3a8a' },
                    grid: { color: '#cbd5e1' }
                  },
                  y: {
                    ticks: { color: '#1e3a8a' },
                    grid: { color: '#e2e8f0' }
                  }
                }
              }}
            />
          ) : (
            <p className="text-center text-gray-500">No hay datos de ventas para mostrar.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ReportesPage;
