// Ubicación: src/pages/GestionUsuariosPage.jsx
import React, { useState, useEffect } from 'react';
import usuarioService from '../services/usuarioService';

function GestionUsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Este efecto se ejecuta una sola vez cuando el componente se monta
        usuarioService.getAll()
            .then(response => {
                setUsuarios(response.data);
            })
            .catch(err => {
                console.error("Error detallado al obtener usuarios:", err);
                setError("No se pudieron cargar los usuarios. ¿Tienes los permisos necesarios?");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // El array vacío asegura que solo se ejecute una vez

    if (loading) return <p>Cargando lista de usuarios...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Gestión de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre de Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombreUsuario}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.nombreRol}</td>
                            <td>{usuario.estaActivo ? 'Activo' : 'Inactivo'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionUsuariosPage;