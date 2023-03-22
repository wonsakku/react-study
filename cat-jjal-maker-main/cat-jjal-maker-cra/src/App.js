import logo from './logo.svg';
import React from "react";
import Title from "./components/Title"
import MainCard from "./components/MainCard"
import Favorites from "./components/Favorites"
import Form from "./components/Form"

import './App.css';


const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};





// ReactDOM.render(catItem, divApp);
const App = () => {

  const CAT1 = "https://mblogthumb-phinf.pstatic.net/MjAxOTA0MTFfMTA1/MDAxNTU0OTg3MDgwNTI5.Rczn3VCdDHaUIfV0BUZIfD-LVTGD7wY1PCmVz5H5hikg.7gWyEtEAFNWLXPHMfqO_WvwmoNI50wcpX7tb1wzgeccg.JPEG.mcthemax1677/20190411_215109.JPG?type=w800";
  const CAT2 = "https://cdn.eyesmag.com/content/uploads/posts/2022/08/08/main-ad65ae47-5a50-456d-a41f-528b63071b7b.jpg";
  const CAT3 = "https://www.sisain.co.kr/news/photo/202110/45791_82634_4851.jpg";


  // const [counter, setCounter] = React.useState(
  //   Number(localStorage.getItem("counter"))
  // );
  const [counter, setCounter] = React.useState(() => {
    return Number(localStorage.getItem("counter"));
  });
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => jsonLocalStorage.getItem("favorites") || []);

  const alreadyFavorivate = favorites.includes(mainCat);


  async function setInitialCat() {
    const newCat = await fetchCat("First Cat");
    setMainCat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);
    setMainCat(newCat);
    // setCounter(nextCounter);
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  const counterTitle = counter == null ? "" : counter + " 번째 ";


  return (
    <div>
      <Title>{counterTitle} 난 됐어 귀찮으니까</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCat} alreadyFavorivate={alreadyFavorivate} onHeartClick={handleHeartClick} />
      <Favorites favorites={favorites} />
    </div>
  )
}

export default App;
