import { React, useState } from "react";
import { useSelector } from "react-redux";
import MessageShow from "./MessageShow";
import SendMessage from "./SendMessage";


function Messages() {
  const sent_messages = useSelector((state) => state.userState.sent_messages);
  const [sent, setSent] = useState(false);
  const received_messages = useSelector(
    (state) => state.userState.received_messages
  );
  const [received, setReceived] = useState(false);
  const [sendmessage, setSendMessage] = useState(false);

  const showSent = () => {
    setSent(!sent);
    setReceived(false);
  };
  const showReceived = () => {
    setReceived(!received);
    setSent(false);
  };
  const showSendMessage = () => {
    setSendMessage(!sendmessage);
  };

  return (
    <div className="messages-home">
      Messages
      <div className="send-message">
        <SendMessage />
      </div>
      <div className="sent-received">
        <div className="sent-messages">
          <h3>Sent</h3>
          {sent_messages.map((sent) => (
            <MessageShow message={sent} />
          ))}
        </div>
        <div className="received-messages">
          <h3>Received</h3>
          {received_messages.map((received) => (
            <MessageShow message={received} />
          ))}
        </div>
      </div>
      {/* <ChatBox></ChatBox> */}
    </div>
  );
}

export default Messages;
