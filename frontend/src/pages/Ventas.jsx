import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
    obtenerVentas,
    guardarVenta,
    eliminarVentaDB,
} from "../services/ventasService";

export default function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [cliente, setCliente] = useState("");
    const [monto, setMonto] = useState("");
    const [estado, setEstado] = useState("Pendiente");
    const [filtroEstado, setFiltroEstado] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cargarVentas();
    }, []);

    const cargarVentas = async () => {
        try {
            setLoading(true);
            const datos = await obtenerVentas();
            setVentas(datos);
        } catch (error) {
            console.error("Error cargando ventas:", error);
        } finally {
            setLoading(false);
        }
    };

    const agregarVenta = async () => {
        if (!cliente || !monto) {
            alert("Complete todos los campos");
            return;
        }

        try {
            setLoading(true);

            const nuevaVenta = {
                cliente,
                monto: Number(monto),
                fecha: new Date().toISOString(),
                estado,
            };

            await guardarVenta(nuevaVenta);

            setCliente("");
            setMonto("");
            setEstado("Pendiente");

            await cargarVentas();
        } catch (error) {
            console.error(error);
            alert("Error al guardar la venta");
        } finally {
            setLoading(false);
        }
    };

    const eliminarVenta = async (id) => {
        if (!window.confirm("¿Eliminar venta?")) return;

        try {
            setLoading(true);
            await eliminarVentaDB(id);
            await cargarVentas();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar");
        } finally {
            setLoading(false);
        }
    };

    const ventasFiltradas = filtroEstado
        ? ventas.filter((v) => v.estado === filtroEstado)
        : ventas;

    const totalFacturado = ventasFiltradas.reduce(
        (acc, venta) => acc + (venta.monto || 0),
        0
    );

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="flex-grow-1 p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Ventas</h1>
                </div>

                {/* CARDS */}

                <div className="row mb-4">

                    <div className="col-md-3">
                        <div className="card shadow border-0 bg-primary text-white">
                            <div className="card-body">
                                <h6>Total Ventas</h6>
                                <h2>{ventas.length}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow border-0 bg-success text-white">
                            <div className="card-body">
                                <h6>Facturación</h6>
                                <h2>
                                    ${(totalFacturado / 1000000).toFixed(2)}M
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow border-0 bg-warning">
                            <div className="card-body">
                                <h6>Pendientes</h6>
                                <h2>
                                    {
                                        ventas.filter(
                                            (v) => v.estado === "Pendiente"
                                        ).length
                                    }
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow border-0 bg-info text-white">
                            <div className="card-body">
                                <h6>Completadas</h6>
                                <h2>
                                    {
                                        ventas.filter(
                                            (v) => v.estado === "Completada"
                                        ).length
                                    }
                                </h2>
                            </div>
                        </div>
                    </div>

                </div>

                {/* FORMULARIO */}

                <div className="card shadow border-0 mb-4">
                    <div className="card-header">
                        <h5 className="mb-0">Nueva Venta</h5>
                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-4">
                                <input
                                    className="form-control"
                                    placeholder="Cliente"
                                    value={cliente}
                                    onChange={(e) => setCliente(e.target.value)}
                                />
                            </div>

                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder="Monto"
                                    value={monto}
                                    onChange={(e) => setMonto(e.target.value)}
                                />
                            </div>

                            <div className="col-md-3">
                                <select
                                    className="form-select"
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                >
                                    <option value="Pendiente">
                                        Pendiente
                                    </option>

                                    <option value="Completada">
                                        Completada
                                    </option>

                                    <option value="En Progreso">
                                        En Progreso
                                    </option>
                                </select>
                            </div>

                            <div className="col-md-2">
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={agregarVenta}
                                    disabled={loading}
                                >
                                    {loading ? "Guardando..." : "Guardar"}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

                {/* FILTRO */}

                <div className="card shadow border-0 mb-4">
                    <div className="card-body">

                        <select
                            className="form-select"
                            value={filtroEstado}
                            onChange={(e) =>
                                setFiltroEstado(e.target.value)
                            }
                        >
                            <option value="">
                                Todas las ventas
                            </option>

                            <option value="Completada">
                                Completadas
                            </option>

                            <option value="Pendiente">
                                Pendientes
                            </option>

                            <option value="En Progreso">
                                En Progreso
                            </option>
                        </select>

                    </div>
                </div>

                {/* TABLA */}

                <div className="card shadow border-0">

                    <div className="card-header">
                        <h5 className="mb-0">
                            Listado de Ventas
                        </h5>
                    </div>

                    <div className="table-responsive">

                        <table className="table table-hover mb-0">

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
                                            {Number(
                                                venta.monto
                                            ).toLocaleString("es-AR")}
                                        </td>

                                        <td>
                                            {venta.fecha
                                                ? new Date(
                                                    venta.fecha
                                                ).toLocaleDateString(
                                                    "es-AR"
                                                )
                                                : "-"}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge bg-${venta.estado ===
                                                        "Completada"
                                                        ? "success"
                                                        : venta.estado ===
                                                            "Pendiente"
                                                            ? "warning"
                                                            : "info"
                                                    }`}
                                            >
                                                {venta.estado}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    eliminarVenta(venta.id)
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </div>
    );
}