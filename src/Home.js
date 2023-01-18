import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import { getCookie } from "./functions/cookie";

function Home({ onClickNewGame }) {
  const [games, setGames] = useState([]);

  const baseURI = "https://tictactoe-backend-pi.vercel.app";

  useEffect(() => {
    let email = getCookie("email");

    function fetchGames() {
      axios
        .get(`${baseURI}/games/${email}`)
        .then((res) => {
          console.log(res);
          setGames(res.data?.data);
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }

    fetchGames();
  }, []);

  return (
    <div className="h-screen overflow-hidden w-full lg:w-1/4  font-epl ">
      <h1 className="text-2xl font-bold px-6 py-6">Your Games</h1>

      {games.length === 0 ? (
        <div className="h-full flex justify-center items-center px-6">
          <div className="w-full">
            <h1 className="font-b text-6xl text-center mb-6">
              No Games
              <br />
              Found
            </h1>
            <Button
              handleClick={onClickNewGame}
              text="Start a new game"
              color="yellow"
            />
          </div>
        </div>
      ) : (
        <div className="h-full overflow-y-scroll px-6 py-6 relative">
          {games
            .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
            .map((game) => {
              return <Card game={game} />;
            })}
        </div>
      )}

      {games.length !== 0 && (
        <button
          onClick={onClickNewGame}
          className="absolute px-4 py-2 bottom-8 z-10 right-8 new-btn text-white font-semibold "
        >
          + New Game
        </button>
      )}
    </div>
  );
}

export default Home;
