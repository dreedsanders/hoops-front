import React from "react";

function GenericPlayerCard(props) {
  return (
    <div className="generic-player-card">
      <h2>{props.player.name}</h2>
      <p class="card-text">Jersey: #{props.player.jersey}</p>
      <p>Postion: {props.player.position}</p>
      <p>Weighing {props.player.weight}</p>
      <p>Height: {props.player.height}</p>
    </div>
  );
}

export default GenericPlayerCard;
