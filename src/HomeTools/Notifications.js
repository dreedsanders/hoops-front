import { React, useEffect } from "react";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Notifications() {
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
  const posts = useSelector((state)=> state.postState.posts)
  const likes = useSelector((state) => state.likeState.likes);

  function findName(id) {
    let user = users.find((user) => user.id === id);
    return <h5>{user.name}</h5>
  };

  function findPost(id) {
    let post = posts.find((post) => post.id === id);
    return <p>{post.body}</p>
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
      current_post_replies: post.replies
      // still need to pass the likes
    });
    navigate("/postshow");
  };

  // need functions to mark each like, reply, and message as 'is seen' true
  // once a user clicks on them

  return (
    <div className="notifications-page">
      Notifications
      <div className="message-notifications">
        <h3 className="message-notifications-title">Messages</h3>
        <div className="msg-note-list">
          {message_notifications
            ? message_notifications.map((message) => (
                <div
                  onClick={(e) => goToUser(e, message.sender_id)}
                  className="single-msg-note"
                >
                  {findName(message.sender_id)} sent {message.body}
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="like-notifications">
        <h3>Likes</h3>
        {like_notifications
          ? like_notifications.map((like) => (
              <div onClick={(e) => goToUser(e, like.user_id)}>
                {findName(like.user_id)} liked {findPost(like.post_id)}
              </div>
            ))
          : null}
      </div>
      <div className="reply-notifications">
        <h3>Replies</h3>
        {reply_notifications
          ? reply_notifications.map((reply) => (
              <div>
                <div onClick={(e) => goToUser(e, reply.user_id)}>
                  {findName(reply.user_id)}
                </div>

                <div onClick={(e) => goToPostShow(e, reply.post_id)}>
                  replied to: {findPost(reply.post_id)}
                  with "{reply.body}"
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Notifications;
