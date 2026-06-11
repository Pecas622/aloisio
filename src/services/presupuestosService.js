import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

const presupuestosRef = collection(db, "presupuestos");

export const obtenerPresupuestos = async () => {
    const snapshot = await getDocs(presupuestosRef);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const guardarPresupuesto = async (
    presupuesto
) => {
    await addDoc(presupuestosRef, presupuesto);
};

export const eliminarPresupuesto = async (id) => {
    await deleteDoc(
        doc(db, "presupuestos", id)
    );
};