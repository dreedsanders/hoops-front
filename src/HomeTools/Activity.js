import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Activity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const following = useSelector((state) => state.userState.activity.following);
  const posts = useSelector((state) => state.postState.posts);
    const users = useSelector((state) => state.userState.users);
  const following_posts = useSelector(
    (state) => state.userState.activity.following_posts
  );
  const following_likes = useSelector(
    (state) => state.userState.activity.following_likes
  );
  const postids = following_likes.map((likes) => likes.post_id);
  const uniquepostids = Array.from(new Set(postids));

  const following_replies = useSelector(
    (state) => state.userState.activity.following_replies
  );

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
      // current_post_replies: post.replies
      // still need to pass the likes
    });
    console.log(post)
    navigate("/postshow");
  };
  function findName(id) {
    let user = users.find((user) => user.id === id);
    return <h5>{user.name}</h5>;
  }
    function findPost(id) {
      let post = posts.find((post) => post.id === id);
      return <p>{post.body}</p>;
    }

  return (
    <div className="activity">
      <div>Activity</div>
      <br></br>
      <div className="activity-follows">
        New Follows
        {following
          ? following.map((user) => (
              <div onClick={(e) => goToUser(e, user.id)}>
                you started following {user.name}
              </div>
            ))
          : null}
      </div>
      <span></span>
      <br></br>
      {/* <div>
        People you follow liked:
        {uniquepostids ? uniquepostids.map((iid) => <p>post id: {iid}</p>) : null}
      </div> */}
      <div className="activity-replies">
        Users you followed replied to posts:
        {following_replies
          ? following_replies.map((repliesuserarray) =>
              repliesuserarray.map((reply) => (
                <div>
                  <p onClick={(e) => goToPostShow(e, reply.post_id)}>
                    {findName(reply.user_id)} replied with "
                    {reply.body} "
                  </p>
                </div>
              ))
            )
          : null}
      </div>
    </div>
  );
}

export default Activity;
