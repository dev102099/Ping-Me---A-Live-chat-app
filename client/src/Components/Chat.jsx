import React from "react";
import Avatar from "./Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { red } from "@mui/material/colors";

function Chat() {
  return (
    <div>
      <div className="bg-white p-3 pl-8 rounded-3xl flex justify-between">
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
