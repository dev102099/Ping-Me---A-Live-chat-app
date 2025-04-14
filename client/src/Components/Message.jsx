import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/Slice/userSlice";

function Message() {
  const { selectedChat, messages } = useSelector((state) => state.user);
  const { currentUser, lightTheme } = useSelector((state) => state.user);
  const bgColor = lightTheme ? "bg-[#f2f2f2]" : "bg-zinc-800";
  const textColor = lightTheme ? "text-black" : "text-white";
  const iconColor = lightTheme ? "black" : "#ff1493";
  const borderColor = lightTheme ? "border-black" : "border-blue-400";
  const [formData, setFormData] = useState({
    sender: currentUser.restData.username,
    reciever: selectedChat.username || selectedChat._id,
    message: "",
  });
  const dispatch = useDispatch();
  const SERVER = import.meta.env.VITE_SERVER;

  const sendMessage = async () => {
    try {
      dispatch(setMessages([...messages, formData]));
      const res = await fetch(`${SERVER}/messages/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setFormData({ ...formData, message: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`shadow-sm justify-between p-3 flex rounded-full ${bgColor} border-1 ${borderColor} items-center`}
    >
      <IconButton>
        <AttachFileIcon sx={{ color: `${iconColor}` }} />
      </IconButton>
      <input
        type="text"
        placeholder="Message..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={`w-full outline-none ${textColor}`}
      />

      <IconButton>
        <SendIcon sx={{ color: `${iconColor}` }} onClick={sendMessage} />
      </IconButton>
    </div>
  );
}

export default Message;
