import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function MessageShow(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.userState.users);

    function findName(id) {
      let user = users.find((user) => user.id === id);
      return <h5>{user.name}</h5>;
  };
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
  return (
    <div className="message-show">
      <p onClick={(e)=> goToUser(e, props.message.sender_id)}> {findName(props.message.sender_id)}</p>
      <p>{props.message.body}</p>
    </div>
  );
}

export default MessageShow;
