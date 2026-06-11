import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
    obtenerPresupuestos,
    guardarPresupuesto,
    eliminarPresupuesto,
} from "../services/presupuestosService";

import {
    FiEdit,
    FiTrash2,
    FiDownload,
} from "react-icons/fi";

export default function Presupuestos() {
    const [presupuestos, setPresupuestos] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [loading, setLoading] = useState(false);

    const [nuevoPresupuesto, setNuevoPresupuesto] = useState({
        cliente: "",
        monto: "",
        estado: "Pendiente",
        dias: 15,
    });

    useEffect(() => {
        cargarPresupuestos();
    }, []);

    const cargarPresupuestos = async () => {
        try {
            setLoading(true);
            const datos = await obtenerPresupuestos();
            setPresupuestos(datos);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const agregarPresupuesto = async () => {
        if (
            !nuevoPresupuesto.cliente ||
            !nuevoPresupuesto.monto
        ) {
            alert("Complete todos los campos");
            return;
        }

        try {
            await guardarPresupuesto({
                cliente: nuevoPresupuesto.cliente,
                monto: Number(nuevoPresupuesto.monto),
                fecha: new Date().toISOString(),
                estado: nuevoPresupuesto.estado,
                dias: Number(nuevoPresupuesto.dias),
            });

            setNuevoPresupuesto({
                cliente: "",
                monto: "",
                estado: "Pendiente",
                dias: 15,
            });

            setMostrarFormulario(false);

            cargarPresupuestos();
        } catch (error) {
            console.error(error);
            alert("Error al guardar");
        }
    };

    const eliminar = async (id) => {
        if (!window.confirm("¿Eliminar presupuesto?")) return;

        try {
            await eliminarPresupuesto(id);
            cargarPresupuestos();
        } catch (error) {
            console.error(error);
        }
    };

    const presupuestosFiltrados = filtroEstado
        ? presupuestos.filter(
            (p) => p.estado === filtroEstado
        )
        : presupuestos;

    const totalPresupuestado =
        presupuestosFiltrados.reduce(
            (acc, p) => acc + Number(p.monto || 0),
            0
        );

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="flex-grow-1 p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Presupuestos</h1>

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            setMostrarFormulario(!mostrarFormulario)
                        }
                    >
                        + Nuevo Presupuesto
                    </button>
                </div>

                {mostrarFormulario && (
                    <div className="card p-3 mb-4">

                        <h5>Nuevo Presupuesto</h5>

                        <input
                            className="form-control mb-2"
                            placeholder="Cliente"
                            value={nuevoPresupuesto.cliente}
                            onChange={(e) =>
                                setNuevoPresupuesto({
                                    ...nuevoPresupuesto,
                                    cliente: e.target.value,
                                })
                            }
                        />

                        <input
                            className="form-control mb-2"
                            type="number"
                            placeholder="Monto"
                            value={nuevoPresupuesto.monto}
                            onChange={(e) =>
                                setNuevoPresupuesto({
                                    ...nuevoPresupuesto,
                                    monto: e.target.value,
                                })
                            }
                        />

                        <input
                            className="form-control mb-2"
                            type="number"
                            placeholder="Días de validez"
                            value={nuevoPresupuesto.dias}
                            onChange={(e) =>
                                setNuevoPresupuesto({
                                    ...nuevoPresupuesto,
                                    dias: e.target.value,
                                })
                            }
                        />

                        <select
                            className="form-select mb-3"
                            value={nuevoPresupuesto.estado}
                            onChange={(e) =>
                                setNuevoPresupuesto({
                                    ...nuevoPresupuesto,
                                    estado: e.target.value,
                                })
                            }
                        >
                            <option value="Pendiente">
                                Pendiente
                            </option>

                            <option value="Aceptado">
                                Aceptado
                            </option>

                            <option value="Vencido">
                                Vencido
                            </option>
                        </select>

                        <button
                            className="btn btn-success"
                            onClick={agregarPresupuesto}
                        >
                            Guardar
                        </button>

                    </div>
                )}

                <div className="row mb-4">

                    <div className="col-md-4">
                        <div className="card bg-primary text-white p-3">
                            <h6>Presupuestos</h6>
                            <h3>{presupuestos.length}</h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card bg-success text-white p-3">
                            <h6>Total Presupuestado</h6>
                            <h3>
                                $
                                {(totalPresupuestado / 1000000).toFixed(2)}
                                M
                            </h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card bg-warning p-3">
                            <h6>Pendientes</h6>
                            <h3>
                                {
                                    presupuestos.filter(
                                        (p) =>
                                            p.estado === "Pendiente"
                                    ).length
                                }
                            </h3>
                        </div>
                    </div>

                </div>

                <div className="mb-3">
                    <select
                        className="form-select"
                        value={filtroEstado}
                        onChange={(e) =>
                            setFiltroEstado(e.target.value)
                        }
                    >
                        <option value="">
                            Todos los presupuestos
                        </option>

                        <option value="Pendiente">
                            Pendientes
                        </option>

                        <option value="Aceptado">
                            Aceptados
                        </option>

                        <option value="Vencido">
                            Vencidos
                        </option>
                    </select>
                </div>

                <div className="table-responsive">

                    <table className="table table-striped table-hover">

                        <thead className="table-dark">
                            <tr>
                                <th>Cliente</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                                <th>Vence</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {presupuestosFiltrados.map((presupuesto) => (
                                <tr key={presupuesto.id}>

                                    <td>{presupuesto.cliente}</td>

                                    <td>
                                        $
                                        {Number(
                                            presupuesto.monto
                                        ).toLocaleString("es-AR")}
                                    </td>

                                    <td>
                                        {presupuesto.fecha
                                            ? new Date(
                                                presupuesto.fecha
                                            ).toLocaleDateString(
                                                "es-AR"
                                            )
                                            : "-"}
                                    </td>

                                    <td>
                                        <span
                                            className={
                                                presupuesto.dias < 0
                                                    ? "text-danger fw-bold"
                                                    : "text-warning"
                                            }
                                        >
                                            {presupuesto.dias} días
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`badge bg-${presupuesto.estado ===
                                                    "Aceptado"
                                                    ? "success"
                                                    : presupuesto.estado ===
                                                        "Pendiente"
                                                        ? "warning"
                                                        : "danger"
                                                }`}
                                        >
                                            {presupuesto.estado}
                                        </span>
                                    </td>

                                    <td>

                                        <button className="btn btn-info btn-sm me-2">
                                            <FiDownload />
                                        </button>

                                        <button className="btn btn-warning btn-sm me-2">
                                            <FiEdit />
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                eliminar(presupuesto.id)
                                            }
                                        >
                                            <FiTrash2 />
                                        </button>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
}