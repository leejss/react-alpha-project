import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Messages from "../components/Home/Messages/Messages";
import { messagesRef, sendMessages } from "../controllers/messages";

const MessagesContainer = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentChannel } = useSelector((state) => state.channel);

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleChange = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const isContentEmpty = useCallback(() => (content ? false : true), [content]);
  const addMessage = useCallback(async () => {
    try {
      if (!isContentEmpty()) {
        setLoading(true);
        await sendMessages(currentChannel, content, currentUser);
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
  }, [content, currentChannel, currentUser, isContentEmpty]);

  useEffect(() => {
    console.log("useEffect");
    if (currentChannel) {
      let loaded = [];
      setMessages([]);
      messagesRef.child(currentChannel.id).on("child_added", (snap) => {
        loaded.push(snap.val());
        setMessages([...loaded]);
      });
    }
  }, [currentChannel]);

  return (
    <Messages
      messages={messages}
      currentUser={currentUser}
      content={content}
      handleChange={handleChange}
      addMessage={addMessage}
      errors={errors}
      loading={loading}
    />
  );
};

export default MessagesContainer;
