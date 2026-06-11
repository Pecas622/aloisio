import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FiEdit, FiTrash2, FiCheckCircle } from "react-icons/fi";

const serviciosDemo = [
    { id: "SRV001", tipo: "Instalación", cliente: "Bodega Los Andes", fecha: "2024-01-20", estado: "En Progreso", tecnico: "Juan Pérez" },
    { id: "SRV002", tipo: "Mantenimiento", cliente: "Hotel Diplomatic", fecha: "2024-01-18", estado: "Completado", tecnico: "Carlos Gómez" },
    { id: "SRV003", tipo: "Reparación", cliente: "Chacras Park", fecha: "2024-01-25", estado: "Pendiente", tecnico: "Santiago Zorrilla" }
];

export default function Servicios() {
    const [servicios, setServicios] = useState(serviciosDemo);
    const [filtroEstado, setFiltroEstado] = useState("");

    const serviciosFiltrados = filtroEstado
        ? servicios.filter(s => s.estado === filtroEstado)
        : servicios;

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Servicios</h1>
                    <button className="btn btn-primary">+ Nuevo Servicio</button>
                </div>

                <div className="mb-3">
                    <select
                        className="form-select"
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                        <option value="">Todos los servicios</option>
                        <option value="Pendiente">Pendientes</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Completado">Completados</option>
                    </select>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Cliente</th>
                                <th>Técnico</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviciosFiltrados.map((servicio) => (
                                <tr key={servicio.id}>
                                    <td>{servicio.id}</td>
                                    <td>{servicio.tipo}</td>
                                    <td>{servicio.cliente}</td>
                                    <td>{servicio.tecnico}</td>
                                    <td>{new Date(servicio.fecha).toLocaleDateString('es-AR')}</td>
                                    <td>
                                        <span className={`badge bg-${servicio.estado === "Completado" ? "success" :
                                                servicio.estado === "En Progreso" ? "info" : "warning"
                                            }`}>
                                            {servicio.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-success me-2"><FiCheckCircle /></button>
                                        <button className="btn btn-sm btn-warning me-2"><FiEdit /></button>
                                        <button className="btn btn-sm btn-danger"><FiTrash2 /></button>
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
