import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function EditName(props) {
  let current_user = useSelector((state) => state.userState.current_user);
  let navigate = useNavigate();
  const cookies = new Cookies();
  const updateName = (e) => {
    e.preventDefault();
    let user = {
      name: e.target[0].value,
      password: e.target[1].value,
    };
    let recPack = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Application: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
      body: JSON.stringify(user),
    };
    fetch(`http://localhost:3000/api/v1/users/${current_user.id}`, recPack)
      .then((res) => res.json())
      .then((data) => console.log(data));
    // get users
    e.target.reset();
    navigate("/profile");
    props.getUsers();
    //   navigate back to profile
  };
  return (
    <div>
      <form onSubmit={(e) => updateName(e)}>
        <input type="text" placeholder="Name"></input>
        <input type="text" placeholder="Enter password to cont."></input>
        <input
          type="submit"
          style={{ backgroundColor: "yellow", color: "black" }}
        ></input>
      </form>
    </div>
  );
}

export default EditName;
