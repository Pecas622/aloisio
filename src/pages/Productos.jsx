import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  obtenerProductos as getProductos,
  guardarProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/productosService";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ codigo: "", nombre: "", stock: 0, precio: 0, categoria: "" });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const datos = await getProductos();
      setProductos(datos);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (producto = null) => {
    if (producto) {
      setEditando(producto.id);
      setFormData(producto);
    } else {
      setEditando(null);
      setFormData({ codigo: "", nombre: "", stock: 0, precio: 0, categoria: "" });
    }
    setShowModal(true);
  };

  const guardar = async () => {
    if (!formData.codigo || !formData.nombre) {
      alert("Completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      if (editando) {
        await actualizarProducto(editando, formData);
      } else {
        await guardarProducto(formData);
      }
      setShowModal(false);
      await cargarProductos();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Eliminar producto?")) {
      setLoading(true);
      try {
        await eliminarProducto(id);
        await cargarProductos();
      } catch (error) {
        console.error("Error:", error);
        alert("Error al eliminar el producto");
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
          <h1>Productos</h1>
          <button className="btn btn-primary" onClick={() => abrirModal()} disabled={loading}>
            + Nuevo Producto
          </button>
        </div>

        {loading && <div className="alert alert-info">Cargando...</div>}

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.codigo}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.categoria}</td>
                  <td>
                    <span className={`badge ${prod.stock < 10 ? "bg-warning" : "bg-success"}`}>
                      {prod.stock}
                    </span>
                  </td>
                  <td>${prod.precio?.toLocaleString()}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => abrirModal(prod)} disabled={loading}>
                      <FiEdit />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminar(prod.id)} disabled={loading}>
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
                  <h5 className="modal-title">{editando ? "Editar" : "Nuevo"} Producto</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} disabled={loading}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Código</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.codigo}
                      onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.categoria}
                      onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                      disabled={loading}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.precio}
                      onChange={(e) => setFormData({ ...formData, precio: parseInt(e.target.value) })}
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
