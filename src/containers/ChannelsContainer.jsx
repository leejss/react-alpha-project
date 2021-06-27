import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Channels from "../components/Home/Panel/SidePanel/Channels";
import { addChannel, channelsRef } from "../controllers/channel";
import { setCurrentChannel } from "../modules/channel";

const ChannelsContainer = () => {
  const [channels, setChannels] = useState([]);
  const [modal, setModal] = useState(false);
  const [channel, setChannel] = useState({
    name: "",
    details: "",
  });
  const [activeChannel, setActiveChannel] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const openModal = useCallback(() => {
    setModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const handleChange = useCallback(
    (e) => {
      setChannel({
        ...channel,
        [e.target.name]: e.target.value,
      });
    },
    [channel]
  );

  const isFormValid = useCallback(
    () => channel.name && channel.details,
    [channel.name, channel.details]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (isFormValid()) {
          await addChannel(channel, currentUser);
          setChannel({
            name: "",
            details: "",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [channel, currentUser, isFormValid]
  );

  const changeChannel = useCallback(
    (channel) => {
      dispatch(setCurrentChannel(channel));
    },
    [dispatch]
  );

  const setFirstChannel = useCallback(() => {
    if (firstLoad && channels.length > 0) {
      changeChannel(channels[0]);
    }
    setFirstLoad(false);
  }, [changeChannel, firstLoad, channels]);

  useEffect(() => {
    let loaded = [];
    channelsRef.on("child_added", (snap) => {
      loaded.push(snap.val());
      setChannels([...loaded]);
    });
    setFirstChannel();
  }, [setFirstChannel]);
  return (
    <Channels
      channels={channels}
      channel={channel}
      changeChannel={changeChannel}
      modal={modal}
      openModal={openModal}
      closeModal={closeModal}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default ChannelsContainer;
