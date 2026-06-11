import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistro, setIsRegistro] = useState(false);

  const ingresar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegistro) {
        // Crear nueva cuenta
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
      }
      localStorage.setItem("token", "firebase_auth_token");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Error en autenticación");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Aloisio CRM</h1>
        <form onSubmit={ingresar}>
          <div className="mb-3">
            <input 
              type="email" 
              className="form-control" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              className="form-control" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              disabled={loading}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Procesando..." : isRegistro ? "Registrarse" : "Ingresar"}
          </button>
        </form>
        <p className="mt-3 text-center text-muted">
          <button 
            type="button" 
            className="btn btn-link p-0"
            onClick={() => setIsRegistro(!isRegistro)}
            disabled={loading}
          >
            {isRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
          </button>
        </p>
      </div>
    </div>
  );
}
