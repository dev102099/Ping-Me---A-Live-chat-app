import React from "react";
import { useSelector } from "react-redux";

import "./Componentcss.css";

import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function MainContainer() {
  const { lightTheme, isLoading, currentUser } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate;
  const bgColor = lightTheme ? "bg-white" : "bg-zinc-800";
  return (
    <>
      {isLoading ? (
        <div
          className={`shrink ${bgColor} ml-5 w-screen  mt-5 mb-5 p-5 flex items-center justify-center flex-col gap-3  shadow-xl rounded-tl-3xl rounded-bl-3xl Main`}
        >
          <Spinner />
        </div>
      ) : (
        <div
          className={`shrink ${bgColor} ml-5 w-screen  mt-5 mb-5 p-5 flex flex-col gap-3  shadow-xl rounded-tl-3xl rounded-bl-3xl Main`}
        >
          {currentUser ? <Outlet /> : navigate("/")}
        </div>
      )}
    </>
  );
}

export default MainContainer;
