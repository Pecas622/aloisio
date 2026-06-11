import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h3>Aloisio CRM</h3>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/clientes">Clientes</Link>
      <Link to="/ventas">Ventas</Link>
      <Link to="/presupuestos">Presupuestos</Link>
      <Link to="/servicios">Servicios</Link>
      <Link to="/reportes">Reportes</Link>
      
      <div className="mt-auto">
        <button className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2" onClick={logout}>
          <FiLogOut /> Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
