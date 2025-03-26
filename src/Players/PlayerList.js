import { React, useState, useEffect } from "react";
import PlayerCard from "./PlayerCard";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";

function PlayerList(props) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [myteam, setMyTeam] = useState({});
  const cookies = new Cookies();
  const myplayers = useSelector((state) => state.userState.my_players);
  const players = useSelector((state) => state.playerState.players);
  let playerids = [];
  const dispatch = useDispatch();

  const myplayerIds = () => {
    myplayers.map((player) => playerids.push(player.id));
  };

  useEffect(() => {
    props.get_players();
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 5000); // Run every 10 minutes
    my_teams();
    myplayerIds();
    return () => clearInterval(intervalId);
  }, [count]);

  const goHome = () => {
    navigate("/home");
  };

  const removePlayerFromTeam = (e) => {
    console.log(e);
    let player = {
      name: e.name,
      position: e.position,
      jersey: e.jersey,
      height: e.height,
      weight: e.weight,
      team_id: 1,
    };
    let reqPack = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
      body: JSON.stringify(player),
    };
    fetch(`http://localhost:3000/api/v1/players/${e.id}`, reqPack)
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "REMOVEPLAYERFROMTEAM",
          my_players: data.user_team_players,
        })
      );
  };

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
  };

  const addPlayerToTeam = (e) => {
    // console.log(myteam)
    let player = {
      name: e.name,
      position: e.position,
      jersey: e.jersey,
      height: e.height,
      weight: e.weight,
      team_id: myteam.team.id,
    };
    let reqPack = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
      body: JSON.stringify(player),
    };
    fetch(`http://localhost:3000/api/v1/players/${e.id}`, reqPack)
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "ADDPLAYERTOTEAM",
          my_players: data.user_team_players,
        })
      );
  };
  return (
    <div className="player-list-page">
      <div>
        <h1>Player List</h1>
        <button onClick={goHome}>home</button>
      </div>
      <div className="player-list-cards">
        {players
          ? players.map((player) => (
              <PlayerCard
                playerids={playerids}
                removePlayerFromTeam={removePlayerFromTeam}
                addPlayerToTeam={addPlayerToTeam}
                player={player}
                key={player.id}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default PlayerList;
