import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./Users/CreateUser";
import UserSignIn from "./Users/UserSignIn";
import Home from "./Users/Home";
import EditUser from "./Users/EditUser";
import PlayerList from "./Players/PlayerList";
import PostHome from "./Posts/PostHome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryFeed from "./Posts/CategoryFeed";
import UserProfile from "./Users/UserProfile";
import HoopsHome from "./Hoops/HoopsHome";
import PlayerShow from "./Players/PlayerShow";
import UserShow from "./Users/UserShow";
import CreateTeam from "./Teams/CreateTeam";
import PostShow from "./Posts/PostShow";
import FollowingList from "./Users/FollowingList";
import FollowersList from "./Users/FollowsList";
import Activity from "./HomeTools/Activity";
import Explore from "./HomeTools/Explore";
import Games from "./HomeTools/Games";
import Messages from "./Users/Messages";
import Notifications from "./HomeTools/Notifications";
import Notifications2 from "./HomeTools/Notifications2";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postState.posts);
  const categories = useSelector((state) => state.postState.categories);
  const subcategories = useSelector((state) => state.postState.subcategories);
  const user = useSelector((state) => state.userState.clicked_user);

  useEffect(() => {
    get_posts();
    get_players();
    getUsers();
    recentlyOnline();
    getReplies();
    getLikes();
    // getGamesfromServer();
  }, []);

  const getReplies = () => {
    let reqPack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch("http://localhost:3000/api/v1/replies", reqPack)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "GETREPLIES", replies: data.replies }));
  };
    const getLikes= () => {
      let reqPack = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      fetch("http://localhost:3000/api/v1/likes", reqPack)
        .then((res) => res.json())
        .then((data) =>
          dispatch({ type: "GETLIKES", likes: data.likes })
        );
    };

  const getUsers = () => {
    let reqPack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch("http://localhost:3000/api/v1/users", reqPack)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "GET_USERS", users: data.users }));
  };
  const recentlyOnline = () => {
    let reqPack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch("http://localhost:3000/api/v1/recentlyonline", reqPack)
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "RECENTONLINE", users: data.recentUsers })
      );
  };
  const get_posts = () => {
    let reqPack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch("http://localhost:3000/api/v1/posts", reqPack)
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "GET_POSTS",
          posts: data.posts,
          categories: data.categories,
          subcategories: data.subcategories,
        })
      );
  };

  const getGamesfromServer = () => {
    let reqPack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch("http://localhost:4000/stream", reqPack)
      .then((res) => res.json())
      .then(
        (data) => (
          console.log(data), dispatch({ type: "GETGAMES", games: data })
        )
      );
  };

  const get_players = () => {
    let reqPack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch("http://localhost:3000/api/v1/players", reqPack)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "GET_PLAYERS", players: data }));
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<CreateUser getUsers={getUsers} />}></Route>
          <Route exact path="/login" element={<UserSignIn />}></Route>
          <Route exact path="/following" element={<FollowingList />}></Route>
          <Route exact path="/followers" element={<FollowersList />}></Route>
          <Route exact path="/activity" element={<Activity />}></Route>
          <Route exact path="/explore" element={<Explore />}></Route>
          <Route exact path="/games" element={<Games />}></Route>
          <Route exact path="/messages" element={<Messages />}></Route>
          <Route
            exact
            path="/notifications"
            element={<Notifications2 />}
          ></Route>
          <Route
            exact
            path="/home"
            element={
              <Home
                recentlyOnline={recentlyOnline}
                getposts={get_posts}
                getUsers={getUsers}
                getReplies={getReplies}
                getGamesfromServer={getGamesfromServer}
                getLikes={getLikes}
              />
            }
          ></Route>
          <Route
            exact
            path="/edituser"
            element={<EditUser getUsers={getUsers} />}
          ></Route>
          <Route exact path="/profile" element={<UserProfile />}></Route>
          <Route exact path="/hoopshome" element={<HoopsHome />}></Route>
          <Route exact path="/playershow" element={<PlayerShow />}></Route>
          <Route
            exact
            path="/usershow"
            element={<UserShow user={user} />}
          ></Route>
          <Route exact path="/createteam" element={<CreateTeam />}></Route>
          <Route
            exact
            path="/postshow"
            element={<PostShow getPosts={get_posts} getReplies={getReplies} />}
          ></Route>
          <Route
            exact
            path="/players"
            element={<PlayerList get_players={get_players} />}
          ></Route>
          <Route
            exact
            path="/forum"
            element={
              <PostHome
                posts={posts}
                categories={["Basketball", "General", "Admin"]}
                subcategories={subcategories}
                get_posts={get_posts}
              />
            }
          ></Route>
          <Route exact path="/categoryfeed" element={<CategoryFeed />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
