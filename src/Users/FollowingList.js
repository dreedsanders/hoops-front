import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

function FollowingList() {
  let following = useSelector((state) => state.userState.Ifollow);

  return (
    <div className="following-list">
      <div>
        <h2>Following</h2>
      </div>
      <div>
        {following
          ? following.map((follow) => <UserCard user={follow} />)
          : null}
      </div>
    </div>
  );
}

export default FollowingList;
