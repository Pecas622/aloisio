# 🔥 Firebase Setup - Aloisio CRM

## 1. Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado **aloisio-crm**
3. Habilita Google Analytics (opcional)

## 2. Configurar Firestore

1. En el panel de Firebase, ve a **Firestore Database**
2. Crea una nueva base de datos en modo **test** (para desarrollo)
3. Selecciona la región cercana (ej: `us-east1`)

## 3. Crear Colecciones

Crea las siguientes colecciones en Firestore:

### Colección: `productos`
Documento de ejemplo:
```json
{
  "codigo": "VRF001",
  "nombre": "VRV Daikin 12HP",
  "categoria": "VRV",
  "stock": 15,
  "precio": 4500000,
  "marca": "Daikin"
}
```

### Colección: `clientes`
Documento de ejemplo:
```json
{
  "razonSocial": "Hotel Diplomatic",
  "cuit": "30-87654321-0",
  "email": "reservas@diplomatic.com",
  "telefono": "2612345678",
  "direccion": "Calle Rivadavia 500"
}
```

### Colección: `ventas`
Documento de ejemplo:
```json
{
  "cliente": "Hotel Diplomatic",
  "vendedor": "Santiago",
  "monto": 4500000,
  "estado": "Completada",
  "fecha": "2024-01-15"
}
```

### Colección: `usuarios`
Documento de ejemplo:
```json
{
  "nombre": "Santiago",
  "rol": "admin",
  "email": "santiago@aloisio.com"
}
```

## 4. Habilitar Autenticación

1. Ve a **Authentication** en Firebase
2. Ve a la pestaña **Sign-in method**
3. Habilita **Email/Password**

## 5. Obtener Credenciales

1. Ve a **Project Settings** (ícono de engranaje)
2. Ve a **Your apps** → **Web**
3. Copia la configuración y reemplaza en `src/firebaseConfig/firebaseConfig.js`:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "XXXXX",
  appId: "1:XXXXX:web:XXXXX"
};
```

## 6. Configurar Reglas de Seguridad

En **Firestore** → **Rules**, usa:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

⚠️ **IMPORTANTE**: Esto es solo para desarrollo. Para producción usa reglas más restrictivas.

## 7. Iniciar la App

```bash
cd frontend
npm run dev
```

**URL**: http://localhost:5173

## 8. Crear Cuenta de Prueba

1. Haz clic en "¿No tienes cuenta? Regístrate"
2. Ingresa un email y contraseña
3. ¡Listo! Ya puedes usar la app

## 📝 Ejemplos de Uso

### Obtener productos desde Firestore:
```javascript
import { obtenerProductos } from "../services/productosService";

const productos = await obtenerProductos();
console.log(productos);
```

### Guardar producto:
```javascript
import { guardarProducto } from "../services/productosService";

await guardarProducto({
  codigo: "VRF002",
  nombre: "VRV Daikin 18HP",
  stock: 10,
  precio: 6200000,
  categoria: "VRV"
});
```

### Actualizar producto:
```javascript
import { actualizarProducto } from "../services/productosService";

await actualizarProducto("documentId", {
  stock: 20,
  precio: 5000000
});
```

### Eliminar producto:
```javascript
import { eliminarProducto } from "../services/productosService";

await eliminarProducto("documentId");
```

## 🆘 Troubleshooting

**Error: "Cannot read property 'appendChild' of null"**
- Verifica que `<div id="root"></div>` exista en `index.html`

**Error: "Firebase: Error (auth/invalid-api-key)"**
- Verifica que tu apiKey sea correcta en `firebaseConfig.js`

**Error: "Permission denied" en Firestore**
- Revisa las reglas de seguridad
- En desarrollo, usa `allow read, write: if true;` temporalmente

**La app no carga después del login**
- Abre la consola (F12) para ver errores
- Verifica que las colecciones existan en Firestore
