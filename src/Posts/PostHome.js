import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCategory from "./PostCategory";
import { useSelector } from "react-redux";

import CreatePost from "./CreatePost";
import PerPost from "./PerPost";

function PostHome(props) {
  const navigate = useNavigate();
  const current_category = useSelector(
    (state) => state.postState.current_category
  );
  const posts = useSelector((state) => state.postState.posts);
  let current_user = useSelector((state) => state.userState.current_user);
  const [currentPosts, setcurrentposts] = useState([]);
  const [count, setCount] = useState(0);
  const sortedPosts = currentPosts.sort((a, b) => a.id - b.id).reverse();

  const showPosts = () => {
    console.log({ posts: currentPosts, sortedPosts: sortedPosts });
  };

  useEffect(() => {
    getAllPosts();
    getmyposts();
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [current_category, count]);
  // function to navigate home
  const goHome = () => {
    navigate("/home");
  };

  const getAllPosts = () => {
    props.get_posts();
  };

  const getmyposts = () => {
    let myposts = [];
    posts.map((post) =>
      post.category === current_category ? myposts.push(post) : null
    );
    setcurrentposts(myposts);
    // console.log(myposts);
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
    // let date = converted.split(" ")
    // let current = date[0-4]
    //  return (month + day + "," + year)
    return month + " " + day + ", " + year;
  }
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

  return (
    <div className="posthome">
      <div className="posthome-margin"></div>
      <div className="post-home-left">
        <div className="post-home-header">
          <h3>Pure</h3>
          <div className="post-home-header-nav">
            <button onClick={goHome}>home</button>
          </div>
          <div className="post-home-search">
            <label for="site-search"></label>
            <input
              type="search"
              id="site-search"
              name="site-search"
              placeholder="Search..."
            />
            <button>Go</button>
          </div>
          <div className="post-home-board-list">
            <div className="post-category" onClick={getmyposts}>
              {props.categories
                ? props.categories.map((category) => (
                    <PostCategory
                      category={category}
                      subcategories={props.subcategories}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="post-home-right">
        <div className="feed-posts">
          <div className="forum-header">
            <h3>{current_category} Forum</h3>
          </div>
          {sortedPosts
            ? sortedPosts.map((post) => <PerPost post={post} />)
            : null}
        </div>
      </div>
      <div className="create-post">
        <CreatePost subcategories={props.subcategories} />
      </div>
    </div>
  );
}

export default PostHome;
