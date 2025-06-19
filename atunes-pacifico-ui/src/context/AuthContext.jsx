// Ubicación: src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode'; // Necesitarás instalar jwt-decode: npm install jwt-decode

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            return jwtDecode(token); // Decodificamos el token para obtener los datos del usuario
        }
        return null;
    });

    const login = async (username, password) => {
        try {
            const response = await authService.login(username, password);
            const token = response.data.token;
            localStorage.setItem('token', token);
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
        } catch (error) {
            console.error("Error en el login:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
    return useContext(AuthContext);
};