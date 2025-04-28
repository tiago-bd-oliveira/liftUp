import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";

export default function SocialScreen() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const postsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setPosts(postsData);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim() === "") return;

    await addDoc(collection(db, "posts"), {
      content: newPost,
      createdAt: new Date(),
      author: currentUser?.email || "Unknown",
    });

    setNewPost("");
    fetchPosts();
  };

  const handleDeletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Posts</h1>

      {/* Formulário para novo post */}
      <form onSubmit={handlePostSubmit} className="w-full max-w-md mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700"
          placeholder="Partilha o teu treino hoje..."
          rows={3}
        />
        <button
          type="submit"
          className="mt-3 w-full bg-red-700 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Postar
        </button>
      </form>

      {/* Lista de posts */}
      <div className="w-full max-w-md space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">Ainda sem posts. Sê o primeiro!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow flex flex-col justify-between h-40 relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{post.author}</span>
                <span className="text-xs text-gray-400">
                  {post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleString() : ""}
                </span>
              </div>
              <p className="text-gray-700 flex-grow">{post.content}</p>

              {currentUser?.email === post.author && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-400 hover:text-red-600 text-xs"
                  >
                    Apagar
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
