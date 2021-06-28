import { Comment, Image } from "semantic-ui-react";
import moment from "moment";
/*
    type message = {
        content: string
        timestamp: Date
        user: {
            id: string
            name: string
            avatar: string
        }
    }
*/

const isOwnMessage = (message, user) => message.user.id === user.uid;

const timeFromNow = (timestamp) => moment(timestamp).fromNow();

const Message = ({ message, user }) => {
  if (message) {
    return (
      <Comment>
        <Comment.Avatar src={message.user.avatar} />
        <Comment.Content
          className={isOwnMessage(message, user) ? "message__self" : ""}
        >
          <Comment.Author as="a">{message.user.name}</Comment.Author>
          <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
          {message.image ? (
            <Image src={message.image} className="message__image" />
          ) : (
            <Comment.Text>{message.content}</Comment.Text>
          )}
        </Comment.Content>
      </Comment>
    );
  }
};

export default Message;
