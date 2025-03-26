import { React } from "react";
import { useSelector } from "react-redux";

function ReplyShow(props) {
    const users = useSelector((state) => state.userState.users);
      function findName(id) {
        let user = users.find((user) => user.id === id);
        return <h5>{user.name}</h5>;
      }
  return (
    <div className="replies">
      {props.replies
        ? props.replies
            .map((reply) => (
              <div className="reply-show">
                <p>
                  {findName(reply.user_id)} {reply.body}
                </p>
                <p>{}</p>
                <p>{reply.created_at}</p>
              </div>
            ))
            .reverse()
        : null}
    </div>
  );
}

export default ReplyShow;
