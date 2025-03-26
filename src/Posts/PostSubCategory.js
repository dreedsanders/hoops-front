import React from "react";

function PostSubCategory(props) {
  return (
    <div className="category-subcategory">
      <div className="subcategory-title">
        <h5>{props.sub}</h5>
      </div>
      {/* useless wooden toy banter */}
      <div className="subcategory-desc"></div>
      {/* news gossip general skate talk */}
      <div className="subcategory-stats"></div>
    </div>
  );
}

export default PostSubCategory;
