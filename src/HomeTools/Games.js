import { React, useState } from "react";
import { useSelector } from "react-redux";

function Games() {
  let gamesfromserver = useSelector((state) => state.nbaState.games);
  let matchups = Object.keys(gamesfromserver);

  return (
    <div>
      <div>
        <h1>Todays Games</h1>
        {matchups
          ? matchups.map((game) => (
              <div>
                <li>{game}</li>
                <a href={game}>watch</a>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Games;
