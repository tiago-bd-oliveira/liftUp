import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";

// Gera iniciais a partir do nome
const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  return parts.map((p) => p[0].toUpperCase()).slice(0, 2).join("");
};

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [editField, setEditField] = useState("");

  // Espera pelo utilizador autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        window.location.href = "/";
      }
    });

    return () => unsubscribe();
  }, []);

  // Carrega dados do perfil
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveField = async (field) => {
    if (!user) return;

    try {
      // Garante que displayName é único
      if (field === "displayName") {
        const usersRef = collection(db, "users");
        const nameQuery = query(
          usersRef,
          where("displayName", "==", profile.displayName.trim())
        );
        const snapshot = await getDocs(nameQuery);

        const nameTaken = snapshot.docs.some(
          (docSnap) => docSnap.id !== user.uid
        );

        if (nameTaken) {
          alert("Este nome já está em uso. Escolhe outro.");
          return;
        }
      }

      await updateDoc(doc(db, "users", user.uid), {
        [field]: profile[field],
      });

      setEditField("");
    } catch (err) {
      console.error("Erro ao guardar campo:", err);
      alert("Erro ao guardar: " + err.message);
    }
  };

  const renderField = (label, fieldName, type = "text") => (
    <div className="flex flex-col mb-5">
      <label className="font-medium text-gray-600 mb-1">{label}</label>
      {editField === fieldName ? (
        <>
          <input
            type={type}
            value={profile[fieldName] || ""}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => handleSaveField(fieldName)}
              className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-xl hover:bg-green-600 transition"
            >
              <FaCheck /> Guardar
            </button>
            <button
              onClick={() => setEditField("")}
              className="flex items-center gap-2 bg-gray-400 text-white px-3 py-1 rounded-xl hover:bg-gray-500 transition"
            >
              <FaTimes /> Cancelar
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-sm">
          <span className="text-gray-700">{profile[fieldName] || "—"}</span>
          <button
            onClick={() => setEditField(fieldName)}
            className="text-red-600 hover:text-red-700 transition"
            title="Editar"
          >
            <FaEdit />
          </button>
        </div>
      )}
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">A carregar perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 py-10">

      <h1 className="text-4xl font-bold text-red-700 mb-6">Perfil do Utilizador</h1>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
      <div className="flex flex-col mb-5">
        <label className="font-medium text-gray-600 mb-1">Nome</label>
        <div className="bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-sm text-gray-700">
        {profile.displayName || "—"}
        </div>
    </div>

        {renderField("Sexo", "sexo")} 
        {renderField("Idade", "idade", "number")}
        {renderField("Peso (kg)", "peso", "number")}
        {renderField("Altura (cm)", "altura", "number")}
        {renderField("Bio", "bio")}
      </div>
    </div>
  );
}
