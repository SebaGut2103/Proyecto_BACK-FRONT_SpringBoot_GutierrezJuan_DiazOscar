// Ubicación: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';

// Importa tus nuevas páginas
import MisPedidosPage from './pages/MisPedidosPage';
import GestionInventarioPage from './pages/GestionInventarioPage';
import GestionUsuariosPage from './pages/GestionUsuariosPage'; // <-- Nueva importación
import CrearPedidoPage from './pages/CrearPedidoPage'; // <-- Nueva importación

// Un componente Dashboard que redirige según el rol
const Dashboard = () => {
    const { user } = useAuth();
    
    if (!user) return null;

    switch (user.rol) {
        case 'ROLE_ADMINISTRADOR':
            return <GestionUsuariosPage />; // Ahora el dashboard del admin es la gestión de usuarios
        case 'ROLE_OPERADOR':
            return <GestionInventarioPage />;
        case 'ROLE_CLIENTE':
            return <MisPedidosPage />;
        default:
            return <Navigate to="/login" />;
    }
};


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    {/* Rutas protegidas envueltas en el Layout Principal */}
                    <Route path="/*" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Routes>
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="mis-pedidos" element={<MisPedidosPage />} />
                                    <Route path="crear-pedido" element={<CrearPedidoPage />} />
                                    <Route path="inventario" element={<GestionInventarioPage />} />
                                    <Route path="admin/usuarios" element={<GestionUsuariosPage />} />
                                    {/* Aquí añadirías la ruta de reportes */}
                                    <Route path="*" element={<Navigate to="/dashboard" />} />
                                </Routes>
                            </MainLayout>
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;