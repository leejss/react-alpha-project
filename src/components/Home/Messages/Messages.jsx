import { Comment, Segment } from "semantic-ui-react";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";
import "./messages.css";
import Message from "./Message";

const Messages = ({
  content,
  handleChange,
  addMessage,
  errors,
  loading,
  messages,
  currentUser,
}) => {
  return (
    <>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages">
          {messages.map((ms) => (
            <Message key={ms.timestamp} message={ms} user={currentUser} />
          ))}
        </Comment.Group>
      </Segment>
      <MessagesForm
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
