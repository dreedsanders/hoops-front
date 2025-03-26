import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";


function CreateUser(props) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const user = useSelector((state) => state.userState.current_user);
  const cookies = new Cookies();

  const setUser = (newuser) => {
    dispatch({ type: "CREATE_USER", user: newuser });
  };
  const createUser = (e) => {
    e.preventDefault();
    if (e.target[1].value !== "") {
      let newuser = {
        name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
      };
      let reqPack = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newuser),
      };

      fetch("http://localhost:3000/api/v1/users", reqPack)
        .then((res) => res.json())
        .then(
          (data) => (
            set_cookieToken(data.token),
            setUser(data.user),
            e.target.reset(),
            navigate("/createteam"),
            props.getUsers(),
            console.log(user)
          )
      );
    } else {
    }
  };
  const set_cookieToken = (token) => {
    cookies.set("jwt-token", token, {
      path: "/",
      // httpOnly: true,
      // secure: true, // Set to true if using HTTPS
    });
  };



  const goSignIn = () => {
    navigate("/login");
  };
  return (
    <div className="credentials-page">
      <div>
        <h2>Welcome!</h2>
      </div>
      <div>
        <form className="create-user-form" onSubmit={createUser}>
          <div>
            <input type="text" placeholder="Name" name="name"></input>
          </div>
          <div>
            <input type="email" placeholder="Email" name="email"></input>
          </div>
          <div>
            <input type="text" placeholder="Password" name="password" id="password"></input>
          </div>
          <div className="create-buttons">
            <button type="submit">Create Account</button>
            <button onClick={goSignIn}>Go To Sign in</button>
            <button>Continue As Guest</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
