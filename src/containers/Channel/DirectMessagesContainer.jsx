import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DirectMessages from "../../components/Home/Panel/SidePanel/DirectMessages";
import { connectionRef } from "../../database/connection";
import { presenceRef } from "../../database/presence";
import { usersRef } from "../../database/users";
import { setCurrentChannel, setPrivateChannel } from "../../modules/channel";

const DirectMessagesContainer = () => {
  const [users, setUsers] = useState([]);
  const [activeChannel, setActiveChannel] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // connection check
    console.log("connectionRef");
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

    
  }, [currentUser.uid]);

  useEffect(() => {
    console.log("userRef");
    let loaded = [];
    usersRef.on("child_added", (snap) => {
      if (currentUser.uid !== snap.key) {
        let user = snap.val();
        user["uid"] = snap.key;
        user["status"] = "offline";
        loaded.push(user);
        setUsers([...loaded]);
      }
    });
  }, [currentUser.uid]);

  // const statusUpdate = useCallback(() => {
  //   presenceRef.on("child_added", (snap) => {
  //     if (currentUser.uid !== snap.key) {
  //       const updatedUser = users.map((user) => {
  //         if (user.uid === snap.key) {
  //           user["status"] = "online";
  //         }
  //         return user;
  //       });

  //       setUsers([...updatedUser]);
  //     }
  //   });

  //   presenceRef.on("child_removed", (snap) => {
  //     if (currentUser.uid !== snap.key) {
  //       const updatedUser = users.map((user) => {
  //         if (user.uid === snap.key) {
  //           user["status"] = "offline";
  //         }
  //         return user;
  //       });

  //       setUsers([...updatedUser]);
  //     }
  //   });
  // }, [currentUser.uid]);

  // useEffect(() => {
  //   statusUpdate();
  // }, []);

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
  console.log("users", users);
  return (
    <DirectMessages
      users={users}
      changePrivateChannel={changePrivateChannel}
      activeChannel={activeChannel}
    />
  );
};

export default DirectMessagesContainer;
