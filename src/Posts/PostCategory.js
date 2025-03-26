import { React, useState, useEffect } from "react";
import PostSubCategory from "./PostSubCategory";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostCategory(props) {
  const [mysubs, setmysubs] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current_category = useSelector(
    (state) => state.postState.current_category
  );

  useEffect(() => {
    current_sub();
  }, []);
  const current_sub = () => {
    let mysubs = [];
    props.subcategories.map((subs) => {
      if (subs[0] == props.category) {
        mysubs.push(subs[1]);
      }
    });
    setmysubs(mysubs);
  };

  const handleCategoryClick = () => {
    dispatch({ type: "CURRENT_CATEGORY", category: props.category });
  };

  return (
    <div className="board-list-category">
      <div className="board-list-category-title" onClick={handleCategoryClick}>
        <h2>{props.category}</h2>
      </div>
      <div className="board-list-category-header"></div>
      {/* board name posts topics last post */}
      <div className="board-list-category-subtitle">
        {/* {mysubs ? mysubs.map((sub) => <PostSubCategory sub={sub} />) : null} */}
      </div>
    </div>
  );
}

export default PostCategory;
