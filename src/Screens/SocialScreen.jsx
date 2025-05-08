import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
} from "firebase/firestore";
import AppContext from "../AppContext";

export default function SocialScreen() {
  const { workouts, currentUser, setWorkouts } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [showSelector, setShowSelector] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // 🔁 Load all community posts
  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
    };

    fetchPosts();
  }, []);

  // ✅ Publish a workout as an independent post
  const publishWorkout = async (workout) => {
    if (!currentUser) return;
    setPublishing(true);

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      let nameToDisplay = "Anonymous";
      if (userSnap.exists()) {
        const userData = userSnap.data();
        nameToDisplay = userData.displayName || "Anonymous";
      }

      const postData = {
        userId: currentUser.uid,
        displayName: nameToDisplay,
        workoutName: workout.name,
        exercises: [...workout.exercises], // copy data to prevent dependency
        timestamp: Date.now(),
      };

      const docRef = await addDoc(collection(db, "posts"), postData);

      setPosts((prev) => [{ id: docRef.id, ...postData }, ...prev]);
      setShowSelector(false);
      setPublishing(false);
      alert("Workout published successfully!");
    } catch (err) {
      console.error("Error publishing workout:", err);
      alert("Failed to publish workout: " + err.message);
      setPublishing(false);
    }
  };

  // 🗑 Delete a post if it's yours
  const handleDelete = async (postId) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Error deleting post.");
    }
  };

  const copyWorkoutToUser = async (post) => {
    if (!currentUser) return;
  
    const newWorkout = {
      name: post.workoutName,
      exercises: [...post.exercises],
      userId: currentUser.uid,
      timestamp: Date.now(),
      count: 0,
    };
  
    try {
      const docRef = await addDoc(collection(db, "workouts"), newWorkout);
  
      setWorkouts((prev) => [...(prev || []), { ...newWorkout, id: docRef.id }]);
  
      alert("Workout copied to your plans!");
    } catch (err) {
      console.error("Error copying workout:", err);
      alert("Failed to copy workout.");
    }
  };
  

  return (
    <div className="flex flex-col items-center px-4 py-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-red-700 mb-6">Community Workouts</h2>

      <button
        onClick={() => setShowSelector(!showSelector)}
        className="mb-6 bg-red-700 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-800 transition"
      >
        {showSelector ? "Cancel" : "Publish a Workout"}
      </button>

      {showSelector && (
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Select a workout to publish:
          </h3>
          {workouts.length === 0 ? (
            <p className="text-gray-500">You don't have any workouts yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {workouts.map((workout) => (
                <li
                  key={workout.id}
                  className="flex justify-between items-center bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  <span className="text-gray-800 font-medium">{workout.name}</span>
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition text-sm"
                    onClick={() => publishWorkout(workout)}
                    disabled={publishing}
                  >
                    Publish
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="w-full max-w-md flex flex-col gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative bg-white border border-gray-200 p-5 rounded-2xl shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-1">{post.workoutName}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {post.exercises.length} exercise{post.exercises.length > 1 ? "s" : ""} · by{" "}
              <span className="font-medium text-gray-700">{post.displayName}</span>
            </p>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {post.exercises.map((ex, i) => (
                <li key={i}>{ex.name}</li>
              ))}
            </ul>

            {currentUser && currentUser.uid === post.userId && (
              <button
                onClick={() => handleDelete(post.id)}
                className="absolute top-3 right-4 text-red-500 hover:text-red-700 text-sm"
                title="Delete post"
              >
                Delete
              </button>
            )}
            {currentUser && currentUser.uid !== post.userId && (
              <button
                onClick={() => copyWorkoutToUser(post)}
                className="absolute top-3 right-4 text-red-500 hover:text-red-700 text-sm"
                title="Copy to my workouts"
              >
                Copy
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
