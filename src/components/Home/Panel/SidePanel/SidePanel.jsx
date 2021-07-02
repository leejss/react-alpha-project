import { Menu } from "semantic-ui-react";
import colors from "../../../../styles/colors";
import UserPanel from "./UserPanel";
import "../panel.css";
import ChannelsContainer from "../../../../containers/Channel/ChannelsContainer";
import DirectMessagesContainer from "../../../../containers/Channel/DirectMessagesContainer";
import StarredContainer from "../../../../containers/Channel/StarredContainer";

const SidePanel = ({ currentUser }) => {
  return (
    <Menu
      size="large"
      style={{ backgroundColor: `${colors.primary}`, fontSize: "1.2rem" }}
      inverted
      vertical
      fixed="left"
    >
      <UserPanel currentUser={currentUser} />
      <StarredContainer />
      <ChannelsContainer />
      <DirectMessagesContainer />
    </Menu>
  );
};

export default SidePanel;
