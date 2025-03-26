import React from "react";
import Chat from "./Chat";
import "./Componentcss.css";
import ChatArea from "./ChatArea";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Message from "./Message";
import Welcome from "./Welcome";

function MainContainer() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="  ml-10 h-150 w-230 p-5 flex flex-col gap-3  shadow-xl rounded-3xl Main">
            <Welcome />
          </div>
        }
      />
      <Route
        path="chat"
        element={
          <div className="  ml-10 h-150 w-230 p-5 flex flex-col gap-3  shadow-xl rounded-3xl Main">
            <Chat />
            <ChatArea></ChatArea>
            <Message></Message>
          </div>
        }
      />
    </Routes>
  );
}

export default MainContainer;
