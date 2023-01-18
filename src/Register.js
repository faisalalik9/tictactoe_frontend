import React, { useState } from "react";
import Button from "./components/Button";
import arrow from "./assets/arrow.svg";
import LabelledInput from "./components/LabelledInput";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Register({ setCurrState }) {
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let navigate = useNavigate();
  const baseURI = "https://tictactoe-backend-pi.vercel.app";

  const handleRegister = (e) => {
    e.preventDefault();
    let user = {
      username: userName,
      email: email,
      name: name,
      password: password,
    };
    axios
      .post(`${baseURI}/authenticate/signup`, user)
      .then((res) => {
        console.log(res);
        toast.success("Congratulations! Account Created", {
          position: "bottom-center",
        });
        navigate("/login");
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
          <h3 className="text-md font-semibold mb-2">Create account</h3>
          <h1 className="text-3xl font-bold ">
            Let's get to know
            <br />
            you better!
          </h1>
        </div>
        <div>
          <Toaster />
        </div>

        <form onSubmit={handleRegister}>
          <div className="">
            <LabelledInput
              ID="rname"
              type="text"
              label="Your name"
              placeholder="Type your name here"
              setState={setName}
            />
            <LabelledInput
              ID="rusername"
              type="text"
              label="Username"
              placeholder="Type your username here"
              setState={setUserName}
            />
            <LabelledInput
              ID="remail"
              type="email"
              label="Email"
              placeholder="Type your email here"
              setState={setEmail}
            />
            <LabelledInput
              ID="rpass"
              type="password"
              label="Password"
              placeholder="Type your password here"
              setState={setPassword}
            />
          </div>

          <div className="absolute w-full bottom-0">
            <Button text="Register" color="yellow" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
