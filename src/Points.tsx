import { useState, useEffect } from "react";
import "./App.css";
import { CardObj } from "./types";
import _cards from "./assets/cards/cards.json";
import Card from "./Card";
import Filter from "./Filter";
import SidebarCards from "./SideCards";

function Points() {
  const cards = _cards as CardObj[];
  const [filterValue, setFilterValue] = useState({ color: "", points: "" });
  const [cardsData, setCardsData] = useState<CardObj[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedCards, setSelectedCards] = useState(new Map<string, string>());

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

  function updateSelectedCards(isInSelectedCards: boolean, card: CardObj) {
    setSelectedCards((prevSelectedCards) => {
      const updatedMap = new Map(prevSelectedCards);
      if (isInSelectedCards) {
        updatedMap.delete(card.name);
        card.isSelected = false;
        card.selection = "";
        return updatedMap;
      }
      // The card is not in the selected card list;
      updatedMap.set(card.name, card.points);
      card.isSelected = true;
      card.selection = "selected";
      return updatedMap;
    });
  }

  function handleImageClick(card: CardObj) {
    if (card.isSelected) {
      if (totalPoints - parseInt(card.points) >= 0) {
        updateSelectedCards(true, card);
        setTotalPoints((prevTotal) => prevTotal - parseInt(card.points));
      }
      return;
    }
    if (totalPoints + parseInt(card.points) <= 10) {
      updateSelectedCards(false, card);
      setTotalPoints((prevTotal) => prevTotal + parseInt(card.points));
    }
  }

  function clearMap() {
    setSelectedCards(new Map<string, string>());
    cardsData.map((card) => (card.isSelected = false));
    setTotalPoints(0);
  }

  return (
    <>
      <Filter onFilterChange={handleFilterChange} />

      <div id="content">
        <div className="sidebars">
          <div className="sidebar-left">
            <p> Total Points: </p>
            <p>{totalPoints}</p>
            <SidebarCards cardsMap={selectedCards} />
            <button onClick={clearMap}>Flush List</button>
          </div>
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
