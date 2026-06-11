// Datos demo para la aplicación
export const productosDemo = [
  { id: 1, codigo: "VRF001", nombre: "VRV Daikin 12HP", stock: 15, precio: 4500000, categoria: "VRV" },
  { id: 2, codigo: "VRF002", nombre: "VRV Daikin 18HP", stock: 8, precio: 6200000, categoria: "VRV" },
  { id: 3, codigo: "VRF003", nombre: "VRV Daikin 24HP", stock: 5, precio: 7800000, categoria: "VRV" },
  { id: 4, codigo: "TRS001", nombre: "Tubo Radiante Schwank", stock: 30, precio: 850000, categoria: "Radiante" },
  { id: 5, codigo: "PSR001", nombre: "Piso Radiante Uponor", stock: 12, precio: 1200000, categoria: "Radiante" },
  { id: 6, codigo: "SPL001", nombre: "Split Carrier 4500", stock: 20, precio: 2300000, categoria: "Split" },
  { id: 7, codigo: "SPL002", nombre: "Split Surrey 3000", stock: 25, precio: 1800000, categoria: "Split" }
];

export const clientesDemo = [
  { id: 1, razonSocial: "Bodega Los Andes", cuit: "30-12345678-9", telefono: "2614567890", email: "info@losandes.com", direccion: "Av. San Martín 1200" },
  { id: 2, razonSocial: "Hotel Diplomatic", cuit: "30-87654321-0", telefono: "2612345678", email: "reservas@diplomatic.com", direccion: "Calle Rivadavia 500" },
  { id: 3, razonSocial: "Shopping Mendoza Plaza", cuit: "33-45678901-2", telefono: "2614567890", email: "gerencia@mendozaplaza.com", direccion: "Av. Pellegrini 3500" },
  { id: 4, razonSocial: "Constructora Cuyo", cuit: "30-11223344-5", telefono: "2619876543", email: "info@constructoracuyo.com", direccion: "Belgrano 250" },
  { id: 5, razonSocial: "Chacras Park", cuit: "33-55667788-9", telefono: "2614567890", email: "contacto@chacraspeak.com", direccion: "Acceso Este km 5" }
];

export const usuariosDemo = [
  { id: 1, nombre: "Administrador", email: "admin@aloisio.com", rol: "Administrador" },
  { id: 2, nombre: "Supervisor", email: "supervisor@aloisio.com", rol: "Supervisor" },
  { id: 3, nombre: "Santiago Zorrilla", email: "santiago@aloisio.com", rol: "Vendedor" }
];

export const ventasDemo = [
  { id: 1, cliente: "Bodega Los Andes", monto: 4500000, fecha: "2024-01-15", estado: "Completada" },
  { id: 2, cliente: "Hotel Diplomatic", monto: 6200000, fecha: "2024-01-12", estado: "Completada" },
  { id: 3, cliente: "Shopping Mendoza Plaza", monto: 8500000, fecha: "2024-01-10", estado: "Pendiente" },
  { id: 4, cliente: "Constructora Cuyo", monto: 3400000, fecha: "2024-01-18", estado: "Completada" },
  { id: 5, cliente: "Chacras Park", monto: 5200000, fecha: "2024-01-20", estado: "En Progreso" }
];

export const ventasMensualesDemo = [
  { mes: "Ene", ventas: 1200000 },
  { mes: "Feb", ventas: 2100000 },
  { mes: "Mar", ventas: 1800000 },
  { mes: "Abr", ventas: 2500000 },
  { mes: "May", ventas: 3100000 },
  { mes: "Jun", ventas: 2800000 }
];

export const facturacionPorCategoriaDemo = [
  { categoria: "VRV", valor: 18500000 },
  { categoria: "Radiante", valor: 2050000 },
  { categoria: "Split", valor: 4100000 }
];

export const productosMasVendidosDemo = [
  { nombre: "VRV Daikin 18HP", cantidad: 12 },
  { nombre: "Split Carrier 4500", cantidad: 8 },
  { nombre: "Piso Radiante Uponor", cantidad: 6 },
  { nombre: "VRV Daikin 12HP", cantidad: 5 }
];
