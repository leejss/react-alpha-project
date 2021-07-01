import { Comment, Segment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import "./messages.css";
import Message from "./Message";
import MessagesFormContainer from "../../../containers/Messages/MessagesFormContainer";

const countUsers = (messages) => {
  if (messages) {
    const users = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    return users.length;
  }
};

const Messages = ({
  messages,
  handleSearch,
  currentUser,
  currentChannel,
  isPrivateChannel,
}) => {
  return (
    <>
      <MessagesHeader
        countUsers={countUsers(messages)}
        handleSearch={handleSearch}
        currentChannel={currentChannel && currentChannel}
        isPrivateChannel={isPrivateChannel}
      />
      <Segment>
        <Comment.Group className="messages">
          {messages.map((ms) => (
            <Message key={ms.timestamp} message={ms} user={currentUser} />
          ))}
        </Comment.Group>
      </Segment>
      <MessagesFormContainer />
    </>
  );
};

export default Messages;
