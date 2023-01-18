import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import arrow from "./assets/arrow.svg";
import x from "./assets/x.svg";
import Button from "./components/Button";
import { getCookie } from "./functions/cookie";
function Game({ onClickBack, opponent }) {
  const [block, setBlock] = useState(null);

  let navigate = useNavigate();
  const baseURI = "https://tictactoe-backend-pi.vercel.app";
  const handleGameSubmit = () => {
    let email = getCookie("email");
    let name = getCookie("name");

    if (block !== null) {
      let data = {
        gameId: "",
        player1: email,
        player2: opponent?.email,
        player1Name: name,
        player2Name: opponent?.name,
        turn: 2,
        [block]: "X",
        isDraw: false,
      };

      axios
        .post(`${baseURI}/games`, data)
        .then((res) => {
          toast.success("Game Successfully Created!", {
            position: "bottom-center",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="h-screen w-full lg:w-1/4 px-6 py-6 font-epl ">
      <div className="relative h-full w-full">
        <img onClick={onClickBack} src={arrow} alt="arrow" className="mb-8" />
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 ">
            Game with {opponent?.name}
          </h1>
          <h3 className="text-md font-normal mb-4">Your piece</h3>
          <img src={x} alt="arrow" className="ml-4" />
        </div>

        <div className="w-full">
          <div className="text-center py-3 bg-lightyellow mb-0">Your move</div>
          <div className="grid grid-cols-3 gap-0">
            <div
              onClick={() => {
                setBlock(0);
              }}
              className="col-span-1 h-24 flex justify-center items-center w-full h-full "
            >
              {block === 0 && <img src={x} alt="circle" />}
            </div>
            <div
              onClick={() => {
                setBlock(1);
              }}
              className="col-span-1 h-24 border-h flex justify-center items-center w-full h-full "
            >
              {block === 1 && <img src={x} alt="circle" />}
            </div>
            <div
              onClick={() => {
                setBlock(2);
              }}
              className="col-span-1 h-24 flex justify-center items-center w-full h-full "
            >
              {block === 2 && <img src={x} alt="circle" />}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-0 custom-m">
            <div
              onClick={() => {
                setBlock(3);
              }}
              className="col-span-1 h-24 border-v flex justify-center items-center w-full h-full "
            >
              {block === 3 && <img src={x} alt="circle" />}
            </div>
            <div
              onClick={() => {
                setBlock(4);
              }}
              className="col-span-1 h-24 border-h border-v flex justify-center items-center w-full h-full"
            >
              {block === 4 && <img src={x} alt="circle" />}
            </div>
            <div
              onClick={() => {
                setBlock(5);
              }}
              className="col-span-1 h-24 border-v flex justify-center items-center w-full h-full"
            >
              {block === 5 && <img src={x} alt="circle" />}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-0">
            <div
              onClick={() => {
                setBlock(6);
              }}
              className="col-span-1 h-24 flex justify-center items-center w-full h-full "
            >
              {block === 6 && <img src={x} alt="circle" />}
            </div>
            <div
              onClick={() => {
                setBlock(7);
              }}
              className="col-span-1 h-24 border-h flex justify-center items-center w-full h-full "
            >
              {block === 7 && <img src={x} alt="circle" />}
            </div>
            <div
              onClick={() => {
                setBlock(8);
              }}
              className="col-span-1 h-24 flex justify-center items-center w-full h-full "
            >
              {block === 8 && <img src={x} alt="circle" />}
            </div>
          </div>
        </div>

        <div className="absolute w-full bottom-0">
          <Button handleClick={handleGameSubmit} text="Submit" color="yellow" />
        </div>
      </div>

      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default Game;
