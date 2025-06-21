// Ubicación: src/components/MainLayout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MainLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirige al login después de cerrar sesión
    };

    return (
        <div>
            <nav style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem', 
                background: '#004481', // Un color corporativo
                color: 'white'
            }}>
                <div>
                    {/* Enlace al Dashboard principal, visible para todos los usuarios logueados */}
                    <Link to="/dashboard" style={{ marginRight: '1rem', color: 'white', textDecoration: 'none' }}>
                        Dashboard Principal
                    </Link>
                    
                    {/* --- ENLACES ESPECÍFICOS POR ROL --- */}
                    
                    {/* Enlaces para el rol de CLIENTE */}
                    {user?.rol === 'CLIENTE' && (
                        <>
                            <Link to="/crear-pedido" style={{ marginRight: '1rem', color: 'white', textDecoration: 'none' }}>
                                Crear Pedido
                            </Link>
                            <Link to="/historial-compras" style={{ marginRight: '1rem', color: 'white', textDecoration: 'none' }}>
                                Mi Historial
                            </Link>
                        </>
                    )}

                    {/* Enlaces para el rol de OPERADOR (y también para el ADMIN) */}
                    {(user?.rol === 'OPERADOR' || user?.rol === 'ADMINISTRADOR') && (
                        <Link to="/inventario" style={{ marginRight: '1rem', color: 'white', textDecoration: 'none' }}>
                            Gestionar Inventario
                        </Link>
                    )}

                    {/* Enlaces solo para el rol de ADMINISTRADOR */}
                     {user?.rol === 'ADMINISTRADOR' && (
                        <>
                            <Link to="/admin/usuarios" style={{ marginRight: '1rem', color: 'white', textDecoration: 'none' }}>
                                Gestionar Usuarios
                            </Link>
                            <Link to="/reportes" style={{ marginRight: '1rem', color: 'white', textDecoration: 'none' }}>
                                Reportes
                            </Link>
                        </>
                    )}
                </div>
                <div>
                    <span>Bienvenido, {user?.nombreUsuario}</span>
                    <button 
                        onClick={handleLogout} 
                        style={{ 
                            marginLeft: '1rem', 
                            background: '#ff4d4d', 
                            color: 'white', 
                            border: 'none', 
                            padding: '8px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </nav>
            <main style={{ padding: '1.5rem' }}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;