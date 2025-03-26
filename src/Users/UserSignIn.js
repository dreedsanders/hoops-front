import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

function SignIn() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const cookies = new Cookies();

  const go_home = () => {
    navigate("/home");
  };
  const goCreate = () => {
    navigate("/");
  };

  const set_cookieToken = (token) => {
    cookies.set("jwt-token", token, {
      path: "/",
      // httpOnly: true,
      // secure: true, // Set to true if using HTTPS
    });
  };

  const SignInUser = (e) => {
    if (e.target[0].value !== "") {
      e.preventDefault();
      let user = {
        email: e.target[0].value,
        password: e.target[1].value,
      };
      let reqPack = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      };
      fetch("http://localhost:3000/api/v1/login", reqPack)
        .then((res) => res.json())
        .then(
          (data) => (
            set_cookieToken(data.token),
            console.log(data),
            dispatch({
              type: "SIGN_IN",
              current_user: data.user,
              token: data.token,
              user_team: data.user_team,
              players: data.team_players,
              following: data.following,
              Ifollow: data.followed,
              followers: data.followers,
              likedposts: data.likedposts,
              likedpostids: data.likedpostids,
              posts: data.userposts,
              sent_messages: data.sent_messages,
              received_messages: data.received_messages,
              profile_picture: data.profile_picture,
            })
          )
        );
      e.target.reset();
      go_home();
    } else {
      return null;
    }
  };

  return (
    <div className="credentials-page">
      <div>
        <h2>Welcome Back</h2>
      </div>
      <div>
        <form onSubmit={SignInUser} className="sign-in">
          <div>
            <input type="email" placeholder="Email" name="email"></input>
          </div>
          <div>
            <input type="text" placeholder="Password" name="password"></input>
          </div>
          <button type="submit">Continue</button>
          <button onClick={goCreate}>Create Account Form</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
