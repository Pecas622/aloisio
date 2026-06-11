import {
    collection,
    getDocs,
    addDoc,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
    try {
        const snapshot = await getDocs(collection(db, "usuarios"));
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return [];
    }
};

// Obtener usuario por email
export const obtenerUsuarioPorEmail = async (email) => {
    try {
        const q = query(collection(db, "usuarios"), where("email", "==", email));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        return {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data(),
        };
    } catch (error) {
        console.error("Error obteniendo usuario:", error);
        return null;
    }
};

// Crear usuario
export const crearUsuario = async (usuarioData) => {
    try {
        const docRef = await addDoc(collection(db, "usuarios"), {
            ...usuarioData,
            createdAt: new Date(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creando usuario:", error);
        throw error;
    }
};
