import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Registro</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Correo"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
