import React, { useState } from "react";
import "./page.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../src/Components/Spinner";
import { Alert } from "@mui/material";

function SignUp() {
  const SERVER = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${SERVER}/user/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
        setLoading(false);
        return;
      }
      setLoading(false);

      setSuccess(data);

      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        setSuccess(null);
        navigate("/signin");
      }, 2000);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center signup h-screen w-screen ">
      <div className="flex h-[90%] w-[95%] bg-black rounded-4xl shadow-lg ">
        <div className="w-[35%] h-full  flex justify-center items-center rounded-tl-4xl rounded-bl-4xl">
          <img src="Group 2.svg" className="h-60 w-60" />
        </div>
        <div className="border-l-1 border-white p-40 flex flex-col gap-3 h-full  w-[65%] rounded-tr-4xl rounded-br-4xl ">
          {success != null ? (
            <Alert severity="success">
              Successfull registration.Please login...
            </Alert>
          ) : null}
          {error ? <Alert severity="error">{error}</Alert> : null}
          <h1 className="text-white font-semibold  text-6xl">
            Create your account
          </h1>
          <div className="mb-10">
            <span className="text-white text-xs">Already have an account?</span>{" "}
            <div className=" inline-block">
              <span
                className=" bg-gradient-to-r from-sky-400 to-fuchsia-400 bg-clip-text text-xs text-transparent  hover:underline hover:underline-offset-10  cursor-pointer"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Log In
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="gap-15 flex">
              <input
                type="text"
                placeholder="Username"
                id="username"
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
                className="text-white border-1 border-slate-950 focus:outline-none focus:border-white bg-gray-900 p-3 w-full rounded-lg first"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              className="text-white border-1 border-slate-950 focus:outline-none focus:border-white bg-gray-900 w-full p-3 rounded-lg "
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              className="text-white border-1 border-slate-950 bg-gray-900 w-full focus:outline-none focus:border-white focus:ring-0 p-3 rounded-lg "
            />

            <button
              onClick={handleSignIn}
              disabled={loading}
              className="text-white  bg-black border-1 w-full border-white p-3 rounded-xl cursor-pointer hover:opacity-50"
            >
              {loading ? <Spinner /> : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
