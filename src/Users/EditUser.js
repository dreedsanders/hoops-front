import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import EditEmail from "./EditEmail";
import EditName from "./EditName";
import EditPassword from "./EditPassword";
import EditPhoto from "./EditPhoto";

function EditUser(props) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let current_user = useSelector((state) => state.userState.current_user);
  const cookies = new Cookies();
  const [name, setName] = useState(false);
  const [password, setPassword] = useState(false);
  const [email, setEmail] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [bio, setBio] = useState(false);
  const [goat, setGoat] = useState(false)

  let handleName = (e) => {
    e.preventDefault();
    setName(!name);
  };
  let handlePassword = (e) => {
    e.preventDefault();
    setPassword(!password);
  };
  let handleEmail = (e) => {
    e.preventDefault();
    setEmail(!email);
  };
  let handlePhoto = (e) => {
    e.preventDefault();
    setPhoto(!photo);
  };

  const delete_user = (user) => {
    navigate("/");
    let reqPack = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    };
    fetch(`http://localhost:3000/api/v1/users/${user.id}`, reqPack)
      .then((res) => res.json())
      .then((data) => console.log(data), dispatch({ type: "DELETE" }));
    window.localStorage.setItem("token", "");
  };
  return (
    <div className="editform">
      <div>
        <h2>{current_user.email}</h2>
      </div>
      <div>
        <br></br>
        <label>What would you like to change? </label>
        <br></br>
        <label>Note: Sign out required to update changes</label>
        <br></br>
        <button onClick={(e) => handleName(e)}>Name</button>
        {name ? <EditName getUsers={props.getUsers} /> : null}
        <br></br>
        <button onClick={(e) => handlePassword(e)}>Password</button>
        {password ? <EditPassword getUsers={props.getUsers} /> : null}
        <br></br>
        <button onClick={(e) => handleEmail(e)}>Email</button>
        {email ? <EditEmail getUsers={props.getUsers} /> : null}
        <br></br>
        <button onClick={(e) => handlePhoto(e)}>Photo</button>
        {photo ? <EditPhoto getUsers={props.getUsers} /> : null}
        <br></br>
        <div>
          {/* <button
           onClick={() => delete_user(current_user)}
           className="delete-account"
         >
           Delete Account
         </button> */}
        </div>
      </div>
    </div>
  );
}
export default EditUser;
