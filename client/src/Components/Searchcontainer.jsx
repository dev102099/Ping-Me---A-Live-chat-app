import React, { useEffect, useState, useRef } from "react";
import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./Componentcss.css";
import Contact from "./Contact";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import { setTheme } from "../redux/Slice/userSlice";

function Searchcontainer() {
  const [data, setData] = useState("");
  const [userData, setUser] = useState([]);
  const [newUser, setNewUser] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const { currentUser, messages, lightTheme } = useSelector(
    (state) => state.user
  );

  const bgColor = lightTheme ? "bg-[#f2f2f2]" : "bg-zinc-800";
  const [formData, setFormData] = useState({
    sender: "",
    reciever: "",
    message: "",
  });
  const SERVER = import.meta.env.VITE_SERVER;
  const dispatch = useDispatch();

  useEffect(() => {
    const user = async () => {
      try {
        const res = await fetch(
          `${SERVER}/user/fetch-user/${currentUser.restData.username}`,
          {
            credentials: "include",
          }
        );
        const data1 = await res.json();
        if (data1.success === false) {
          setLoading(false);
          return setError(data1.message);
        }
        setLoading(false);

        setUser(data1);
      } catch (error) {
        console.log(error);
      }
    };
    setTimeout(() => {
      user();
    }, 500);
  }, [newUser, messages.length]);

  const addUser = async () => {
    try {
      setFormData({
        ...formData,
        sender: currentUser.username,
        reciever: username,
      });
      const res = await fetch(`${SERVER}/user/add-user/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: currentUser.restData._id,
          username: currentUser.restData.username,
          message: formData,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        return console.log(data.message);
      }
      setNewUser(!newUser);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-col gap-3 w-[100%] md:w-[10%]  md:min-w-[25%] ">
      <div className=" flex justify-center m-6">
        <img src="../public/Group 2.svg" alt="" className="h-15 w-15" />
      </div>

      <div className="flex flex-row  md:flex-col gap-10 md:gap-3 ">
        <div
          onClick={() => navigate("/chatarea/profile")}
          className=" hover:bg-gray-800 p-3 md:p-2 flex ml-5 gap-4 text-white rounded-full md:rounded-lg cursor-pointer"
        >
          <PersonIcon sx={{ color: "#00bfff" }} />
          <p className="text-white text-lg hidden md:block">User</p>
        </div>

        <div
          onClick={() => setNewUser(true)}
          className=" hover:bg-gray-800  p-2 flex ml-5 gap-4 text-white rounded-lg cursor-pointer"
        >
          <PersonAddIcon sx={{ color: "#00ff55" }} />

          <p className="text-white text-lg  hidden md:block">Add new chat</p>
        </div>

        {newUser ? (
          <div className="   p-2 flex flex-col ml-5 gap-2 text-white rounded-lg ">
            <div className="flex justify-between">
              <CloseIcon
                sx={{ color: "#ff0000" }}
                onClick={() => setNewUser(false)}
                className="cursor-pointer"
              />
              <AddIcon
                className="cursor-pointer"
                sx={{ color: "#7cfc00" }}
                onClick={addUser}
              />
            </div>

            <input
              type="text"
              placeholder="Enter the username"
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 p-2 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Enter the first message"
              onChange={(e) =>
                setFormData({
                  sender: currentUser.restData.username,
                  reciever: username,
                  message: e.target.value,
                })
              }
              className="bg-gray-800 p-2 rounded-lg focus:outline-none"
            />
          </div>
        ) : null}

        <div className=" hover:bg-gray-800 p-2 flex ml-5 gap-4 text-white rounded-lg cursor-pointer">
          <GroupAddIcon sx={{ color: "#ff8000" }} />
          <p className="text-white text-lg  hidden md:block">New Group</p>
        </div>
        {lightTheme ? (
          <div
            onClick={() => {
              dispatch(setTheme(!lightTheme));
            }}
            className=" hover:bg-gray-800 p-2 flex ml-5 gap-4 text-white rounded-lg cursor-pointer"
          >
            <LightModeIcon sx={{ color: "orange" }} />
            <p className="text-white text-lg  hidden md:block">Toggle Theme </p>
          </div>
        ) : (
          <div
            onClick={() => dispatch(setTheme(!lightTheme))}
            className=" hover:bg-gray-800 p-2 flex ml-5 gap-4 text-white rounded-lg cursor-pointer"
          >
            <DarkModeIcon sx={{ color: "white" }} />
            <p className="text-white text-lg  hidden md:block">Toggle Theme </p>
          </div>
        )}
      </div>

      <div className="flex items-center  hidden md:block relative">
        <SearchIcon
          sx={{ color: "#ff4dac" }}
          className=" absolute m-3 ml-9  cursor-pointer"
        />

        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setData(e.target.value)}
          className="bg-black caret-[#33ccff] text-[#33ccff] border-1 border-[#33ccff] p-3 ml-5 pl-12 w-[95%] focus:outline-none rounded-full  "
        />
      </div>

      <div
        className={` ${bgColor} mb-3  md:block  ml-5 rounded-3xl p-3 pl-6 pr-6 flex flex-col`}
      >
        {userData.map((user) => {
          return <Contact User={user} key={user._id} />;
        })}
      </div>
    </div>
  );
}

export default Searchcontainer;
