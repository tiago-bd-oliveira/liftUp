import { useEffect } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function TestSignup() {
  useEffect(() => {
    const runTest = async () => {
      try {
        // 1. Cria conta
        const email = "testeuser2@exemplo.com";
        const password = "senha1234";
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Conta criada:", cred.user.uid);

        // 2. Aguarda que o auth esteja pronto
        while (!auth.currentUser) {
          await new Promise((res) => setTimeout(res, 100));
        }

        // 3. Escreve no Firestore
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          teste: true,
        });

        alert("Sucesso! Conta criada e Firestore atualizado.");
      } catch (error) {
        console.error("ERRO:", error.code, error.message);
        alert("Erro: " + error.message);
      }
    };

    runTest();
  }, []);

  return (
    <div className="p-10">
      <p>Testando criação de conta e Firestore...</p>
    </div>
  );
}
