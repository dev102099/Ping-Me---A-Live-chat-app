import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSelectedChat,
  setMessages,
  setLoading,
} from "../redux/Slice/userSlice";

function Contact({ User }) {
  const [firstLetter, setFirst] = useState("");
  const [length, setLength] = useState("");
  const { currentUser, lightTheme } = useSelector((state) => state.user);

  const shadowColor = lightTheme ? "shadow-gray" : "shadow-white";
  const textColor = lightTheme ? "text-black" : "text-white";
  const color = lightTheme
    ? "bg-slate-300"
    : "bg-gradient-to-b from-blue-400 to-pink-400 ";
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const SERVER = import.meta.env.VITE_SERVER;

  useEffect(() => {
    if (User.user) {
      setFirst(User.user.charAt(0));
      setLength(User.messages.length - 1);
    }
  }, [User]);

  const getUser = async () => {
    try {
      dispatch(setLoading(true));
      const res = await fetch(`${SERVER}/user/selected-user/${User.user}`, {
        credentials: "include",
      });
      const data = await res.json();
      dispatch(setSelectedChat(data));
      const chat = await fetch(
        `${SERVER}/messages/get-messages/${User.user}/${currentUser.restData.username}`,
        {
          credentials: "include",
        }
      );
      const data2 = await chat.json();

      if (data2.success === false) {
        dispatch(setLoading(false));
        return console.log(data2.message);
      }

      dispatch(setMessages(data2));
      dispatch(setLoading(false));
      navigate("/chatarea/chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={getUser}
      className={`flex mb-5 hover:shadow-lg ${shadowColor} p-3  rounded-2xl justify-between`}
    >
      <div className="flex gap-3">
        <div
          className={`flex justify-center items-center bg-gray-300 h-13 w-13 rounded-full ${color}`}
        >
          <h2 className={`font-bold text-white`}>{`${firstLetter}`}</h2>
        </div>

        <div className="flex flex-col justify-between">
          <h2 className={`font-semibold ${textColor}`}>{`${User.user}`}</h2>

          <h3 className="text-sm text-gray-300">
            {User.messages[User.messages.length - 1].message || ""}
          </h3>
        </div>
      </div>
      <div className="flex items-end">
        <span className="text-gray-300">time</span>
      </div>
    </div>
  );
}

export default Contact;
