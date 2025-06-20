// Ubicación: src/components/MainLayout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MainLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#eee' }}>
                <div>
                    <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
                    {/* Aquí podrías añadir más enlaces basados en el rol del usuario */}
                </div>
                <div>
                    <span>Bienvenido, {user?.nombreUsuario} ({user?.rol})</span>
                    <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Cerrar Sesión</button>
                </div>
            </nav>
            <main style={{ padding: '1rem' }}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;