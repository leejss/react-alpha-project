import { Menu } from "semantic-ui-react";
import colors from "../../../styles/colors";
import UserPanel from "./UserPanel";

const SidePanel = () => {
  return (
    <Menu
      size="large"
      style={{ backgroundColor: `${colors.primary}`, fontSize: "1.2rem" }}
      inverted
      vertical
      fixed="left"
    >
      <UserPanel />
    </Menu>
  );
};

export default SidePanel;
