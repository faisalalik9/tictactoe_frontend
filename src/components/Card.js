import React from "react";
import Button from "./Button";
import { getCookie } from "../functions/cookie";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
function Card({ game }) {
  let email = getCookie("email");
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/gameplay/${game.gameId}`);
  };

  let myturn = email === game?.player1 ? "1" : "2";
  return (
    <div className="px-4 py-4 font-epl shd mb-6">
      <h1 className="text-2xl font-semibold mb-4">
        Game with{" "}
        {email === game.player2 ? game?.player1Name : game?.player2Name}
      </h1>
      <p className="text-md mb-4">
        {game?.isDraw
          ? "It's a draw!"
          : game?.winner !== ""
          ? email === game?.winner
            ? "You've won!"
            : "You've lost"
          : myturn === game?.turn
          ? `${
              email === game.player2 ? game?.player1Name : game?.player2Name
            } just made their move! It’s your turn to play now.`
          : "You've made your move! Waiting for them"}
      </p>

      <p className="text-sm mb-4">
        {dateFormat(game?.updatedAt, " mmm dS, yyyy, h:MM tt")}
      </p>

      <Button
        handleClick={handleClick}
        text={game?.status === "pending" ? "Play" : "View Game"}
        color="yellow"
      />
    </div>
  );
}

export default Card;
