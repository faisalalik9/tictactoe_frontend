import React, { useState } from "react";
import Button from "./components/Button";
import arrow from "./assets/arrow.svg";
import LabelledInput from "./components/LabelledInput";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function NewGame({ onClickBack, onClickStartGame, setOpponent }) {
  const [email, setEmail] = useState();
  const baseURI = "https://tictactoe-backend-pi.vercel.app";

  const handleCheck = (e) => {
    e.preventDefault();
    axios
      .get(`${baseURI}/games/${email}`)
      .then((res) => {
        if (res.data.data.length === 0) {
          handleSubmit();
        } else {
          let check = true;
          let arr = res.data.data;
          arr.map((game) => {
            if (game.status === "pending") {
              check = false;
            }
          });
          if (check) {
            handleSubmit();
          } else {
            console.log("Active Game already exists!");
            toast.error("Active Game already exists!", {
              position: "bottom-center",
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    axios
      .get(`${baseURI}/${email}`)
      .then((res) => {
        console.log("Res", res);
        setOpponent(res.data.data);
        onClickStartGame();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen w-full lg:w-1/4 px-6 py-6 font-epl ">
      <div className="relative h-full w-full">
        <img onClick={onClickBack} src={arrow} alt="arrow" className="mb-8" />
        <div className="mb-8">
          <h3 className="text-md font-semibold mb-2">Start a new game</h3>
          <h1 className="text-3xl font-bold ">
            Whom do you want
            <br />
            to play with?
          </h1>
        </div>

        <form onSubmit={handleCheck}>
          <div className="">
            <LabelledInput
              setState={setEmail}
              ID="nemail"
              type="email"
              label="Email"
              placeholder="Type their email here"
            />
          </div>

          <div className="absolute w-full bottom-0">
            <Button text="Start game" color="yellow" />
          </div>
        </form>
      </div>

      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default NewGame;
