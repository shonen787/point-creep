import { useState, useEffect } from "react";
import "./App.css";
import { CardObj } from "./types";
import _cards from "./assets/cards/cards.json";
import Card from "./Card";
import Filter from "./Filter";

function Points() {
  const cards = _cards as CardObj[];
  const [filterValue, setFilterValue] = useState({ color: "", points: "" });
  const [cardsData, setCardsData] = useState<CardObj[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedCards, setSelectedCards] = useState(new Map());

  useEffect(() => {
    async function GetCardImage(card: CardObj): Promise<string> {
      const res = await fetch(
        `https://api.scryfall.com/cards/named?fuzzy=${card.name.trim()}`
      );
      if (res.ok) {
        const image_uri = await res.json();
        return image_uri.image_uris.border_crop || "";
      }
      return "";
    }
    Promise.all(
      cards.map(async (card) => {
        const image_uri = await GetCardImage(card);
        return { ...card, image_uri };
      })
    ).then((cardsData) => setCardsData(cardsData));
  }, []);

  const handleFilterChange = (filter: { color: string; points: string }) => {
    setFilterValue({ color: filter.color, points: filter.points });
  };

  const handleFilter = (card: CardObj) => {
    if (card.points === "undecided") {
      return false;
    }
    if (filterValue.color === "" || card.color === filterValue.color) {
      if (filterValue.points === "" || card.points === filterValue.points) {
        return true;
      }
    }
    return false;
  };

  function handleImageClick(card: CardObj) {
    const updatedCardsData = structuredClone(cardsData);
    const index = updatedCardsData.findIndex(
      (c: CardObj) => c.name === card.name
    );

    console.log(card.isSelected);
    if (card.isSelected) {
      if (
        totalPoints - parseInt(card.points) >= 0 &&
        selectedCards.has(card.name)
      ) {
        setSelectedCards((prevSelectedCards) => {
          const updatedMap = new Map(prevSelectedCards);
          updatedMap.delete(card.name);
          return updatedMap;
        });
        card.isSelected = false;
        card.selection = "";
        setTotalPoints((prevTotal) => prevTotal - parseInt(card.points));
      }
    } else {
      if (
        totalPoints + parseInt(card.points) <= 10 &&
        !selectedCards.has(card.name)
      ) {
        setSelectedCards((prevSelectedCards) => {
          const updatedMap = new Map(prevSelectedCards);
          updatedMap.set(card.name, "");
          return updatedMap;
        });
        card.isSelected = true;
        card.selection = "selected";
        setTotalPoints((prevTotal) => prevTotal + parseInt(card.points));
      }
    }

    updatedCardsData[index] = card;
    setCardsData(updatedCardsData);
  }

  return (
    <>
      <Filter onFilterChange={handleFilterChange} />

      <div id="content">
        <div className="sidebars sidebar-left">
          <p> Total Points: </p>
          <p>{totalPoints}</p>
        </div>

        <div className="cards">
          {cardsData
            ?.filter(handleFilter)
            .sort((a, b) => (a.points < b.points ? -1 : 1))
            .map((card) => (
              <Card
                key={card.name}
                name={card.name}
                color={card.color}
                points={card.points}
                image_uri={card.image_uri}
                isSelected={card.isSelected}
                selection=""
                onClick={() => handleImageClick(card)}
              />
            ))}
        </div>

        <div className="sidebars sidebar-right"></div>
      </div>
    </>
  );
}

export default Points;
