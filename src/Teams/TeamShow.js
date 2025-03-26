import { React } from "react";
import { useSelector } from "react-redux";
import PlayerCard from "../Players/PlayerCard";
import { useState, useEffect } from "react";

function TeamShow(props) {
  const [count, setCount] = useState(0);
  const myteam = useSelector((state) => state.userState.my_team);
  const myplayers = useSelector((state) => state.userState.my_players);

  useEffect(() => {
    props.get_players();
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <div>
      <div>
        <h4>{myteam.team_name}</h4>
      </div>
      {myplayers
        ? myplayers.map((player) => <PlayerCard player={player} />)
        : null}
      <div></div>
    </div>
  );
}

export default TeamShow;
