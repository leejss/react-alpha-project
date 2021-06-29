import { useEffect, useState } from "react";
import { channelsRef } from "../database/channel";

const useChannels = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    let loaded = [];
    channelsRef.on("child_addeds", (snap) => {
      loaded.push(snap.val());
    });
  }, []);

  return channels;
};

export default useChannels;
