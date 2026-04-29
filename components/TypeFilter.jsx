"use client";

import { ALL_TYPES, TYPE_COLORS } from "@/lib/constants";

// row of type filter pills - click one to filter by that type, click again to clear
export default function TypeFilter({ selectedType, onTypeChange }) {
  function handleClick(type) {
    if (selectedType === type) {
      onTypeChange(null); // clicking same type again clears it
    } else {
      onTypeChange(type);
    }
  }

  return (
    <div className="w-full overflow-x-auto py-3 no-scrollbar">
      <div className="flex gap-2 w-max">

        <button
          id="type-filter-all"
          onClick={() => onTypeChange(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all
            ${selectedType === null
              ? "bg-gray-800 text-white border-gray-800"
              : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
            }`}
        >
          All
        </button>

        {ALL_TYPES.map((type) => {
          const isActive = selectedType === type;
          const color = TYPE_COLORS[type]?.badge;
          return (
            <button
              key={type}
              id={`type-filter-${type}`}
              onClick={() => handleClick(type)}
              style={isActive ? { backgroundColor: color, color: "#fff", borderColor: color } : {}}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border capitalize transition-all
                ${isActive ? "scale-105 shadow-md" : "bg-white text-gray-600 border-gray-200 hover:scale-105"}`}
            >
              {type}
            </button>
          );
        })}

      </div>
    </div>
  );
}
