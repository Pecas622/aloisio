import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Obtener todos los clientes
export const obtenerClientes = async () => {
  try {
    const snapshot = await getDocs(collection(db, "clientes"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error obteniendo clientes:", error);
    return [];
  }
};

// Guardar cliente
export const guardarCliente = async (cliente) => {
  try {
    const docRef = await addDoc(collection(db, "clientes"), {
      ...cliente,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error guardando cliente:", error);
    throw error;
  }
};

// Actualizar cliente
export const actualizarCliente = async (id, datos) => {
  try {
    await updateDoc(doc(db, "clientes", id), {
      ...datos,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error actualizando cliente:", error);
    throw error;
  }
};

// Eliminar cliente
export const eliminarCliente = async (id) => {
  try {
    await deleteDoc(doc(db, "clientes", id));
  } catch (error) {
    console.error("Error eliminando cliente:", error);
    throw error;
  }
};
