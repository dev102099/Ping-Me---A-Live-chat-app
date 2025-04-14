import React from "react";
import { useSelector } from "react-redux";

import "./Componentcss.css";

import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";

function MainContainer() {
  const { lightTheme, isLoading } = useSelector((state) => state.user);
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
          <Outlet />
        </div>
      )}
    </>
  );
}

export default MainContainer;
