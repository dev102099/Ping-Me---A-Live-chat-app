import React from "react";
import SentMessage from "./SentMessage";
import RecievedMessage from "./RecievedMessage";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import socket from "../socket";

import { setMessages } from "../redux/Slice/userSlice";
function ChatArea() {
  const { messages, currentUser, lightTheme } = useSelector(
    (state) => state.user
  );
  const messagesRef = useRef(messages);
  const bgColor = lightTheme ? "bg-[#f2f2f2]" : "bg-zinc-800";
  const borderColor = lightTheme ? "border-black" : "border-blue-400";

  // keep the ref updated
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      const updatedMessages = [...messagesRef.current, data];
      dispatch(setMessages(updatedMessages));
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage); // 🧹 Cleanup
    };
  }, [socket, dispatch]);

  return (
    <div
      className={`overflow-scroll scrollbar-hide &::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-[80%] flex flex-col gap-3 border-1 ${borderColor} shadow-sm rounded-2xl p-3 ${bgColor}`}
    >
      {messages.map((messages1) => {
        return messages1.sender === currentUser.restData.username ? (
          <div className="flex justify-end">
            <SentMessage Message={messages1.message} />
          </div>
        ) : (
          <div className="">
            <RecievedMessage Message={messages1.message} />
          </div>
        );
      })}
    </div>
  );
}

export default ChatArea;
