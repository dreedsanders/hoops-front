import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function CreateTeam() {
  let current_user = useSelector((state) => state.userState.current_user);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(current_user);
  }, []);

  const createMyTeam = (e) => {
    console.log(current_user);
    e.preventDefault();
    let team = {
      user_id: current_user.id,
      team_name: e.target[0].value,
      attribute_level: 0,
    };
    let reqPack = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
      body: JSON.stringify(team),
    };
    fetch("http://localhost:3000/api/v1/newteam", reqPack)
      .then((res) => res.json())
      .then((data) => console.log(data));

    navigate("/login");
    dispatch({ type: "SIGN_OUT" });
  };

  return (
    <div className="create-team">
      <form className="create-team-form" onSubmit={createMyTeam}>
        <div>
          <input type="text" placeholder="Team Name" name="teamname"></input>
        </div>
        {/* <div className="team-color-select">
          <div className="team-color-label">
            <label>Team Color</label>
          </div>
          <div className="color-options">
            <select name="team-color">
              <option>please select a value</option>
              <option style={{ color: "blue" }}>blue</option>
              <option style={{ color: "red" }}>red</option>
              <option style={{ color: "orange" }}>orange</option>
              <option style={{ color: "purple" }}>purple</option>
              <option style={{ color: "green" }}>green</option>
            </select>
          </div>
        </div> */}
        <span></span>
        <button type="submit">Create Team Now</button>
      </form>
    </div>
  );
}

export default CreateTeam;
