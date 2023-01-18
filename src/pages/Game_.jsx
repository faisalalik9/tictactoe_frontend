import React, { useState } from "react";
import Entry from "../Entry";
import { getCookie } from "../functions/cookie";
import Game from "../Game";
import Home from "../Home";
import NewGame from "../NewGame";
function Game_() {
  let isuserLoggedIn = getCookie("isLoggedIn");
  const [state, setState] = useState(0);
  const [opponent, setOpponent] = useState();

  const onClickNewGame = () => {
    setState(1);
  };
  const onClickStartGame = () => {
    setState(2);
  };
  const onClickBack = () => {
    setState(state - 1);
  };
  return isuserLoggedIn ? (
    <div>
      {state === 0 && <Home onClickNewGame={onClickNewGame} />}

      {state === 1 && (
        <NewGame
          onClickBack={onClickBack}
          onClickStartGame={onClickStartGame}
          setOpponent={setOpponent}
        />
      )}
      {state === 2 && <Game onClickBack={onClickBack} opponent={opponent} />}
    </div>
  ) : (
    <Entry />
  );
}

export default Game_;
