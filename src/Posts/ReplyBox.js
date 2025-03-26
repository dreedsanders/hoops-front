import React from "react";
import { useSelector } from "react-redux";

function ReplyBox() {
  let current_user = useSelector((state) => state.userState.current_user);
  return <div>ReplyBox</div>;
}

export default ReplyBox;
