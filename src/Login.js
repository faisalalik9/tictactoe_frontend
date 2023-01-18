import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import arrow from "./assets/arrow.svg";
import LabelledInput from "./components/LabelledInput";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setCookie } from "./functions/cookie";

function Login({ setUser }) {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();

  const baseURI = "https://tictactoe-backend-pi.vercel.app";

  const handleLogin = () => {
    let user = {
      username: userName,
      password: password,
    };
    axios
      .post(`${baseURI}/authenticate/login`, user)
      .then((res) => {
        console.log(res);
        if (res.data.message === "User has logged in") {
          setCookie("isLoggedIn", true, 31);
          setCookie("email", res.data.userDetails.email, 31);
          setCookie("name", res.data.userDetails.name, 31);
          toast.success("Logeed in Successfully!", {
            position: "bottom-center",
          });
          navigate("/home");
          setUser(res.data.userDetails);
        } else {
          toast.error("Wrong Credentials!", {
            position: "bottom-center",
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div className="h-screen w-full lg:w-1/4 px-6 py-6 font-epl ">
      <div className="relative h-full w-full">
        <img
          onClick={() => {
            navigate(-1);
          }}
          src={arrow}
          alt="arrow"
          className="mb-8"
        />
        <div className="mb-8">
          <h3 className="text-md font-semibold mb-2">Login</h3>
          <h1 className="text-3xl font-bold ">
            Please enter your
            <br />
            details
          </h1>
        </div>

        <div className="">
          <LabelledInput
            ID="lusername"
            setState={setUserName}
            type="text"
            label="Username"
            placeholder="Type your username here"
          />
          <LabelledInput
            ID="lpass"
            setState={setPassword}
            type="password"
            label="Password"
            placeholder="Type your password here"
          />
        </div>

        <div className="absolute w-full bottom-0">
          <Button handleClick={handleLogin} text="Login" color="yellow" />
        </div>
      </div>

      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default Login;
