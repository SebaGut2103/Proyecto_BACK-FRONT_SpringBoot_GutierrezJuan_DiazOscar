import React, { useState, useEffect } from 'react';
import usuarioService from '../services/usuarioService';

function GestionUsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    usuarioService
      .getAll()
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((err) => {
        console.error("Error detallado al obtener usuarios:", err);
        setError("No se pudieron cargar los usuarios. ¿Tienes los permisos necesarios?");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-blue-900 text-center mt-10">Cargando lista de usuarios...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-50 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Gestión de Usuarios</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-blue-100 text-blue-900 text-sm uppercase text-left">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Nombre de Usuario</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Rol</th>
                <th className="py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr
                  key={usuario.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                >
                  <td className="py-3 px-4 text-sm">{usuario.id}</td>
                  <td className="py-3 px-4 text-sm">{usuario.nombreUsuario}</td>
                  <td className="py-3 px-4 text-sm">{usuario.email}</td>
                  <td className="py-3 px-4 text-sm font-medium text-blue-800">{usuario.nombreRol}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${usuario.estaActivo ? 'bg-green-500' : 'bg-red-500'}`}>
                      {usuario.estaActivo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default GestionUsuariosPage;
