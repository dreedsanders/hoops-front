import React from "react";
import { useSelector } from "react-redux";

function PlayerShow() {
  const currentPlayer = useSelector((state) => state.playerState.currentPlayer);
  const currentPlayerTeam = useSelector(
    (state) => state.playerState.currentPlayerTeam
  );

  const clicked = () => {
    console.log(currentPlayerTeam);
  };
  return (
    <div>
      <h1>{currentPlayer.name}</h1>
      <h2>{currentPlayerTeam.team_name}</h2>
      <button onClick={clicked}>click me</button>
    </div>
  );
}

export default PlayerShow;
