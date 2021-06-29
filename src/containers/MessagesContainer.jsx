import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Messages from "../components/Home/Messages/Messages";
import { messagesRef, sendMessages } from "../controllers/messages";
import { searchMessage } from "../utils";

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
        const message = {
          content,
          user: {
            id: currentUser.uid,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          },
        };
        await sendMessages(message, currentChannel.id);
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
    if (currentChannel) {
      let loaded = [];
      setMessages([]);
      messagesRef.child(currentChannel.id).on("child_added", (snap) => {
        loaded.push(snap.val());
        setMessages([...loaded]);
      });
    }
  }, [currentChannel]);

  const [search, setSearch] = useState({
    input: "",
    loading: false,
    results: [],
  });

  const handleSearch = useCallback(
    (e) => {
      const searchResult = searchMessage(messages, e.target.value);
      setSearch({
        results: searchResult,
        input: e.target.value,
        loading: true,
      });
    },
    [messages]
  );
  console.log(search);
  useCallback(() => {
    if (!search.input) {
      setSearch({
        ...search,
        loading: false,
      });
    }
  }, []);

  return (
    <Messages
      messages={search.results.length > 0 ? search.results : messages}
      currentUser={currentUser}
      currentChannel={currentChannel}
      content={content}
      handleChange={handleChange}
      addMessage={addMessage}
      errors={errors}
      loading={loading}
      handleSearch={handleSearch}
    />
  );
};

export default MessagesContainer;
