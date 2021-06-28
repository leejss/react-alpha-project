import { Comment, Segment } from "semantic-ui-react";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";
import "./messages.css";
import Message from "./Message";
import { useCallback } from "react";

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
  content,
  handleChange,
  addMessage,
  errors,
  loading,
  messages,
  handleSearch,
  currentUser,
  currentChannel,
}) => {
  return (
    <>
      <MessagesHeader
        channelName={currentChannel && currentChannel.name}
        countUsers={countUsers(messages)}
        handleSearch={handleSearch}
      />
      <Segment>
        <Comment.Group className="messages">
          {messages.map((ms) => (
            <Message key={ms.timestamp} message={ms} user={currentUser} />
          ))}
        </Comment.Group>
      </Segment>
      <MessagesForm
        currentUser={currentUser}
        currentChannel={currentChannel}
        addMessage={addMessage}
        handleChange={handleChange}
        content={content}
        errors={errors}
        loading={loading}
      />
    </>
  );
};

export default Messages;
