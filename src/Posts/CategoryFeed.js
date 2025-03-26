import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import profilephoto from "/Users/donovansanders/personal/auth-login/auth-login/src/images/phoops.png";
import CreatePost from "./CreatePost";

function CategoryFeed(props) {
  const current_category = useSelector(
    (state) => state.postState.current_category
  );
  const posts = useSelector((state) => state.postState.posts);
  const [currentPosts, setcurrentposts] = useState([]);

  useEffect(() => {
    getmyposts();
  }, []);
  const getmyposts = () => {
    let myposts = [];
    posts.map((post) =>
      post.category == current_category ? myposts.push(post) : null
    );
    setcurrentposts(myposts);
    console.log(myposts);
  };
  return (
    <div className="feed-home">
      <div className="feed-title">
        <h2 onClick={getmyposts}>{current_category}</h2>
      </div>

      <div className="feed-posts">
        {currentPosts
          ? currentPosts.map((post) => (
              <div className="current-post">
                <div className="current-post-head">
                  <img src={profilephoto} width="30" height="30"></img>
                  <p>user: {post.user_id}</p>
                </div>
                <p>{post.body}</p>
                <p>Shot:{post.updated_at}</p>
                <p></p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default CategoryFeed;
