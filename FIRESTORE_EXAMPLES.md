# 📚 Guía de Uso - Servicios Firestore

## Productos Service

### Obtener todos los productos
```javascript
import { obtenerProductos } from "../services/productosService";

const [productos, setProductos] = useState([]);

useEffect(() => {
  const cargar = async () => {
    const datos = await obtenerProductos();
    setProductos(datos);
  };
  cargar();
}, []);
```

### Guardar nuevo producto
```javascript
import { guardarProducto } from "../services/productosService";

const nuevoProducto = {
  codigo: "VRF001",
  nombre: "VRV Daikin 12HP",
  stock: 15,
  precio: 4500000,
  categoria: "VRV"
};

const id = await guardarProducto(nuevoProducto);
console.log("Producto guardado con ID:", id);
```

### Actualizar producto
```javascript
import { actualizarProducto } from "../services/productosService";

await actualizarProducto("documentoId", {
  stock: 20,
  precio: 5000000
});
```

### Eliminar producto
```javascript
import { eliminarProducto } from "../services/productosService";

await eliminarProducto("documentoId");
```

---

## Clientes Service

### Obtener todos los clientes
```javascript
import { obtenerClientes } from "../services/clientesService";

const clientes = await obtenerClientes();
```

### Guardar cliente
```javascript
import { guardarCliente } from "../services/clientesService";

await guardarCliente({
  razonSocial: "Hotel Diplomatic",
  cuit: "30-87654321-0",
  email: "reservas@diplomatic.com",
  telefono: "2612345678",
  direccion: "Calle Rivadavia 500"
});
```

### Actualizar cliente
```javascript
import { actualizarCliente } from "../services/clientesService";

await actualizarCliente("clienteId", {
  telefono: "2619876543",
  email: "nuevo@email.com"
});
```

### Eliminar cliente
```javascript
import { eliminarCliente } from "../services/clientesService";

await eliminarCliente("clienteId");
```

---

## Ventas Service

### Obtener todas las ventas
```javascript
import { obtenerVentas } from "../services/ventasService";

const ventas = await obtenerVentas();
```

### Guardar venta
```javascript
import { guardarVenta } from "../services/ventasService";

await guardarVenta({
  cliente: "Hotel Diplomatic",
  vendedor: "Santiago",
  monto: 4500000,
  estado: "Completada",
  fecha: "2024-01-15"
});
```

### Actualizar venta
```javascript
import { actualizarVenta } from "../services/ventasService";

await actualizarVenta("ventaId", {
  estado: "Entregada",
  monto: 4600000
});
```

### Eliminar venta
```javascript
import { eliminarVenta } from "../services/ventasService";

await eliminarVenta("ventaId");
```

---

## Usuarios Service

### Obtener todos los usuarios
```javascript
import { obtenerUsuarios } from "../services/usuariosService";

const usuarios = await obtenerUsuarios();
```

### Obtener usuario por email
```javascript
import { obtenerUsuarioPorEmail } from "../services/usuariosService";

const usuario = await obtenerUsuarioPorEmail("santiago@aloisio.com");
if (usuario) {
  console.log("Usuario encontrado:", usuario.nombre);
}
```

### Crear usuario
```javascript
import { crearUsuario } from "../services/usuariosService";

await crearUsuario({
  nombre: "Santiago Zorrilla",
  email: "santiago@aloisio.com",
  rol: "admin"
});
```

---

## Autenticación Firebase

### Login
```javascript
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig";

const ingresar = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("token", "firebase_token");
    navigate("/dashboard");
  } catch (error) {
    console.error("Error de autenticación:", error.message);
  }
};
```

### Registro
```javascript
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig";

const registrarse = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Guardar usuario en Firestore
    await crearUsuario({
      nombre: email.split("@")[0],
      email: email,
      rol: "user"
    });
    localStorage.setItem("token", "firebase_token");
    navigate("/dashboard");
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

### Logout
```javascript
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig";

const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("token");
    navigate("/");
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

---

## Patrones Comunes

### Cargar datos con loading
```javascript
const [datos, setDatos] = useState([]);
const [loading, setLoading] = useState(false);

const cargar = async () => {
  setLoading(true);
  try {
    const resultado = await obtenerProductos();
    setDatos(resultado);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  cargar();
}, []);

return (
  <div>
    {loading && <p>Cargando...</p>}
    {datos.map(item => <div key={item.id}>{item.nombre}</div>)}
  </div>
);
```

### Manejo de errores
```javascript
const guardar = async () => {
  try {
    await guardarProducto(formData);
    alert("Producto guardado exitosamente");
    setShowModal(false);
  } catch (error) {
    console.error("Error:", error);
    alert("Error al guardar: " + error.message);
  }
};
```

### Actualizar lista después de cambios
```javascript
const actualizarLista = async () => {
  try {
    // Realizar operación
    await guardarProducto(datos);
    // Recargar lista
    const nuevaLista = await obtenerProductos();
    setProductos(nuevaLista);
  } catch (error) {
    console.error("Error:", error);
  }
};
```
