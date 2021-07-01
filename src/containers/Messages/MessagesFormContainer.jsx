import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import MessagesForm from "../../components/Home/Messages/MessagesForm";
import { sendMessages } from "../../database/messages";

const MessagesFormContainer = () => {
  const { currentChannel, isPrivateChannel } = useSelector(
    (state) => state.channel
  );
  const { currentUser } = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = useCallback((e) => {
    setContent(e.target.value);
  }, []);
  const addMessage = useCallback(async () => {
    try {
      if (content) {
        setLoading(true);
        const message = {
          content,
          user: {
            id: currentUser.uid,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          },
        };
        await sendMessages(message, currentChannel.id, isPrivateChannel);
        setContent("");
      } else {
        setErrors((prev) =>
          prev.concat({
            message: "Write Message!",
          })
        );
      }
    } catch (error) {
      setErrors((prev) => prev.concat(error));
    }
    setLoading(false);
  }, [content, currentChannel, currentUser, isPrivateChannel]);
  return (
    <MessagesForm
      currentChannel={currentChannel}
      currentUser={currentUser}
      isPrivateChannel={isPrivateChannel}
      content={content}
      errors={errors}
      loading={loading}
      handleChange={handleChange}
      addMessage={addMessage}
    />
  );
};

export default MessagesFormContainer;
