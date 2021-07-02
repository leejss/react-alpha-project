import { useState } from "react";
import { useSelector } from "react-redux";
import MetaPanel from "../components/Home/Panel/MetaPanel";

const MetaPanelContainer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isPrivateChannel, currentChannel, usersPosts } = useSelector(
    (state) => state.channel
  );

  const updateIndex = (e, props) => {
    setActiveIndex(props["index"]);
  };

  return (
    <MetaPanel
      activeIndex={activeIndex}
      updateIndex={updateIndex}
      isPrivateChannel={isPrivateChannel}
      currentChannel={currentChannel && currentChannel}
      usersPosts={usersPosts && usersPosts}
    />
  );
};

export default MetaPanelContainer;
