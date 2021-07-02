import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MessagesForm from "../../components/Home/Messages/MessagesForm";
import { sendMessages } from "../../database/messages";
import firebase from "../../firebase";

const MessagesFormContainer = () => {
  const { currentChannel, isPrivateChannel } = useSelector(
    (state) => state.channel
  );
  const { currentUser } = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  if (currentChannel && currentUser) {
    ref.current = firebase
      .database()
      .ref("typing")
      .child(currentChannel.id)
      .child(currentUser.uid);
  }

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
        ref.current.remove();
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

  const handleKeyDown = () => {
    const typingRef = firebase.database().ref("typing");
    if (currentUser && currentChannel) {
      const ref = typingRef.child(currentChannel.id).child(currentUser.uid);
      if (content) {
        ref.set(currentUser.displayName);
      } else {
        console.log("ref remove");
        ref.remove();
      }
    }
  };

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
      handleKeyDown={handleKeyDown}
    />
  );
};

export default MessagesFormContainer;
