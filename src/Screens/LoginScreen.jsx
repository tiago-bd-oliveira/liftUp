import { useState } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
} from "firebase/firestore";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering && displayName.trim() === "") {
      alert("Escolhe um nome de utilizador.");
      return;
    }

    try {
      if (isRegistering) {
        // 🔍 Verifica se o nome já existe
        const usersRef = collection(db, "users");
        const nameQuery = query(
          usersRef,
          where("displayName", "==", displayName.trim())
        );
        const querySnapshot = await getDocs(nameQuery);

        if (!querySnapshot.empty) {
          alert("Este nome de utilizador já está em uso. Escolhe outro.");
          return;
        }

        // ✅ Cria a conta
        await createUserWithEmailAndPassword(auth, email, password);

        // ⏳ Espera que o utilizador esteja autenticado
        await new Promise((resolve) => {
          const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
              resolve(user);
              unsubscribe();
            }
          });
        });

        const user = auth.currentUser;

        // 💾 Guarda o nome no Firestore
        await setDoc(doc(db, "users", user.uid), {
          displayName: displayName.trim(),
          email: user.email,
        });

        onLogin(user);
        alert("Conta criada com sucesso!");
      } else {
        // 🔐 Login normal
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        onLogin(userCredential.user);
      }
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro: " + err.message);
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
