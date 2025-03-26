import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import profilephoto from "/Users/donovansanders/personal/auth-login/auth-login/src/images/phoops.png";

function UserCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const current_user = useSelector((state) => state.userState.current_user);
  const goToUser = (id) => {
    if (current_user.id === id) {
      navigate("/profile");
    } else {
      let reqPack = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      fetch(`http://localhost:3000/api/v1/users/${id}`, reqPack)
        .then((res) => res.json())
        .then(
          (data) => (
            console.log(data),
            dispatch({ type: "CLICKED", user: data.user }),
            navigate("/usershow")
          )
        );
    }
    console.log(props.user.id);
  };
  return (
    <div onClick={(e) => goToUser(props.user.id)} className="user-card">
      {props.user.profile_picture ? (
        <img
          src={props.user.profile_picture}
          width="100"
          height="100"
          alt="profilephoto"
        ></img>
      ) : (
        <img
          src={profilephoto}
          width="100"
          height="100"
          alt="profilephoto"
        ></img>
      )}
      <p>
        {props.user.name}
        {props.user.bio ? <p> {props.user.bio}</p> : null}
      </p>
    </div>
  );
}

export default UserCard;
