import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

import {
    obtenerVentas,
    guardarVenta,
    eliminarVentaDB,
} from "../services/ventasService";

export default function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [loading, setLoading] = useState(false);

    const [nuevaVenta, setNuevaVenta] = useState({
        cliente: "",
        monto: "",
        estado: "Pendiente",
    });

    useEffect(() => {
        cargarVentas();
    }, []);

    const cargarVentas = async () => {
        try {
            setLoading(true);
            const datos = await obtenerVentas();
            setVentas(datos);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const agregarVenta = async () => {
        if (!nuevaVenta.cliente || !nuevaVenta.monto) {
            alert("Completá todos los campos");
            return;
        }

        try {
            setLoading(true);

            await guardarVenta({
                cliente: nuevaVenta.cliente,
                monto: Number(nuevaVenta.monto),
                fecha: new Date().toISOString(),
                estado: nuevaVenta.estado,
            });

            setNuevaVenta({
                cliente: "",
                monto: "",
                estado: "Pendiente",
            });

            setMostrarFormulario(false);

            await cargarVentas();
        } catch (error) {
            console.error(error);
            alert("Error al guardar");
        } finally {
            setLoading(false);
        }
    };

    const eliminarVenta = async (id) => {
        if (!window.confirm("¿Eliminar venta?")) return;

        try {
            await eliminarVentaDB(id);
            await cargarVentas();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar");
        }
    };

    const ventasFiltradas = filtroEstado
        ? ventas.filter((v) => v.estado === filtroEstado)
        : ventas;

    const totalVentas = ventasFiltradas.reduce(
        (acc, venta) => acc + Number(venta.monto || 0),
        0
    );

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Ventas</h1>

                    <button
                        className="btn btn-primary"
                        onClick={() => setMostrarFormulario(!mostrarFormulario)}
                    >
                        + Nueva Venta
                    </button>
                </div>

                {mostrarFormulario && (
                    <div className="card p-3 mb-4">
                        <h4 className="mb-3">Nueva Venta</h4>

                        <input
                            className="form-control mb-2"
                            placeholder="Cliente"
                            value={nuevaVenta.cliente}
                            onChange={(e) =>
                                setNuevaVenta({
                                    ...nuevaVenta,
                                    cliente: e.target.value,
                                })
                            }
                        />

                        <input
                            className="form-control mb-2"
                            type="number"
                            placeholder="Monto"
                            value={nuevaVenta.monto}
                            onChange={(e) =>
                                setNuevaVenta({
                                    ...nuevaVenta,
                                    monto: e.target.value,
                                })
                            }
                        />

                        <select
                            className="form-select mb-3"
                            value={nuevaVenta.estado}
                            onChange={(e) =>
                                setNuevaVenta({
                                    ...nuevaVenta,
                                    estado: e.target.value,
                                })
                            }
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Completada">Completada</option>
                            <option value="En Progreso">En Progreso</option>
                        </select>

                        <button
                            className="btn btn-success"
                            onClick={agregarVenta}
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : "Guardar Venta"}
                        </button>
                    </div>
                )}

                <div className="row mb-4">
                    <div className="col-md-3">
                        <div className="card bg-primary text-white p-3">
                            <h6>Total Ventas</h6>
                            <h3>{ventas.length}</h3>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card bg-success text-white p-3">
                            <h6>Facturación</h6>
                            <h3>${(totalVentas / 1000000).toFixed(2)}M</h3>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card bg-warning text-dark p-3">
                            <h6>Pendientes</h6>
                            <h3>
                                {ventas.filter((v) => v.estado === "Pendiente").length}
                            </h3>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card bg-info text-white p-3">
                            <h6>Completadas</h6>
                            <h3>
                                {ventas.filter((v) => v.estado === "Completada").length}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <select
                        className="form-select"
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                        <option value="">Todas las ventas</option>
                        <option value="Completada">Completadas</option>
                        <option value="Pendiente">Pendientes</option>
                        <option value="En Progreso">En Progreso</option>
                    </select>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Cliente</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ventasFiltradas.map((venta) => (
                                <tr key={venta.id}>
                                    <td>{venta.cliente}</td>

                                    <td>
                                        $
                                        {Number(venta.monto).toLocaleString("es-AR")}
                                    </td>

                                    <td>
                                        {venta.fecha
                                            ? new Date(
                                                venta.fecha
                                            ).toLocaleDateString("es-AR")
                                            : "-"}
                                    </td>

                                    <td>
                                        <span
                                            className={`badge bg-${venta.estado === "Completada"
                                                    ? "success"
                                                    : venta.estado === "Pendiente"
                                                        ? "warning"
                                                        : "info"
                                                }`}
                                        >
                                            {venta.estado}
                                        </span>
                                    </td>

                                    <td>
                                        <button className="btn btn-info btn-sm me-2">
                                            <FiEye />
                                        </button>

                                        <button className="btn btn-warning btn-sm me-2">
                                            <FiEdit />
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => eliminarVenta(venta.id)}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="alert alert-success mt-3">
                    <strong>Total facturado:</strong> $
                    {(totalVentas / 1000000).toFixed(2)}M
                </div>
            </div>
        </div>
    );
}