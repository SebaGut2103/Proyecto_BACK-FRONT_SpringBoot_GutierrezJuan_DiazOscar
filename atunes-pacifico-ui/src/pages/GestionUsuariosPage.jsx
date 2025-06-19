// Ubicación: src/pages/GestionUsuariosPage.jsx
import React, { useState, useEffect } from 'react';
import usuarioService from '../services/usuarioService';
// Podríamos añadir un formulario en un modal para crear usuarios, pero por ahora nos centramos en la lista

function GestionUsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = () => {
        usuarioService.getAll()
            .then(response => setUsuarios(response.data))
            .catch(error => console.error("Error al obtener usuarios:", error));
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleCambiarEstado = (id, estadoActual) => {
        const nuevoEstado = !estadoActual;
        usuarioService.cambiarEstado(id, nuevoEstado)
            .then(() => {
                alert(`Usuario ${nuevoEstado ? 'activado' : 'desactivado'} correctamente.`);
                fetchUsuarios(); // Recargamos la lista para ver el cambio
            })
            .catch(error => alert("Error al cambiar el estado del usuario."));
    };

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
                        <th>Acciones</th>
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
                            <td>
                                <button onClick={() => handleCambiarEstado(usuario.id, usuario.estaActivo)}>
                                    {usuario.estaActivo ? 'Desactivar' : 'Activar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionUsuariosPage;