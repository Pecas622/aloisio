import Sidebar from "../components/Sidebar";
import { FiDownload, FiPrinter } from "react-icons/fi";

export default function Reportes() {
  const reportes = [
    { id: 1, nombre: "Reporte de Ventas Mensuales", descripcion: "Detalle de todas las ventas del mes", formato: "PDF" },
    { id: 2, nombre: "Reporte de Clientes", descripcion: "Listado completo de clientes activos", formato: "Excel" },
    { id: 3, nombre: "Reporte de Productos", descripcion: "Inventario y stock de productos", formato: "PDF" },
    { id: 4, nombre: "Reporte de Facturación", descripcion: "Ingresos por categoría", formato: "Excel" },
    { id: 5, nombre: "Reporte de Servicios", descripcion: "Servicios prestados y completados", formato: "PDF" },
    { id: 6, nombre: "Reporte de Comisiones", descripcion: "Comisiones por vendedor", formato: "Excel" }
  ];

  const descargar = (reporte) => {
    alert(`Descargando: ${reporte.nombre}.${reporte.formato.toLowerCase()}`);
  };

  const imprimir = (reporte) => {
    alert(`Imprimiendo: ${reporte.nombre}`);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Reportes</h1>

        <div className="row">
          {reportes.map((reporte) => (
            <div key={reporte.id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{reporte.nombre}</h5>
                  <p className="card-text text-muted">{reporte.descripcion}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-primary">{reporte.formato}</span>
                    <div>
                      <button 
                        className="btn btn-sm btn-success me-2"
                        onClick={() => descargar(reporte)}
                      >
                        <FiDownload /> Descargar
                      </button>
                      <button 
                        className="btn btn-sm btn-info"
                        onClick={() => imprimir(reporte)}
                      >
                        <FiPrinter /> Imprimir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="alert alert-info mt-4">
          <h5>Información:</h5>
          <p>Los reportes se pueden descargar en PDF o Excel. Todos los reportes incluyen datos de la fecha seleccionada y pueden ser personalizados según tus necesidades.</p>
        </div>
      </div>
    </div>
  );
}
