import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../src/Components/Spinner";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../src/redux/Slice/userSlice";
import Alert from "@mui/material/Alert";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const SERVER = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER}/user/log-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);

        setError(data.Message);
        setTimeout(() => {
          setError(null);
        }, 2000);
        return;
      }
      setLoading(false);
      setSuccess(true);
      dispatch(setCurrentUser(data));
      setTimeout(() => {
        setSuccess(false);
        navigate("/chatarea/welcome");
      }, 2000);
    } catch (error) {
      setError("Something went wrong.");
      setTimeout(() => {
        setError(null);
      }, 1000);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center w-screen login">
      {success ? (
        <Alert severity="success">Successful login. Redirecting...</Alert>
      ) : null}
      {error != null ? <Alert severity="error">{`${error}`}</Alert> : null}

      <div className="w-[35%] flex-col flex h-[60%] rounded-3xl bg-black ">
        <div className="h-[20%] w-full flex justify-center p-5 rounded-3xl">
          <img src="Group 2.svg" className="h-20" />
        </div>
        <div className="h-[80%] flex flex-col items-center w-full rounded-3xl">
          <div className="flex justify-center mb-12">
            <h1 className="text-white text-4xl mt-10 font-semibold">Sign In</h1>
          </div>
          <div className="w-[80%] flex flex-col gap-6">
            <input
              type="text"
              placeholder="Username"
              id="username2"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="border-1 border-slate-950 focus:outline-none focus:border-white bg-gray-900 text-white w-full rounded-2xl p-3 "
            />
            <input
              type="password"
              placeholder="Password"
              id="password2"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="border-1 border-slate-950 focus:outline-none focus:border-white bg-gray-900 text-white w-full rounded-2xl p-3 "
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="text-white w-full bg-black border-1 border-white p-3 rounded-xl cursor-pointer hover:opacity-50"
            >
              {loading ? <Spinner /> : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
