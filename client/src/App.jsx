import { useEffect } from "react";
import "./App.css";
import MainContainer from "./Components/MainContainer";

import Searchcontainer from "./Components/Searchcontainer";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Components/Welcome";
import Chat from "./Components/Chat";
import ChatArea from "./Components/ChatArea";
import Message from "./Components/Message";

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
    <>
      <div className="App flex overflow-hidden  ">
        <link
          id="favicon"
          rel="icon"
          type="image/svg+xml"
          href="/Group 2.svg"
        />

        <div className=" h-screen flex-col flex md:flex-row  w-screen root-container ">
          <Searchcontainer></Searchcontainer>
          <Routes>
            <Route path="/" element={<MainContainer />}>
              <Route path="welcome" element={<Welcome />} />
              <Route
                path="chat"
                element={
                  <>
                    <Chat />
                    <ChatArea />
                    <Message />
                  </>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
