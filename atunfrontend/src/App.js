import logo from "./fish.svg"; // Ajusta la ruta según tu proyecto
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="bg-blue-700 text-white py-6 shadow-md flex flex-row justify-between items-center px-8">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
          <h1 className="text-lg font-semibold">Atunes del Pacifico S.A</h1>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-blue-100 transition">
            Iniciar Sesión
          </button>
          <button className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-blue-100 transition">
            Registrar
          </button>
        </div>
      </header>

      <section>
        <div className="bg-blue-100 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Bienvenido a Atunes del Pacifico S.A
          </h2>
          <p className="text-lg">
            La mejor calidad en atún del Pacífico, directo a tu mesa.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
