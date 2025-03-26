import React from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton } from "@mui/material";
function Message() {
  return (
    <div className="bg-white p-3 flex justify-between rounded-full">
      <IconButton>
        <AttachFileIcon />
      </IconButton>
      <input
        type="text"
        placeholder="Message..."
        className="w-200 outline-none"
      />
      <IconButton>
        <SendIcon />
      </IconButton>
    </div>
  );
}

export default Message;
