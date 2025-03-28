import React from "react";

import "./Componentcss.css";

import { Outlet } from "react-router-dom";

function MainContainer() {
  return (
    <div className="  shrink bg-white ml-5 w-screen  mt-5 mb-5 p-5 flex-1 flex-col gap-3  shadow-xl rounded-tl-3xl rounded-bl-3xl Main">
      <Outlet />
    </div>
  );
}

export default MainContainer;
