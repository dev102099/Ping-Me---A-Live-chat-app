import { useState, useEffect } from "react";
import "./App.css";
import MainContainer from "./Components/MainContainer";
import Recents from "./Components/Recents";
import Searchcontainer from "./Components/Searchcontainer";

function App() {
  useEffect(() => {
    const favicon = document.getElementById("favicon");

    const updateFavicon = () => {
      const darkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      favicon.href = darkMode ? "/Group 2.svg" : "/Group 1.svg";
    };

    updateFavicon();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateFavicon);

    return () => mediaQuery.removeEventListener("change", updateFavicon);
  }, []);

  return (
    <div className="App flex flex-col ">
      <link id="favicon" rel="icon" type="image/svg+xml" href="/Group 2.svg" />
      <Recents></Recents>
      <div className="flex flex-row ">
        <Searchcontainer></Searchcontainer>
        <MainContainer></MainContainer>
      </div>
    </div>
  );
}

export default App;
