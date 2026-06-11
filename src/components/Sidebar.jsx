import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      <div className={`sidebar ${open ? "active" : ""}`}>
        <h3>Aloisio CRM</h3>

        <Link to="/">Dashboard</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/ventas">Ventas</Link>
        <Link to="/presupuestos">Presupuestos</Link>
        <Link to="/servicios">Servicios</Link>
      </div>
    </>
  );
}