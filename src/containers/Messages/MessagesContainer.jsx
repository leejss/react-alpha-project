import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Messages from "../../components/Home/Messages/Messages";
import { messagesRef, privateMessagesRef } from "../../database/messages";
import { searchMessage } from "../../utils";

const MessagesContainer = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentChannel, isPrivateChannel } = useSelector(
    (state) => state.channel
  );

  const [messages, setMessages] = useState([]);

  const getMessageRef = useCallback(
    () => (isPrivateChannel ? privateMessagesRef : messagesRef),
    [isPrivateChannel]
  );

  useEffect(() => {
    if (currentChannel) {
      let loaded = [];
      setMessages([]);
      getMessageRef()
        .child(currentChannel.id)
        .on("child_added", (snap) => {
          loaded.push(snap.val());
          setMessages([...loaded]);
        });
    }
  }, [currentChannel, getMessageRef]);

  const [search, setSearch] = useState({
    input: "",
    loading: false,
    results: [],
  });

  const handleSearch = useCallback(
    (e) => {
      if (e.target.value) {
        const searchResult = searchMessage(messages, e.target.value);
        setSearch({
          results: searchResult,
          input: e.target.value,
          loading: true,
        });
      } else {
        setSearch({
          ...search,
          results: [],
          loading: false,
        });
      }
    },
    [messages, search]
  );

  return (
    <Messages
      messages={search.results.length > 0 ? search.results : messages}
      currentUser={currentUser}
      currentChannel={currentChannel && currentChannel}
      isPrivateChannel={isPrivateChannel}
      handleSearch={handleSearch}
    />
  );
};

export default MessagesContainer;
