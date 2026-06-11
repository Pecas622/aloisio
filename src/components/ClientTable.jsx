export default function ClientTable() {
  const clients = [
    { id: 1, nombre: "Empresa ABC", email: "contact@abc.com", telefono: "123456789" },
    { id: 2, nombre: "Empresa XYZ", email: "contact@xyz.com", telefono: "987654321" },
    { id: 3, nombre: "Empresa 123", email: "contact@123.com", telefono: "555555555" }
  ];

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Clientes Principales</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.nombre}</td>
                <td>{client.email}</td>
                <td>{client.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
