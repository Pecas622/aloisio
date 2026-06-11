import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

const ventasRef = collection(db, "ventas");

export const obtenerVentas = async () => {
    const snapshot = await getDocs(ventasRef);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const guardarVenta = async (venta) => {
    await addDoc(ventasRef, venta);
};

export const eliminarVentaDB = async (id) => {
    await deleteDoc(doc(db, "ventas", id));
};