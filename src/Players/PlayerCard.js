import { React, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import phoops from "../images/phoops.png";

function PlayerCard(props) {
  const [myteam, setMyTeam] = useState({});
  // const myteamid = myteam.team.id
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myteamstate = useSelector((state) => state.userState.my_team);

  useEffect(() => {}, []);

  const my_teams = () => {
    let reqPack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
    };
    fetch("http://localhost:3000/api/v1/myteams", reqPack)
      .then((res) => res.json())
      .then((data) => setMyTeam(data));

    console.log(myteam);
  };

  const playerClick = () => {
    let reqPack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(`http://localhost:3000/api/v1/players/${props.player.id}`, reqPack)
      .then((res) => res.json())
      .then(
        (data) =>
          dispatch({
            type: "PLAYER_CLICK",
            currentPlayer: props.player,
            currentPlayerTeam: data.team,
          }),
        navigate("/playershow"),
        console.log("clicked")
      );
  };

  const showPlayer = () => {
    console.log(props.player);
  };

  return (
    <div class="card" className="player-card" style={{ width: "18rem" }}>
      <img src={phoops} class="card-img-top" alt="..." onClick={playerClick} />
      <div class="card-body">
        <h2>{props.player.name}</h2>
        <p class="card-text">Jersey: #{props.player.jersey}</p>
        <p>Postion: {props.player.position}</p>
        <p>Weighing {props.player.weight}</p>
        <p>Height: {props.player.height}</p>

        {props.player.team_id != myteamstate.id ? (
          <button
            onClick={(e) => props.addPlayerToTeam(props.player)}
            id="draft"
          >
            Draft/Sign
          </button>
        ) : (
          <div className="player-remove">
            <button onClick={(e) => props.removePlayerFromTeam(props.player)}>
              remove player from team
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerCard;

// props.myteam.team.id;
