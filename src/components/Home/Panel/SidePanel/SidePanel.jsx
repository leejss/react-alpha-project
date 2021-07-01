import { Menu } from "semantic-ui-react";
import colors from "../../../../styles/colors";
import UserPanel from "./UserPanel";
import "../panel.css";
import ChannelsContainer from "../../../../containers/Channel/ChannelsContainer";
import DirectMessagesContainer from "../../../../containers/Channel/DirectMessagesContainer";

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
      <ChannelsContainer />
      <DirectMessagesContainer />
    </Menu>
  );
};

export default SidePanel;
