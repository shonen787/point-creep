import "./App.css";
import _cards from "./assets/cards/cards.json";
import Header from "./Header";
import About from "./About";
import Points from "./Points";
import Home from "./Home";
import Page404 from "./404";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/points" element={<Points />} />
          <Route path="*" element={<Page404/>} />        
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

/*TODO
  1. A way to vote on the points of a card. 
*/

/*TODO
  Modify both filter components to be dynamically generated on avaiable card data based on the previous filter. 
*/ 
