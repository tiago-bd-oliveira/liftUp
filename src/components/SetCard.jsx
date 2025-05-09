import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

export default function SetCard({ set, index, isComplete, onToggle }) {
  return (
    <div
      className={`w-full flex justify-around items-center gap-2 p-2 rounded-lg cursor-pointer ${
        isComplete ? "bg-green-600 text-white" : "bg-white"
      }`}
      onClick={onToggle}
    >
      <div className="text-sm font-medium">{index + 1}</div>
      <div className="text-sm font-medium">{set.reps} reps</div>
      <div className="text-sm font-medium">{set.weight} kg</div>
      <div className="text-sm">
        {isComplete ? (
          <MdCheckBox size={24} />
        ) : (
          <MdCheckBoxOutlineBlank size={24} />
        )}
      </div>
    </div>
  );
}
