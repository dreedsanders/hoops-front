import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import profilephoto from "/Users/donovansanders/personal/auth-login/auth-login/src/images/phoops.png";
import goat from "/Users/donovansanders/personal/auth-login/auth-login/src/images/goat.jpeg";
import GenericPlayerCard from "../Players/GenericPlayerCard";
import PerPost from "../Posts/PerPost";

function UserProfile(props) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userState.current_user);
  const myteam = useSelector((state) => state.userState.my_team);
  const myplayers = useSelector((state) => state.userState.my_players);
  // first find current user like ids
  const mylikes = useSelector((state) => state.userState.likedposts);
  // get all posts
  const allPosts = useSelector((state) => state.postState.posts);
  // get posts with matching ids from likes
  const mylikedposts = mylikes.map((like) =>
    allPosts.find((post) => post.id === like.post_id)
  );

  const myposts = useSelector((state) => state.userState.myPosts);
  // slice for most recent 3
  const slicedPosts = myposts.slice(0, 3);

  let profile_picture = useSelector((state) => state.userState.profile_picture);

  // need a get user function to get user and show updated attributes after editing

  const goHome = () => {
    navigate("/home");
  };
  const showfollowerlist = () => {
    navigate("/followers");
  };
  const showfollowinglist = () => {
    navigate("/following");
  };
  const goEdit = () => {
    navigate("/edituser");
  };
  const goToMessages = () => {
    console.log("going to messages");
    navigate("/messages");
  };
  const goToNotifications = () => {
    navigate("/notifications");
  };

  function convertTime(a) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let converted = new Date(a.created_at);
    let month = monthNames[converted.getMonth()];
    let year = converted.getFullYear();
    let day = converted.getDate();
    return month + " " + day + ", " + year;
  }
  return (
    <div className="user-profile">
      <div className="profile-buttons">
        <button onClick={goHome}>Home</button>
        <button onClick={showfollowerlist}>Followers</button>
        <button onClick={showfollowinglist}>Following</button>
        <button onClick={goToMessages}>Messages</button>
        <button onClick={goToNotifications}>Notifications</button>
        <button onClick={goEdit}>Edit Profile</button>
      </div>
      <div className="profile-credentials">
        {profile_picture ? (
          <img
            src={profile_picture}
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

        {/* <h3>{currentUser.email}</h3> */}
        <h2>{currentUser.name}</h2>
        <h5>
          Date Joined:
          {/* {convertTime(currentUser.created_at)} */}
        </h5>
        {currentUser.bio ? <p>About me: {currentUser.bio}</p> : null}
        {currentUser.goat ? (
          <div>
            {/* <img
              src={goat}
              width="50"
              height="50"
              alt="profilephoto"
            ></img> */}
            <p>Goat: {currentUser.goat}</p>
          </div>
        ) : (
          <div>
            <p>Goat:</p>
          </div>
        )}
      </div>
      {/* <button onClick={showPlayers}>my players</button> */}
      <div className="profile-stats">
        <div className="user-team">
          {myteam ? <h2>{myteam.team_name}</h2> : null}
          {myplayers
            ? myplayers.map((player) => <GenericPlayerCard player={player} />)
            : null}
        </div>
      </div>
      <div className="profile-liked-posts">
        <h3>Liked Posts</h3>
        {mylikedposts
          ? mylikedposts.map((post) => <PerPost post={post} />)
          : null}
      </div>
      <div className="profile-my-posts">
        <h3>My Recent Posts</h3>
        {myposts ? slicedPosts.map((post) => <PerPost post={post} />) : null}
      </div>
    </div>
  );
}

export default UserProfile;
