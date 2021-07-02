import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Channels from "../../components/Home/Panel/SidePanel/Channels";
import { channelsRef } from "../../database/channel";
import { messagesRef } from "../../database/messages";
import { setCurrentChannel, setPrivateChannel } from "../../modules/channel";
import firebase from "../../firebase";

const ChannelsContainer = () => {
  const [channels, setChannels] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [channel, setChannel] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentChannel } = useSelector((state) => state.channel);
  const ref = useRef(null);
  if (currentChannel && currentUser) {
    ref.current = firebase
      .database()
      .ref("typing")
      .child(currentChannel.id)
      .child(currentUser.uid);
  }

  const openModal = useCallback(() => {
    setModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const clearNotification = useCallback(() => {
    if (channel) {
      let index = notifications.findIndex((noti) => noti.id === channel.id);

      // if currnet channel
      if (index !== -1) {
        let updatedNotifications = [...notifications];
        updatedNotifications[index].total = notifications[index].lastKnownTotal;
        updatedNotifications[index].count = 0;
        setNotifications([...updatedNotifications]);
      }
    }
  }, [notifications, channel]);

  const changeChannel = useCallback(
    (channel) => {
      clearNotification();
      dispatch(setCurrentChannel(channel));
      dispatch(setPrivateChannel(false));
      setActiveChannel(channel);
      setChannel(channel);
      ref.current.remove();
    },
    [dispatch, clearNotification]
  );

  function getNotificationCount(channel) {
    let count = 0;

    notifications.forEach((noti) => {
      if (noti.id === channel.id) {
        count = noti.count;
      }
    });
    if (count > 0) return count;
  }

  useEffect(() => {
    let loaded = [];
    channelsRef.on("child_added", (snap) => {
      loaded.push(snap.val());
      setChannels([...loaded]);

      let notis = [];
      messagesRef.child(snap.key).on("value", (snap) => {
        // snap.val() 채널 메시지

        notis.push(snap.val());
        setNotifications([...notis]);
      });
    });
    return () => channelsRef.off();
  }, []);

  // useEffect(() => {
  //   // notification listener
  //   if (channels) {
  //     channels.forEach((ch) => {
  //       const notis = [...notifications];
  //       console.log("notis 초기", notis);
  //       // message listener
  //       messagesRef.child(ch.id).on("value", (snap) => {
  //         console.log("메시지가 등록된 채널", ch.id);
  //         console.log("channel messages", snap.val());
  //         // listen new message
  //         let lastTotal = 0;
  //         let index = notifications.findIndex((noti) => noti.id === ch.id);
  //         console.log("index", index);
  //         if (index !== -1) {
  //           // find matched channel
  //           console.log("find matched");
  //           if (ch.id !== channel.id) {
  //             lastTotal = notis[index].total;
  //             if (snap.numChildren() > lastTotal) {
  //               // 안 읽은 메시지
  //               notis[index].count = snap.numChildren() - lastTotal;
  //             }
  //           }
  //           notis[index].lastKnownTotal = snap.numChildren();
  //         } else {
  //           // not found
  //           console.log("notis push");
  //           notis.push({
  //             id: ch.id,
  //             total: snap.numChildren(),
  //             lastKnownTotal: snap.numChildren(),
  //             count: 0, // new message
  //           });
  //         }

  //         setNotifications([...notis]);
  //       });
  //     });
  //   }
  // }, [channels]);

  useEffect(() => {
    if (firstLoad && channels.length > 0) {
      changeChannel(channels[0]);
      setActiveChannel(channels[0]);
      setFirstLoad(false);
    }
  }, [channels]);

  return (
    <Channels
      channels={channels}
      activeChannel={activeChannel}
      changeChannel={changeChannel}
      modal={modal}
      openModal={openModal}
      getNotificationCount={getNotificationCount}
      closeModal={closeModal}
    />
  );
};

export default ChannelsContainer;
