import React from "react";
import { useDispatch, useSelector } from "react-redux";

function EditEmail() {
  let current_user = useSelector((state) => state.userState.current_user);
  const dispatch = useDispatch();
  const updateEmail = (e) => {
    e.preventDefault();
    let user = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    let recPack = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Application: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(user),
    };
    fetch(`http://localhost:3000/api/v1/users/${current_user.id}`, recPack)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "EDIT", current_user: data }));
    // get users
    e.target.reset();
    //   navigate back to profile
  };
  return (
    <div>
      <form onSubmit={(e) => updateEmail(e)}>
        <input type="text" placeholder="Email"></input>
        <input type="text" placeholder="Enter password to cont."></input>
        <input
          type="submit"
          style={{ backgroundColor: "yellow", color: "black" }}
        ></input>
      </form>
    </div>
  );
}

export default EditEmail;
