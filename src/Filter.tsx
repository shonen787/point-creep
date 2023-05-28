import { useState } from "react";

export default function Filter() {
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
  return (
    <label htmlFor="filterColor">
      <p>Filter:</p>
      <select
        id="filterColor"
        value={filterColor}
        onChange={(e) => {
          setFilterColor(e.target.value);
        }}
      >
        <option />
        {manaValue.map((filterColor) => (
          <option key={filterColor} value={filterColor}>
            {filterColor}
          </option>
        ))}
      </select>
    </label>
  );
} 