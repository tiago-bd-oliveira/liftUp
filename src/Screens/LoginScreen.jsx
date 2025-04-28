import { useState } from "react";
import { auth } from "../firebase"; // importa do firebase.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginOrRegister = async (e) => {
    e.preventDefault();
    try {
      // Tenta fazer login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      onLogin(user);
    } catch (loginError) {
      // Se falhar login, tenta criar conta
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        onLogin(user);
        alert("Conta criada com sucesso!");
      } catch (registerError) {
        alert("Erro ao criar conta: " + registerError.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Login / Criar Conta</h1>
      <form onSubmit={handleLoginOrRegister} className="flex flex-col space-y-4 w-full max-w-xs">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-red-700 hover:bg-red-700 text-white font-semibold py-2 rounded-lg"
        >
          Continuar
        </button>
      </form>
    </div>
  );
}
