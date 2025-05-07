import { useState } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const firebaseErrors = {
    "auth/email-already-in-use": "Este email já está em uso.",
    "auth/invalid-email": "O email é inválido.",
    "auth/weak-password": "A password deve ter pelo menos 6 caracteres.",
    "auth/user-not-found": "Utilizador não encontrado.",
    "auth/wrong-password": "Password incorreta.",
    "permission-denied": "Sem permissão para escrever no Firestore.",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering && displayName.trim() === "") {
      alert("Escolhe um nome de utilizador.");
      return;
    }

    try {
      if (isRegistering) {
        // 1. Criar conta
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Conta criada:", cred.user.uid);

        // 2. Esperar que auth.currentUser esteja pronto
        while (!auth.currentUser) {
          await new Promise((res) => setTimeout(res, 100));
        }

        const user = auth.currentUser;

        // 3. Atualizar displayName
        await updateProfile(user, {
          displayName: displayName.trim(),
        });

        // 4. Gravar no Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: displayName.trim(),
          email: user.email,
        });

        alert("Conta criada com sucesso!");
        navigate("/");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      }
    } catch (err) {
      console.error("Erro completo:", err.code, err.message);
      alert(firebaseErrors[err.code] || "Erro: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {isRegistering ? "Criar Conta" : "Login"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-xs"
      >
        {isRegistering && (
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Nome de Utilizador"
            className="border p-2 rounded-lg"
          />
        )}
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
          className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded-lg"
        >
          {isRegistering ? "Criar Conta" : "Entrar"}
        </button>
      </form>

      <button
        onClick={() => setIsRegistering((prev) => !prev)}
        className="mt-4 text-sm text-red-700 hover:underline"
      >
        {isRegistering
          ? "Já tens conta? Inicia sessão"
          : "Ainda não tens conta? Cria uma"}
      </button>
    </div>
  );
}
