import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import profilephoto from "/Users/donovansanders/personal/auth-login/auth-login/src/images/phoops.png";
import { useNavigate } from "react-router-dom";
import like from "/Users/donovansanders/personal/auth-login/auth-login/src/images/like.jpeg";
import ReplyShow from "./ReplyShow";
import Cookies from "universal-cookie";
import unlike from "/Users/donovansanders/personal/auth-login/auth-login/src/images/unlike.png";

function PostShow(props) {
  let currentPost = useSelector((state) => state.postState.current_post);
  let current_user = useSelector((state) => state.userState.current_user);
  let likedpostids = useSelector((state) => state.userState.likedpostids);
  let postlikes = currentPost.likes.find(
    (like) => like.user_id == current_user.id
  );
  // use this postlikes.id in the unlike delete request

  const [replybox, setReply] = useState(false);
  const [refreshposts, setRefreshPosts] = useState(false);

  // get all post from post state
  let allposts = useSelector((state) => state.postState.posts);
  // get current post
  let newcurrent = allposts.find((post) => post.id == currentPost.id);
  // get replies
  let newreplies = newcurrent.replies;

  const [count, setCount] = useState(0);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const cookies = new Cookies();

  useEffect(() => {
    props.getPosts();
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [count]);

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
    // let date = converted.split(" ")
    // let current = date[0-4]
    //  return (month + day + "," + year)
    return month + " " + day;
  }

  const showReplyBox = () => {
    setReply(!replybox);
    dispatch({
      type: "CURRENT_POST",
      post: currentPost,
      current_post_replies: currentPost.replies,
    });
    console.log(replybox);
  };
  const sendReply = (e) => {
    e.preventDefault();
    let reply = {
      post_id: currentPost.id,
      user_id: current_user.id,
      body: e.target[0].value,
    };
    let reqPack = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
      body: JSON.stringify(reply),
    };
    fetch("http://localhost:3000/api/v1/replies", reqPack)
      .then((res) => res.json())
      .then((data) => console.log(data));
    setReply(!replybox);
  };
  const deleting = (post) => {
    console.log(post);
    let reqPack = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(post),
    };
    fetch(`http://localhost:3000/api/v1/posts/${post.id}`, reqPack)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  const likePost = () => {
    let like = {
      post_id: currentPost.id,
      user_id: current_user.id,
    };
    let reqPack = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
      body: JSON.stringify(like),
    };
    fetch("http://localhost:3000/api/v1/likes", reqPack)
      .then((res) => res.json())
      .then(
        (data) => (
          console.log(data), dispatch({ type: "LIKE", like: currentPost.id })
        )
      );
  };
  const unlikePost = () => {
    let like = {
      post_id: currentPost.id,
      user_id: current_user.id,
    };
    let reqPack = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
      body: JSON.stringify(like),
    };
    fetch(`http://localhost:3000/api/v1/likes/${postlikes.id}`, reqPack)
      .then((res) => res.json())
      .then(
        (data) => (
          console.log(data), dispatch({ type: "UNLIKE", like: currentPost.id })
        )
      );
  };

  const goToUser = () => {
    if (current_user.id === currentPost.user_id) {
      navigate("/profile");
    } else {
      dispatch({ type: "CLICKED", user: currentPost.user_name });
      let reqPack = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      fetch(
        `http://localhost:3000/api/v1/users/${currentPost.user_id}`,
        reqPack
      )
        .then((res) => res.json())
        .then(
          (data) => (
            console.log(data),
            console.log(currentPost.user_id),
            navigate("/usershow")
          )
        );
    }
  };
  return (
    <div className="current-post-show">
      {/* {refreshposts ? <button onClick={pageRefresh}>see new replies</button> : null} */}
      <div className="current-post-head">
        <img
          src={profilephoto}
          width="30"
          height="30"
          alt="profile-photo"
          onClick={goToUser}
        ></img>
        {/* <p className="post-user"> {props.post.user_name}</p> */}
        <p>{convertTime(currentPost)}</p>
      </div>
      <div>
        <p>{currentPost.body}</p>
      </div>
      <div className="post-actions">
        <button>
          {" "}
          {likedpostids.includes(currentPost.id) ? (
            <img
              src={unlike}
              width="30"
              height="30"
              alt="like-button"
              onClick={unlikePost}
            ></img>
          ) : (
            <div>
              <button>
                <img
                  src={like}
                  width="30"
                  height="30"
                  alt="like-button"
                  onClick={likePost}
                ></img>
              </button>
            </div>
          )}
        </button>
        {replybox ? (
          <div>
            <form onSubmit={sendReply}>
              <textarea placeholder="post reply here"></textarea>
              <button>send</button>
            </form>
          </div>
        ) : (
          <button onClick={showReplyBox}>reply</button>
        )}
        {current_user.id == currentPost.user_id ? (
          <button onClick={() => deleting(currentPost)}>delete</button>
        ) : null}
      </div>
      {newreplies ? <ReplyShow replies={newreplies} /> : null}
    </div>
  );
}

export default PostShow;
