import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  obtenerClientes as getClientes,
  guardarCliente,
  actualizarCliente,
  eliminarCliente,
} from "../services/clientesService";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    razonSocial: "", 
    cuit: "", 
    telefono: "", 
    email: "", 
    direccion: "" 
  });

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    setLoading(true);
    try {
      const datos = await getClientes();
      setClientes(datos);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (cliente = null) => {
    if (cliente) {
      setEditando(cliente.id);
      setFormData(cliente);
    } else {
      setEditando(null);
      setFormData({ razonSocial: "", cuit: "", telefono: "", email: "", direccion: "" });
    }
    setShowModal(true);
  };

  const guardar = async () => {
    if (!formData.razonSocial || !formData.email) {
      alert("Completa los campos requeridos");
      return;
    }

    setLoading(true);
    try {
      if (editando) {
        await actualizarCliente(editando, formData);
      } else {
        await guardarCliente(formData);
      }
      setShowModal(false);
      await cargarClientes();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar el cliente");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Eliminar cliente?")) {
      setLoading(true);
      try {
        await eliminarCliente(id);
        await cargarClientes();
      } catch (error) {
        console.error("Error:", error);
        alert("Error al eliminar el cliente");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Clientes</h1>
          <button className="btn btn-primary" onClick={() => abrirModal()} disabled={loading}>
            + Nuevo Cliente
          </button>
        </div>

        {loading && <div className="alert alert-info">Cargando...</div>}

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Razón Social</th>
                <th>CUIT</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.razonSocial}</td>
                  <td>{cliente.cuit}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.direccion}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => abrirModal(cliente)} disabled={loading}>
                      <FiEdit />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminar(cliente.id)} disabled={loading}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editando ? "Editar" : "Nuevo"} Cliente</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} disabled={loading}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Razón Social *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.razonSocial}
                      onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">CUIT</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.cuit}
                      onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
                      placeholder="XX-XXXXXXXX-X"
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.direccion}
                      onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={loading}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-primary" onClick={guardar} disabled={loading}>
                    {loading ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
