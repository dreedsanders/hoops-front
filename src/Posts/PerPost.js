import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import profilephoto from "/Users/donovansanders/personal/auth-login/auth-login/src/images/phoops.png";
import like from "/Users/donovansanders/personal/auth-login/auth-login/src/images/like.jpeg";
import unlike from "/Users/donovansanders/personal/auth-login/auth-login/src/images/unlike.png";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function PerPost(props) {

  let current_user = useSelector((state) => state.userState.current_user);
  // need to get the likes from the post state instead of user state. i need each users like for each post
  // first get the posts from post state
  let posts = useSelector((state) => state.postState.posts);
  // then get the current post
  let currentPost = posts.find((post) => post.id == props.post.id);
  // then find the current users like for current post
  let postlikes = currentPost.likes.find(
    (like) => like.user_id == current_user.id
  );
  // use this postlikes.id in the unlike delete request

  let likedpostids = useSelector((state) => state.userState.likedpostids);
  let likedposts = useSelector((state) => state.userState.likedposts);
  const [currentlike, setCurrentLike] = useState(0);

  const [replybox, setReply] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const getcurrentlike = () => {
    likedposts.map((like) => {
      if (like.post_id == props.post.id && like.user_id == current_user.id)
        setCurrentLike(like.id);
    });
  };
  useEffect(() => {
    getcurrentlike();
  });

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
  const showlikes = () => {
    console.log(postlikes);
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

  const goToPostShow = () => {
    dispatch({
      type: "CURRENT_POST",
      post: props.post,
      current_post_replies: props.post.replies,
    });
    navigate("/postshow");
  };

  const showReplyBox = () => {
    setReply(!replybox);
    dispatch({ type: "CURRENT_POST", post: props.post });
    console.log(replybox);
  };
  const sendReply = (e) => {
    e.preventDefault();
    let reply = {
      post_id: props.post.id,
      user_id: current_user.id,
      body: e.target[0].value,
      is_seen: false,
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
    // console.log(props.post)
  };

  const goToUser = () => {
    if (current_user.id === props.post.user_id) {
      navigate("/profile");
    } else {
      let reqPack = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      fetch(
        `http://localhost:3000/api/v1/users/${props.post.user_name.id}`,
        reqPack
      )
        .then((res) => res.json())
        .then(
          (data) => (
            console.log(data),
            dispatch({ type: "CLICKED", user: data.user }),
            navigate("/usershow")
          )
        );
    }
    console.log(props.post.user_id);
  };

  const likePost = () => {
    let like = {
      post_id: props.post.id,
      user_id: current_user.id,
      is_seen: false,
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
          console.log(data), dispatch({ type: "LIKE", like: props.post.id })
        )
      );
  };
  const unlikePost = () => {
    let like = {
      post_id: props.post.id,
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
          console.log(data), dispatch({ type: "UNLIKE", like: props.post.id })
        )
      );
  };

  return (
    <div className="current-post">
      <div className="current-post-head">
        <img
          src={profilephoto}
          width="30"
          height="30"
          alt="profile-photo"
          onClick={goToUser}
        ></img>
        {/* <p className="post-user"> {props.post.user_name}</p> */}
        <p>{convertTime(props.post)}</p>
      </div>
      <div onClick={goToPostShow}>
        <p>{props.post.body}</p>
      </div>
      <div className="post-actions">
        {" "}
        {likedpostids.includes(props.post.id) ? (
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
        {/* {props.post.likes ? <p>{props.post.likes.length}</p> : null} */}
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
        {/* {props.post.replies.length} */}
        {current_user.id == props.post.user_id ? (
          <button onClick={() => deleting(props.post)}>delete</button>
        ) : null}
      </div>
    </div>
  );
}

export default PerPost;
