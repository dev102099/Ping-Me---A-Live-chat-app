import React from "react";
import Avatar from "./Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import "./Componentcss.css";
import { useSelector } from "react-redux";
function Chat() {
  const { lightTheme } = useSelector((state) => state.user);
  const bgColor = lightTheme ? "bg-[#f2f2f2]" : "bg-zinc-800";
  const borderColor = lightTheme ? "border-black" : "border-blue-400";

  return (
    <div>
      <div
        className={`${bgColor} border-1 ${borderColor} shadow-sm p-3 pl-8 rounded-3xl flex justify-between`}
      >
        <Avatar />
        <IconButton>
          {" "}
          <DeleteIcon sx={{ fontSize: 28, color: red[500] }} />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
