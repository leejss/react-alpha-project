import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Starred from "../../components/Home/Panel/SidePanel/Starred";
import { usersRef } from "../../database/users";
import { setCurrentChannel, setPrivateChannel } from "../../modules/channel";

const StarredContainer = () => {
  const [starredChannels, setStarredChannels] = useState([]);
  // const [activeChannel, setActiveChannel] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const changeChannel = useCallback(
    (channel) => {
      dispatch(setCurrentChannel(channel));
      dispatch(setPrivateChannel(false));
      //setActiveChannel(channel);
    },
    [dispatch]
  );

  // starred 채널을 불러오기
  useEffect(() => {
    usersRef
      .child(currentUser.uid)
      .child("starred")
      .on("child_added", (snap) => {
        const starredChannel = {
          id: snap.key,
          ...snap.val(),
        };
        setStarredChannels((prev) => prev.concat(starredChannel));
      });

    usersRef
      .child(currentUser.uid)
      .child("starred")
      .on("child_removed", (snap) => {
        setStarredChannels((prev) =>
          prev.filter((star) => star.id !== snap.key)
        );
      });
  }, [currentUser.uid]);
  // 버튼 클릭 => isStar 토글 => 데이터베이스 업데이트
  return (
    <Starred
      starredChannels={starredChannels}
      // activeChannel={activeChannel}
      changeChannel={changeChannel}
    />
  );
};

export default StarredContainer;
