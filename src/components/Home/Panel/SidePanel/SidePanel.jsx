import { Menu } from "semantic-ui-react";
import ChannelsContainer from "../../../../containers/ChannelsContainer";
import colors from "../../../../styles/colors";
import UserPanel from "./UserPanel";
import "../panel.css";
import DirectMessages from "./DirectMessages";

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
      <DirectMessages />
    </Menu>
  );
};

export default SidePanel;
