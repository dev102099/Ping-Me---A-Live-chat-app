import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import socket from "../src/socket";
import { setCurrentUser } from "../src/redux/Slice/userSlice";

import Spinner from "../src/Components/Spinner";
import { Alert } from "@mui/material";
function Profile() {
  const { currentUser, lightTheme } = useSelector((state) => state.user);
  let firstLetter = currentUser.restData.username.charAt(0);
  const bgColor = lightTheme ? "bg-[#f2f2f2]" : "bg-zinc-700";
  const dispatch = useDispatch();
  const [isDisabled, setDisabled] = React.useState(true);
  const [formData, setFormData] = React.useState({
    id: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const [success, setSuccess] = React.useState(false);
  const SERVER = import.meta.env.VITE_SERVER;

  const handlelogout = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER}/user/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);

        return;
      }

      socket.disconnect();

      setTimeout(() => {
        setLoading(false);
        navigate("/");
        dispatch(setCurrentUser(""));
      }, 300);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Something went wrong");
    }
  };

  const handleupdate = async () => {
    try {
      setLoading(true);
      setFormData({
        ...formData,
        id: currentUser.restData._id,
      });
      const res = await fetch(`${SERVER}/user/update-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
        return;
      }
      const restData = data;
      dispatch(setCurrentUser({ restData }));
      setLoading(false);
      setDisabled(true);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      setFormData({
        id: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="  flex gap-3 flex-col justify-center items-center w-[100%] h-[100%]">
      {success ? (
        <Alert severity="success">Profile updated successfully.</Alert>
      ) : null}
      {error != null ? <Alert severity="error">{`${error}`}</Alert> : null}
      {loading ? (
        <Spinner />
      ) : (
        <div
          className={`rounded-3xl h-[80%] flex flex-col w-[50%] justify-center items-center gap-3 ${bgColor}`}
        >
          <div className="bg-gradient-to-b from-blue-400 to-pink-400 flex flex-col justify-center items-center rounded-full w-[17%] h-[15%]">
            {isDisabled ? (
              <EditIcon
                sx={{ color: "green" }}
                onClick={() => setDisabled(false)}
                className="ml-16 cursor-pointer h-fit w-fit"
              />
            ) : (
              <CloseIcon
                sx={{ color: "red" }}
                onClick={() => setDisabled(true)}
                className="ml-16  cursor-pointer h-fit w-fit"
              />
            )}

            <span className="text-white text-2xl mb-5">{`${firstLetter}`}</span>
          </div>
          <input
            type="text"
            disabled={true}
            placeholder="Username"
            className="text-center  text-blue-400 focus:outline-none border-white p-3 rounded-2xl border-1"
            defaultValue={currentUser.restData.username}
          />
          <input
            type="text"
            disabled={isDisabled}
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="text-center text-pink-400 focus:outline-none border-1 border-white  p-3 rounded-2xl"
            defaultValue={currentUser.restData.email}
          />
          <input
            type="text"
            disabled={isDisabled}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Password"
            className="text-center border-1  text-blue-400 focus:outline-none border-white  p-3 rounded-2xl"
          />
          <div className="flex gap-3">
            <button
              onClick={handleupdate}
              className="p-2 border-1 rounded-2xl text-white cursor-pointer bg-gradient-to-l from-blue-400 to-pink-400"
            >
              {loading ? <Spinner /> : "Update Profile"}
            </button>
            <button
              onClick={handlelogout}
              className="p-2 border-1 rounded-2xl text-white cursor-pointer bg-red-700"
            >
              {loading ? <Spinner /> : "Logout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
