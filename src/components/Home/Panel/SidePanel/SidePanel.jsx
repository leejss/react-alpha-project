import { Menu } from "semantic-ui-react";
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
      <Channels />
    </Menu>
  );
};

export default SidePanel;
