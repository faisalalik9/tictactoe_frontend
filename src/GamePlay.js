import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import arrow from "./assets/arrow.svg";
import o from "./assets/o.svg";
import x from "./assets/x.svg";
import Button from "./components/Button";
import { getCookie } from "./functions/cookie";
function GamePlay() {
  const [block, setBlock] = useState(null);
  const [game, setGame] = useState();
  const [myTurn, setMyTurn] = useState();
  let navigate = useNavigate();
  let { id } = useParams();
  let myemail = getCookie("email");
  const baseURI = "https://tictactoe-backend-pi.vercel.app";

  useEffect(() => {
    function fetchGame() {
      axios
        .get(`${baseURI}/games/gameById/${id}`)
        .then((res) => {
          console.log(res);
          setGame(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchGame();
  }, [id]);

  useEffect(() => {
    if (game) {
      let temp = myemail === game?.player1 ? "1" : "2";
      setMyTurn(temp);
    }
  }, [game, myemail]);

  function CheckGame(board) {
    let win = false;
    let winner = "";
    let draw = false;

    if (
      (board[0] === board[1] && board[1] === board[2] && board[0] === "X") ||
      (board[3] === board[4] && board[4] === board[5] && board[3] === "X") ||
      (board[6] === board[7] && board[7] === board[8] && board[6] === "X") ||
      (board[0] === board[3] && board[3] === board[6] && board[0] === "X") ||
      (board[1] === board[4] && board[4] === board[7] && board[1] === "X") ||
      (board[2] === board[5] && board[5] === board[8] && board[2] === "X") ||
      (board[0] === board[4] && board[4] === board[8] && board[0] === "X") ||
      (board[2] === board[4] && board[4] === board[6] && board[2] === "X")
    ) {
      win = true;
      winner = "X";
    }

    if (
      (board[0] === board[1] && board[1] === board[2] && board[0] === "O") ||
      (board[3] === board[4] && board[4] === board[5] && board[3] === "O") ||
      (board[6] === board[7] && board[7] === board[8] && board[6] === "O") ||
      (board[0] === board[3] && board[3] === board[6] && board[0] === "O") ||
      (board[1] === board[4] && board[4] === board[7] && board[1] === "O") ||
      (board[2] === board[5] && board[5] === board[8] && board[2] === "O") ||
      (board[0] === board[4] && board[4] === board[8] && board[0] === "O") ||
      (board[2] === board[4] && board[4] === board[6] && board[2] === "O")
    ) {
      win = true;
      winner = "O";
    }

    let count = 0;
    for (let i in board) {
      if (board[i] !== "") {
        count++;
      }
    }
    if (count === 9) {
      draw = true;
    }

    return {
      win: win,
      winner: winner,
      draw: draw,
    };
  }

  const handleGameSubmit = () => {
    if (game?.status === "completed") {
      navigate("/");
    }

    let val = myTurn === "1" ? "X" : "O";
    let turn = game?.turn === "1" ? "2" : "1";
    let winner = "";
    let status = "pending";
    let isDraw = false;
    let board = [
      game?.["0"],
      game?.["1"],
      game?.["2"],
      game?.["3"],
      game?.["4"],
      game?.["5"],
      game?.["6"],
      game?.["7"],
      game?.["8"],
    ];
    if (block !== null) board[block] = val;
    let check = CheckGame(board);
    if (check.win) {
      winner = myemail;
      status = "completed";
    }
    if (check.draw) {
      isDraw = true;
      status = "completed";
    }
    if (myTurn === game?.turn) {
      let data = {
        gameId: game?.gameId,
        [block]: val,
        turn: turn,
        winner: winner,
        status: status,
        isDraw : isDraw
      };
      console.log(data);

      axios
        .patch(`${baseURI}/games/update`, data)
        .then((res) => {
          console.log(res);
          setGame(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validateBlock = (idx) => {
    if (myTurn === game?.turn) {
      if (game?.[idx] === "") {
        setBlock(idx);
      }
    }
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 ">
            Game with{" "}
            {myemail === game?.player2 ? game?.player1Name : game?.player2Name}
          </h1>
          <h3 className="text-md font-normal mb-4">Your piece</h3>
          {myTurn === "1" ? (
            <img src={x} alt="arrow" className="ml-4" />
          ) : (
            <img src={o} alt="arrow" className="ml-4 w-12" />
          )}
        </div>

        <div className="w-full">
          <div className="text-center py-3 bg-lightyellow mb-0">
            {game?.winner === ""
              ? game?.isDraw
                ? "It's a Draw!"
                : myTurn === game?.turn
                ? "Your move"
                : "Their move"
              : myemail === game?.winner
              ? "You Win"
              : "You lost"}
          </div>
          <div className="grid grid-cols-3 gap-0">
            <div
              onClick={() => {
                validateBlock(0);
              }}
              className="col-span-1 h-24 flex justify-center items-center w-full h-full "
            >
              {((game?.["0"] !== " " && game?.["0"] === "X") ||
                (block === 0 && myTurn === "1")) && (
                <img src={x} alt="circle" />
              )}{" "}
              {((game?.["0"] !== " " && game?.["0"] === "O") ||
                (block === 0 && myTurn === "2")) && (
                <img src={o} className=" w-12" alt="circle" />
              )}{" "}
            </div>
            <div
              onClick={() => {
                validateBlock(1);
              }}
              className="col-span-1 h-24 border-h flex justify-center items-center w-full h-full "
            >
              {((game?.["1"] !== " " && game?.["1"] === "X") ||
                (block === 1 && myTurn === "1")) && (
                <img src={x} alt="circle" />
              )}{" "}
              {((game?.["1"] !== " " && game?.["1"] === "O") ||
                (block === 1 && myTurn === "2")) && (
                <img src={o} className=" w-12" alt="circle" />
              )}
            </div>
            <div
              onClick={() => {
                validateBlock(2);
              }}
              className="col-span-1 h-24 flex justify-center items-center w-full h-full "
            >
              {((game?.["2"] !== " " && game?.["2"] === "X") ||
                (block === 2 && myTurn === "1")) && (
                <img src={x} alt="circle" />
              )}{" "}
              {((game?.["2"] !== " " && game?.["2"] === "O") ||
                (block === 2 && myTurn === "2")) && (
                <img src={o} className=" w-12" alt="circle" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-0 custom-m">
            <div
              onClick={() => {
                validateBlock(3);
              }}
              className="col-span-1 h-24 border-v flex justify-center items-center w-full h-full "
            >
              {((game?.["3"] !== " " && game?.["3"] === "X") ||
                (block === 3 && myTurn === "1")) && (
                <img src={x} alt="circle" />
              )}{" "}
              {((game?.["3"] !== " " && game?.["3"] === "O") ||
                (block === 3 && myTurn === "2")) && (
                <img src={o} className=" w-12" alt="circle" />
              )}
            </div>
            <div
              onClick={() => {
                validateBlock(4);
              }}
              className="col-span-1 h-24 border-h border-v flex justify-center items-center w-full h-full"
            >
              {((game?.["4"] !== " " && game?.["4"] === "X") ||
                (block === 4 && myTurn === "1")) && (
                <img src={x} alt="circle" />
              )}{" "}
              {((game?.["4"] !== " " && game?.["4"] === "O") ||
                (block === 4 && myTurn === "2")) && (
                <img src={o} className=" w-12" alt="circle" />
              )}
            </div>
            <div
              onClick={() => {
                validateBlock(5);
              }}
              className="col-span-1 h-24 border-v flex justify-center items-center w-full h-full"
            >
              {((game?.["5"] !== " " && game?.["5"] === "X") ||
                (block === 5 && myTurn === "1")) && (
                <img src={x} alt="circle" />
              )}{" "}
              {((game?.["5"] !== " " && game?.["5"] === "O") ||
                (block === 5 && myTurn === "2")) && (
                <img src={o} className=" w-12" alt="circle" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-0">
            <div
              onClick={() => {
                validateBlock(6);
              }}
              className="col-span-1 h-24 flex justify-center items-center w-full h-full "
            >
              {((game?.["6"] !== " " && game?.["6"] === "X") ||
                (block === 6 && myTurn === "1")) && (
                <img src={x} alt="circle" />
              )}{" "}
              {((game?.["6"] !== " " && game?.["6"] === "O") ||
                (block === 6 && myTurn === "2")) && (
                <img src={o} className=" w-12" alt="circle" />
              )}
            </div>
            <div
              onClick={() => {
                validateBlock(7);
              }}
              className="col-span-1 h-24 border-h flex justify-center items-center w-full h-full "
            >
              {((game?.["7"] !== " " && game?.["7"] === "X") ||
                (block === 7 && myTurn === "1")) && (
                <img src={x} alt="circle" />
              )}{" "}
              {((game?.["7"] !== " " && game?.["7"] === "O") ||
                (block === 7 && myTurn === "2")) && (
                <img src={o} className=" w-12" alt="circle" />
              )}
            </div>
            <div
              onClick={() => {
                validateBlock(8);
              }}
              className="col-span-1 h-24 flex justify-center items-center w-full h-full "
            >
              {((game?.["8"] !== " " && game?.["8"] === "X") ||
                (block === 8 && myTurn === "1")) && (
                <img src={x} alt="circle" />
              )}{" "}
              {((game?.["8"] !== " " && game?.["8"] === "O") ||
                (block === 8 && myTurn === "2")) && (
                <img src={o} className=" w-12" alt="circle" />
              )}
            </div>
          </div>
        </div>

        <div className="absolute w-full bottom-0">
          <Button
            handleClick={handleGameSubmit}
            text={
              game?.status === "pending"
                ? myTurn === game?.turn
                  ? "Submit"
                  : `Waiting for another player`
                : "Start New Game"
            }
            color={
              game?.status === "pending"
                ? myTurn !== game?.turn
                  ? "grayii"
                  : "yellow"
                : "yellow"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
