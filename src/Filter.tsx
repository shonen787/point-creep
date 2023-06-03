import { ChangeEvent, useState } from "react";
import "./Filter.css";

interface FilterProps {
  onFilterChange: (filter: { color: string; points: string }) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
  const manaValue = [
    "white",
    "blue",
    "black",
    "red",
    "green",
    "colorless",
    "multicolor",
  ];
  const cardPoints = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [filterColor, setFilterCards] = useState({ color: "", points: "" });

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.id === "filterColor") {
      filterColor.color = e.target.value;
    }
    if (e.target.id === "filterPoints") {
      filterColor.points = e.target.value;
    }
    setFilterCards(filterColor);
    onFilterChange(filterColor);
  };

  return (
    <>
      <div id="filterbar">
        <span>Color </span>
        <select
          id="filterColor"
          value={filterColor.color}
          onChange={handleFilterChange}
        >
          <option value="">All Colors</option>
          {manaValue.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>

        <span>Points </span>
        <select
          id="filterPoints"
          value={filterColor.points}
          onChange={handleFilterChange}
        >
          <option value="">All Points</option>
          {cardPoints.map((point) => (
            <option key={point} value={point}>
              {point}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
