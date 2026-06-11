import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SalesChart() {
  const data = [
    { name: 'Lunes', ventas: 4000 },
    { name: 'Martes', ventas: 3000 },
    { name: 'Miércoles', ventas: 2000 },
    { name: 'Jueves', ventas: 2780 },
    { name: 'Viernes', ventas: 1890 },
    { name: 'Sábado', ventas: 2390 },
    { name: 'Domingo', ventas: 3490 }
  ];

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Ventas Semanal</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ventas" stroke="#0d47a1" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
