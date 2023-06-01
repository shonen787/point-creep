import React from "react";

interface SidebarCardsProps {
  cardsMap: Map<string, string>;
}


const SidebarCards: React.FC<SidebarCardsProps> = ({ cardsMap }) => {
  return (
    <div className="sidebar-left">
      <p>Selected Cards:</p>
      <ul>
        {Array.from(cardsMap).map(([cardName, selection]) => (
          <p className="sidebarcards"key={cardName}>
            {cardName} - {selection}
          </p>
        ))}
      </ul>
    </div>
  );
};

export default SidebarCards;