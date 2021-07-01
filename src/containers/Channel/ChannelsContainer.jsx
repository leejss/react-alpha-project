import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Channels from "../../components/Home/Panel/SidePanel/Channels";
import { channelsRef } from "../../database/channel";
import { messagesRef } from "../../database/messages";
import { setCurrentChannel, setPrivateChannel } from "../../modules/channel";

const ChannelsContainer = () => {
  const [channels, setChannels] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [channel, setChannel] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

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
    },
    [dispatch, clearNotification]
  );

  const handleNotifications = (
    channelId,
    currentChannelId,
    notifications,
    snap
  ) => {
    let lastTotal = 0;
    let index = notifications.findIndex(
      (notification) => notification.id === channelId
    );

    if (index !== -1) {
      if (channelId !== currentChannelId) {
        lastTotal = notifications[index].total;
        if (snap.numChildren > lastTotal) {
          // update
          notifications[index].count = snap.numChildren() - lastTotal;
        }
      }

      notifications[index].lastKnownTotal = snap.numChildren();
    } else {
      notifications.push({
        id: channelId,
        total: snap.numChildren(),
        lastKnownTotal: snap.numChildren(),
        count: 0, // new message
      });
    }

    setNotifications([...notifications]);
  };

  const addNotificationListener = useCallback(
    (channelId) => {
      // listen new message
      messagesRef.child(channelId).on("value", (snap) => {
        if (channel) {
          handleNotifications(channelId, channel.id, notifications, snap);
        }
      });
    },
    [channel, notifications]
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
      addNotificationListener(snap.key);
    });
    return () => channelsRef.off();
  }, []);

  useEffect(() => {
    if (firstLoad && channels.length > 0) {
      changeChannel(channels[0]);
      console.log("setActiveChannel");
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
