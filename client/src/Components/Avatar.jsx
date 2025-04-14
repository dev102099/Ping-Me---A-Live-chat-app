import React from "react";
import { useSelector } from "react-redux";

function Avatar() {
  const { selectedChat, lightTheme } = useSelector((state) => state.user);
  const color = lightTheme
    ? "bg-slate-300"
    : "bg-gradient-to-b from-blue-400 to-pink-400 ";
  const textColor = lightTheme ? "text-black" : "text-white";

  if (!selectedChat || !selectedChat.username) {
    return (
      <div className="flex gap-3 items-center">
        <div
          className={`h-14 w-14 rounded-full ${color} flex justify-center items-center animate-pulse`}
        >
          <span className="text-white font-bold">...</span>
        </div>
        <div className="flex flex-col ">
          <span className="text-lg text-gray-400">Loading...</span>
          <span>😈</span>
        </div>
      </div>
    );
  }

  const firstLetter = selectedChat.username.charAt(0).toUpperCase();

  return (
    <div className={`flex gap-3  items-center`}>
      <div
        className={`h-14 w-14 rounded-full ${color} flex justify-center items-center`}
      >
        <span className="text-white font-bold">{firstLetter}</span>
      </div>
      <div className="flex flex-col ">
        <span className={`text-lg ${textColor}`}>{selectedChat.username}</span>
        <span>😈</span>
      </div>
    </div>
  );
}

export default Avatar;
