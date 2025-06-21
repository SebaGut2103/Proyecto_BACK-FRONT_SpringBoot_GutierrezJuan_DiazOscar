"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const loggedInUser = await login(username, password)

      switch (loggedInUser.rol) {
        case "ADMINISTRADOR":
          navigate("/admin/usuarios")
          break
        case "OPERADOR":
          navigate("/inventario")
          break
        case "CLIENTE":
          navigate("/mis-pedidos")
          break
        default:
          navigate("/dashboard")
      }
    } catch (err) {
      setError("Usuario o contraseña incorrectos.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-50 px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        {/* Header con logo estilo producto */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-900 text-white flex items-center justify-center rounded-full mx-auto shadow-lg text-4xl">
            🐟
          </div>
          <h1 className="text-2xl font-bold text-blue-900 mt-4">Atunes del Pacífico</h1>
          <p className="text-gray-600 text-sm">Sistema de Gestión Empresarial</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="usuario@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="****"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Cargando...</span>
              </div>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="text-center text-xs text-gray-400 mt-8 pt-4 border-t">
          © 2024 Atunes del Pacífico S.A.
        </div>
      </div>
    </section>
  )
}

export default LoginPage