export default function SetCard({ set, isComplete, onToggle }) {
  return (
    <div
      className={`w-full flex justify-around items-center gap-2 p-2 rounded-lg cursor-pointer ${
        isComplete ? "bg-green-100" : "bg-white"
      }`}
      onClick={onToggle}
    >
      <div className="text-sm font-medium">{set.reps} reps</div>
      <div className="text-sm font-medium">{set.weight} kg</div>
      <div className="text-sm">{isComplete ? "✅" : "⬜"}</div>
    </div>
  );
}
