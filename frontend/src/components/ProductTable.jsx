export default function ProductTable() {
  const products = [
    { codigo: "VRF001", nombre: "VRV Daikin 12HP", stock: 15, precio: "$4.500.000" },
    { codigo: "VRF002", nombre: "VRV Daikin 18HP", stock: 8, precio: "$6.200.000" },
    { codigo: "VRF003", nombre: "VRV Daikin 24HP", stock: 5, precio: "$7.800.000" }
  ];

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Productos Recientes</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.codigo}>
                <td>{product.codigo}</td>
                <td>{product.nombre}</td>
                <td>{product.stock}</td>
                <td>{product.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
