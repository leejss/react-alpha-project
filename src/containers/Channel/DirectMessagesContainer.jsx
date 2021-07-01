import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DirectMessages from "../../components/Home/Panel/SidePanel/DirectMessages";
import { connectionRef } from "../../database/connection";
import { presenceRef } from "../../database/presence";
import { usersRef } from "../../database/users";
import { setCurrentChannel, setPrivateChannel } from "../../modules/channel";

const DirectMessagesContainer = () => {
  const [users, setUsers] = useState([]);
  const [presenceList, setPresenceList] = useState([]);
  const [activeChannel, setActiveChannel] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // connection check
    connectionRef.on("value", (snap) => {
      if (snap.val()) {
        const ref = presenceRef.child(currentUser.uid);
        ref.set(true);
        ref.onDisconnect().remove((err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });

    presenceRef.on("child_added", (snap) => {
      let loaded = [];
      if (currentUser.uid !== snap.key) {
        loaded.push(snap.key);
        setPresenceList([...loaded]);
      }
    });
    presenceRef.on("child_removed", (snap) => {
      let loaded = [];
      if (currentUser.uid !== snap.key) {
        loaded.push(snap.key);
        setPresenceList([...loaded]);
      }
    });
  }, [currentUser.uid]);

  useEffect(() => {
    let loaded = [];
    usersRef.on("child_added", (snap) => {
      if (currentUser.uid !== snap.key) {
        let user = snap.val();
        user["uid"] = snap.key;
        if (presenceList.length > 0 && presenceList.includes(snap.key)) {
          user["status"] = "online";
        } else {
          user["status"] = "offline";
        }
        loaded.push(user);
        setUsers([...loaded]);
      }
    });
  }, [currentUser.uid, presenceList]);

  const changePrivateChannel = useCallback(
    (user) => {
      const channelData = {
        name: user.name,
        id:
          user.uid < currentUser.uid
            ? `${user.uid}/${currentUser.uid}`
            : `${currentUser.uid}/${user.uid}`,
      };

      dispatch(setCurrentChannel(channelData));
      dispatch(setPrivateChannel(true));
      setActiveChannel(user.uid);
    },
    [currentUser.uid, dispatch]
  );
  return (
    <DirectMessages
      users={users}
      changePrivateChannel={changePrivateChannel}
      activeChannel={activeChannel}
    />
  );
};

export default DirectMessagesContainer;
