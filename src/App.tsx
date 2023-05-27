import { useState, useEffect } from 'react'
import './App.css'
import { CardObj } from './types'
import _cards from './assets/cards/cards.json'
import Card from './Card'
import Header from './Header'


function App() {
  const cards = _cards as CardObj[];
  const [cardsData, setCardsData] = useState<CardObj[]>([]);

  useEffect(() => {
        async function GetCardImage(card: CardObj): Promise<string>{
      
          const res = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${card.name.trim()}`);
          if (res.ok){
            const image_uri = await res.json();
            return image_uri.image_uris.border_crop || "";
          }         
          return ""
        }
      Promise.all(cards.map(async card => {  
      const image_uri = await GetCardImage(card);
      return {...card, image_uri};
    })).then(cardsData => setCardsData(cardsData));
  }
  ,[]);


  return (
    <>
    <Header/>
    <div className="cards">
      
      {cardsData?.filter((card => card.points !== "undecided")).sort((a,b) => a.points < b.points ? -1:1).map((card)=>(
        <Card key={card.name} name={card.name} color={card.color} points={card.points} image_uri={card.image_uri}
        />
      ))}
    </div>
      
    </>
  )
}

export default App
