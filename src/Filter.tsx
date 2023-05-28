import { ChangeEvent, useState } from "react";
import "./Filter.css"
interface FilterProps {
  onFilterChange: (value: string) => void;
}

export default function Filter({onFilterChange}: FilterProps) {
  const manaValue = [
    "white",
    "blue",
    "black",
    "red",
    "green",
    "colorless",
    "multicolor",
  ];
  const [filterColor, setFilterColor] = useState("");

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) =>{
    const selectedFilter = e.target.value;
    setFilterColor(selectedFilter);
    onFilterChange(selectedFilter);
  }



  return (
    <>
    <label htmlFor="filterbar">
    </label>

      <p>Filter Bar:</p>
      <span>Color: </span>
      <select
        id="filterColor"
        value={filterColor}
        onChange={handleFilterChange}
      >
        <option value="">All Colors</option>
        {manaValue.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
</>


  );
} 