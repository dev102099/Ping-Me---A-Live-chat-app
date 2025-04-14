import { useEffect } from "react";
import "./App.css";
import MainContainer from "./Components/MainContainer";
import Cookies from "js-cookie";
import Searchcontainer from "./Components/Searchcontainer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Welcome from "./Components/Welcome";
import Chat from "./Components/Chat";
import ChatArea from "./Components/ChatArea";
import Message from "./Components/Message";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import { useSelector } from "react-redux";
import socket from "./socket";

function App() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      navigate("/");
    }

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

  useEffect(() => {
    if (currentUser != null || currentUser != {}) {
      socket.connect();

      socket.on("connect", () => {
        socket.emit("join-room", currentUser.restData.username);
      });
    }
  }, []);

  return (
    <>
      <link id="favicon" rel="icon" type="image/svg+xml" href="/Group 2.svg" />

      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<Login />} />

        <Route
          path="/chatarea"
          element={
            <div className=" h-screen flex-col flex md:flex-row  w-screen root-container ">
              <Searchcontainer></Searchcontainer>
              <MainContainer />
            </div>
          }
        >
          <Route path="welcome" element={<Welcome />} />
          <Route path="profile" element={<Profile />} />
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
    </>
  );
}

export default App;
