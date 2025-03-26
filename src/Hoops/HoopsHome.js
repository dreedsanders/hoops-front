import React from "react";
import { useNavigate } from "react-router-dom";

function HoopsHome() {
  const navigate = useNavigate();
  const go_to_players = () => {
    navigate("/players");
  };
  return (
    <div className="hoops-home-box">
      <div className="hoops-game">
        <h1>play game</h1>
      </div>
      <div className="hoops-players">
        <h1 onClick={go_to_players}>view players</h1>
      </div>
    </div>
  );
}

export default HoopsHome;
