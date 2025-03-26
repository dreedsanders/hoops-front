import { React, useEffect } from "react";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Notifications2() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message_notifications = useSelector(
    (state) => state.userState.notifications.unseen_user_messages
  );
  const reply_notifications = useSelector(
    (state) => state.userState.notifications.unseen_user_post_replies
  );
  const like_notifications = useSelector(
    (state) => state.userState.notifications.unseen_user_posts_likes
  );
  const users = useSelector((state) => state.userState.users);
  const posts = useSelector((state) => state.postState.posts);
  const likes = useSelector((state) => state.likeState.likes);

  function findName(id) {
    let user = users.find((user) => user.id === id);
    return <h5>{user.name}</h5>;
  }

  function findPost(id) {
    let post = posts.find((post) => post.id === id);
    return <p>{post.body}</p>;
  }

  const goToUser = (e, id) => {
    e.preventDefault();
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
  };

  const goToPostShow = (e, postId) => {
    let post = posts.find((post) => post.id === postId);
    dispatch({
      type: "CURRENT_POST",
      post: post,
      current_post_replies: post.replies,
      // still need to pass the likes
    });
    navigate("/postshow");
  };

  // need functions to mark each like, reply, and message as 'is seen' true
    // once a user clicks on them
    
    const markLikeSeen = (e, like) => {
        e.preventDefault();
        console.log(like)
        const seenLike = {
            is_seen: true
        }
            let reqPack = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.token}`
                },
              body: JSON.stringify(seenLike)
            };
            fetch(
              `http://localhost:3000/api/v1/likes/update/${like.id}`,
              reqPack
            )
              .then((res) => res.json())
              .then((data) => console.log(data));
        
    }
        const markReplySeen = (e, reply) => {
          e.preventDefault();
          console.log(reply);
          const seenReply = {
            is_seen: true,
          };
          let reqPack = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify(seenReply),
          };
          fetch(`http://localhost:3000/api/v1/replies/update/${reply.id}`, reqPack)
            .then((res) => res.json())
            .then((data) => console.log(data));
        };
        const markMessageSeen = (e, message) => {
          e.preventDefault();
          console.log(message);
          const seenMessage = {
            is_seen: true,
          };
          let reqPack = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify(seenMessage),
          };
          fetch(`http://localhost:3000/api/v1/messages/update/${message.id}`, reqPack)
            .then((res) => res.json())
            .then((data) => console.log(data));
        };

  return (
    <div className="notifications-page">
      Notifications
      <div className="notifications">
        {message_notifications
          ? message_notifications.map((message) => (
              <div className={message.is_seen ? "is-seen" : "not-seen"}>
                <div
                  onClick={(e) => goToUser(e, message.sender_id)}
                  className="single-note"
                >
                  {findName(message.sender_id)} sent {message.body}
                  <button
                    onClick={(e) => {
                      markMessageSeen(e, message);
                    }}
                  >
                    seen
                  </button>
                </div>
              </div>
            ))
          : null}
        {like_notifications
          ? like_notifications.map((like) => (
              <div className={like.is_seen ? "is-seen" : "not-seen"}>
                <button
                  onClick={(e) => {
                    markLikeSeen(e, like);
                  }}
                >
                  seen
                </button>
                <div
                  onClick={(e) => goToUser(e, like.user_id)}
                  className="single-note"
                >
                  {findName(like.user_id)} liked {findPost(like.post_id)}
                </div>
              </div>
            ))
          : null}
        {reply_notifications
          ? reply_notifications.map((reply) => (
              <div className={reply.is_seen ? "is-seen" : "not-seen"}>
                <div onClick={(e) => goToUser(e, reply.user_id)}>
                  {findName(reply.user_id)}
                </div>

                <div
                  onClick={(e) => goToPostShow(e, reply.post_id)}
                  className="single-note"
                >
                  replied to: {findPost(reply.post_id)}
                  with "{reply.body}"
                  <button
                    onClick={(e) => {
                      markReplySeen(e, reply);
                    }}
                  >
                    seen
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Notifications2;
