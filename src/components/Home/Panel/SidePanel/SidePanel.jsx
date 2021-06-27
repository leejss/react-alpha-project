import { Menu } from "semantic-ui-react";
import ChannelsContainer from "../../../../containers/ChannelsContainer";
import colors from "../../../../styles/colors";
import Channels from "./Channels";
import UserPanel from "./UserPanel";

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
    </Menu>
  );
};

export default SidePanel;
