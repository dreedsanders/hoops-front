import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

function FollowersList() {
  let followers = useSelector((state) => state.userState.followers);

  return (
    <div className="follower-list">
      <div>
        <h2>Followers</h2>
      </div>
      <div>
        {followers
          ? followers.map((follower) => <UserCard user={follower} />)
          : null}
      </div>
    </div>
  );
}

export default FollowersList;
