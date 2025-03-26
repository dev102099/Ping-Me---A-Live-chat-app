import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import "./Componentcss.css";
import Contact from "./Contact";
function Searchcontainer() {
  return (
    <div className="bg-white flex flex-col gap-5 h-150 w-100  shadow-xl p-3 ml-10 rounded-3xl searchcontain">
      <div className="flex justify-between bg-white p-3 rounded-full">
        <IconButton>
          <PersonIcon />
        </IconButton>

        <div className="flex gap-5">
          <IconButton>
            {" "}
            <PersonAddIcon />
          </IconButton>
          <IconButton>
            <GroupAddIcon />
          </IconButton>
          <IconButton>
            <DarkModeIcon />
          </IconButton>
        </div>
      </div>
      <div className="flex items-center relative">
        <SearchIcon className=" absolute m-3" />

        <input
          type="text"
          placeholder="Search"
          className="bg-white p-3 pl-10 rounded-full w-full "
        />
      </div>
      <div className="bg bg-white h-full rounded-3xl p-10 pl-6 pr-6 flex flex-col">
        <Contact />
      </div>
    </div>
  );
}

export default Searchcontainer;
