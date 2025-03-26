import { React, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import profilephoto from "/Users/donovansanders/personal/auth-login/auth-login/src/images/phoops.png";
import { useNavigate } from "react-router-dom";

function UserShow(props) {
  let current_user = useSelector((state) => state.userState.current_user);
  let followingIds = useSelector((state) => state.userState.following);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const showuser = () => {
    console.log(props.user);
  };

  // need a dispatch action that removes the following id from following if user clicks unfollow

  const cookies = new Cookies();
  const follow = () => {
    let follow = {
      user_id: current_user.id,
      following_id: props.user.id,
    };
    let reqPack = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
      body: JSON.stringify(follow),
    };
    fetch("http://localhost:3000/api/v1/follows", reqPack)
      .then((res) => res.json())
      .then(
        (data) => console.log(data),
        dispatch({ type: "FOLLOW", follow: props.user.id })
      );
  };

  let unfollowUser = () => {
    let unfollow = {
      user_id: current_user.id,
      following_id: props.user.id,
    };
    let reqPack = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
      body: JSON.stringify(unfollow),
    };
    fetch("http://localhost:3000/api/v1/follows", reqPack)
      .then((res) => res.json())
      .then(
        (data) => console.log(data),
        dispatch({ type: "UNFOLLOW", follow: props.user.id })
      );
  };
  return (
    <div>
      {props.user ? (
        <div className="user-profile">
          <div className="profile-credentials">
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
            
            <h3>{props.user.email}</h3>
            <h5>{props.user.id}</h5>
            {current_user.id === props.user.id ? null : (
              <div>
                {followingIds.includes(props.user.id) ? (
                  <button onClick={unfollowUser}>unfollow</button>
                ) : (
                  <button onClick={follow}>follow</button>
                )}{" "}
              </div>
            )}
          </div>
          <div className="user-posts"></div>
        </div>
      ) : null}
    </div>
  );
}

export default UserShow;
