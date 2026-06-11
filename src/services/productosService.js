import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

const productosRef = collection(db, "productos");

export const obtenerProductos = async () => {
    const snapshot = await getDocs(productosRef);

    return snapshot.docs.map((docu) => ({
        id: docu.id,
        ...docu.data(),
    }));
};

export const guardarProducto = async (producto) => {
    await addDoc(productosRef, producto);
};

export const actualizarProducto = async (id, producto) => {
    const productoRef = doc(db, "productos", id);

    await updateDoc(productoRef, {
        codigo: producto.codigo,
        nombre: producto.nombre,
        categoria: producto.categoria,
        stock: producto.stock,
        precio: producto.precio,
    });
};

export const eliminarProducto = async (id) => {
    const productoRef = doc(db, "productos", id);

    await deleteDoc(productoRef);
};