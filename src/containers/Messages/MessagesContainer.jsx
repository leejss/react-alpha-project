import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "../../components/Home/Messages/Messages";
import { messagesRef, privateMessagesRef } from "../../database/messages";
import { usersRef } from "../../database/users";
import { setUserPosts } from "../../modules/channel";
import { searchMessage } from "../../utils";

const MessagesContainer = () => {
  const dispatch = useDispatch();
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

  const [isStar, setIsStar] = useState(null);
  useEffect(() => {
    if (currentUser && currentChannel) {
      usersRef
        .child(currentUser.uid)
        .child("starred")
        .once("value")
        .then((data) => {
          if (data.val()) {
            const channelIds = Object.keys(data.val());
            const prevStarred = channelIds.includes(currentChannel.id);
            setIsStar(prevStarred);
          }
        });
    }
  }, [currentChannel, currentUser]);

  const starChannel = useCallback(async () => {
    try {
      if (currentChannel) {
        await usersRef.child(`${currentUser.uid}/starred`).update({
          [currentChannel.id]: {
            name: currentChannel.name,
            details: currentChannel.details,
            createdBy: {
              ...currentChannel.createdBy,
            },
          },
        });
      } else {
        console.log("No current channel");
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentChannel, currentUser.uid]);

  const unStarChannel = useCallback(async () => {
    try {
      if (currentChannel) {
        await usersRef
          .child(`${currentUser.uid}/starred`)
          .child(currentChannel.id)
          .remove((err) => {
            if (err) {
              console.error(err);
            }
          });
      } else {
        console.log("No current channel");
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentChannel, currentUser.uid]);

  // 스타를 클릭하면 변수 값이 변한다.
  // 변수 값이 변하면 변수 값을 보고 있는 useEffect에 의해서 데이터베이스 업데이트를 진행
  const handleStar = () => {
    setIsStar((prev) => !prev);
  };
  useEffect(() => {
    if (isStar) {
      starChannel();
    } else {
      unStarChannel();
    }
  }, [isStar]);

  const countUserPosts = (messages) => {
    // current channel's messages
    let userPosts = messages.reduce((acc, message) => {
      if (message.user.name in acc) {
        acc[message.user.name].count += 1;
      } else {
        acc[message.user.name] = {
          avatar: message.user.avatar,
          count: 1,
        };
      }
      return acc;
    }, {});
    dispatch(setUserPosts(userPosts));
  };

  useEffect(() => {
    countUserPosts(messages);
  }, [messages]);

  return (
    <Messages
      messages={search.results.length > 0 ? search.results : messages}
      currentUser={currentUser}
      currentChannel={currentChannel && currentChannel}
      isPrivateChannel={isPrivateChannel}
      handleSearch={handleSearch}
      handleStar={handleStar}
      isStar={isStar}
    />
  );
};

export default MessagesContainer;
