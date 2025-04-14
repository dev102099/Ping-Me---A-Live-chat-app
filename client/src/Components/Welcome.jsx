import React from "react";
import { useSelector } from "react-redux";
function Welcome() {
  const { currentUser, lightTheme } = useSelector((state) => state.user);
  const icon = lightTheme ? "/Group 1.svg" : "/Group 2.svg";
  const qoute = lightTheme ? "text-gray-400" : "text-pink-400";
  const head = lightTheme ? "text-black" : "text-white";
  const foot = lightTheme ? "text-black" : "text-blue-400";
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-full w-full">
      <img src={`${icon}`} className="h-[30%] w-[30%]" />
      <span
        className={`text-2xl ${head} font-semibold`}
      >{`Welcome ${currentUser.restData.username} to PingMe`}</span>
      <div className="flex flex-col">
        <span className={`text-gray-400 ${qoute}`}>
          "PingMe is a place where you can connect with friends and family.
        </span>
        <span className={`text-gray-400 self-center ${qoute}`}>
          Messages fly faster here. Ready to connect?"
        </span>
      </div>

      <span className={`mt-30 text-xl font-semibold ${foot}`}>
        Select a chat or add new friends whenever ready!
      </span>
    </div>
  );
}

export default Welcome;
