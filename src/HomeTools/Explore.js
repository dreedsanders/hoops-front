import React from "react";
import { useSelector } from "react-redux";
import UserCard from "../Users/UserCard";

function Explore() {
  const users = useSelector((state) => state.userState.users);



  return (
    <div className="explore">
      Explore
      <div className="explore-users">{users ? users.map((user) => <UserCard user={user} />) : null}</div>
    </div>
  );
}

export default Explore;
