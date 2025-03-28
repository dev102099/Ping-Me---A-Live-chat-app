import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";

import "./Componentcss.css";
import Contact from "./Contact";
function Searchcontainer() {
  return (
    <div className=" flex flex-col gap-3 w-[100%] md:w-[10%]  md:min-w-[25%] ">
      <div className=" flex justify-center m-6">
        <img src="../public/Group 2.svg" alt="" className="h-15 w-15" />
      </div>

      <div className="flex flex-row  md:flex-col gap-10 md:gap-3 ">
        <div className=" hover:bg-gray-800 p-3 md:p-2 flex ml-5 gap-4 text-white rounded-full md:rounded-lg cursor-pointer">
          <PersonIcon sx={{ color: "#00bfff" }} />
          <p className="text-white text-lg hidden md:block">User</p>
        </div>

        <div className=" hover:bg-gray-800 p-2 flex ml-5 gap-4 text-white rounded-lg cursor-pointer">
          <PersonAddIcon sx={{ color: "#00ff55" }} />
          <p className="text-white text-lg  hidden md:block">Add new chat</p>
        </div>
        <div className=" hover:bg-gray-800 p-2 flex ml-5 gap-4 text-white rounded-lg cursor-pointer">
          <GroupAddIcon sx={{ color: "#ff8000" }} />
          <p className="text-white text-lg  hidden md:block">New Group</p>
        </div>
        <div className=" hover:bg-gray-800 p-2 flex ml-5 gap-4 text-white rounded-lg cursor-pointer">
          <DarkModeIcon sx={{ color: "white" }} />
          <p className="text-white text-lg  hidden md:block">Theme </p>
        </div>
      </div>

      <div className="flex items-center hidden md:block relative">
        <SearchIcon sx={{ color: "white" }} className=" absolute m-3" />

        <input
          type="text"
          placeholder="Search"
          className="bg-black text-white border-1 border-white p-3 pl-10 rounded-full w-full "
        />
      </div>
      <div className="bg bg-white  hidden md:block rounded-3xl p-10 pl-6 pr-6 flex flex-col">
        <Contact />
      </div>
    </div>
  );
}

export default Searchcontainer;
