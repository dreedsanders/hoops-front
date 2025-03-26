import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profilephoto from "/Users/donovansanders/personal/auth-login/auth-login/src/images/phoops.png";
import Cookies from "universal-cookie";

function CreatePost(props) {
  const currentUser = useSelector((state) => state.userState.current_user);
  const current_category = useSelector(
    (state) => state.postState.current_category
  );
  const [mysubs, setmysubs] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    current_sub();
  }, [current_category]);

  const current_sub = () => {
    let mysubs = [];
    props.subcategories.map((subs) => {
      if (subs[0] == current_category) {
        mysubs.push(subs[1]);
      }
    });
    setmysubs(mysubs);
  };

  const sendPost = (e) => {
    e.preventDefault();
    console.log(currentUser.id);

    if (currentUser.id) {
      let post = {
        category: current_category,
        subcategory: e.target[1].value,
        body: e.target[0].value,
        user_id: currentUser.id,
      };
      let reqPack = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${cookies.get("jwt-token")}`,
        },
        body: JSON.stringify(post),
      };
      fetch("http://localhost:3000/api/v1/posts", reqPack)
        .then((res) => res.json())
        .then((data) => console.log(data));

      e.target.reset();
    } else {
      return null;
    }
  };
  return (
    <div className="create-post-form">
      <form className="post-form" onSubmit={sendPost}>
        <div className="post-form-top">
          <img src={profilephoto} width="60" height="60"></img>
        </div>
        <div className="post-form-bottom">
          <textarea
            name="post"
            placeholder="Shots up..."
            rows={3}
            cols={40}
            maxlength="160"
          />
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
