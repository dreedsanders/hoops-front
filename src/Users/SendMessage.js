import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";

function SendMessage() {
  const current_user = useSelector((state) => state.userState.current_user);
  const [formusers, setFormUsers] = useState({});
  const users = useSelector((state) => state.userState.users);

  const cookies = new Cookies();
  const dispatch = useDispatch();
  const getNamesandIds = () => {
    users.reduce(function (map, obj) {
      map[obj.id] = obj.name;
      setFormUsers(map);
      return map;
    }, {});
  };

  const sendMessage = (e) => {
    e.preventDefault();
    let message = {
      sender_id: current_user.id,
      receiver_id: e.target[0].value,
      body: e.target[1].value,
      is_seen: false,
    };
    let reqPack = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
      body: JSON.stringify(message),
    };
    fetch("http://localhost:3000/api/v1/messages", reqPack)
      .then((res) => res.json())
      .then(
        (data) => (
          console.log(data),
          dispatch({ type: "SENDMESSAGE", message: data.data })
        )
      );
    e.target.reset();
  };

  useEffect(() => {
    getNamesandIds();
  }, []);
  return (
    <div>
      <div>SendMessage</div>
      {/* <button onClick={(e) => console.log(formusers)}>show form users</button> */}
      <div>
        <form onSubmit={(e) => sendMessage(e)} className="send-message">
          <label for="users">Choose recepient:</label>
          <select id="users">
            <option>select user</option>
            {Object.entries(formusers).map(([key, value]) => {
              return <option value={key}>{value}</option>;
            })}
          </select>
          <input type="text" id="message" placeholder="write message"></input>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default SendMessage;
