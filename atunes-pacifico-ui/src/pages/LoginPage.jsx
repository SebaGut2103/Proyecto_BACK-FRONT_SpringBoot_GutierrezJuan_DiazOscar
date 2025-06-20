// Ubicación: src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const loggedInUser = await login(username, password);
            
            // Redirigimos basándonos en el rol del usuario que nos devuelve la función de login
            switch (loggedInUser.rol) {
                case 'ADMINISTRADOR':
                    navigate('/admin/usuarios');
                    break;
                case 'OPERADOR':
                    navigate('/inventario');
                    break;
                case 'CLIENTE':
                    navigate('/mis-pedidos');
                    break;
                default:
                    navigate('/dashboard');
            }
        } catch (err) {
            setError('Usuario o contraseña incorrectos.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default LoginPage;