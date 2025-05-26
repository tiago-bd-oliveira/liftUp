import { FaTrashAlt } from "react-icons/fa";

const EditableSet = ({ set, setIndex, handleSetChange, deleteSet }) => {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2 border rounded-md bg-gray-50 w-full">
      <span className="text-sm text-gray-700">{setIndex + 1}</span>

      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          className="w-12.5 px-2 py-1 border border-gray-300 rounded text-sm"
          value={set.reps}
          onChange={(e) => handleSetChange(setIndex, "reps", e.target.value)}
          placeholder="Reps"
        />
        <span className="text-sm text-gray-500">×</span>
        <input
          type="number"
          min="0"
          className="w-12.5 px-2 py-1 border border-gray-300 rounded text-sm"
          value={set.weight}
          onChange={(e) => handleSetChange(setIndex, "weight", e.target.value)}
          placeholder="Weight"
        />
        <span className="text-sm text-gray-500">kg</span>
      </div>
      <button
        onClick={() => deleteSet(setIndex)}
        className="text-red-500 text-xs"
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default EditableSet;
