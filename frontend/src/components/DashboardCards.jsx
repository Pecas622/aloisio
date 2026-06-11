export default function DashboardCards() {
  const cards = [
    { title: "Ventas del Día", value: "$1.250.000", color: "primary" },
    { title: "Ventas Mes", value: "$18.400.000", color: "success" },
    { title: "Clientes", value: "284", color: "info" },
    { title: "Bajo Stock", value: "8", color: "warning" }
  ];

  return (
    <div className="row">
      {cards.map((card, index) => (
        <div key={index} className="col-md-3 mb-3">
          <div className={`card bg-${card.color} text-white`}>
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text fs-4">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
