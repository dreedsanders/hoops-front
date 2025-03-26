import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import GenericPlayerCard from "../Players/GenericPlayerCard";
import PerPost from "../Posts/PerPost";

//take the render condition for edit user away and just navigate to the profile page

function Home(props) {
  let current_user = useSelector((state) => state.userState.current_user);
  const myPlayers = useSelector((state) => state.userState.my_players);
  const posts = useSelector((state) => state.postState.posts);
  const reversed = [...posts].sort((a, b) => a.id - b.id).reverse();
  const recentOnline = useSelector((state) => state.userState.recently_online);
  const [count, setCount] = useState(0);

  const homeCalls = () => {
    props.recentlyOnline();
    props.getposts();
    props.getUsers();
    getNotifications();
    getActivity();
    props.getLikes();
  };

  const getNotifications = () => {
    let reqPack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
    };
    fetch("http://localhost:3000/api/v1/notifications", reqPack)
      .then((res) => res.json())
      .then(
        (data) => (
          console.log(data),
          dispatch({
            type: "NOTIFICATIONS",
            notifications: data.notifications,
          })
        )
      );
  };
  const getActivity = () => {
    let reqPack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
    };
    fetch("http://localhost:3000/api/v1/activity", reqPack)
      .then((res) => res.json())
      .then(
        (data) => (
          console.log(data),
          dispatch({ type: "ACTIVITY", activity: data.activity })
        )
      );
  };
  useEffect(() => {
    homeCalls();
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [count]);

  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToPosts = () => {
    navigate("/forum");
  };

  const go_to_players = () => {
    navigate("/hoopshome");
  };
  const goToActivity = () => {
    navigate("/activity");
  };
  const goToExplore = () => {
    navigate("/explore");
  };

  const sign_out = () => {
    navigate("/");
    window.localStorage.setItem("token", "");
    cookies.remove("jwt-token");
    dispatch({ type: "SIGN_OUT" });
  };
  const go_home = () => {
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };
  const goToGames = () => {
    navigate("/games");
  };
  const goToNotifications = () => {
    navigate("/notifications");
  };

  return (
    <div className="home-page">
      <div className="home-page-left-rail">
        <div className="home-page-buttons">
          {/* need to make this its own component so i can put it on other pages to have the menu persist */}
          <button onClick={goToProfile}>Profile</button>
          <button onClick={goToPosts}>Posts</button>
          <button onClick={go_to_players}>Play Hoops</button>
          <button onClick={goToActivity}>Activity</button>
          <button onClick={goToGames}>Games</button>
          <button onClick={goToExplore}>Explore</button>
          <button onClick={goToNotifications}>Notifications</button>
        </div>
      </div>
      {current_user ? (
        <div className="home-page-show">
          <div className="home-page-title">
            <h1>Pure Hoops</h1>
            <div className="home-page-user">
              <h2>{current_user.email} is signed in</h2>
              <button onClick={sign_out}>sign out</button>
            </div>
          </div>
          <div className="home-page-box">
            <div className="hpb">
              <h3>My Team</h3>
              {myPlayers
                ? myPlayers.map((player) => (
                    <GenericPlayerCard player={player} />
                  ))
                : null}
            </div>
            <div className="hpb">
              <h3>Recently Active</h3>
              {recentOnline
                ? recentOnline.map((user) => <h5>{user.email}</h5>)
                : null}
            </div>
            <div className="hpb">
              <h3>Recent Posts</h3>
              <div className="home-post-feed">
                {/* <button onClick={sortedPosts}>posts</button> */}
                {reversed
                  ? reversed.map((post) => (
                      <PerPost getUsers={props.getUsers} post={post} />
                    ))
                  : null}
              </div>
            </div>
            <div className="hpb">
              <h3>Recent Games</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="please-sign-in">
          <h3>Please sign in</h3>
          <button onClick={go_home}>Home</button>
        </div>
      )}
    </div>
  );
}

export default Home;
